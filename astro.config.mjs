// @ts-check
import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'

export default defineConfig({
    site: 'https://a6b8.github.io',
    integrations: [
        starlight({
            title: 'Personal Brand',
            sidebar: [
                { label: 'Docs', autogenerate: { directory: 'docs' } },
                { label: 'Blog', link: '/blog/' }
            ]
        })
    ]
})
