# Changelog

All notable changes to this project are documented here.
Format loosely follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

## 2026-08-11

### Added

- I-CARE Landslide project: case-study page, content, and EN/ID translations; `Project.category` now accepts multiple categories, plus a `date` field
- Homepage redesign: hero location/availability badges and CTA buttons, a stat row (live project/technology counts), work-section category filters, a copy-email contact button, and a sticky header with mobile burger nav
- `Project.category` supports an array of categories, and `content.ts`'s validation was updated to match

### Changed

- Case-study pages (Prayer Time, Python Prayer Time, Astro Portfolio, I-CARE Landslide) now share a single `components/CaseStudyLayout.astro` instead of duplicating the same ~300-line shell each — a project's download link, GitHub link, and screenshot carousel only render when that project actually has them
- The homepage's "Technologies" stat is now computed from `getTechCounts()` instead of a hardcoded number
- Tech-stack icons in case studies now only render for a matched brand logo — descriptive stack entries (e.g. a one-off implementation note) no longer get a meaningless placeholder icon
- Stats and per-technology pages restyled to match the new design language
- Background contour field now redraws on container resize instead of only on load

### Fixed

- Known Limitations card titles were rendering in the body-text color instead of green — `.notes__item p` unintentionally outranked `.notes__title` in CSS specificity

## 2026-08-07

### Added

- Bilingual (`/en`, `/id`) site structure: home page, language switcher with persisted preference, hreflang alternates
- Prayer Time project case study — pitch, feature breakdown, tech stack, technical case study, known limitations
- `/stats` tech explorer: a tag cloud tallying every project's stack, sized and colored by usage frequency, with a per-technology page (`/stats/[tech]`) listing the projects that use it
- "Astro Portfolio" listed as a project on its own site, with a case study covering the site's own architecture and the `Icon`/`TechIcon` build bug found while shipping the stats page
- Public GitHub repo (`itsZidd/astro-portfolio`) created and pushed
