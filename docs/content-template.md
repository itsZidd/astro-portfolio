# Portfolio Content & Case Study Template

This guide defines the structure, schema, and localization philosophy for creating and updating project case studies in this portfolio.

---

## 🌐 Localization Philosophy: English vs. Indonesian

When writing case studies for this portfolio, follow this core principle:

### 🇬🇧 English (`en`)
* **Tone**: Crisp, concise, direct, and technical.
* **Style**: Focused on engineering specifics, architectural decisions, and verifiable metrics. High information density with minimal fluff.

### 🇮🇩 Indonesian (`id`) — *Not 1-to-1 Translation*
* **Tone**: Thorough, contextual, natural, and descriptive.
* **Style**: **Do NOT translate 1-to-1 or use rigid machine translation.**
  * English technical jargon often loses nuance or sounds unnatural when literally translated.
  * In Indonesian, it is encouraged to use **more words, richer paragraphs, and deeper contextual explanations**.
  * Elaborate on the background problems, why specific decisions were made, and how components interact.

### ✍️ Indonesian Typography Rule: English Words in Italics (*Italicized*)
Following standard Indonesian editorial conventions (PUEBI/EYD), **all English terms, technical loanwords, and foreign phrases appearing in Indonesian text MUST be written in italics** (using `*term*` or `<em>term</em>`).
* **Technical Terms to Italicize**:
  * `*server-side*`, `*client-side*`, `*offline-first*`, `*single-page application*`, `*route handler*`
  * `*rate limiting*`, `*crawler*`, `*scraper*`, `*pipeline*`, `*fallback*`, `*endpoint*`, `*prompt*`
  * `*in-memory*`, `*headless browser*`, `*token bucket*`, `*DNS rebinding*`
* **Proper Nouns & Brand Names**:
  * Product/tool brand names (e.g. Next.js, React, Google Gemini, Vercel, TailwindCSS) stay in standard text without italics.
  * Descriptive English phrases attached to brands should be italicized (e.g., *tier gratis* Google Gemini, *route handler* Next.js).

---

## 📁 File Structure for Adding a Project

Every project added to the portfolio touches these 5 locations:

1. **`src/data/projects.ts`** — Global project registry & English fallback card text.
2. **`src/i18n/projectsId.ts`** — Localized Indonesian card summary and category labels.
3. **`src/content/{projectSlug}.ts`** — Full bilingual case study content (pitch, features, stack, narrative story, limitations, screenshots).
4. **`src/views/{ProjectName}View.astro`** — Presentation view rendering `<CaseStudyLayout>`.
5. **`src/pages/{en|id}/work/{projectSlug}.astro`** — Localized static page entrypoints.

---

## 📑 Content File Schema (`src/content/{slug}.ts`)

