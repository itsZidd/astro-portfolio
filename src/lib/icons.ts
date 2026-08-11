const slugs: Record<string, string> = {
    "JavaScript": "javascript",
    "TypeScript": "typescript",
    "Go": "go",
    "Python": "python",
    "React Native": "react",
    "React": "react",
    "Godot": "godotengine",
    "Expo": "expo",
    "QGIS": "qgis",
    "ArcGIS Pro": "arcgis",
    "Google Earth Engine": "googleearthengine",
    "LangChain": "langchain",
    "Astro": "astro",
    "FastAPI": "fastapi",
    "pytest": "pytest",
    "Vercel": "vercel",
    "Svelte": "svelte",
    "SvelteKit": "svelte",
    "TailwindCSS": "tailwindcss",
    "Turso": "turso",
    "SQLite": "sqlite",
    "Drizzle": "drizzle",
    "Google Gemini": "googlegemini",
    "Better Auth": "betterauth",
};

export const customTechIcons: Record<string, string> = {};


export function findTechIconSlug(label: string): string | undefined {
    if (slugs[label]) return slugs[label];
    for (const [key, slug] of Object.entries(slugs)) {
        if (!label.startsWith(key)) continue;
        const nextChar = label[key.length];
        if (!nextChar || !/[a-zA-Z0-9]/.test(nextChar)) return slug;
    }
    return undefined;
}

export function getCustomTechIcon(label: string): string | undefined {
    if (customTechIcons[label]) return customTechIcons[label];
    for (const [key, svg] of Object.entries(customTechIcons)) {
        if (label.toLowerCase() === key.toLowerCase()) return svg;
    }
    return undefined;
}

export function hasTechIcon(label: string): boolean {
    return !!getCustomTechIcon(label) || !!findTechIconSlug(label);
}
