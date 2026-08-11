import { projects as fallbackProjects, type Project } from "../data/projects.ts";

/**
 * Content is kept in a separate GitHub repo so editing project copy/links
 * never touches this site's codebase. At build time we fetch the raw JSON
 * from that repo. If the repo isn't configured yet (e.g. local dev before
 * you've set it up) or the fetch fails for any reason, we fall back to the
 * local placeholder data in src/data/projects.ts so the build never breaks.
 *
 * Configure via environment variables (see .env.example):
 *   CONTENT_GITHUB_USER   - your GitHub username
 *   CONTENT_GITHUB_REPO   - the content repo name, e.g. "portfolio-content"
 *   CONTENT_GITHUB_BRANCH - defaults to "main"
 *   CONTENT_GITHUB_PATH   - defaults to "projects.json"
 */

function isValidProject(p: unknown): p is Project {
  if (typeof p !== "object" || p === null) return false;
  const obj = p as Record<string, unknown>;
  return (
    typeof obj.slug === "string" &&
    typeof obj.file === "string" &&
    typeof obj.title === "string" &&
    (typeof obj.category === "string" || Array.isArray(obj.category)) &&
    typeof obj.summary === "string" &&
    Array.isArray(obj.stack) &&
    typeof obj.status === "string"
  );
}

export async function getProjects(): Promise<Project[]> {
  const user = import.meta.env.CONTENT_GITHUB_USER;
  const repo = import.meta.env.CONTENT_GITHUB_REPO;
  const branch = import.meta.env.CONTENT_GITHUB_BRANCH || "main";
  const path = import.meta.env.CONTENT_GITHUB_PATH || "projects.json";

  if (!user || !repo) {
    console.warn(
      "[content] CONTENT_GITHUB_USER/REPO not set — using local fallback project data.",
    );
    return fallbackProjects;
  }

  const url = `https://raw.githubusercontent.com/${user}/${repo}/${branch}/${path}`;

  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) {
      throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    if (!Array.isArray(data) || !data.every(isValidProject)) {
      throw new Error("Fetched content did not match the expected Project shape.");
    }
    return data;
  } catch (err) {
    console.warn(
      `[content] Failed to load content repo (${url}), using local fallback data. Reason:`,
      err instanceof Error ? err.message : err,
    );
    return fallbackProjects;
  }
}