```typescript
export const myProjectContent = {
    en: {
        eyebrow: "software · next.js · ai / ml",
        pitch: "Concise 2–3 sentence overview in English focusing on what the app does, key technologies used, and the primary engineering accomplishment.",

        featureGroups: [
            {
                label: "Core Pipeline / Engine",
                items: [
                    "Direct bullet point highlighting verifiable functionality...",
                    "Specific details (e.g. algorithms, libraries, APIs used)...",
                ],
            },
            {
                label: "Security & Hardening",
                items: [
                    "Bullet points detailing guardrails, rate limiting, validation...",
                ],
            },
            {
                label: "User Interface & Experience",
                items: [
                    "Key UI/UX features, themes, persistence, offline storage...",
                ],
            },
        ],

        stackGroups: [
            {
                label: "Core Framework & Runtime",
                items: ["Next.js", "React", "TypeScript"],
            },
            {
                label: "Styling & UI",
                items: ["TailwindCSS", "Lucide React"],
            },
            {
                label: "AI / Data Layer",
                items: ["Google Gemini", "SQLite"],
            },
            {
                label: "Deployment",
                items: ["Vercel"],
            },
        ],

        studyTitle: "Case Study: {Problem or Engineering Evolution Title}",
        story: [
            {
                label: "1. Origins & Initial Problem",
                body: "Background on why the project started, initial constraints, or early iterations (use `backticks` for code/libraries).",
            },
            {
                label: "2. The Breaking Point or Challenge",
                body: "What failed, what bottlenecks appeared, or why naive approaches didn't work.",
            },
            {
                label: "3. Architectural Rebuild / Solution",
                body: "How the problem was solved, concrete architectural shifts, and technical decisions made.",
            },
            {
                label: "4. Verification & Hardening",
                body: "How the solution was validated, edge cases handled, and defensive layers added.",
            },
        ],

        notes: [
            {
                title: "Known Limitation 1",
                body: "Honest description of current constraints, performance boundaries, or missing integrations.",
            },
            {
                title: "Known Limitation 2",
                body: "Technical trade-offs accepted by design rather than hidden.",
            },
        ],

        // Optional: required if screenshotOrder is used
        screenshotAlts: {
            "screen-1": "Descriptive alt text for screen 1 in English",
            "screen-2": "Descriptive alt text for screen 2 in English",
        },
    },

    id: {
        eyebrow: "perangkat lunak · next.js · ai / ml",
        pitch: "Penjelasan mendalam dan mengalir dalam bahasa Indonesia. Jangan menerjemahkan kata-per-kata dari bahasa Inggris. Jelaskan konteks masalah, tujuan pembuatan aplikasi, teknologi utama yang diintegrasikan, serta nilai manfaat teknis dari sistem yang dibangun dengan kalimat yang lengkap dan komprehensif.",

        featureGroups: [
            {
                label: "Alur Sistem & Ekstraksi Data",
                items: [
                    "Poin fitur dengan penjelasan yang utuh dan jelas maknanya dalam bahasa Indonesia...",
                    "Menjelaskan mekanisme kerja di balik layar secara transparan...",
                ],
            },
            {
                label: "Keamanan & Pembatasan Akses",
                items: [
                    "Detail proteksi, penanganan kesalahan, dan pembatasan beban...",
                ],
            },
            {
                label: "Antarmuka & Pengalaman Pengguna",
                items: [
                    "Fitur responsif, kenyamanan akses, dan persistensi lokal...",
                ],
            },
        ],

        stackGroups: [
            {
                label: "Kerangka Utama & Lingkungan Eksekusi",
                items: ["Next.js", "React", "TypeScript"],
            },
            {
                label: "Tampilan & Gaya",
                items: ["TailwindCSS", "Lucide React"],
            },
            {
                label: "Lapisan AI & Basis Data",
                items: ["Google Gemini", "SQLite"],
            },
            {
                label: "Deployment & Infrastruktur",
                items: ["Vercel"],
            },
        ],

        studyTitle: "Studi Kasus: {Judul Masalah atau Transformasi Arsitektur}",
        story: [
            {
                label: "1. Latar Belakang & Eksperimen Awal",
                body: "Cerita lengkap mengenai awal mula proyek, motivasi, serta batasan teknologi yang dihadapi saat pertama kali dibuat.",
            },
            {
                label: "2. Titik Kritis & Keterbatasan Pendekatan Lama",
                body: "Penjelasan mendalam mengenai mengapa solusi awal gagal atau rapuh di lingkungan produksi.",
            },
            {
                label: "3. Pembangunan Ulang Arsitektur & Keputusan Desain",
                body: "Langkah-langkah restrukturisasi sistem, alasan pemilihan teknologi baru, dan bagaimana pipeline baru bekerja.",
            },
            {
                label: "4. Pengujian & Proteksi Keamanan Defensif",
                body: "Uraian menyeluruh mengenai mitigasi celah keamanan, penanganan kasus ekstrem (edge cases), dan pengujian sistem.",
            },
        ],

        notes: [
            {
                title: "Batasan Sistem 1",
                body: "Penjelasan jujur mengenai batas ruang lingkup sistem saat ini dan alasan mengapa batasan tersebut dipilih.",
            },
            {
                title: "Batasan Sistem 2",
                body: "Kompromi teknis yang disengaja demi menjaga efisiensi sumber daya.",
            },
        ],

        screenshotAlts: {
            "screen-1": "Deskripsi visual yang jelas untuk tangkapan layar 1 dalam bahasa Indonesia",
            "screen-2": "Deskripsi visual yang jelas untuk tangkapan layar 2 dalam bahasa Indonesia",
        },
    },
} as const;

export const myProjectScreenshotOrder = [
    "screen-1",
    "screen-2",
] as const;
```

---

## 🏷️ Card Summary & Tag Guidelines

### `src/data/projects.ts` (English Entry)
* `slug`: Short kebab-case identifier (e.g. `"sumz"`).
* `file`: Developer-style pseudo filename (e.g. `"sumz.tsx"`, `"prayer_time.apk"`, `"icare_landslide.svelte"`).
* `title`: Clear project title (e.g. `"Sumz — AI Article Summarizer"`).
* `category`: One or array of `"Software" | "GIS & Geospatial" | "AI / ML" | "Game Dev"`.
* `date`: `"Month Year"` or `"Month Year · Month Year rev"` (e.g. `"Jul 2023 · Sep 2026 rev"`).
* `summary`: 1–2 punchy sentences.

### `src/i18n/projectsId.ts` (Indonesian Override)
* Override the `summary` with a natural, complete Indonesian summary paragraph explaining the essence and value of the project.

---

## 🖼️ Media & Screenshot Optimization

Before placing PNG screenshots in `public/work/{slug}/`:
1. Name screenshots descriptively: `{slug}-{feature}-{theme}.png` (e.g. `sumz-home-dark.png`).
2. Optimize/downscale images to max width **1440px** using `sharp` or PNG palette optimization to keep file sizes under ~200KB per image while preserving 2x Retina clarity.
