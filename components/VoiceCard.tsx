"use client";

import { Voice } from "@/lib/voices";

interface VoiceCardProps {
  voice: Voice;
  selected: boolean;
  onSelect: (name: string) => void;
}

export default function VoiceCard({ voice, selected, onSelect }: VoiceCardProps) {
  return (
    <button
      id={`voice-card-${voice.name.toLowerCase()}`}
      className={`voice-card ${selected ? "voice-card--selected" : ""}`}
      onClick={() => onSelect(voice.name)}
      aria-pressed={selected}
      title={voice.description}
      style={{ "--voice-color": voice.color } as React.CSSProperties}
    >
      <div className="voice-card__icon">
        {voice.gender === "Female" ? (
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
            <path d="M5 21v-2a7 7 0 0 1 14 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
            <path d="M5 21v-2a7 7 0 0 1 14 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        )}
      </div>
      <div className="voice-card__body">
        <span className="voice-card__name">{voice.name}</span>
        <span className="voice-card__tone">{voice.tone}</span>
      </div>
      <span className="voice-card__gender">
        {voice.gender === "Female" ? "♀" : "♂"}
      </span>
      {selected && (
        <span className="voice-card__check" aria-hidden="true">✓</span>
      )}
    </button>
  );
}
