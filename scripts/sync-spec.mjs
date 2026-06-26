// sync-spec.mjs — pull the spec docs payload into the Starlight content tree.
//
// Source (local sibling spec repo, or SPEC_REPO_DIR in CI):
//   ../a6b8-spec/generated/docs-payload/   — spec chapters + manifest.json
//
// Targets:
//   src/content/docs/specification/   — Starlight content collection
//   src/data/manifest.json            — consumed by src/data/sidebar.mjs
//
// Normalization: the payload frontmatter carries richer metadata (spec_version,
// order, section, normative, generated_at, generator, edit_warning, ...). Starlight's
// docsSchema is strict and rejects unknown frontmatter keys, so each page is reduced
// to a SAFE frontmatter set: { title, description }. The remaining metadata lives in
// manifest.json (the single source of truth for ordering and grouping).

import { mkdir, writeFile, readFile, readdir, rm } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'


const __dirname = path.dirname( fileURLToPath( import.meta.url ) )
const REPO_ROOT = path.resolve( __dirname, '..' )

// Spec repo dir: SPEC_REPO_DIR env (CI checks out the spec repo here), else local sibling ../a6b8-spec.
const SPEC_REPO_DIR = process.env.SPEC_REPO_DIR
    ? path.resolve( process.env.SPEC_REPO_DIR )
    : path.resolve( REPO_ROOT, '..', 'a6b8-spec' )
const SPEC_REPO_PAYLOAD = path.resolve( SPEC_REPO_DIR, 'generated', 'docs-payload' )

const CONTENT_SPEC_DIR = path.resolve( REPO_ROOT, 'src', 'content', 'docs', 'specification' )

const DATA_DIR = path.resolve( REPO_ROOT, 'src', 'data' )
const DATA_MANIFEST = path.join( DATA_DIR, 'manifest.json' )

const SAFE_FRONTMATTER_KEYS = [ 'title', 'description' ]


class SpecSync {
    static async run() {
        SpecSync.#assertSource()

        const manifest = await SpecSync.#loadManifest()
        await SpecSync.#prepareTargetDirs()

        const stats = { syncedCore: 0 }

        await SpecSync.#syncCore( { manifest, stats } )

        // Prune orphan content pages — files whose slug is no longer in the manifest
        // (a chapter renamed/removed in the spec). This content dir is sync-owned.
        const coreSlugs = SpecSync.#collectFamilySlugs( { block: { files: manifest.files } } )
        stats.prunedCore = await SpecSync.#pruneContentDir( { contentDir: CONTENT_SPEC_DIR, slugs: coreSlugs } )

        await mkdir( DATA_DIR, { recursive: true } )
        await writeFile( DATA_MANIFEST, JSON.stringify( manifest, null, 2 ) + '\n', 'utf-8' )

        SpecSync.#printSummary( { stats } )
        return { stats }
    }


    static #assertSource() {
        if( !existsSync( SPEC_REPO_PAYLOAD ) ) {
            throw new Error( `Spec payload source missing: ${ SPEC_REPO_PAYLOAD }` )
        }
        const manifestPath = path.join( SPEC_REPO_PAYLOAD, 'manifest.json' )
        if( !existsSync( manifestPath ) ) {
            throw new Error( `manifest.json missing at ${ manifestPath }` )
        }
    }


    static async #loadManifest() {
        const manifestPath = path.join( SPEC_REPO_PAYLOAD, 'manifest.json' )
        const raw = await readFile( manifestPath, 'utf-8' )
        const manifest = JSON.parse( raw )
        if( !Array.isArray( manifest.files ) ) {
            throw new Error( 'manifest.files is not an array' )
        }
        return manifest
    }


    static async #prepareTargetDirs() {
        await mkdir( CONTENT_SPEC_DIR, { recursive: true } )
    }


    static #collectFamilySlugs( { block } ) {
        const files = block && Array.isArray( block.files ) ? block.files : []
        return new Set( files.map( ( file ) => file.slug ) )
    }


    static async #pruneContentDir( { contentDir, slugs } ) {
        let names
        try {
            names = await readdir( contentDir )
        } catch( error ) {
            return 0
        }
        const orphans = names
            .filter( ( name ) => name.endsWith( '.md' ) )
            .filter( ( name ) => !slugs.has( name.replace( /\.md$/, '' ) ) )
        await Promise.all( orphans.map( ( name ) => rm( path.join( contentDir, name ), { force: true } ) ) )
        orphans.forEach( ( name ) => console.log( `  - pruned orphan: ${ contentDir }/${ name }` ) )
        return orphans.length
    }


    static async #syncCore( { manifest, stats } ) {
        const tasks = manifest.files.map( async ( fileEntry ) => {
            const srcPath = path.join( SPEC_REPO_PAYLOAD, fileEntry.filename )
            if( !existsSync( srcPath ) ) {
                throw new Error( `Manifest references missing file: ${ fileEntry.filename }` )
            }
            const raw = await readFile( srcPath, 'utf-8' )
            const normalized = SpecSync.#normalize( { raw, fileEntry } )
            const dst = path.join( CONTENT_SPEC_DIR, `${ fileEntry.slug }.md` )
            await writeFile( dst, normalized, 'utf-8' )
            stats.syncedCore += 1
        } )
        await Promise.all( tasks )
    }


    // Reduce frontmatter to the safe Starlight set. The payload frontmatter values are
    // already valid YAML (correctly quoted by the generator), so the original whole
    // lines for the safe keys are kept VERBATIM.
    static #normalize( { raw, fileEntry } ) {
        const match = raw.match( /^---\n([\s\S]*?)\n---\n?/ )
        if( !match ) {
            throw new Error( `${ fileEntry.filename }: no frontmatter block found` )
        }
        const safeFm = SpecSync.#renderFrontmatter( { block: match[ 1 ], fileEntry } )
        const body = raw.slice( match[ 0 ].length ).replace( /^\n+/, '' )
        return `${ safeFm }${ body }`
    }


    static #renderFrontmatter( { block, fileEntry } ) {
        const lines = block.split( '\n' )
        const picked = SAFE_FRONTMATTER_KEYS.map( ( key ) => {
            const found = lines.find( ( line ) => line.startsWith( `${ key }:` ) )
            if( found ) {
                return found
            }
            const fallback = key === 'title' ? fileEntry.title : ( fileEntry.description ?? '' )
            const esc = String( fallback ).replace( /\\/g, '\\\\' ).replace( /"/g, '\\"' )
            return `${ key }: "${ esc }"`
        } )
        return [ '---', ...picked, '---', '' ].join( '\n' ) + '\n'
    }


    static #printSummary( { stats } ) {
        console.log( '' )
        console.log( 'Spec sync complete' )
        console.log( `  Source:        ${ SPEC_REPO_PAYLOAD }` )
        console.log( `  Spec chapters: ${ stats.syncedCore } -> ${ CONTENT_SPEC_DIR }` )
        console.log( `  Pruned:        ${ stats.prunedCore }` )
        console.log( `  Manifest:      ${ DATA_MANIFEST }` )
    }
}


SpecSync
    .run()
    .then( () => process.exit( 0 ) )
    .catch( ( err ) => {
        console.error( 'Sync failed:', err.message )
        process.exit( 1 )
    } )
