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
            "Aplikasi pendamping salat yang offline-first — perhitungan astronomi waktu salat kustom, pembaca Al-Qur'an dengan pewarnaan tajwid, dan notifikasi terjadwal yang tetap presisi di latar belakang.",
    },
    "python-prayer-time": {
        summary:
            "API waktu salat FastAPI dan CLI dengan astronomi matahari kustom dan lima strategi fallback lintang tinggi — mesin perhitungannya kemudian diporting ke aplikasi mobile Prayer Time berbasis React Native.",
    },
    "astro-portfolio": {
        summary:
            "Situs pribadi saya — etalase proyek dwibahasa yang dibangun dengan Astro, termasuk tag cloud pemakaian teknologi yang menautkan tiap alat kembali ke proyek yang memakainya.",
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
