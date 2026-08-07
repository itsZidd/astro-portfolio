// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
    i18n: {
        locales: ["en", "id"],
        defaultLocale: "en",
        routing: {
            prefixDefaultLocale: true,
        },
    },
    // Static builds can't detect browser language per-request, so "/"
    // resolves to English. The LanguageSwitcher lets visitors flip to
    // Indonesian from there, and it's remembered via localStorage on
    // next visit (see Layout.astro inline script).
    redirects: {
        "/": "/en/",
    },
});
