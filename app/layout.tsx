import type { Metadata } from "next";
import { Inter, Kantumruy_Pro } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const kantumruy = Kantumruy_Pro({
  subsets: ["khmer", "latin"],
  variable: "--font-khmer",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KhoolTech TTS — AI Voice Studio",
  description:
    "Professional text-to-speech studio powered by Google Gemini 2.5 Flash. Convert text to natural, expressive audio with 13 premium AI voices.",
  keywords: ["text-to-speech", "TTS", "AI voice", "Gemini", "audio generation"],
  openGraph: {
    title: "KhoolTech TTS — AI Voice Studio",
    description: "Professional TTS studio powered by Google Gemini 2.5 Flash",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${kantumruy.variable}`}>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
