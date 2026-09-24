"use client";

import { useState, useCallback } from "react";
import { VOICES } from "@/lib/voices";
import VoiceCard from "@/components/VoiceCard";
import AudioPlayer from "@/components/AudioPlayer";
import FileUpload from "@/components/FileUpload";
import SpeakerRow, { SpeakerData } from "@/components/SpeakerRow";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";

type Mode = "single" | "multi";

function generateId() {
  return Math.random().toString(36).slice(2, 9);
}

const MAX_CHARS = 5000;

export default function Home() {
  const { t } = useLanguage();

  // Single speaker state
  const [text, setText] = useState("");
  const [selectedVoice, setSelectedVoice] = useState(VOICES[0].name);

  // Multi speaker state
  const [speakers, setSpeakers] = useState<SpeakerData[]>([
    { id: generateId(), name: "Alex", voice: VOICES[0].name, text: "" },
    { id: generateId(), name: "Jordan", voice: VOICES[1].name, text: "" },
  ]);

  // Shared state
  const [mode, setMode] = useState<Mode>("single");
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setError(null);
    setAudioUrl(null);
    setIsLoading(true);

    try {
      let body: Record<string, unknown>;

      if (mode === "single") {
        if (!text.trim()) {
          throw new Error(t.errorEmptyText);
        }
        body = { mode: "single", text, voice: selectedVoice };
      } else {
        const filledSpeakers = speakers.filter(
          (s) => s.name.trim() && s.text.trim()
        );
        if (filledSpeakers.length < 2) {
          throw new Error(t.errorFewSpeakers);
        }
        body = { mode: "multi", speakers: filledSpeakers };
      }

      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: "Unknown error" }));
        throw new Error(data.error || `Request failed (${res.status})`);
      }

      const blob = await res.blob();
      setAudioBlob(blob);
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = useCallback(() => {
    if (!audioBlob) return;
    const url = URL.createObjectURL(audioBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "khooltech-tts.wav";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [audioBlob]);

  const handleFileContent = (content: string) => {
    setText(content.slice(0, MAX_CHARS));
  };

  // Speaker management
  const addSpeaker = () => {
    if (speakers.length >= 6) return;
    const nextVoice = VOICES[speakers.length % VOICES.length].name;
    setSpeakers((prev) => [
      ...prev,
      { id: generateId(), name: `Speaker ${prev.length + 1}`, voice: nextVoice, text: "" },
    ]);
  };

  const updateSpeaker = (id: string, field: keyof SpeakerData, value: string) => {
    setSpeakers((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const removeSpeaker = (id: string) => {
    setSpeakers((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <>
      {/* Animated background orbs */}
      <div className="app-bg" aria-hidden="true">
        <div className="app-bg__orb app-bg__orb--1" />
        <div className="app-bg__orb app-bg__orb--2" />
        <div className="app-bg__orb app-bg__orb--3" />
      </div>

      <div className="app">
        {/* Header */}
        <header className="header" role="banner">
          <div className="header__logo">
            <div className="header__logo-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M9 18V5l12-2v13" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="6" cy="18" r="3" />
                <circle cx="18" cy="16" r="3" />
              </svg>
            </div>
            <span className="header__logo-text">
              Khool<span>Tech</span> TTS
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <LanguageSwitcher />
            <span className="header__badge">{t.poweredBy}</span>
          </div>
        </header>

        {/* Main */}
        <main className="main" id="main-content">
          {/* Hero */}
          <section className="hero" aria-labelledby="hero-title">
            <div className="hero__eyebrow" aria-hidden="true">{t.aiVoiceStudio}</div>
            <h1 className="hero__title" id="hero-title">
              {t.heroTitle}{" "}
              <span className="hero__title-accent">{t.heroTitleAccent}</span>
            </h1>
            <p className="hero__subtitle">{t.heroSubtitle}</p>
          </section>

          {/* Studio */}
          <div className="studio">
            {/* Left — Input Panel */}
            <div className="card card--elevated">
              {/* Mode Switcher */}
              <div className="mode-switcher" role="tablist" aria-label="TTS mode">
                <button
                  id="mode-single"
                  role="tab"
                  aria-selected={mode === "single"}
                  className={`mode-btn ${mode === "single" ? "mode-btn--active" : ""}`}
                  onClick={() => setMode("single")}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round" />
                  </svg>
                  {t.singleSpeaker}
                </button>
                <button
                  id="mode-multi"
                  role="tab"
                  aria-selected={mode === "multi"}
                  className={`mode-btn ${mode === "multi" ? "mode-btn--active" : ""}`}
                  onClick={() => setMode("multi")}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="8" cy="8" r="3" />
                    <circle cx="16" cy="8" r="3" />
                    <path d="M2 20c0-3 2.7-5.5 6-5.5" strokeLinecap="round" />
                    <path d="M22 20c0-3-2.7-5.5-6-5.5" strokeLinecap="round" />
                    <path d="M9 20c0-2.8 2-4.5 3-4.5s3 1.7 3 4.5" strokeLinecap="round" />
                  </svg>
                  {t.multiSpeaker}
                </button>
              </div>

              {/* Single speaker input */}
              {mode === "single" && (
                <div className="input-area" role="tabpanel" aria-labelledby="mode-single">
                  <div className="input-area__top">
                    <span className="section-label">{t.yourText}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <span className="char-count">
                        {t.charCount(text.length, MAX_CHARS)}
                      </span>
                      <FileUpload onFileContent={handleFileContent} t={t} />
                    </div>
                  </div>
                  <textarea
                    id="tts-text-input"
                    className="textarea"
                    placeholder={t.textareaPlaceholder}
                    value={text}
                    onChange={(e) => setText(e.target.value.slice(0, MAX_CHARS))}
                    rows={10}
                    aria-label={t.yourText}
                  />
                </div>
              )}

              {/* Multi speaker input */}
              {mode === "multi" && (
                <div role="tabpanel" aria-labelledby="mode-multi">
                  <div className="input-area__top" style={{ marginBottom: "16px" }}>
                    <span className="section-label">{t.dialogueScript}</span>
                    <FileUpload onFileContent={handleFileContent} t={t} />
                  </div>
                  <div className="speakers-panel">
                    {speakers.map((speaker, index) => (
                      <SpeakerRow
                        key={speaker.id}
                        speaker={speaker}
                        index={index}
                        onUpdate={updateSpeaker}
                        onRemove={removeSpeaker}
                        canRemove={speakers.length > 2}
                        t={t}
                      />
                    ))}
                    {speakers.length < 6 && (
                      <button
                        id="add-speaker-btn"
                        className="add-speaker-btn"
                        onClick={addSpeaker}
                        aria-label={t.addSpeakerLabel}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                          <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                        </svg>
                        {t.addSpeaker}
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="error-toast" role="alert" aria-live="polite">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v4M12 16h.01" strokeLinecap="round" />
                  </svg>
                  {error}
                </div>
              )}

              {/* Generate */}
              <button
                id="generate-btn"
                className="generate-btn"
                onClick={handleGenerate}
                disabled={isLoading}
                aria-busy={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner" aria-hidden="true" />
                    {t.generatingSpeech}
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                      <polygon points="5,3 19,12 5,21" fill="currentColor" stroke="none" />
                    </svg>
                    {t.generateSpeech}
                  </>
                )}
              </button>

              {/* Audio player */}
              {audioUrl && (
                <div className="audio-player-wrapper">
                  <div className="success-label" aria-live="polite">{t.audioReady}</div>
                  <AudioPlayer audioUrl={audioUrl} onDownload={handleDownload} t={t} />
                </div>
              )}
            </div>

            {/* Right — Voice Panel */}
            <aside className="sidebar" aria-label="Voice configuration">
              {/* Voice selector (single mode) */}
              {mode === "single" && (
                <div className="card card--elevated">
                  <p className="sidebar-card-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z" />
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2" strokeLinecap="round" />
                      <line x1="12" y1="19" x2="12" y2="23" strokeLinecap="round" />
                      <line x1="8" y1="23" x2="16" y2="23" strokeLinecap="round" />
                    </svg>
                    {t.selectVoice}
                  </p>
                  <div className="voice-grid" role="radiogroup" aria-label={t.selectVoice}>
                    {VOICES.map((voice) => (
                      <VoiceCard
                        key={voice.name}
                        voice={voice}
                        selected={selectedVoice === voice.name}
                        onSelect={setSelectedVoice}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Info card */}
              <div className="card">
                <p className="sidebar-card-title">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4M12 8h.01" strokeLinecap="round" />
                  </svg>
                  {t.howItWorks}
                </p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
                  {[t.step1, t.step2, t.step3, t.step4].map((text, i) => (
                    <li
                      key={i}
                      style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "0.85rem", color: "var(--text-muted)" }}
                    >
                      <span
                        style={{
                          width: "22px", height: "22px", borderRadius: "50%",
                          background: "var(--surface-3)", border: "1px solid var(--border)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "0.7rem", fontWeight: "700", color: "var(--accent-light)",
                          flexShrink: 0,
                        }}
                      >
                        {i + 1}
                      </span>
                      {text}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Supported formats */}
              <div className="card">
                <p className="sidebar-card-title">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  {t.output}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {[
                    { label: t.format, value: "WAV (PCM 16-bit)" },
                    { label: t.sampleRate, value: "24,000 Hz" },
                    { label: t.channels, value: "Mono" },
                    { label: t.maxText, value: "5,000 chars" },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem" }}>
                      <span style={{ color: "var(--text-subtle)" }}>{label}</span>
                      <span style={{ color: "var(--text-muted)", fontWeight: "500" }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </main>

        {/* Footer */}
        <footer
          style={{
            textAlign: "center",
            padding: "24px",
            borderTop: "1px solid var(--border)",
            fontSize: "0.78rem",
            color: "var(--text-subtle)",
          }}
        >
          {t.footer}
        </footer>
      </div>
    </>
  );
}
