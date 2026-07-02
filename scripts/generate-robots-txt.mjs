import { mkdir, writeFile } from 'node:fs/promises'

// generate-robots-txt.mjs — write public/robots.txt (Memo 015, Kap 9).
// Ported from memo-init; site base + published llms files adapted to a6b8.

const OUTPUT = 'public/robots.txt'
const SITE_BASE = 'https://a6b8.github.io'
// The site publishes the 3-layer llms model (index + docs + full).
const LLMS_FILES = [
    { path: '/llms.txt', label: 'Index:' },
    { path: '/docs-llms.txt', label: 'Docs:' },
    { path: '/llms-full.txt', label: 'Full content:' }
]

const buildRobotsTxt = () => {
    const header = [
        'User-agent: *',
        'Allow: /',
        '',
        '# Sitemap',
        `Sitemap: ${ SITE_BASE }/sitemap-index.xml`
    ].join( '\n' )

    const llmsLines = [ '', '# llms.txt — machine-readable context' ]
    LLMS_FILES
        .forEach( ( file ) => {
            llmsLines.push( `# ${ file.label } ${ SITE_BASE }${ file.path }` )
        } )

    return `${ header }\n${ llmsLines.join( '\n' ) }\n`
}

const main = async () => {
    await mkdir( 'public', { recursive: true } )
    const body = buildRobotsTxt()
    await writeFile( OUTPUT, body, 'utf8' )
    console.log( `[generate-robots-txt] wrote ${ OUTPUT } (${ body.length } bytes)` )
}

main()
    .catch( ( error ) => {
        console.error( `[generate-robots-txt] ERROR: ${ error.message }` )
        process.exit( 1 )
    } )
