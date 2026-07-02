// Pagefind meta injector — Fix 1 (build half) of the pagefind search fixes
// (Memo 015, Kap 5). Ported from memo-init, adapted to personal-brand's
// single-spec sidebar: the slug-to-section mapping is read from
// SidebarLoader.buildSidebar() (specItems only). Docs pages (slug docs/*) map to
// the "Docs" section. Writes a hidden span[data-pagefind-meta="section"] at the
// start of every mapped MD/MDX docs page. Idempotent — existing marker blocks are
// replaced. Runs in the build chain after sync-spec, before astro build.
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join, relative } from 'node:path'
import { SidebarLoader } from '../src/data/sidebar.mjs'


const __dirname = dirname( fileURLToPath( import.meta.url ) )
const ROOT = join( __dirname, '..' )
const DOCS_DIR = join( ROOT, 'src', 'content', 'docs' )
const MARKER_START_MD = '<!-- PAGEFIND-META-START -->'
const MARKER_END_MD = '<!-- PAGEFIND-META-END -->'
const MARKER_START_MDX = '{/* PAGEFIND-META-START */}'
const MARKER_END_MDX = '{/* PAGEFIND-META-END */}'


const buildSidebarMapping = () => {
    const { specItems } = SidebarLoader.buildSidebar()
    const mapping = {}

    const walkItems = ( { items, parents } ) => {
        items.forEach( ( item ) => {
            if( typeof item.slug === 'string' ) {
                mapping[ item.slug ] = parents.join( ' > ' )
            }
            if( Array.isArray( item.items ) ) {
                const label = typeof item.label === 'string' ? item.label : ''
                const nextParents = label === '' ? parents : parents.concat( [ label ] )
                walkItems( { items: item.items, parents: nextParents } )
            }
        } )
    }

    walkItems( { items: Array.isArray( specItems ) ? specItems : [], parents: [ 'Specification' ] } )

    return mapping
}


const walkMdx = ( { dir, acc } ) => {
    const entries = readdirSync( dir )
    entries.forEach( ( entry ) => {
        const full = join( dir, entry )
        const stats = statSync( full )
        if( stats.isDirectory() ) {
            walkMdx( { dir: full, acc } )
        } else if( entry.endsWith( '.mdx' ) || entry.endsWith( '.md' ) ) {
            acc.push( full )
        }
    } )
    return acc
}


const escapeForRegex = ( s ) => s.replace( /[.*+?^${}()|[\]\\]/g, '\\$&' )


const injectMeta = ( { file, section } ) => {
    const raw = readFileSync( file, 'utf8' )
    const match = raw.match( /^---\n([\s\S]*?)\n---\n([\s\S]*)$/ )
    if( !match ) { return { status: false, reason: 'no-frontmatter' } }

    const isMdx = file.endsWith( '.mdx' )
    const markerStart = isMdx ? MARKER_START_MDX : MARKER_START_MD
    const markerEnd = isMdx ? MARKER_END_MDX : MARKER_END_MD

    const [ , frontmatter, body ] = match
    let cleanBody = body
    const stripPatterns = [
        new RegExp( `${escapeForRegex( MARKER_START_MD )}[\\s\\S]*?${escapeForRegex( MARKER_END_MD )}\\n*`, 'g' ),
        new RegExp( `${escapeForRegex( MARKER_START_MDX )}[\\s\\S]*?${escapeForRegex( MARKER_END_MDX )}\\n*`, 'g' )
    ]
    stripPatterns.forEach( ( re ) => { cleanBody = cleanBody.replace( re, '' ) } )

    const metaBlock = `${markerStart}\n<span style="display:none" data-pagefind-meta="section">${section}</span>\n${markerEnd}\n\n`
    writeFileSync( file, `---\n${frontmatter}\n---\n${metaBlock}${cleanBody}` )
    return { status: true }
}


const run = () => {
    const mapping = buildSidebarMapping()
    const files = walkMdx( { dir: DOCS_DIR, acc: [] } )

    let injected = 0
    let noMapping = 0
    let skipped = 0

    files.forEach( ( file ) => {
        const rel = relative( DOCS_DIR, file )
        const slug = rel.replace( /\.(mdx|md)$/, '' ).replace( /\\/g, '/' )
        let section = mapping[ slug ]
        if( section === undefined && slug.startsWith( 'docs/' ) ) { section = 'Docs' }
        if( section === undefined ) { noMapping += 1; return }
        const res = injectMeta( { file, section } )
        if( res.status ) { injected += 1 } else { skipped += 1 }
    } )

    console.log( 'Pagefind meta injection:', { injected, noMapping, skipped, totalFiles: files.length, mappingKeys: Object.keys( mapping ).length } )
    return { status: true }
}


run()
