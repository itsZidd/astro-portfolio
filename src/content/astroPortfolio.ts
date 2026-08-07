export const astroPortfolioContent = {
    en: {
        eyebrow: "software · astro",
        pitch: "This site itself — a bilingual (English/Indonesian) portfolio built with Astro and hand-written CSS, no UI framework. Project write-ups double as case studies with their own tech-stack breakdowns and known-limitations sections, written the same honest way this one is. A /stats page tallies how often each technology shows up across every project and lets you click from any tag straight through to the projects that use it.",

        featureGroups: [
            {
                label: "Localization",
                items: [
                    "Parallel /en and /id route trees via Astro's built-in i18n routing, prefixDefaultLocale on",
                    "Hand-rolled translation dictionary (no i18next) plus per-project text overrides for locales that only need a tweak, not a full duplicate",
                    "Language switcher that remembers your choice in localStorage and bounces \"/\" to it on return visits",
                ],
            },
            {
                label: "Work showcase",
                items: [
                    "Project cards generated from a single typed data source, each with a tech-stack chip row using brand-matched icons",
                    "Full case-study pages per project — pitch, feature breakdown, tech stack, a written case study, and known limitations",
                ],
            },
            {
                label: "Tech stats",
                items: [
                    "/stats tallies every project's stack into a tag cloud sized and colored by how often each tech is used",
                    "Each tag links to a per-tech page (statically generated per slug) listing the projects that use it",
                ],
            },
        ],

        stackGroups: [
            {
                label: "Core",
                items: ["Astro", "TypeScript"],
            },
            {
                label: "Styling",
                items: [
                    "Hand-written CSS with custom-property design tokens — no Tailwind or component library",
                    "Big Shoulders / IBM Plex Sans / IBM Plex Mono for display, body, and mono type",
                ],
            },
            {
                label: "Icons",
                items: [
                    "simple-icons for brand marks, lucide-static for UI icons — both resolved by label at render time",
                ],
            },
            {
                label: "i18n",
                items: [
                    "Astro's built-in i18n routing plus a small custom key dictionary and per-project translation overrides",
                ],
            },
        ],

        studyTitle: "Case Study: Static Build vs. Runtime Icon Loading",
        story: [
            {
                label: "Design",
                body: "`Icon` and `TechIcon` resolve an SVG for any label at render time — `fs.readFileSync(new URL(\"../../node_modules/...\", import.meta.url))` — so a new tech label just needs an entry in a name-to-slug map, not a pre-bundled asset. Fast to extend, and it worked perfectly through the whole build-out in `astro dev`.",
            },
            {
                label: "What broke",
                body: "`astro dev` serves components straight from the source tree, so the relative `../../node_modules/...` path always resolves correctly. `astro build` doesn't: it bundles these components into chunk files under `dist/.prerender/chunks/`, and `import.meta.url` inside a bundled chunk points there instead of the original source location. The same relative traversal now lands on a `dist/node_modules` that doesn't exist, and the prerender step throws — for every page that renders an `Icon` or `TechIcon`, including ones that shipped before the stats page existed.",
            },
            {
                label: "Diagnosis",
                body: "Confirmed by temporarily removing the new stats pages and rebuilding: the pre-existing case-study page failed the exact same way, proving this wasn't something the stats feature introduced. Both `Icon` and `TechIcon` had the identical `../../node_modules/...` pattern, so both needed the same fix.",
            },
            {
                label: "Fix",
                body: "Swapped the manual relative-path construction for `createRequire(import.meta.url).resolve(\"lucide-static/icons/...\")` (and the same for `simple-icons`). Node's module resolution walks up parent directories looking for `node_modules` rather than jumping a fixed number of levels from wherever the current file happens to live, so it resolves correctly whether the component runs from `src/components` in dev or from a bundled chunk under `dist/.prerender/chunks` in a production build. Verified with a clean local `astro build` and confirmed on the live Vercel deployment.",
            },
        ],

        notes: [
            {
                title: "The content-repo indirection isn't wired up yet",
                body: "`src/lib/content.ts` can fetch project data from a separate content repo at build time, falling back to the local `src/data/projects.ts`. No page calls it yet — every page still imports the local data directly.",
            },
        ],
    },

    id: {
        eyebrow: "perangkat lunak · astro",
        pitch: "Situs ini sendiri — portofolio dwibahasa (Indonesia/Inggris) yang dibangun dengan Astro dan CSS tulisan tangan, tanpa framework UI. Setiap tulisan proyek sekaligus menjadi studi kasus, lengkap dengan rincian tumpukan teknologi dan bagian keterbatasan yang diketahui, ditulis dengan cara sejujur halaman ini sendiri. Halaman /stats menghitung seberapa sering setiap teknologi muncul di seluruh proyek, dan setiap tag bisa diklik langsung menuju proyek-proyek yang memakainya.",

        featureGroups: [
            {
                label: "Lokalisasi",
                items: [
                    "Struktur rute paralel /en dan /id lewat i18n routing bawaan Astro, dengan prefixDefaultLocale aktif",
                    "Kamus terjemahan buatan sendiri (bukan i18next), ditambah override teks per proyek untuk locale yang hanya butuh sedikit penyesuaian, bukan duplikasi penuh",
                    "Pengalih bahasa yang mengingat pilihanmu lewat localStorage dan mengarahkan \"/\" ke sana saat kunjungan berikutnya",
                ],
            },
            {
                label: "Etalase karya",
                items: [
                    "Kartu proyek dihasilkan dari satu sumber data bertipe, masing-masing dengan baris chip tumpukan teknologi berikon sesuai merek",
                    "Halaman studi kasus lengkap per proyek — pitch, rincian fitur, tumpukan teknologi, studi kasus tertulis, dan keterbatasan yang diketahui",
                ],
            },
            {
                label: "Statistik teknologi",
                items: [
                    "/stats menghitung tumpukan teknologi semua proyek menjadi tag cloud yang ukuran dan warnanya mengikuti frekuensi pemakaian",
                    "Setiap tag mengarah ke halaman per-teknologi (dihasilkan statis per slug) berisi daftar proyek yang memakainya",
                ],
            },
        ],

        stackGroups: [
            {
                label: "Inti",
                items: ["Astro", "TypeScript"],
            },
            {
                label: "Styling",
                items: [
                    "CSS tulisan tangan dengan design token custom-property — tanpa Tailwind atau library komponen",
                    "Big Shoulders / IBM Plex Sans / IBM Plex Mono untuk tipografi display, body, dan mono",
                ],
            },
            {
                label: "Ikon",
                items: [
                    "simple-icons untuk logo merek, lucide-static untuk ikon UI — keduanya di-resolve berdasarkan label saat render",
                ],
            },
            {
                label: "i18n",
                items: [
                    "i18n routing bawaan Astro ditambah kamus key kustom kecil dan override terjemahan per proyek",
                ],
            },
        ],

        studyTitle: "Studi Kasus: Build Statis vs. Pemuatan Ikon saat Runtime",
        story: [
            {
                label: "Desain",
                body: "`Icon` dan `TechIcon` me-resolve SVG untuk label apa pun saat render — `fs.readFileSync(new URL(\"../../node_modules/...\", import.meta.url))` — sehingga label teknologi baru cukup ditambahkan ke pemetaan nama-ke-slug, tanpa perlu aset yang di-bundle terlebih dahulu. Cepat untuk dikembangkan, dan berjalan sempurna sepanjang proses pembangunan situs ini di `astro dev`.",
            },
            {
                label: "Yang rusak",
                body: "`astro dev` menyajikan komponen langsung dari source tree, sehingga path relatif `../../node_modules/...` selalu ter-resolve dengan benar. `astro build` tidak begitu: komponen-komponen ini di-bundle ke dalam file chunk di `dist/.prerender/chunks/`, dan `import.meta.url` di dalam chunk yang sudah di-bundle menunjuk ke lokasi itu, bukan lokasi source aslinya. Penelusuran relatif yang sama kini berakhir di `dist/node_modules` yang tidak ada, dan tahap prerender pun gagal — untuk setiap halaman yang me-render `Icon` atau `TechIcon`, termasuk halaman yang sudah ada sebelum halaman statistik dibuat.",
            },
            {
                label: "Diagnosis",
                body: "Dikonfirmasi dengan menghapus sementara halaman statistik yang baru lalu build ulang: halaman studi kasus yang sudah ada sebelumnya gagal dengan cara yang persis sama, membuktikan ini bukan masalah yang muncul karena fitur statistik. Baik `Icon` maupun `TechIcon` memakai pola `../../node_modules/...` yang identik, sehingga keduanya butuh perbaikan yang sama.",
            },
            {
                label: "Perbaikan",
                body: "Konstruksi path relatif manual diganti dengan `createRequire(import.meta.url).resolve(\"lucide-static/icons/...\")` (begitu juga untuk `simple-icons`). Resolusi modul Node menelusuri ke atas mencari `node_modules`, bukan melompat sejumlah level tetap dari lokasi file saat ini — sehingga tetap ter-resolve dengan benar baik saat komponen berjalan dari `src/components` di dev maupun dari chunk hasil bundle di `dist/.prerender/chunks` saat build produksi. Diverifikasi dengan `astro build` lokal yang bersih dan dikonfirmasi pada deployment Vercel yang live.",
            },
        ],

        notes: [
            {
                title: "Indirection ke content repo belum tersambung",
                body: "`src/lib/content.ts` bisa mengambil data proyek dari repo konten terpisah saat build, dengan fallback ke `src/data/projects.ts` lokal. Belum ada halaman yang memanggilnya — semua halaman masih mengimpor data lokal secara langsung.",
            },
        ],
    },
} as const;
