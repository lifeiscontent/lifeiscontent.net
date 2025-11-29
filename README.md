# lifeiscontent.net

An Astro-powered narrative studio site pairing long-form writing with a purposeful component system. Everything is static-first, accessible, and tuned for GitHub Pages.

## Highlights

- Astro 5 static output with islands only when interaction is required
- Typed content collections + MDX for structured blog postings, definitions, and authors
- Tailwind CSS v4 design system shared across components, layouts, and prose
- RSS feed, sitemap, and canonical metadata for every page
- Progressive Web App manifest for install prompts and metadata
- Deterministic OpenGraph images via `astro-og-canvas`
- GitHub Pages workflow with pnpm caching and artifact deployments

## Tech Stack

| Concern   | Tooling                                                 |
| --------- | ------------------------------------------------------- |
| Framework | Astro 5 + TypeScript                                    |
| Styling   | Tailwind CSS v4 via `@tailwindcss/vite`                 |
| Content   | Astro Content Collections, MDX, structured data helpers |
| Tooling   | pnpm, ESLint, Prettier, Vitest, Astro Check             |
| Hosting   | GitHub Pages (static `dist/`)                           |

## Getting Started

```bash
git clone https://github.com/lifeiscontent/lifeiscontent.net.git
cd lifeiscontent.net
pnpm install
pnpm dev
```

Visit `http://localhost:4321` during development.

## Scripts

| Command             | Purpose                                             |
| ------------------- | --------------------------------------------------- |
| `pnpm dev`          | Run the Astro dev server                            |
| `pnpm build`        | Create the production site in `dist/`               |
| `pnpm preview`      | Preview `dist/` locally                             |
| `pnpm test`         | Execute Vitest (Happy DOM)                          |
| `pnpm check`        | Run all `check:*` scripts in parallel               |
| `pnpm check:astro`  | Execute `astro check` for content + template safety |
| `pnpm check:lint`   | Run ESLint (no fixes)                               |
| `pnpm check:format` | Verify formatting via Prettier `--check`            |
| `pnpm fix`          | Run every `fix:*` script in parallel                |
| `pnpm fix:lint`     | Apply ESLint fixes                                  |
| `pnpm fix:format`   | Format files with Prettier                          |
| `pnpm clean`        | Remove `.astro/` artifacts and `dist/`              |

## Writing Content

Blog postings live in `src/content/blog-postings/` as MDX. Each entry follows the schema defined in `src/content.config.ts` and is validated at build time.

```mdx
---
'@type': 'BlogPosting'
headline: 'Purposeful Stories for Thoughtful Builders'
description: 'How I blend engineering, design, and content systems.'
abstract: 'Treat interfaces as narratives.'
datePublished: '2025-01-15'
dateModified: '2025-01-20'
keywords:
  - astro
  - systems
  - design
---

Your MDX goes here.
```

Other collections (authors, defined terms, sites) follow the same pattern. Invalid entries cause `pnpm check` or `pnpm build` to fail, ensuring content stays consistent.

## Layout & Components

- `src/components/ui/`: Card, badge, button, prose helpers, etc.
- `src/components/layouts/`: Header, footer, grid, stack, and section wrappers.
- `src/components/mdx/`: Overrides for MDX elements like links and code blocks.
- `src/styles/globals.css`: Base typography, tokens, and Tailwind layers.

## Configuration Touchpoints

- `astro.config.mjs`: Integrations (Tailwind, sitemap, mdx), redirects, site metadata.
- `src/content.config.ts`: Content schemas and collection types.
- `public/`: CNAME, manifest, favicons, static exports for select posts.
- `src/pages/open-graph/[...route].ts`: Renders OG cards using site metadata, icon, and `astro-og-canvas`.

## Project Structure

```
src/
├── components/
├── content/
├── layouts/
├── lib/
├── pages/
├── styles/
└── types/
public/
├── CNAME
├── manifest.webmanifest
└── *.html    # legacy exports
```

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`) handles CI/CD:

1.  `pnpm install` with pnpm store caching
2.  `pnpm build` to produce `dist/`
3.  Upload `dist/` as the GitHub Pages artifact
4.  Deploy via `actions/deploy-pages`

To deploy manually, run `pnpm build` and host the resulting `dist/` directory on any static host.

## Testing & Quality

- `pnpm test`: Vitest + Happy DOM (configured in `test/setup.ts`)
- `pnpm check:lint`: ESLint with TypeScript + Astro rules
- `pnpm check`: Runs the full parallel suite (Astro check + lint + formatting)

## Author

- Website: [lifeiscontent.net](https://lifeiscontent.net)
- GitHub: [@lifeiscontent](https://github.com/lifeiscontent)
- Email: [aaron@lifeiscontent.net](mailto:aaron@lifeiscontent.net)

## License

MIT © Aaron Reisman. See `LICENSE` for details.
