# README structure template

Shared skeleton used across this project's READMEs (and sibling projects like
I-CARE Landslide). This file has no content of its own — when writing or
regenerating a README, follow this shape and fill every section from the
actual codebase (source files, `package.json`, git history), never by
copying prose from another project's README.

Do not auto-generate a README from this file mechanically. Every section
below requires reading the current code first.

---

## 1. Title + badges

```md
# {emoji} {Project Name}

![{Badge}](https://img.shields.io/badge/{Label}-{HEX}?style=for-the-badge&logo={slug}&logoColor=white)
...one badge per major dependency/platform...
```

- One emoji in the title, matching the project's domain.
- One `for-the-badge` shield per notable framework, language, styling engine,
  database, AI provider, and deploy target — pull exact names/versions from
  `package.json`, not from memory.
- Use a real [simple-icons](https://simpleicons.org) `logo=` slug where one
  exists; omit `logo=` rather than guessing a slug that might not exist.
- 1-2 sentence intro paragraph directly under the badges: what the project
  is, who/what it's for, and the core stack, in plain language.

## 2. `## 🚀 What's Built`

Grouped by feature area, most user-facing first:

```md
### {emoji} N. {Area Name}

- **{Feature}**: {one-line description, specific enough to be checkable
  against the code — file names, function names, or concrete numbers
  beat vague adjectives}
```

Every bullet must be verifiable by reading the referenced file. No feature
that doesn't exist yet, no aspirational roadmap items in this section.

## 3. `## 🛠️ Tech Stack & Complete Tools Inventory`

```md
### 📦 Exhaustive Tools & Libraries Breakdown (Grouped by Role)

#### N. {Role, e.g. "Core Framework & Build Engine"}

| Package | Version | Purpose & Usage |
| :--- | :--- | :--- |
| **`{package}`** | `{exact semver from package.json}` | {what it's actually used for in this repo, not the library's generic tagline} |
```

Group by role (framework/build, styling/icons, data/storage, AI, auth,
hosting, tooling/lint) — not by `dependencies` vs `devDependencies`. Skip
groups that don't apply; don't force every project into the same N groups.

## 4. `## 📖 Engineering Notes`

2-4 numbered stories, each about a **real** decision or bug from this
project's actual history — pull these from `git log` commit bodies, not
invented anecdotes:

```md
### {emoji} N. {Story title, framed as the problem or decision}

{1-2 paragraphs: what broke or what was being decided, why the obvious
approach didn't work, what the actual fix/decision was and why. Reference
real file paths and, if useful, `inline code`.}
```

Good source material: bugfix commits with an explanation in the body,
architecture-changing commits ("replace X duplicated four times with Y"),
commits that reverted or corrected an earlier decision.

## 5. `## ⚠️ Known Limitations`

```md
N. **{Short limitation name}**:
   - {what's actually true today, and why — dead code not wired up,
     a feature gated behind an unset env var, a scope boundary, a
     performance/bandwidth constraint}
```

State limitations as current fact, not as apologies. If unsure whether
something is still true, check the code before writing it down.

## 6. `## ⚙️ Environment Variables Configuration` (only if the project has any)

```md
Create/copy `.env` {from `.env.example` if one exists}:

​```env
# {comment explaining what this var enables and where to get its value}
VAR_NAME="{example or blank}"
​```
```

State plainly whether the project still works with these unset (fallback
behavior), so setup isn't blocked on secrets that aren't actually required.

## 7. `## 🚀 Local Setup & Deployment`

```bash
# 1. Install dependencies
{install command}

# 2. Start local development server
{dev command}

# 3. Run checks / build
{check command}
{build command}
```

Follow with a deploy target section (Vercel/other) only if the project
actually deploys somewhere — steps as a numbered list, not prose.

## 8. Optional: `## 📁 Project Structure`

A trimmed directory tree with one-line comments per top-level folder, only
when the layout isn't obvious from a file browser (e.g. a non-standard
`views/` + `pages/` split, or a monorepo).

## 9. `## 📝 Changelog`

```md
See [CHANGELOG.md](./CHANGELOG.md) for the full history of releases, fixes, and changes.
```

---

## CHANGELOG.md shape (companion file)

Keep a Changelog format, grouped by date (not by semver — these are
personal/portfolio projects, not published packages):

```md
# Changelog

All notable changes to this project are documented here.
Format loosely follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

## {YYYY-MM-DD}

### Added
### Changed
### Fixed
```

Build entries from `git log --reverse`, one date section per day that had
commits, bundling same-day commits under the section they belong to. Read
each commit's full body (`git show <hash> -s --format=%B`), not just the
subject line — the body usually has the "why," which is what makes a
changelog entry useful instead of restating the diff.
