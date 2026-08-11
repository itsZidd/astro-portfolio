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
        pitch: "Situs ini sendiri merupakan sebuah portofolio pribadi dwibahasa (Indonesia/Inggris) yang dirancang dan dibangun dari awal menggunakan Astro dan CSS murni tanpa menggunakan UI framework atau pustaka komponen pihak ketiga. Setiap proyek yang ditampilkan dikemas sebagai studi kasus komprehensif, dilengkapi dengan penjelasan pitch mendalam, fitur utama, rincian tumpukan teknologi, studi kasus arsitektur teknis tertulis, serta daftar keterbatasan yang diketahui secara transparan. Selain itu, halaman /stats secara otomatis menghitung frekuensi penggunaan setiap teknologi di seluruh proyek dan menyediakan tag cloud interaktif yang memungkinkan pengunjung menjelajahi proyek terkait hanya dengan satu klik.",

        featureGroups: [
            {
                label: "Lokalisasi & Arsitektur i18n",
                items: [
                    "Struktur rute paralel /en dan /id dikelola langsung oleh sistem i18n bawaan Astro dengan konfigurasi prefixDefaultLocale aktif untuk pengalaman navigasi yang mulus.",
                    "Kamus terjemahan kustom yang ringan dan efisien tanpa bergantung pada pustaka eksternal seperti i18next, dilengkapi mekanisme penimpaan (override) teks per proyek untuk locale yang hanya membutuhkan penyesuaian khusus.",
                    "Komponen pengalih bahasa pintar yang menyimpan preferensi bahasa pengunjung di localStorage dan secara otomatis mengarahkan rute utama \"/\" ke bahasa yang dipilih pada kunjungan berikutnya.",
                ],
            },
            {
                label: "Etalase Karya Interaktif",
                items: [
                    "Kartu proyek dirender secara dinamis dari satu sumber data TypeScript bertipe kuat, masing-masing dilengkapi dengan jajaran chip teknologi berikon merek yang presisi.",
                    "Halaman studi kasus terperinci untuk setiap proyek — mencakup deskripsi utama, pengelompokan fitur terstruktur, tumpukan teknologi, narasi studi kasus rekayasa teknis, serta catatan keterbatasan.",
                ],
            },
            {
                label: "Analitik Statistik Teknologi",
                items: [
                    "Halaman /stats merekapitulasi seluruh tumpukan teknologi dari setiap proyek menjadi visualisasi tag cloud interaktif yang ukuran dan warnanya disesuaikan secara proporsional berdasarkan frekuensi penggunaannya.",
                    "Setiap tag teknologi terhubung langsung ke halaman statis khusus (dihasilkan saat build per slug) yang mencantumkan seluruh proyek yang memanfaatkan teknologi tersebut.",
                ],
            },
        ],

        stackGroups: [
            {
                label: "Inti",
                items: ["Astro", "TypeScript"],
            },
            {
                label: "Styling & Tipografi",
                items: [
                    "CSS kustom dengan sistem design token berbasis custom property — dibangun tanpa TailwindCSS atau pustaka komponen external.",
                    "Kombinasi tipografi modern: Plus Jakarta Sans untuk sub-judul & penekanan visual, Big Shoulders untuk judul display utama, IBM Plex Sans untuk teks isi, dan IBM Plex Mono untuk elemen kode.",
                ],
            },
            {
                label: "Sistem Ikon",
                items: [
                    "simple-icons untuk logo merek teknologi dan lucide-static untuk ikon antarmuka UI — keduanya di-resolve secara dinamis berdasarkan nama label saat render.",
                ],
            },
            {
                label: "i18n",
                items: [
                    "Integrasi rute i18n bawaan Astro dipadukan dengan kamus kunci kustom dan mekanisme override terjemahan spesifik per proyek.",
                ],
            },
        ],

        studyTitle: "Studi Kasus: Resolusi Build Statis vs. Pemuatan Ikon saat Runtime",
        story: [
            {
                label: "Arsitektur Desain Awal",
                body: "Komponen `Icon` dan `TechIcon` dirancang untuk me-resolve SVG ikon dari label apa pun secara otomatis saat proses render menggunakan pemanggilan `fs.readFileSync(new URL(\"../../node_modules/...\", import.meta.url))`. Dengan pendekatan ini, menambahkan dukungan ikon untuk teknologi baru cukup dengan menambahkan entri pada pemetaan nama-ke-slug tanpa perlu mengimpor atau mem-bundle aset gambar secara manual. Arsitektur ini sangat cepat untuk dikembangkan dan berfungsi tanpa hambatan sepanjang proses pembangunan awal di lingkungan `astro dev`.",
            },
            {
                label: "Kegagalan pada Build Produksi",
                body: "Saat aplikasi siap di-deploy dan perintah `astro build` dijalankan, proses prerender mengalami kegagalan fatal. Masalah ini terjadi karena `astro dev` menyajikan komponen langsung dari struktur direktori sumber (`src/components`), sehingga penelusuran relative path `../../node_modules/...` selalu menemukan lokasi direktori yang tepat. Namun pada `astro build`, Astro mengompilasi dan mengelompokkan komponen ke dalam berkas chunk di bawah `dist/.prerender/chunks/`. Di dalam berkas bundle tersebut, nilai `import.meta.url` tidak lagi menunjuk ke direktori sumber asli melainkan ke lokasi chunk bundle di dalam folder `dist/`. Akibatnya, navigasi relatif yang sama mencoba mengakses `dist/node_modules` yang tidak pernah ada, menyebabkan seluruh halaman yang menggunakan ikon gagal di-prerender.",
            },
            {
                label: "Proses Diagnosis Masalah",
                body: "Untuk memverifikasi akar masalah, halaman statistik yang baru dibuat dihapus sementara dan proses build dijalankan ulang. Halaman studi kasus lama yang sebelumnya berjalan normal ternyata mengalami kegagalan dengan error yang identik. Hal ini membuktikan bahwa bug tersebut bukan disebabkan oleh kode fitur statistik baru, melainkan oleh asumsi path relatif pada `Icon` dan `TechIcon` yang tidak valid saat berjalan di dalam hasil bundle kompilasi produksi.",
            },
            {
                label: "Implementasi Perbaikan Berbasis Node Require",
                body: "Solusi dilakukan dengan mengganti konstruksi path relatif manual menggunakan mekanisme pencarian modul Node yaitu `createRequire(import.meta.url).resolve(\"lucide-static/icons/...\")` (hal yang sama diterapkan untuk `simple-icons`). Algoritma resolusi modul Node menelusuri hierarki direktori ke atas untuk menemukan folder `node_modules` yang valid, alih-alih mengandalkan lompatan jumlah tingkat folder secara tetap dari lokasi berkas saat ini. Hasilnya, ikon dapat di-resolve secara konsisten baik saat dijalankan dari `src/components` pada lingkungan pengembangan maupun dari chunk bundle di `dist/.prerender/chunks` pada build produksi. Perbaikan ini divalidasi dengan kelancaran build lokal dan berhasil di-deploy pada lingkungan live Vercel.",
            },
        ],

        notes: [
            {
                title: "Infrastruktur repositori konten eksternal",
                body: "Berkas `src/lib/content.ts` telah dilengkapi logika untuk mengambil data proyek secara otomatis dari repositori konten terpisah saat build, dengan mekanisme fallback ke `src/data/projects.ts` lokal. Untuk saat ini, seluruh halaman masih mengimpor data lokal secara langsung sampai repositori konten terpisah resmi dihubungkan.",
            },
        ],
    },
} as const;
