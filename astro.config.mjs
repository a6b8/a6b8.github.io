// @ts-check
import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import { SidebarLoader } from './src/data/sidebar.mjs'

// The Specification sidebar is built from the spec manifest synced by
// scripts/sync-spec.mjs (src/data/manifest.json). SidebarLoader falls back to an
// empty Specification group if the manifest is missing (cold start), so the build
// never hard-fails before the first sync.
const sidebarData = SidebarLoader.buildSidebar()
const shortVersion = ( version ) => version.replace( /\.0$/, '' )
const specBadge = { text: `v${ shortVersion( sidebarData.specVersion ) }`, variant: 'note' }

export default defineConfig({
    site: 'https://a6b8.github.io',
    integrations: [
        starlight({
            title: 'Personal Brand',
            sidebar: [
                { label: 'Docs', autogenerate: { directory: 'docs' } },
                {
                    label: 'Specification',
                    collapsed: false,
                    badge: specBadge,
                    items: sidebarData.specItems
                },
                { label: 'Blog', link: '/blog/' }
            ]
        })
    ]
})
