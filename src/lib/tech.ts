import { projects, type Project } from "../data/projects.ts";

/** Turns a tech label into a URL-safe slug, e.g. "React Native" -> "react-native". */
export function slugifyTech(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

export interface TechCount {
    name: string;
    slug: string;
    count: number;
}

/** Tallies how many projects use each tech, sorted by frequency then name. */
export function getTechCounts(): TechCount[] {
    const counts = new Map<string, number>();
    for (const p of projects) {
        for (const tech of p.stack) {
            counts.set(tech, (counts.get(tech) ?? 0) + 1);
        }
    }
    return [...counts.entries()]
        .map(([name, count]) => ({ name, slug: slugifyTech(name), count }))
        .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

/** The projects whose stack includes the tech identified by this slug. */
export function getProjectsForTech(slug: string): Project[] {
    return projects.filter((p) => p.stack.some((tech) => slugifyTech(tech) === slug));
}

/** Recovers the original display name (casing, punctuation) for a tech slug. */
export function getTechNameForSlug(slug: string): string | undefined {
    for (const p of projects) {
        for (const tech of p.stack) {
            if (slugifyTech(tech) === slug) return tech;
        }
    }
    return undefined;
}
