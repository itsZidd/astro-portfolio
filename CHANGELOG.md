# Changelog

All notable changes to this project are documented here.
Format loosely follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

## 2026-09-04 (v0.3.0)

### Added

- **Responsive Image Lightbox & Pan-Zoom Modal**: Added `<ImageLightbox />` for all project screenshot galleries with 1x/2.2x zoom toggle, double-tap/double-click zoom, touch swipe navigation, pull-to-dismiss gesture, pinch-to-zoom, keyboard controls (Esc, Arrow keys, + / -), drag panning, and responsive mobile touch support.

### Changed

- **Indonesian Copy Terminology**: Replaced all instances of "Studi Kasus" with "Sorotan Teknis" across UI buttons (`work.details`), project summaries, narrative engineering case-study titles, and content documentation.

### Fixed

- **Portrait & Small Screenshot Container Sizing**: Removed hardcoded `aspect-ratio: 16 / 10` that forced portrait and narrow screenshots into oversized landscape boxes with dead black background space; `.shot` containers now dynamically adapt their width to the intrinsic dimensions of loaded images while keeping a clean shimmer skeleton during pre-load.

## 2026-09-03 (v0.2.0)

### Added

- **Sumz — AI Article Summarizer** project: full case-study page (`/work/sumz`), bilingual (en/id) content, screenshot gallery (4 optimized images), and tech-tag stats mapping
- **Redesigned What's Built Showcase**: Replaced generic card lists with dedicated feature cards (`.features-grid` / `.feature-card`) featuring dynamic numeric index badges (`01`, `02`), top accent gradient lines, interactive chevron bullets, and elevated hover states to eliminate visual monotony against the tech stack section
- **Universal Loading Skeletons & Transitions**: `<ClientRouter />` SPA transitions with an emerald-amber top progress bar indicator (`#page-progress`) and animated shimmer skeleton loaders for cards and media
- **Content & Localization Guidelines**: `docs/content-template.md` documenting the structure, schema, and English vs. Indonesian editorial guidelines (rich contextual explanations in Indonesian, with all English/foreign loanwords in italics)
- **Inline Italic & Code Parser**: `inlineFormat` utility in `CaseStudyLayout` and `HomeView` allowing markdown `*term*` and `backticks` across pitches, features, story blocks, and limitation notes
- Icon slugs for `Next.js` (`nextdotjs`) and `OpenAI` (`openai`) in `src/lib/icons.ts`

### Changed

- Re-compressed Sumz screenshot gallery with Lanczos3 scaling down to 1440px and PNG palette optimization, reducing image payload by 88% (~5.8 MB down to ~678 KB)
- Polished carousel navigation buttons with dark glassmorphism (`backdrop-filter: blur(14px)`, `rgba(18, 20, 17, 0.88)` background, border glow) for high-contrast visibility across light and dark screenshots
- All client-side scripts (`HomeView`, `FeedbackView`, `LanguageSwitcher`, `CaseStudyLayout`) now hook to `astro:page-load` for continuous interactivity across client routing

### Fixed

- Carousel navigation buttons remaining hidden on initial page load — images with `loading="lazy"` hadn't reported dimensions before `updateButtons()` computed scroll boundaries; resolved via fixed aspect ratio placeholders (`min-width: 280px; aspect-ratio: 16/10;`), `ResizeObserver`, and image `load` event listeners

## 2026-08-11

### Added

- I-CARE Landslide project: case-study page, content, and EN/ID translations; `Project.category` now accepts an array of categories, plus a `date` field
- Homepage redesign: hero location/availability badges and CTA buttons, a stat row (live project/technology counts), work-section category filters, a copy-email contact button, and a sticky header with mobile burger nav
- I-CARE Landslide case-study screenshot gallery (9 optimized images)
- Per-project feedback survey at `/feedback`: referral source, four star-rated categories, a recommend toggle, and free-text impressions, deep-linked from every case-study page with the project pre-selected; submits client-side to [Web3Forms](https://web3forms.com) since the site builds to static HTML, with a honeypot field and a "not configured yet" fallback when no access key is set; bilingual (en/id)

### Changed

- Case-study pages (Prayer Time, Python Prayer Time, Astro Portfolio, I-CARE Landslide) now share a single `components/CaseStudyLayout.astro` instead of duplicating the same ~300-line shell each — a project's download link, GitHub link, and screenshot carousel only render when that project actually has them
- The homepage's "Technologies" stat is now computed from `getTechCounts()` instead of a hardcoded number
- Tech-stack icons in case studies now only render for a matched brand logo — descriptive stack entries (e.g. a one-off implementation note) no longer get a meaningless placeholder icon
- Stats and per-technology pages restyled to match the new design language
- Background contour field now redraws on container resize instead of only on load
- Shared screenshot carousel now sizes slides by a fixed height instead of a fixed box, so landscape and portrait screenshots keep their native aspect ratio instead of stretching into mismatched boxes with dead space
- Enlarged the shared `.btn` text/padding so labels no longer look small relative to the button
- Updated the contact email

### Fixed

- Known Limitations card titles were rendering in the body-text color instead of green — `.notes__item p` unintentionally outranked `.notes__title` in CSS specificity

## 2026-08-07

### Added

- Bilingual (`/en`, `/id`) site structure: home page, language switcher with persisted preference, hreflang alternates
- Prayer Time project case study — pitch, feature breakdown, tech stack, technical case study, known limitations
- `/stats` tech explorer: a tag cloud tallying every project's stack, sized and colored by usage frequency, with a per-technology page (`/stats/[tech]`) listing the projects that use it
- "Astro Portfolio" listed as a project on its own site, with a case study covering the site's own architecture and the `Icon`/`TechIcon` build-time bug found while shipping the stats page
- Smart Prayer Times API & CLI project, with its own case-study page
- `Astro`, `FastAPI`, `pytest`, and `Vercel` added to `TechIcon`'s brand-logo map — all have `simple-icons` marks but weren't wired up, so they rendered blank
- Public GitHub repo (`itsZidd/astro-portfolio`) created and pushed

### Changed

- Astro Portfolio's case study updated to document the actual fix for the icon-resolution bug (`createRequire().resolve` instead of relative `node_modules` paths) now that it had shipped, replacing the earlier "currently broken" description
- Astro Portfolio's project status flipped from `wip` to `live` now that the Vercel build was fixed and deploying successfully

### Fixed

- Icon SVG resolution breaking on Vercel builds — `Icon.astro` and `TechIcon.astro` located `lucide-static`/`simple-icons` SVGs via a hardcoded `../../node_modules` relative offset from `import.meta.url`, which only holds when the file runs from its `src/components` source location; Astro's build bundles these into `dist/.prerender/chunks`, so the same offset resolved to a nonexistent `dist/node_modules` path and threw `ENOENT` during prerendering. Resolved via `createRequire(...).resolve` instead, which walks up to find the real `node_modules` regardless of where the compiled chunk lives
- Tech-list alignment for icon-less labels (e.g. "Remote sensing") — `TechIcon` renders no DOM node at all when a label has no brand match, so flex/grid auto-placement collapsed the missing icon column instead of leaving it blank; the icon slot is now wrapped in a fixed-width span so it always reserves its column

## 2026-08-04

### Added

- Initial project scaffold from `npm create astro`
