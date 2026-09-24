"use client";

import { VOICES } from "@/lib/voices";
import { Translations } from "@/lib/i18n";

export interface SpeakerData {
  id: string;
  name: string;
  voice: string;
  text: string;
}

interface SpeakerRowProps {
  speaker: SpeakerData;
  index: number;
  onUpdate: (id: string, field: keyof SpeakerData, value: string) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
  t: Translations;
}

const SPEAKER_COLORS = ["#a78bfa", "#60a5fa", "#f87171", "#34d399", "#fbbf24", "#22d3ee"];

export default function SpeakerRow({ speaker, index, onUpdate, onRemove, canRemove, t }: SpeakerRowProps) {
  const accentColor = SPEAKER_COLORS[index % SPEAKER_COLORS.length];

  return (
    <div
      className="speaker-row"
      style={{ "--speaker-color": accentColor } as React.CSSProperties}
      id={`speaker-row-${speaker.id}`}
    >
      <div className="speaker-row__header">
        <div className="speaker-row__index">{index + 1}</div>
        <input
          id={`speaker-name-${speaker.id}`}
          className="speaker-row__name-input"
          type="text"
          placeholder={t.speakerNamePlaceholder(index + 1)}
          value={speaker.name}
          onChange={(e) => onUpdate(speaker.id, "name", e.target.value)}
          maxLength={30}
          aria-label={t.speakerNameLabel(index + 1)}
        />
        <select
          id={`speaker-voice-${speaker.id}`}
          className="speaker-row__voice-select"
          value={speaker.voice}
          onChange={(e) => onUpdate(speaker.id, "voice", e.target.value)}
          aria-label={t.speakerVoiceLabel(index + 1)}
        >
          {VOICES.map((v) => (
            <option key={v.name} value={v.name}>
              {v.name} — {v.tone} {v.gender === "Female" ? "♀" : "♂"}
            </option>
          ))}
        </select>
        {canRemove && (
          <button
            id={`speaker-remove-${speaker.id}`}
            className="speaker-row__remove"
            onClick={() => onRemove(speaker.id)}
            aria-label={t.removeSpeaker(index + 1)}
            title={t.removeSpeaker(index + 1)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>
      <textarea
        id={`speaker-text-${speaker.id}`}
        className="speaker-row__textarea"
        placeholder={t.speakerSays(speaker.name, index + 1)}
        value={speaker.text}
        onChange={(e) => onUpdate(speaker.id, "text", e.target.value)}
        rows={3}
        aria-label={t.speakerDialogueLabel(index + 1)}
      />
    </div>
  );
}
