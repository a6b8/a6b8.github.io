// generate-og.mjs — (Memo 015, Kap 9 / Bug 9). Renders public/og-default.png,
// the site-wide default Open Graph / Twitter card image (1200x630), from an inline
// SVG. Re-run when the brand changes: `npm run generate-og`.
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname( fileURLToPath( import.meta.url ) )
const OUT = join( __dirname, '..', 'public', 'og-default.png' )

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="glow" cx="18%" cy="24%" r="70%">
      <stop offset="0%" stop-color="#f5b74d" stop-opacity="0.16"/>
      <stop offset="60%" stop-color="#f5b74d" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#0d1117"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <g fill="#f5b74d">
    <rect x="96"  y="300" width="34" height="60"  rx="10"/>
    <rect x="150" y="252" width="34" height="108" rx="10"/>
    <rect x="204" y="196" width="34" height="164" rx="10"/>
  </g>
  <text x="96" y="440" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="82" font-weight="800" fill="#f0f6fc">Personal Brand</text>
  <text x="98" y="500" font-family="-apple-system, Segoe UI, Roboto, sans-serif" font-size="32" fill="#8b949e">Notes, specifications, and experiments — built in the open.</text>
  <text x="98" y="566" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="26" fill="#f5b74d">a6b8.github.io</text>
</svg>`

const run = async () => {
    await sharp( Buffer.from( svg ) ).png().toFile( OUT )
    console.log( `[generate-og] wrote ${ OUT }` )
}

run()
    .catch( ( err ) => {
        console.error( `[generate-og] ERROR: ${ err.message }` )
        process.exit( 1 )
    } )
