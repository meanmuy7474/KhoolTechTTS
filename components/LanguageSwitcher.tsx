"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Locale, LOCALE_LABELS } from "@/lib/i18n";

const LOCALES: Locale[] = ["en", "kh", "zh"];

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="lang-switcher" role="group" aria-label="Language selector">
      {LOCALES.map((l) => (
        <button
          key={l}
          id={`lang-${l}`}
          className={`lang-btn${locale === l ? " lang-btn--active" : ""}`}
          onClick={() => setLocale(l)}
          aria-pressed={locale === l}
          title={LOCALE_LABELS[l]}
        >
          {LOCALE_LABELS[l]}
        </button>
      ))}
    </div>
  );
}
