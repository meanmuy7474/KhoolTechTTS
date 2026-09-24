"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Locale, Translations, translations } from "@/lib/i18n";

interface LanguageContextValue {
  locale: Locale;
  t: Translations;
  setLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: "en",
  t: translations.en,
  setLocale: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("khooltech_locale") as Locale | null;
      if (saved && (saved === "en" || saved === "kh" || saved === "zh")) {
        setLocaleState(saved);
        const langMap: Record<Locale, string> = { en: "en", kh: "km", zh: "zh-Hans" };
        document.documentElement.lang = langMap[saved];
      }
    } catch {
      // Ignore storage access errors
    }
  }, []);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem("khooltech_locale", next);
    } catch {
      // Ignore storage access errors
    }
    // Update <html lang> attribute for accessibility & SEO
    if (typeof document !== "undefined") {
      const langMap: Record<Locale, string> = { en: "en", kh: "km", zh: "zh-Hans" };
      document.documentElement.lang = langMap[next];
    }
  };

  return (
    <LanguageContext.Provider value={{ locale, t: translations[locale], setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
