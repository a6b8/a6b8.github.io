// generate-llms-txt.mjs — (Memo 015, Kap 9). 3-layer llms.txt model (llmstxt.org):
//   public/llms.txt       = curated index (pointer to the layers + spec + GitHub)
//   public/docs-llms.txt  = practical docs (every page EXCEPT the formal spec layer)
//   public/llms-full.txt  = full concatenation of every doc page
//
// Ported from memo-init, rebranded for personal-brand: header strings, a6b8 slugs.
// Header fields read from src/data/refs.json (strict mode, no silent defaults).

import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'


const __dirname = join( fileURLToPath( import.meta.url ), '..' )
const REPO_ROOT = join( __dirname, '..' )
const DOCS_DIR = join( REPO_ROOT, 'src', 'content', 'docs' )
const PUBLIC_DIR = join( REPO_ROOT, 'public' )
const OUTPUT_FULL = join( PUBLIC_DIR, 'llms-full.txt' )
const OUTPUT_DOCS = join( PUBLIC_DIR, 'docs-llms.txt' )
const OUTPUT_INDEX = join( PUBLIC_DIR, 'llms.txt' )
const REFS_PATH = join( REPO_ROOT, 'src', 'data', 'refs.json' )

// Pages under these slug roots are the formal specification layer — kept out of
// docs-llms.txt (they still appear in llms-full.txt).
const FORMAL_SECTIONS = [ 'specification' ]

const SIDEBAR_ORDER = [
    'docs/overview',
    'docs/getting-started',
    'specification/overview'
]


// Strict-mode refs loading — no silent defaults.
const loadRefs = async () => {
    const raw = await readFile( REFS_PATH, 'utf8' )
    const refs = JSON.parse( raw )
    const checks = [
        [ 'spec.currentVersion', refs.spec?.currentVersion ],
        [ 'spec.specRepo', refs.spec?.specRepo ],
        [ 'docs.canonical', refs.docs?.canonical ],
        [ 'llmsFiles.docsUrl', refs.llmsFiles?.docsUrl ],
        [ 'llmsFiles.fullUrl', refs.llmsFiles?.fullUrl ],
        [ 'github.organization', refs.github?.organization ]
    ]
    const missing = checks
        .filter( ( [ , value ] ) => typeof value !== 'string' )
        .map( ( [ field ] ) => field )
    if( missing.length > 0 ) {
        throw new Error( `[generate-llms-txt] missing required fields in src/data/refs.json: ${ missing.join( ', ' ) }` )
    }
    return { refs }
}


const buildHeaders = ( { refs } ) => {
    const specVersion = refs.spec.currentVersion
    const docsBase = refs.docs.canonical
    const specRepo = refs.spec.specRepo
    const org = refs.github.organization

    const HEADER_FULL = `# Personal Brand — Complete Website Content

> Notes, specifications, and experiments — built in the open.
> Open Source (MIT).

Docs: ${ docsBase }
GitHub: ${ org }
Spec repo: ${ specRepo }
`

    const HEADER_DOCS = `# Personal Brand — Practical Documentation

> Notes, specifications, and experiments — built in the open.
> Open Source (MIT).

This file contains the practical documentation (docs + blog).
For the formal specification, see: ${ docsBase }/llms-full.txt
For a brief index, see: ${ docsBase }/llms.txt
`

    const HEADER_INDEX = `# Personal Brand — llms.txt Index

> Layered LLM context for a6b8.github.io. Pick the layer you need.

- Practical documentation: /docs-llms.txt
- Full website content (docs + spec, concatenated): /llms-full.txt
- Specification (v${ specVersion }): ${ docsBase }/specification/overview/

Spec source: ${ specRepo }
Docs: ${ docsBase }
GitHub: ${ org }
`

    return { HEADER_FULL, HEADER_DOCS, HEADER_INDEX }
}


const stripFrontmatter = ( content ) => {
    const match = content.match( /^---\n[\s\S]*?\n---\n/ )
    return match ? content.slice( match[ 0 ].length ).trim() : content.trim()
}

const stripLinks = ( content ) =>
    content.replace( /\[([^\]]+)\]\(([^)]+)\)/g, ( _, text, url ) => {
        if( url.startsWith( 'http' ) ) { return `${ text } (${ url })` }
        if( url.startsWith( '/' ) ) { return text }
        return text
    } )

const extractTitle = ( content ) => {
    const match = content.match( /^title:\s*(.+)$/m )
    return match ? match[ 1 ].trim() : null
}

const collectMdFiles = async ( dir, baseDir ) => {
    const entries = await readdir( dir, { withFileTypes: true } )
    const results = await Promise.all(
        entries.map( async ( entry ) => {
            const fullPath = join( dir, entry.name )
            if( entry.isDirectory() ) {
                return collectMdFiles( fullPath, baseDir )
            }
            if( entry.isFile() && entry.name.endsWith( '.md' ) ) {
                const rel = relative( baseDir, fullPath )
                const slug = rel.replace( /\.(md|mdx)$/, '' )
                return [ { path: fullPath, slug } ]
            }
            return []
        } )
    )
    return results.flat()
}


const run = async () => {
    await mkdir( PUBLIC_DIR, { recursive: true } )
    const { refs } = await loadRefs()
    const { HEADER_FULL, HEADER_DOCS, HEADER_INDEX } = buildHeaders( { refs } )

    const mdFiles = await collectMdFiles( DOCS_DIR, DOCS_DIR )

    const pages = await Promise.all(
        mdFiles.map( async ( { path: filePath, slug } ) => {
            const raw = await readFile( filePath, 'utf-8' )
            const title = extractTitle( raw )
            const body = stripLinks( stripFrontmatter( raw ) )
            return { slug, title, body }
        } )
    )

    const ordered = SIDEBAR_ORDER
        .map( ( slug ) => pages.find( ( p ) => p.slug === slug ) )
        .filter( Boolean )

    const unordered = pages.filter( ( p ) => !SIDEBAR_ORDER.includes( p.slug ) )
    const allPages = [ ...ordered, ...unordered ]

    const sections = allPages.map( ( { slug, title, body } ) =>
        `---\n\n# ${ title || slug }\n/${ slug }\n\n${ body }`
    )

    const docsPages = allPages.filter( ( p ) =>
        !FORMAL_SECTIONS.some( ( sec ) => p.slug === sec || p.slug.startsWith( sec + '/' ) )
    )
    const docsSections = docsPages.map( ( { slug, title, body } ) =>
        `---\n\n# ${ title || slug }\n/${ slug }\n\n${ body }`
    )

    const outputFull = HEADER_FULL + '\n' + sections.join( '\n\n' ) + '\n'
    const outputDocs = HEADER_DOCS + '\n' + docsSections.join( '\n\n' ) + '\n'

    await writeFile( OUTPUT_FULL, outputFull, 'utf-8' )
    await writeFile( OUTPUT_DOCS, outputDocs, 'utf-8' )
    await writeFile( OUTPUT_INDEX, HEADER_INDEX, 'utf-8' )

    console.log( `llms.txt (index)  generated: ${ HEADER_INDEX.length } chars  -> ${ OUTPUT_INDEX }` )
    console.log( `docs-llms.txt     generated: ${ docsPages.length } pages, ${ outputDocs.length } chars  -> ${ OUTPUT_DOCS }` )
    console.log( `llms-full.txt     generated: ${ allPages.length } pages, ${ outputFull.length } chars  -> ${ OUTPUT_FULL }` )
}


run()
    .then( () => process.exit( 0 ) )
    .catch( ( err ) => {
        console.error( 'generate-llms-txt failed:', err.message )
        process.exit( 1 )
    } )
