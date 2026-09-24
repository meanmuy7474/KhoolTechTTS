"use client";

import { useRef } from "react";
import { Translations } from "@/lib/i18n";

interface FileUploadProps {
  onFileContent: (content: string) => void;
  t: Translations;
}

export default function FileUpload({ onFileContent, t }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      onFileContent(text);
    };
    reader.readAsText(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && (file.name.endsWith(".txt") || file.name.endsWith(".md"))) {
      handleFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };

  return (
    <label
      id="file-upload-zone"
      className="file-upload"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      title={t.uploadFile}
      aria-label={t.uploadFile}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".txt,.md"
        onChange={handleInputChange}
        className="file-upload__input"
        id="file-upload-input"
        aria-label="File input"
      />
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
        <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" strokeLinecap="round" />
        <path d="M12 3v12M8 7l4-4 4 4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>{t.uploadFile}</span>
    </label>
  );
}
