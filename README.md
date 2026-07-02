# Personal Brand — a6b8.github.io

Personal website built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build):
an interactive landing page, a Docs section, a living Specification, and a Blog (with RSS). Dark-only,
with a warm Amber/Gold accent.

## Sections

| Section | Path | Notes |
|---------|------|-------|
| Landing | `/` | Bespoke **Aurora Spotlight** hero — a compositor-only, cursor-reactive gradient that self-gates on weak hardware and idles at 0 % CPU at rest. |
| Docs | `/docs/overview/` | Guides and reference. Build-time Mermaid diagrams (click to zoom) and a "Copy as Markdown" button on every page. |
| Specification | `/specification/overview/` | The living spec, synced from the `a6b8-spec` repo at build time. |
| Blog | `/blog/` | Posts with a featured card, tag filters, reading progress, and an RSS feed. |

## Develop

```bash
npm install       # install pinned dependencies
npm run dev       # local dev server (Astro)
npm run build     # full production build -> dist/
npm run preview   # preview the built site
```

The build chain runs the content generators (spec sync, refs, markdown-map, `llms.txt`, `robots.txt`,
pagefind section meta) before `astro build`. Build-time Mermaid rendering needs a headless Chromium —
locally it uses your Playwright browser; in CI the deploy workflow installs it.

## Asset generators

```bash
npm run favicons        # regenerate favicons from src/assets/logo-square.svg
npm run generate-og     # regenerate public/og-default.png (social card)
```

## Deploy

Static site deployed to GitHub Pages via `.github/workflows/deploy.yml` on push to `main`.

## License

MIT
