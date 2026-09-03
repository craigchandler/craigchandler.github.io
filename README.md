# Craig Chandler — Portfolio

A static professional portfolio for Craig Chandler, focused on solution architecture, software architecture, cloud architecture, and decision intelligence.

## Stack

- [Astro](https://astro.build/) with TypeScript
- Reusable Astro components and modern CSS
- Static output with no client-side framework or backend
- GitHub Pages deployment via GitHub Actions

## Local development

Requires Node.js 22.19 or newer.

```bash
npm install
npm run dev
```

The local site runs at `http://localhost:4321` by default.

## Validation and production build

```bash
npm run check
npm run build
npm run preview
```

Production files are generated in `dist/`.

## Content structure

```text
src/
├── components/       Reusable page and system-diagram components
├── content/          Structured case-study data
├── layouts/          Shared metadata and page shell
├── pages/            Homepage and /work/[slug] routes
└── styles/           Global design system and responsive styles
public/
├── assets/           Optimised static images and social preview
└── CNAME             Custom-domain configuration
```

Featured work is defined in `src/content/work.ts`. Adding a work item there generates its case-study route at build time.

## Deployment

Pushing `master` runs `.github/workflows/deploy.yml`, builds the Astro site, and deploys `dist/` to GitHub Pages. The custom domain remains `craigchandler.xyz` through `public/CNAME`.

In the repository Pages settings, the source should be set to **GitHub Actions** rather than “Deploy from a branch”.
