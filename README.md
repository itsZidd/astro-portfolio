# Astro Portfolio

My personal site — a bilingual (English/Indonesian) project showcase built with [Astro](https://astro.build) and hand-written CSS, no UI framework. Each project gets a full case-study page, and a `/stats` page tallies which tech shows up across projects as a clickable tag cloud.

Live at: not yet deployed — see [Known Issues](#known-issues).

## Features

- **Bilingual routing** — parallel `/en` and `/id` route trees via Astro's built-in i18n, with a language switcher that remembers your choice
- **Project case studies** — pitch, feature breakdown, tech stack, a written case study, and known limitations per project
- **Tech stats** — `/stats` tallies every project's stack into a tag cloud sized by usage; each tag links to a page listing the projects that use it

## Stack

- [Astro](https://astro.build) + TypeScript
- Hand-written CSS with custom-property design tokens (no Tailwind/component library)
- [simple-icons](https://simpleicons.org/) for brand marks, [lucide-static](https://lucide.dev/) for UI icons

## Project structure

```
src/
├── pages/en, pages/id   # routes per locale (mirrored 1:1)
├── views/                # page bodies, one per route, imported by both locale pages
├── components/           # Layout, CaseStudyLayout, Icon, TechIcon, LanguageSwitcher, ContourField
├── data/projects.ts      # canonical project data (single source of truth)
├── content/              # long-form per-project case-study copy
├── i18n/                 # ui.ts dictionary, routing utils, per-project translation overrides
├── lib/                  # tech.ts (stats tallying), icons.ts (tech-logo matching), content.ts (unused content-repo fetch)
└── styles/global.css     # design tokens and base styles
```

Project case-study pages (`views/*View.astro`) share a single `components/CaseStudyLayout.astro` — each view just supplies its content (pitch, feature/tech groups, links, optional screenshots) and the layout handles the shared shell, styling, and conditional sections (a project with no screenshots or download link simply doesn't pass those props).

## Development

```bash
npm install
npm run dev
```

| Command           | Action                                       |
| :----------------- | :-------------------------------------------- |
| `npm run dev`       | Start local dev server at `localhost:4321`   |
| `npm run build`     | Build production site to `./dist/`           |
| `npm run preview`   | Preview the production build locally         |
| `npm run astro ...` | Run any Astro CLI command                    |

## Known issues

- `src/lib/content.ts` (fetching project data from a separate content repo at build time) exists but isn't wired into any page yet — every page still imports `src/data/projects.ts` directly.

## Documentation

Full Astro documentation: https://docs.astro.build
