export const icareLandslideContent = {
    en: {
        eyebrow: "software · sveltekit",
        pitch: "An interactive, gamified e-module for geography and disaster risk reduction education, focused on Jabung District, Malang Regency, East Java. Built at Universitas Negeri Malang, it combines real-world geospatial data, 3D map exploration, AI-graded reflection essays, and a teacher analytics portal — a full rebuild of a course that started life as a broken Articulate Storyline export.",

        featureGroups: [
            {
                label: "Student Learning Engine",
                items: [
                    "Five progressive rooms: plate tectonics and 3D Jabung relief, landslide mechanisms with field documentation, spatial analysis across 5 thematic overlay maps, a timed quiz plus AI-evaluated essay, and mitigation drills",
                    "Interactive audio engine — background music and sound effects with volume sliders and mute toggles wired to every clickable element",
                    "Instant PDF/image certificate generation with unique verification IDs on 100% module completion",
                ],
            },
            {
                label: "Teacher Portal & Analytics",
                items: [
                    "Isolated teacher authentication with environment-configured credentials",
                    "Responsive leaderboard — compact desktop tables, stacked cards under 768px — with search, class filters, and pagination",
                    "Essay review drawer showing each student's exact answers, sub-scores, and AI feedback for full grading transparency",
                ],
            },
            {
                label: "AI Essay Evaluator",
                items: [
                    "Google Gemini grades reflection essays against a 100-point geography rubric across three sub-questions",
                    "Contextually scoped prompts per sub-question, so feedback stays on-topic instead of bleeding requirements across questions",
                    "Heuristic keyword fallback scorer keeps grading instant even when the AI API rate-limits",
                ],
            },
        ],

        stackGroups: [
            {
                label: "Core",
                items: ["SvelteKit", "Svelte", "TypeScript"],
            },
            {
                label: "Styling & Icons",
                items: ["TailwindCSS", "lucide-svelte"],
            },
            {
                label: "Database",
                items: ["Turso", "SQLite", "Drizzle"],
            },
            {
                label: "AI",
                items: ["Google Gemini"],
            },
            {
                label: "Auth & Deployment",
                items: ["Better Auth", "Vercel"],
            },
        ],

        studyTitle: "Case Study: Rebuilding a Storyline 360 Course Without Its Source",
        story: [
            {
                label: "The bug report",
                body: "The project didn't start as a rebuild — it started as a bug report. The original course, published from Articulate Storyline 360, was already live but riddled with small, frustrating breaks: buttons that clicked silently with no sound feedback, clunky animations, everything fragile and hard to keep working together. The original ask was simple: port this to something like SvelteKit — is that even possible?",
            },
            {
                label: "Reality check",
                body: "There was no `.story` source file anywhere in the repo — only the compiled HTML5 export: minified per-slide JS, a proprietary trigger/timeline blob in `data.js`/`frame.xml`, and raw assets. Storyline's interactivity isn't code in any normal sense; it's data interpreted by a closed-source runtime. There was no automated conversion — porting could only mean a full rebuild, using the export purely as a reference and asset source, reimplemented by hand.",
            },
            {
                label: "The audit",
                body: "Before committing to that scope, the course was inventoried directly from `data.js`: 32 slides, 609 objects, 902 events, 2717 actions, 63 global variables. That explained the original bug report precisely — the course had 147 clickable buttons, but only 7 explicit sound-play actions anywhere in it. Storyline requires every object's sound trigger to be authored one-by-one with no shared default, so about 95% of buttons simply never got one.",
            },
            {
                label: "The fix",
                body: "SvelteKit was chosen over Next.js because the course has no real backend need — it's a branching slide sequence with client-side state, not a data-fetching app. Rather than replicating 2717 actions 1:1, each slide/branch's behavior was reproduced as clean, data-driven Svelte components. Sound became a property of one shared `Button` component instead of 147 individual afterthoughts — the exact class of bug a component-based rebuild eliminates by construction.",
            },
        ],

        notes: [
            {
                title: "Heavy media bandwidth requirement",
                body: "High-resolution 3D map overlays and field video documentation run up to 68MB per clip, so smooth playback needs a stable connection of at least 5 Mbps.",
            },
            {
                title: "AI essay grading depends on Gemini uptime",
                body: "Grading typically takes 2–4 seconds. If the Gemini API is unreachable, a fallback keyword scorer estimates marks so student progress is never blocked.",
            },
            {
                title: "Geographic scope is Jabung-specific",
                body: "Risk classifications and thematic maps are tailored to Jabung District, Malang Regency. Adapting the module to other districts requires uploading new GIS layers.",
            },
        ],
    },

    id: {
        eyebrow: "perangkat lunak · sveltekit",
        pitch: "E-modul edukasi interaktif dan tergamifikasi untuk pembelajaran geografi serta Pengurangan Risiko Bencana (PRB) bencana tanah longsor, yang berfokus khusus pada kawasan rawan bencana di Kecamatan Jabung, Kabupaten Malang, Jawa Timur. Dikembangkan di Universitas Negeri Malang, aplikasi web ini mengintegrasikan data peta geospasial dunia nyata, eksplorasi relief 3D interaktif, penilaian esai refleksi otomatis berbasis Google Gemini AI, serta portal analitik pemantauan guru — sebuah hasil rekonstruksi arsitektur total dari materi kursus awal yang berupa hasil kompilasi ekspor Articulate Storyline 360 yang rusak dan tidak dapat disunting.",

        featureGroups: [
            {
                label: "Mesin Pembelajaran Siswa",
                items: [
                    "Lima ruang belajar bertahap: eksplorasi tektonik lempeng dan relief 3D Jabung, simulasi mekanisme longsor berbasis dokumentasi lapangan, analisis spasial overlay 5 peta tematik, kuis interaktif berwaktu, esai evaluasi AI, dan simulasi mitigasi mandiri.",
                    "Mesin audio interaktif terpadu — mengelola musik latar dan efek suara interaksi dengan kontrol volume kustom dan toggle bisu yang terhubung langsung ke seluruh komponen antarmuka yang dapat diklik.",
                    "Penerbitan sertifikat kelulusan dalam format PDF dan gambar secara instan lengkap dengan ID verifikasi unik ketika siswa telah menyelesaikan seluruh alur modul 100%.",
                ],
            },
            {
                label: "Portal Guru & Dashboard Analitik",
                items: [
                    "Sistem autentikasi guru terisolasi menggunakan kredensial aman yang dikonfigurasi melalui variabel lingkungan server.",
                    "Papan peringkat dan analitik siswa yang fully responsive — menampilkan tabel data terstruktur di desktop dan kartu adaptif di perangkat mobile (<768px), dilengkapi fitur pencarian, filter per kelas, dan paginasi.",
                    "Panel telaah esai mendalam yang menampilkan jawaban asli siswa, rincian sub-skor tiap pertanyaan, dan umpan balik analitis dari AI untuk transparansi penilaian yang dapat ditinjau ulang oleh guru.",
                ],
            },
            {
                label: "Evaluator Esai Otomatis Berbasis AI",
                items: [
                    "Integrasi Google Gemini AI untuk menilai esai refleksi siswa berdasarkan rubrik geografi 100 poin yang mencakup tiga sub-soal analisis spasial.",
                    "Penerapan instruksi prompt berisolasi konteks untuk tiap sub-soal, menjamin bahwa umpan balik AI tetap fokus pada topik spesifik tanpa mengalami kontaminasi konteks antarnomor.",
                    "Sistem penilai fallback berbasis kata kunci (heuristic keyword scorer) yang secara otomatis mengambil alih proses penilaian secara instan apabila API AI mengalami batasan kuota (rate-limit).",
                ],
            },
        ],

        stackGroups: [
            {
                label: "Inti",
                items: ["SvelteKit", "Svelte", "TypeScript"],
            },
            {
                label: "Styling & Ikon",
                items: ["TailwindCSS", "lucide-svelte"],
            },
            {
                label: "Basis Data & ORM",
                items: ["Turso", "SQLite", "Drizzle ORM"],
            },
            {
                label: "Kecerdasan Buatan (AI)",
                items: ["Google Gemini API"],
            },
            {
                label: "Auth & Deployment",
                items: ["Better Auth", "Vercel"],
            },
        ],

        studyTitle: "Studi Kasus Rekayasa: Membangun Ulang Kursus Storyline 360 Tanpa Berkas Sumber",
        story: [
            {
                label: "Awal Mula Laporan Bug",
                body: "Proyek ini tidak dimulai sebagai rencana pembangunan ulang aplikasi dari nol — melainkan diawali dari sebuah laporan bug teknis. Kursus media pembelajaran aslinya, yang dipublikasikan menggunakan Articulate Storyline 360, sudah berstatus live namun dipenuhi berbagai kendala teknis yang mengganggu pengalaman pengguna: tombol-tombol antarmuka yang diklik tanpa adanya respons efek suara, animasi pergerakan slide yang kaku, serta ketidakstabilan sistem secara keseluruhan. Permintaan awal dari tim pengembang sangat sederhana: dapatkah proyek ini dipindahkan atau di-porting ke framework web modern seperti SvelteKit?",
            },
            {
                label: "Realita Teknis & Hambatan Sumber Berkas",
                body: "Setelah dilakukan penelusuran repositori, tidak ditemukan berkas proyek mentah `.story` milik Articulate Storyline di mana pun — yang tersisa hanyalah direktori ekspor HTML5 hasil kompilasi. Berkas tersebut hanya berisi JavaScript per-slide yang sudah ter-minify, data biner interaktivitas Storyline di dalam `data.js`/`frame.xml`, serta aset media mentah. Pada dasarnya, logika interaktivitas Storyline bukanlah kode program biasa yang dapat di-refactor, melainkan data khusus yang diinterpretasikan oleh runtime closed-source. Hal ini menutup kemungkinan konversi kode secara otomatis; perbaikan hanya dapat dilakukan melalui pembangunan ulang arsitektur secara total dari nol dengan menjadikan berkas ekspor tersebut sebagai acuan konten dan sumber aset semata.",
            },
            {
                label: "Audit Inventarisasi Logika Sistem",
                body: "Sebelum memutuskan eksekusi rekonstruksi total, inventarisasi struktur data dilakukan dengan menganalisis berkas `data.js` hasil kompilasi Storyline. Hasil audit menunjukkan bahwa modul tersebut terdiri dari 32 slide, 609 objek interaktif, 902 event handler, 2.717 aksi logika, dan 63 variabel global. Data ini menjawab penyebab pasti dari laporan bug awal: dari total 147 tombol interaktif yang ada di dalam aplikasi, hanya 7 tombol yang memiliki perintah pemutaran suara eksplisit. Arsitektur Storyline mewajibkan pengembang menambahkan trigger suara pada setiap objek secara satu per satu tanpa adanya konfigurasi bawaan global, sehingga sekitar 95% tombol memang tidak pernah mengeluaran suara.",
            },
            {
                label: "Solusi Arsitektur Berbasis Komponen SvelteKit",
                body: "Framework SvelteKit dipilih karena aplikasi ini berfokus pada alur navigasi slide bercabang dengan pengelolaan state di sisi klien yang intensif. Alih-alih mereplikasi 2.717 aksi logika individual secara manual, seluruh perilaku slide dan percabangan materi direstrukturisasi menjadi komponen Svelte berbasis data yang bersih. Umpan balik suara kini diintegrasikan langsung sebagai properti bawaan dari satu komponen `Button` terpusat, secara otomatis memberikan efek suara pada seluruh tombol antarmuka — sebuah pendekatan yang mengeliminasi potensi bug serupa secara struktural sejak dari desain arsitekturnya.",
            },
        ],

        notes: [
            {
                title: "Kebutuhan Bandwidth & Pengolahan Media",
                body: "Overlay peta 3D beresolusi tinggi dan dokumentasi video wawancara lapangan memiliki ukuran hingga 68MB per klip media. Untuk memastikan pemutaran video dan interaksi peta berjalan lancar tanpa buffering, pengguna disarankan menggunakan koneksi internet stabil minimal 5 Mbps.",
            },
            {
                title: "Ketergantungan Layanan Evaluator AI Gemini",
                body: "Proses penilaian esai berbasis AI membutuhkan waktu sekitar 2 hingga 4 detik. Apabila layanan API Google Gemini mengalami kendala jaringan atau pembatasan rate-limit, sistem skorer kata kunci fallback akan secara otomatis mengambil alih agar siswa tetap dapat melanjutkan alur pembelajaran tanpa terhenti.",
            },
            {
                title: "Cakupan Batas Geografis Khusus",
                body: "Klasifikasi risiko bencana dan layer peta tematik dalam modul ini disesuaikan khusus untuk karakteristik wilayah Kecamatan Jabung, Kabupaten Malang. Untuk mengadaptasi modul ini ke wilayah atau kecamatan lain, pengembang perlu mengunggah dan mengonfigurasi layer spasial GIS baru.",
            },
        ],
    },
} as const;
