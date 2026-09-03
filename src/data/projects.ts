export type Category = "Software" | "GIS & Geospatial" | "AI / ML" | "Game Dev";

export interface Project {
    slug: string;
    file: string; // shown like a filename, e.g. "prayer_time.apk"
    title: string;
    category: Category | Category[];
    date: string; // e.g. "Jan 2026"
    summary: string;
    stack: string[];
    status: "live" | "wip";
    repoUrl?: string;
    downloadUrl?: string;
}

export const projects: Project[] = [
    {
        slug: "python-prayer-time",
        file: "prayer_time_api.py",
        title: "Smart Prayer Times API & CLI",
        category: "Software",
        date: "Jan 2026",
        summary:
            "A FastAPI prayer-time API and CLI with custom solar astronomy and five high-latitude fallback strategies — the calculation engine later ported into the React Native Prayer Time app.",
        stack: ["Python", "FastAPI"],
        status: "live",
        repoUrl: "https://github.com/itsZidd/python-prayer-time-calculation",
    },
    {
        slug: "prayer-time",
        file: "prayer_time.apk",
        title: "Prayer Time",
        category: "Software",
        date: "Jul 2026",
        summary:
            "An offline-first Islamic prayer companion — custom prayer-time astronomy, a tajweed-colored Quran reader, and background-aware notifications.",
        stack: ["React Native", "Expo", "TypeScript"],
        status: "live",
        repoUrl: "https://github.com/itsZidd/expo-prayer-time",
        downloadUrl:
            "https://github.com/itsZidd/expo-prayer-time/releases/download/1.0.0/application-375dc22a-becb-4ab2-8312-4a8f3002da15.apk",
    },
    {
        slug: "icare-landslide",
        file: "icare_landslide.svelte",
        title: "I-CARE Landslide",
        category: ["Software", "GIS & Geospatial", "AI / ML"],
        date: "Aug 2026",
        summary:
            "A gamified SvelteKit e-module for landslide disaster geography education in Jabung District, Malang — five interactive learning rooms, Gemini-graded reflection essays, and a teacher analytics portal, rebuilt from scratch after the original Articulate Storyline export turned out to have no editable source.",
        stack: ["SvelteKit", "TailwindCSS", "Google Gemini"],
        status: "live",
    },
    {
        slug: "astro-portfolio",
        file: "astro_portfolio.astro",
        title: "Astro Portfolio",
        category: "Software",
        date: "Aug 2026",
        summary:
            "My personal site — a bilingual project showcase built with Astro, including a tech-usage tag cloud that links each tool back to the projects that use it.",
        stack: ["Astro", "TypeScript"],
        status: "live",
        repoUrl: "https://github.com/itsZidd/astro-portfolio",
    },
    {
        slug: "sumz",
        file: "sumz.tsx",
        title: "Sumz — AI Article Summarizer",
        category: ["Software", "AI / ML"],
        date: "Jul 2023 · Sep 2026 rev",
        summary:
            "A Next.js & Google Gemini article summarizer that extracts clean page text with Mozilla Readability (no third-party extraction APIs), hardened with SSRF protection, robots.txt compliance, and in-memory rate limiting — rebuilt from an early 2023 OpenAI-era project.",
        stack: ["Next.js", "React", "TypeScript", "TailwindCSS", "Google Gemini"],
        status: "live",
        repoUrl: "https://github.com/itsZidd/Sumz",
    },
];

