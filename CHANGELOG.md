# Changelog

All notable changes to this project are documented here.
Format loosely follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Known issues

- `astro build` fails on any page rendering `Icon` or `TechIcon` — they read SVGs via `fs.readFileSync` relative to `import.meta.url`, which breaks once Astro bundles those components for a static build. `astro dev` is unaffected. See the Astro Portfolio case study for the full root-cause writeup.

## 2026-08-07

### Added

- Bilingual (`/en`, `/id`) site structure: home page, language switcher with persisted preference, hreflang alternates
- Prayer Time project case study — pitch, feature breakdown, tech stack, technical case study, known limitations
- `/stats` tech explorer: a tag cloud tallying every project's stack, sized and colored by usage frequency, with a per-technology page (`/stats/[tech]`) listing the projects that use it
- "Astro Portfolio" listed as a project on its own site, with a case study covering the site's own architecture and the `Icon`/`TechIcon` build bug found while shipping the stats page
- Public GitHub repo (`itsZidd/astro-portfolio`) created and pushed
