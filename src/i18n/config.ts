export const languages = {
    en: "English",
    id: "Indonesia",
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = "en";
