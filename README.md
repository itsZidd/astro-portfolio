# 🌐 Astro Portfolio

![Astro](https://img.shields.io/badge/Astro_7.1-FF5D01?style=for-the-badge&logo=astro&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Hand-written CSS](https://img.shields.io/badge/Hand--written_CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![i18n EN/ID](https://img.shields.io/badge/i18n_EN%2FID-38B2AC?style=for-the-badge&logo=googletranslate&logoColor=white)
![Web3Forms](https://img.shields.io/badge/Web3Forms_Backend-000000?style=for-the-badge&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel_Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)

**Astro Portfolio** is my personal site — a bilingual (English/Indonesian) project showcase built with [Astro](https://astro.build) and hand-written CSS, with no UI framework or component library. Every project gets a full case-study page (pitch, feature breakdown, tech stack, a written engineering story, and known limitations), and a `/stats` page tallies which technologies show up across projects into a clickable tag cloud.

---

## 🚀 What's Built

Here is the complete feature list, grouped by area:

### 🏠 1. Bilingual Home & Navigation

- **Parallel locale routing** — mirrored `/en` and `/id` route trees via Astro's built-in i18n, with `hreflang` alternates and a `LanguageSwitcher` that remembers your choice in `localStorage`.
- **Hero section** — location/availability badges, CTA buttons, and a stat row (live project count and technology count computed from real data, not hardcoded).
- **Work grid with category filters** — projects filterable by `Software`, `GIS & Geospatial`, `AI / ML`, and `Game Dev`, with a project able to carry multiple categories at once.
- **Sticky header** with a mobile burger nav, and a copy-to-clipboard contact-email button.

### 📁 2. Shared Case-Study Layout

- **One `CaseStudyLayout.astro`** powers all five project pages (Prayer Time, Smart Prayer Times API & CLI, I-CARE Landslide, Astro Portfolio itself, and Sumz — AI Article Summarizer) instead of duplicating the same ~300-line shell per project.
- **Conditional sections** — a screenshot carousel, GitHub link, and download link only render when a project actually has them; a project with no screenshots simply skips that section entirely.
- **Mixed-orientation screenshot carousel** — landscape and portrait screenshots scroll side-by-side at a fixed height with glassmorphic nav buttons, lazy-load dimension handling, and automatic edge disabling.
- **Engineering-story blocks** — each case study includes an honest, specific write-up of real architectural decisions, bugs, and tradeoffs from building that project.
- **Loading skeletons & transitions** — `<ClientRouter />` powered instant page transitions with an emerald-to-amber progress bar and shimmering card skeletons.

### 📊 3. Tech Stats Explorer

- **`/stats` tag cloud** — tallies every project's `stack` array into a cloud of technology tags, sized and colored by how often each one appears (`src/lib/tech.ts`).
- **`/stats/[tech]`** — a per-technology page listing every project that uses it, generated from the same tally.
- **Brand-accurate icons** — tech names are matched against a `simple-icons` slug map (`src/lib/icons.ts`); labels with no matching brand logo (e.g. a one-off implementation note) render without a placeholder icon rather than a meaningless generic mark.

### 📝 4. Per-Project Feedback Survey

- **`/feedback`**, deep-linked from every case-study page with the project pre-selected via a `?project=` query param.
- **Structured input** — referral source, four star-rated categories (overall, design, performance, usefulness), a yes/maybe/no recommend toggle, and three free-text fields.
- **Static-site-friendly backend** — submits client-side straight to [Web3Forms](https://web3forms.com) (no server, since the site builds to static HTML), with a honeypot field for basic spam filtering and a graceful "not configured yet" message if no access key is set.
- **Bilingual** — every label, placeholder, and status message is pulled from the `en`/`id` dictionary in `src/i18n/ui.ts`.

---

## 🛠️ Tech Stack & Complete Tools Inventory

### 📦 Exhaustive Tools & Libraries Breakdown (Grouped by Role)

#### 1. Core Framework & Build Engine

| Package | Version | Purpose & Usage |
| :--- | :--- | :--- |
| **`astro`** | `^7.1.6` | Core framework — file-based routing, built-in i18n, static site generation |
| **`typescript`** | `^7.0.2` | Type safety across components, data models, and page logic |

#### 2. Styling & Iconography

| Package | Version | Purpose & Usage |
| :--- | :--- | :--- |
| Hand-written CSS | *Native* | `src/styles/global.css` — custom-property design tokens, no Tailwind or component library |
| **`lucide-static`** | `^1.28.0` | UI icons (`Icon.astro`), read from disk at build time via `createRequire().resolve` and inlined as SVG |
| **`simple-icons`** | `^16.28.0` | Brand/technology logos (`TechIcon.astro`) for tech-stack lists and the `/stats` tag cloud |

#### 3. Internationalization

| Technology | Integration | Purpose & Usage |
| :--- | :--- | :--- |
| Astro built-in i18n | `astro.config.mjs` | Locale routing for `en`/`id` with `prefixDefaultLocale`; `/` redirects to `/en/` since a static build can't detect browser language per-request |
| `src/i18n/` | *Custom dictionary* | `ui.ts` translation strings, `utils.ts` locale-path helpers, `projectsId.ts` per-project Indonesian overrides |

#### 4. Forms & Backend

| Technology | Integration | Purpose & Usage |
| :--- | :--- | :--- |
| **Web3Forms** | `HTTP REST API` | Client-side submission target for `/feedback` (`src/views/FeedbackView.astro`) — no server needed for a static build |

#### 5. Hosting & Deployment

| Package | Version | Purpose & Usage |
| :--- | :--- | :--- |
| **Vercel** | *Static deploy* | Hosts the production build (`astro build` output) |

---

## 📖 Engineering Notes

### 💬 1. The Icon Bug That Only Broke on Vercel

`Icon.astro` and `TechIcon.astro` need to read raw SVG files out of `lucide-static`/`simple-icons` at build time. The first version located them with a hardcoded `../../node_modules` offset from `import.meta.url` — and it worked fine locally, because in dev the component runs from its actual `src/components/` source location.

Astro's production build doesn't run components from source, though — it bundles them into chunks under `dist/.prerender/chunks/`. The same relative offset that pointed at `node_modules` from `src/components/` instead resolved to a `dist/node_modules` path that never existed, throwing `ENOENT` during prerendering — a failure that only showed up on Vercel, never in local dev. The fix was to stop hardcoding a path depth at all: `createRequire(import.meta.url).resolve(...)` walks up from wherever the compiled chunk actually lives until it finds the real `node_modules`, so it resolves correctly regardless of the build output layout.

### 🧩 2. One Shared Layout Instead of Four Duplicated Shells

Each project's case-study page originally hand-rolled its own ~300-line layout — hero, feature grid, tech stack, story section, limitations, all copy-pasted per project with small variations. Adding I-CARE Landslide as a fourth project meant either copy-pasting a fifth time or finally extracting the shared shape.

`CaseStudyLayout.astro` now takes typed props (`featureGroups`, `stackGroups`, `story`, `notes`, optional `screenshots` and `links`) and every project view just supplies its own content. Optional sections are genuinely optional at the template level — a project with no screenshots or no download link doesn't render an empty section, it renders nothing, because the props themselves are undefined rather than empty placeholders.

### 🖼️ 3. Fixing the Mixed-Orientation Screenshot Carousel

I-CARE Landslide's screenshots mix landscape UI captures with portrait mobile-menu shots. The first carousel implementation sized every image to a fixed box, which stretched portrait screenshots into the same aspect ratio as landscape ones, leaving visible dead space around the shorter images.

The fix constrains the carousel by a fixed **height** (`.shot { height: 400px }`) instead of a fixed width, letting each image's native aspect ratio determine its own width (`width: auto`) while they all sit at a consistent height in a horizontally scrolling flex row with `scroll-snap-type: x mandatory`. Prev/next buttons compute `scrollWidth - clientWidth` on scroll to disable themselves at each edge instead of relying on a fixed slide count.

---

## ⚠️ Known Limitations

1. **Content-repo fetch is dead code**:
   - `src/lib/content.ts` implements fetching project data from a separate GitHub content repo at build time (with local-fallback validation), but no page actually imports it yet — every page still reads `src/data/projects.ts` directly.
2. **Feedback form needs a key to actually send**:
   - Without `PUBLIC_WEB3FORMS_KEY` set, `/feedback` renders fully but shows a "not configured yet" message on submit instead of failing silently or breaking the build.
3. **Locale can't be auto-detected**:
   - Because the site is a static build, `/` always resolves to English on first visit — there's no per-request `Accept-Language` negotiation. The switcher's choice is only remembered via `localStorage` on repeat visits.
4. **Screenshots are per-project, not universal**:
   - Only projects with a captured screenshot set (I-CARE Landslide, Prayer Time) render the case-study carousel section; others simply omit it.

---

## ⚙️ Environment Variables Configuration (`.env`)

Copy `.env.example` to `.env` and fill in what you need — the site builds successfully with none of these set, falling back to local placeholder data and an unconfigured feedback form:

```env
# Optional: fetch project data from a separate content repo instead of
# the local src/data/projects.ts (currently unused by any page — see
# Known Limitations).
CONTENT_GITHUB_USER=your-github-username
CONTENT_GITHUB_REPO=portfolio-content
CONTENT_GITHUB_BRANCH=main
CONTENT_GITHUB_PATH=projects.json

# Feedback form (src/views/FeedbackView.astro) posts to Web3Forms.
# Get a free access key at https://web3forms.com (just enter an email,
# no account required). Must be prefixed PUBLIC_ so Astro exposes it
# to the client-side submit script.
PUBLIC_WEB3FORMS_KEY=
```

---

## 🚀 Local Setup & Deployment

```bash
# 1. Install dependencies
npm install

# 2. Start local development server (localhost:4321)
npm run dev

# 3. Build the production site to ./dist/
npm run build

# 4. Preview the production build locally
npm run preview
```

| Command | Action |
| :--- | :--- |
| `npm run dev` | Start local dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run astro ...` | Run any Astro CLI command |

To deploy to **Vercel**:

1. Connect the repository to **Vercel**.
2. (Optional) Add the environment variables listed above in **Project Settings ➔ Environment Variables**.
3. Deploy!

---

## 📁 Project Structure

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

---

## 📝 Changelog

See [CHANGELOG.md](./CHANGELOG.md) for the full history of releases, fixes, and changes.
