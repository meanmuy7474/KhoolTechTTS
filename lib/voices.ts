import { Translations } from "./i18n";

export type VoiceLanguage = "kh" | "en" | "zh" | "multi";

export interface Voice {
  name: string;
  gender: "Male" | "Female";
  tone: string;
  description: string;
  color: string; // accent color for the card
  languageGroup: VoiceLanguage;
  badgeLabel: string;
  supportedLanguages: ("kh" | "en" | "zh" | "multi")[];
}

export const VOICES: Voice[] = [
  // Khmer (ខ្មែរ)
  { name: "Kore",      gender: "Female", tone: "Firm",        description: "Strong and confident",      color: "#34d399", languageGroup: "kh", badgeLabel: "KH", supportedLanguages: ["kh", "multi"] },
  { name: "Algieba",   gender: "Male",   tone: "Smooth",      description: "Rich and smooth",           color: "#c084fc", languageGroup: "kh", badgeLabel: "KH", supportedLanguages: ["kh", "multi"] },
  { name: "Autonoe",   gender: "Female", tone: "Soft",        description: "Gentle and soothing",       color: "#86efac", languageGroup: "kh", badgeLabel: "KH", supportedLanguages: ["kh", "multi"] },

  // English
  { name: "Aoede",     gender: "Female", tone: "Breezy",      description: "Relaxed and natural",       color: "#a78bfa", languageGroup: "en", badgeLabel: "EN", supportedLanguages: ["en", "multi"] },
  { name: "Charon",    gender: "Male",   tone: "Informative", description: "Calm and professional",     color: "#60a5fa", languageGroup: "en", badgeLabel: "EN", supportedLanguages: ["en", "multi"] },
  { name: "Fenrir",    gender: "Male",   tone: "Excitable",   description: "Passionate and energetic",  color: "#f87171", languageGroup: "en", badgeLabel: "EN", supportedLanguages: ["en", "multi"] },
  { name: "Puck",      gender: "Male",   tone: "Upbeat",      description: "Upbeat and lively",         color: "#fbbf24", languageGroup: "en", badgeLabel: "EN", supportedLanguages: ["en", "multi"] },

  // Chinese (中文)
  { name: "Leda",      gender: "Female", tone: "Youthful",    description: "Young and fresh",           color: "#f472b6", languageGroup: "zh", badgeLabel: "ZH", supportedLanguages: ["zh", "multi"] },
  { name: "Despina",   gender: "Female", tone: "Elegant",     description: "Elegant and polished",      color: "#f9a8d4", languageGroup: "zh", badgeLabel: "ZH", supportedLanguages: ["zh", "multi"] },
  { name: "Orus",      gender: "Male",   tone: "Deep",        description: "Deep and resonant",         color: "#818cf8", languageGroup: "zh", badgeLabel: "ZH", supportedLanguages: ["zh", "multi"] },

  // Multilingual (ពហុភាសា / 多语言)
  { name: "Zephyr",    gender: "Female", tone: "Bright",      description: "Clear and bright",          color: "#22d3ee", languageGroup: "multi", badgeLabel: "MULTI", supportedLanguages: ["multi", "kh", "en", "zh"] },
  { name: "Enceladus", gender: "Male",   tone: "Breathy",     description: "Warm and intimate",         color: "#fb923c", languageGroup: "multi", badgeLabel: "MULTI", supportedLanguages: ["multi", "kh", "en", "zh"] },
  { name: "Umbriel",   gender: "Male",   tone: "Easy-going",  description: "Relaxed conversational",    color: "#94a3b8", languageGroup: "multi", badgeLabel: "MULTI", supportedLanguages: ["multi", "kh", "en", "zh"] },
];

export function getGroupedVoices(t: Translations): { id: VoiceLanguage; label: string; voices: Voice[] }[] {
  return [
    {
      id: "kh",
      label: t.langKhmer,
      voices: VOICES.filter((v) => v.languageGroup === "kh"),
    },
    {
      id: "en",
      label: t.langEnglish,
      voices: VOICES.filter((v) => v.languageGroup === "en"),
    },
    {
      id: "zh",
      label: t.langChinese,
      voices: VOICES.filter((v) => v.languageGroup === "zh"),
    },
    {
      id: "multi",
      label: t.langMultilingual,
      voices: VOICES.filter((v) => v.languageGroup === "multi"),
    },
  ];
}
