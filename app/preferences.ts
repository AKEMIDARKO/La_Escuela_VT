import { isLocale, type Locale } from "./content";

export interface Preferences {
  locale: Locale;
  theme: "light" | "dark";
  motionEnabled: boolean;
}

export function readPreferences(): Preferences {
  const preferences: Preferences = { locale: "es", theme: "light", motionEnabled: true };
  if (typeof window === "undefined") return preferences;

  preferences.theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  try {
    const savedLocale = window.localStorage.getItem("escuela-locale");
    const savedTheme = window.localStorage.getItem("escuela-theme");
    if (isLocale(savedLocale)) preferences.locale = savedLocale;
    if (savedTheme === "light" || savedTheme === "dark") preferences.theme = savedTheme;
    preferences.motionEnabled = window.localStorage.getItem("escuela-motion") !== "off";
  } catch { /* The controls still work when browser storage is unavailable. */ }
  return preferences;
}
