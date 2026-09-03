## Development & Release Workflow

1. **Keep Documentation Up to Date**:
   - Always update `CHANGELOG.md`, `README.md`, and `docs/content-template.md` whenever major decisions, new projects, or significant changes are made.
   - Follow the localization guideline in `docs/content-template.md`: English is concise and technical; Indonesian copy is richly explained (never a 1:1 machine translation), and all English/foreign loanwords in Indonesian text MUST be italicized.

2. **Version Synchronization**:
   - Bump the version in `package.json` to match the latest version recorded in `CHANGELOG.md`.

3. **Git Tagging & Push**:
   - Create a corresponding git tag matching the version (e.g., `git tag v0.2.0`).
   - Commit all changes cleanly with meaningful messages and push both commits and tags to GitHub (`git push && git push --tags`).

## Dev Server

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

