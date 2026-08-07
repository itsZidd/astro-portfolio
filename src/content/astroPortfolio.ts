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
                label: "Decision",
                body: "Confirmed by temporarily removing the new stats pages and rebuilding: the pre-existing case-study page failed the exact same way, proving this wasn't something the stats feature introduced. Rather than rewrite two shared components under time pressure while shipping an unrelated feature, the bug is called out here plainly instead of silently worked around — the fix (swapping the runtime `fs.readFileSync` calls for a Vite `import.meta.glob` icon map, which resolves correctly in both dev and build) is scoped and ready to pick up separately.",
            },
        ],

        notes: [
            {
                title: "Production build is currently broken",
                body: "`astro build` throws on any page using `Icon` or `TechIcon` — see the case study above. `astro dev` is unaffected, which is how this shipped without the break being obvious immediately.",
            },
            {
                title: "Only two projects logged so far",
                body: "The /stats tag cloud and per-tech pages work correctly with one project, but they're built to get more useful as more projects are added — right now there just isn't much to size against.",
            },
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
                label: "Keputusan",
                body: "Dikonfirmasi dengan menghapus sementara halaman statistik yang baru lalu build ulang: halaman studi kasus yang sudah ada sebelumnya gagal dengan cara yang persis sama, membuktikan ini bukan masalah yang muncul karena fitur statistik. Daripada menulis ulang dua komponen bersama secara terburu-buru di tengah pengiriman fitur yang tidak terkait, bug ini dijelaskan secara terbuka di sini, bukan disembunyikan dengan solusi sementara — perbaikannya (mengganti pemanggilan `fs.readFileSync` saat runtime dengan peta ikon `import.meta.glob` milik Vite, yang ter-resolve dengan benar baik di dev maupun build) sudah terpetakan dan siap dikerjakan terpisah.",
            },
        ],

        notes: [
            {
                title: "Build produksi saat ini masih gagal",
                body: "`astro build` gagal pada halaman mana pun yang memakai `Icon` atau `TechIcon` — lihat studi kasus di atas. `astro dev` tidak terpengaruh, itulah sebabnya masalah ini bisa lolos tanpa langsung terlihat.",
            },
            {
                title: "Baru dua proyek yang tercatat",
                body: "Tag cloud dan halaman per-teknologi di /stats sudah berfungsi dengan satu proyek, tapi dirancang untuk makin berguna seiring bertambahnya proyek — saat ini memang belum banyak yang bisa dibandingkan.",
            },
            {
                title: "Indirection ke content repo belum tersambung",
                body: "`src/lib/content.ts` bisa mengambil data proyek dari repo konten terpisah saat build, dengan fallback ke `src/data/projects.ts` lokal. Belum ada halaman yang memanggilnya — semua halaman masih mengimpor data lokal secara langsung.",
            },
        ],
    },
} as const;
