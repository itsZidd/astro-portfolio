export interface Project {
    slug: string;
    file: string; // shown like a filename, e.g. "prayer_time.apk"
    title: string;
    category: "Software" | "GIS & Geospatial" | "AI / ML" | "Game Dev";
    summary: string;
    stack: string[];
    status: "live" | "wip";
    repoUrl?: string;
    downloadUrl?: string;
}

export const projects: Project[] = [
    {
        slug: "prayer-time",
        file: "prayer_time.apk",
        title: "Prayer Time",
        category: "Software",
        summary:
            "An offline-first Islamic prayer companion — custom prayer-time astronomy, a tajweed-colored Quran reader, and background-aware notifications.",
        stack: ["React Native", "Expo", "TypeScript"],
        status: "live",
        repoUrl: "https://github.com/itsZidd/expo-prayer-time",
        downloadUrl:
            "https://github.com/itsZidd/expo-prayer-time/releases/download/1.0.0/application-375dc22a-becb-4ab2-8312-4a8f3002da15.apk",
    },
];
