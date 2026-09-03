import type { Project } from "../data/projects";

/**
 * Indonesian overrides for project card text, keyed by slug.
 * Only override the fields that need translation (title usually doesn't —
 * app/project names typically stay as-is). Anything not listed here falls
 * back to the English value in projects.ts.
 */
export const projectTranslationsId: Record<
    string,
    Partial<Pick<Project, "title" | "summary">>
> = {
    "prayer-time": {
        summary:
            "Aplikasi pendamping salat mobile berbasis offline-first yang dibangun menggunakan React Native dan Expo. Aplikasi ini menyediakan kalkulasi astronomi waktu salat kustom tanpa ketergantungan API pihak ketiga, pembaca Al-Qur'an lengkap 30 Juz dengan verifikasi kaidah tajwid pada 6.236 ayat, fitur Asmaul Husna & Tasbih digital, serta penjadwalan notifikasi latar belakang yang presisi.",
    },
    "python-prayer-time": {
        summary:
            "Sistem API web FastAPI dan CLI untuk menghitung waktu salat berbasis posisi astronomi matahari mentah (tanggal Julian, deklinasi, dan sudut jam). Dilengkapi 17 metode perhitungan bawaan, pencarian kota offline, serta lima strategi fallback lintang tinggi untuk wilayah kutub — mesin kalkulasi yang kemudian diporting ke React Native.",
    },
    "astro-portfolio": {
        summary:
            "Situs portofolio pribadi dwibahasa (Indonesia & Inggris) yang dibangun dari nol menggunakan Astro dan CSS murni tanpa UI framework. Dilengkapi arsitektur i18n berbasis rute, etalase karya interaktif, tag cloud statistik penggunaan teknologi pada /stats, serta laporan studi kasus teknis yang ditulis secara jujur dan mendalam.",
    },
    "icare-landslide": {
        summary:
            "E-modul pembelajaran edukasi interaktif berbasis SvelteKit untuk pendidikan geografi dan mitigasi bencana tanah longsor di Kecamatan Jabung, Kabupaten Malang. Menggabungkan eksplorasi peta 3D, 5 ruang belajar interaktif, penilai esai refleksi berbasis Gemini AI, serta portal analitik guru — dibangun ulang sepenuhnya dari ekspor Articulate Storyline 360 yang bermasalah.",
    },
    "sumz": {
        summary:
            "Aplikasi perangkum artikel *web* berbasis Next.js 16 dan Google Gemini yang mengekstrak konten menggunakan Mozilla Readability langsung di server tanpa API ekstraksi pihak ketiga. Dilengkapi proteksi SSRF, kepatuhan *robots.txt*, dan pembatasan laju pemanggilan (*rate limiting*) — dibangun ulang dari proyek AI pertama era ChatGPT/OpenAI tahun 2023.",
    },
};

/** Category labels, for when the "Selected Work" grid groups by category later. */
export const categoryLabels = {
    en: {
        "Software": "Software",
        "GIS & Geospatial": "GIS & Geospatial",
        "AI / ML": "AI / ML",
        "Game Dev": "Game Dev",
    },
    id: {
        "Software": "Perangkat Lunak",
        "GIS & Geospatial": "GIS & Geospasial",
        "AI / ML": "AI / ML",
        "Game Dev": "Pengembangan Game",
    },
} as const;

