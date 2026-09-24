export interface Voice {
  name: string;
  gender: "Male" | "Female";
  tone: string;
  description: string;
  color: string; // accent color for the card
}

export const VOICES: Voice[] = [
  { name: "Aoede",     gender: "Female", tone: "Breezy",      description: "Relaxed and natural",       color: "#a78bfa" },
  { name: "Charon",    gender: "Male",   tone: "Informative", description: "Calm and professional",     color: "#60a5fa" },
  { name: "Fenrir",    gender: "Male",   tone: "Excitable",   description: "Passionate and energetic",  color: "#f87171" },
  { name: "Kore",      gender: "Female", tone: "Firm",        description: "Strong and confident",      color: "#34d399" },
  { name: "Puck",      gender: "Male",   tone: "Upbeat",      description: "Upbeat and lively",         color: "#fbbf24" },
  { name: "Zephyr",    gender: "Female", tone: "Bright",      description: "Clear and bright",          color: "#22d3ee" },
  { name: "Leda",      gender: "Female", tone: "Youthful",    description: "Young and fresh",           color: "#f472b6" },
  { name: "Orus",      gender: "Male",   tone: "Deep",        description: "Deep and resonant",         color: "#818cf8" },
  { name: "Autonoe",   gender: "Female", tone: "Soft",        description: "Gentle and soothing",       color: "#86efac" },
  { name: "Enceladus", gender: "Male",   tone: "Breathy",     description: "Warm and intimate",         color: "#fb923c" },
  { name: "Umbriel",   gender: "Male",   tone: "Easy-going",  description: "Relaxed conversational",    color: "#94a3b8" },
  { name: "Algieba",   gender: "Male",   tone: "Smooth",      description: "Rich and smooth",           color: "#c084fc" },
  { name: "Despina",   gender: "Female", tone: "Elegant",     description: "Elegant and polished",      color: "#f9a8d4" },
];
