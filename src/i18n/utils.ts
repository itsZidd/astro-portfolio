import { ui } from "./ui";
import { languages, defaultLang, type Lang } from "./config";
import type { Project } from "../data/projects";
import { projectTranslationsId } from "./projectsId";

/** Reads the locale out of a URL's first path segment, e.g. /id/work/x -> "id" */
export function getLangFromUrl(url: URL): Lang {
    const [, lang] = url.pathname.split("/");
    if (lang in languages) return lang as Lang;
    return defaultLang;
}

/** Returns a t(key) function scoped to one locale, falling back to English. */
export function useTranslations(lang: Lang) {
    return function t(key: keyof (typeof ui)[typeof defaultLang]) {
        return ui[lang][key] ?? ui[defaultLang][key];
    };
}

/**
 * Prefixes an unprefixed path with the given locale.
 * getLocalizedPath("id", "/work/prayer-time") -> "/id/work/prayer-time"
 * getLocalizedPath("id", "/#work") -> "/id/#work"
 */
export function getLocalizedPath(lang: Lang, path: string): string {
    if (path.startsWith("/#")) return `/${lang}${path}`;
    const clean = path === "/" ? "" : path;
    return `/${lang}${clean}`;
}

/**
 * Resolves a project's title/summary for the given locale, falling back
 * to the canonical English value in projects.ts when no override exists.
 */
export function getProjectText(lang: Lang, project: Project): Pick<Project, "title" | "summary"> {
    if (lang === "en") return { title: project.title, summary: project.summary };
    const override = projectTranslationsId[project.slug] ?? {};
    return {
        title: override.title ?? project.title,
        summary: override.summary ?? project.summary,
    };
}

/** Strips a leading /en or /id segment off a pathname, for building the language switcher. */
export function getPathWithoutLang(url: URL): string {
    const parts = url.pathname.split("/");
    if (parts[1] in languages) {
        const rest = "/" + parts.slice(2).join("/");
        return rest === "/" ? "/" : rest.replace(/\/$/, "") || "/";
    }
    return url.pathname;
}
