"use client";

import { useRef, useState, useEffect } from "react";
import { Translations } from "@/lib/i18n";

interface AudioPlayerProps {
  audioUrl: string;
  onDownload: () => void;
  t: Translations;
}

export default function AudioPlayer({ audioUrl, onDownload, t }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onDurationChange = () => setDuration(audio.duration);
    const onEnded = () => setIsPlaying(false);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("durationchange", onDurationChange);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    // Auto-play when URL is set
    audio.play().catch(() => {});

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("durationchange", onDurationChange);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, [audioUrl]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Number(e.target.value);
  };

  const formatTime = (s: number) => {
    if (!isFinite(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const bars = Array.from({ length: 28 });

  return (
    <div className="audio-player" role="region" aria-label="Audio player">
      <audio ref={audioRef} src={audioUrl} preload="auto" />

      {/* Waveform visualizer */}
      <div className="waveform" aria-hidden="true">
        {bars.map((_, i) => (
          <div
            key={i}
            className={`waveform__bar ${isPlaying ? "waveform__bar--animate" : ""}`}
            style={{ animationDelay: `${(i % 7) * 0.08}s` }}
          />
        ))}
      </div>

      {/* Controls row */}
      <div className="audio-controls">
        <button
          id="audio-play-pause"
          className="audio-btn audio-btn--play"
          onClick={togglePlay}
          aria-label={isPlaying ? t.pauseLabel : t.playLabel}
        >
          {isPlaying ? (
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M8 5.14v14l11-7-11-7z" />
            </svg>
          )}
        </button>

        <span className="audio-time">{formatTime(currentTime)}</span>

        <input
          id="audio-seek"
          type="range"
          className="audio-seek"
          min={0}
          max={duration || 0}
          step={0.1}
          value={currentTime}
          onChange={handleSeek}
          aria-label={t.seekLabel}
        />

        <span className="audio-time">{formatTime(duration)}</span>

        <button
          id="audio-download"
          className="audio-btn audio-btn--download"
          onClick={onDownload}
          aria-label={t.downloadWav}
          title={t.downloadWav}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
            <path d="M12 3v12M8 11l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 20h16" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
