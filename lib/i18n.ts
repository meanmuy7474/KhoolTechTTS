export type Locale = "en" | "kh" | "zh";

export interface Translations {
  // Header
  poweredBy: string;

  // Hero
  aiVoiceStudio: string;
  heroTitle: string;
  heroTitleAccent: string;
  heroSubtitle: string;

  // Mode switcher
  singleSpeaker: string;
  multiSpeaker: string;

  // Input area
  yourText: string;
  dialogueScript: string;
  textareaPlaceholder: string;
  charCount: (current: number, max: number) => string;

  // File upload
  uploadFile: string;

  // Speaker row
  speakerNamePlaceholder: (n: number) => string;
  speakerSays: (name: string, n: number) => string;
  speakerNameLabel: (n: number) => string;
  speakerVoiceLabel: (n: number) => string;
  speakerDialogueLabel: (n: number) => string;
  removeSpeaker: (n: number) => string;

  // Add speaker
  addSpeaker: string;
  addSpeakerLabel: string;

  // Generate button
  generateSpeech: string;
  generatingSpeech: string;

  // Errors
  errorEmptyText: string;
  errorFewSpeakers: string;

  // Audio
  audioReady: string;
  playLabel: string;
  pauseLabel: string;
  seekLabel: string;
  downloadWav: string;

  // Sidebar — Select Voice
  selectVoice: string;

  // Sidebar — How it works
  howItWorks: string;
  step1: string;
  step2: string;
  step3: string;
  step4: string;

  // Sidebar — Output
  output: string;
  format: string;
  sampleRate: string;
  channels: string;
  maxText: string;

  // Footer
  footer: string;
}

const en: Translations = {
  poweredBy: "Powered by Gemini 3.8 Flash",

  aiVoiceStudio: "AI Voice Studio",
  heroTitle: "Turn text into",
  heroTitleAccent: "natural speech",
  heroSubtitle:
    "Choose from 13 expressive AI voices, generate single-speaker narration or multi-speaker dialogues, and download studio-quality WAV audio instantly.",

  singleSpeaker: "Single Speaker",
  multiSpeaker: "Multi Speaker",

  yourText: "Your text",
  dialogueScript: "Dialogue script",
  textareaPlaceholder:
    "Type or paste your text here... You can also upload a .txt or .md file.",
  charCount: (current, max) => `${current} / ${max}`,

  uploadFile: "Upload .txt / .md",

  speakerNamePlaceholder: (n) => `Speaker ${n} name`,
  speakerSays: (name, n) => `What ${name || `Speaker ${n}`} says...`,
  speakerNameLabel: (n) => `Speaker ${n} name`,
  speakerVoiceLabel: (n) => `Speaker ${n} voice`,
  speakerDialogueLabel: (n) => `Speaker ${n} dialogue`,
  removeSpeaker: (n) => `Remove speaker ${n}`,

  addSpeaker: "Add Speaker",
  addSpeakerLabel: "Add another speaker",

  generateSpeech: "Generate Speech",
  generatingSpeech: "Generating speech...",

  errorEmptyText: "Please enter some text to convert to speech.",
  errorFewSpeakers: "Please fill in at least 2 speakers with names and text.",

  audioReady: "Audio ready",
  playLabel: "Play",
  pauseLabel: "Pause",
  seekLabel: "Seek",
  downloadWav: "Download WAV",

  selectVoice: "Select Voice",

  howItWorks: "How it works",
  step1: "Enter your text or upload a file",
  step2: "Pick a voice or set up a dialogue",
  step3: "Click Generate and listen instantly",
  step4: "Download your audio as WAV",

  output: "Output",
  format: "Format",
  sampleRate: "Sample rate",
  channels: "Channels",
  maxText: "Max text",

  footer: "KhoolTech TTS \u00b7 Built with Next.js & Gemini 3.8 Flash TTS",
};

const kh: Translations = {
  poweredBy: "ដំណើរការដោយ Gemini 3.8 Flash",

  aiVoiceStudio: "ស្ទូឌីយោសំឡេង AI",
  heroTitle: "បំប្លែងអត្ថបទទៅជា",
  heroTitleAccent: "សំឡេងធម្មជាតិ",
  heroSubtitle:
    "ជ្រើសរើសសំឡេង AI ដ៏រស់រវើកចំនួន ១៣ សំឡេង បង្កើតការអានអត្ថបទម្នាក់ឯង ឬការសន្ទនាគ្នាជាច្រើននាក់ និងទាញយកសំឡេងកម្រិតស្ទូឌីយោជាទម្រង់ WAV ភ្លាមៗ។",

  singleSpeaker: "អ្នកនិយាយម្នាក់",
  multiSpeaker: "អ្នកនិយាយច្រើននាក់",

  yourText: "អត្ថបទរបស់អ្នក",
  dialogueScript: "ស្គ្រីបការសន្ទនា",
  textareaPlaceholder:
    "វាយ ឬបិទភ្ជាប់អត្ថបទរបស់អ្នកនៅទីនេះ... អ្នកក៏អាចផ្ទុកឡើងនូវឯកសារ .txt ឬ .md ផងដែរ។",
  charCount: (current, max) => `${current} / ${max}`,

  uploadFile: "ផ្ទុកឡើង .txt / .md",

  speakerNamePlaceholder: (n) => `ឈ្មោះអ្នកនិយាយទី ${n}`,
  speakerSays: (name, n) => `ពាក្យសម្តីរបស់ ${name || `អ្នកនិយាយទី ${n}`}...`,
  speakerNameLabel: (n) => `ឈ្មោះអ្នកនិយាយទី ${n}`,
  speakerVoiceLabel: (n) => `សំឡេងរបស់អ្នកនិយាយទី ${n}`,
  speakerDialogueLabel: (n) => `កិច្ចសន្ទនារបស់អ្នកនិយាយទី ${n}`,
  removeSpeaker: (n) => `លុបអ្នកនិយាយទី ${n}`,

  addSpeaker: "បន្ថែមអ្នកនិយាយ",
  addSpeakerLabel: "បន្ថែមអ្នកនិយាយម្នាក់ទៀត",

  generateSpeech: "បង្កើតសំឡេង",
  generatingSpeech: "កំពុងបង្កើតសំឡេង...",

  errorEmptyText: "សូមបញ្ចូលអត្ថបទដើម្បីបំប្លែងទៅជាសំឡេង។",
  errorFewSpeakers: "សូមបំពេញព័ត៌មានយ៉ាងតិច ២ នាក់ ដោយមានឈ្មោះ និងអត្ថបទសន្ទនា។",

  audioReady: "សំឡេងរួចរាល់ហើយ",
  playLabel: "ចាក់សំឡេង",
  pauseLabel: "ផ្អាក",
  seekLabel: "រំកិល",
  downloadWav: "ទាញយក WAV",

  selectVoice: "ជ្រើសរើសសំឡេង",

  howItWorks: "របៀបប្រើប្រាស់",
  step1: "បញ្ចូលអត្ថបទ ឬផ្ទុកឡើងនូវឯកសារ",
  step2: "ជ្រើសរើសសំឡេង ឬរៀបចំកិច្ចសន្ទនា",
  step3: "ចុចប៊ូតុងបង្កើត ហើយស្តាប់ភ្លាមៗ",
  step4: "ទាញយកសំឡេងរបស់អ្នកជាទម្រង់ WAV",

  output: "លទ្ធផលសំឡេង",
  format: "ទម្រង់ឯកសារ",
  sampleRate: "កម្រិតគំរូ (Sample rate)",
  channels: "ប៉ុស្តិ៍សំឡេង (Channels)",
  maxText: "ប្រវែងអត្ថបទអតិបរមា",

  footer: "KhoolTech TTS · បង្កើតឡើងដោយ Next.js & Gemini 3.8 Flash TTS",
};

const zh: Translations = {
  poweredBy: "由 Gemini 3.8 Flash 驱动",

  aiVoiceStudio: "AI \u8bed\u97f3\u5de5\u4f5c\u5ba4",
  heroTitle: "\u5c06\u6587\u5b57\u8f6c\u5316\u4e3a",
  heroTitleAccent: "\u81ea\u7136\u8bed\u97f3",
  heroSubtitle:
    "\u4ece 13 \u79cd\u5bcc\u6709\u8868\u73b0\u529b\u7684 AI \u58f0\u97f3\u4e2d\u9009\u62e9\uff0c\u751f\u6210\u5355\u4eba\u65c1\u767d\u6216\u591a\u4eba\u5bf9\u8bdd\uff0c\u5e76\u5373\u65f6\u4e0b\u8f7d\u5f55\u97f3\u5ba4\u54c1\u8d28\u7684 WAV \u97f3\u9891\u3002",

  singleSpeaker: "\u5355\u4eba\u6a21\u5f0f",
  multiSpeaker: "\u591a\u4eba\u6a21\u5f0f",

  yourText: "\u60a8\u7684\u6587\u5b57",
  dialogueScript: "\u5bf9\u8bdd\u811a\u672c",
  textareaPlaceholder: "\u5728\u6b64\u8f93\u5165\u6216\u7c98\u8d34\u60a8\u7684\u6587\u5b57\u2026 \u4e5f\u53ef\u4e0a\u4f20 .txt \u6216 .md \u6587\u4ef6\u3002",
  charCount: (current, max) => `${current} / ${max}`,

  uploadFile: "\u4e0a\u4f20 .txt / .md",

  speakerNamePlaceholder: (n) => `\u53d1\u8a00\u4eba ${n} \u7684\u540d\u5b57`,
  speakerSays: (name, n) => `${name || `\u53d1\u8a00\u4eba ${n}`} \u8bf4\u7684\u8bdd\u2026`,
  speakerNameLabel: (n) => `\u53d1\u8a00\u4eba ${n} \u7684\u540d\u5b57`,
  speakerVoiceLabel: (n) => `\u53d1\u8a00\u4eba ${n} \u7684\u58f0\u97f3`,
  speakerDialogueLabel: (n) => `\u53d1\u8a00\u4eba ${n} \u7684\u5bf9\u8bdd`,
  removeSpeaker: (n) => `\u5220\u9664\u53d1\u8a00\u4eba ${n}`,

  addSpeaker: "\u6dfb\u52a0\u53d1\u8a00\u4eba",
  addSpeakerLabel: "\u518d\u6dfb\u52a0\u4e00\u4f4d\u53d1\u8a00\u4eba",

  generateSpeech: "\u751f\u6210\u8bed\u97f3",
  generatingSpeech: "\u6b63\u5728\u751f\u6210\u8bed\u97f3\u2026",

  errorEmptyText: "\u8bf7\u8f93\u5165\u8981\u8f6c\u6362\u4e3a\u8bed\u97f3\u7684\u6587\u5b57\u3002",
  errorFewSpeakers: "\u8bf7\u81f3\u5c11\u586b\u5199 2 \u4f4d\u53d1\u8a00\u4eba\u7684\u59d3\u540d\u548c\u6587\u5b57\u3002",

  audioReady: "\u97f3\u9891\u5df2\u5c31\u7eea",
  playLabel: "\u64ad\u653e",
  pauseLabel: "\u6682\u505c",
  seekLabel: "\u62d6\u52a8\u8fdb\u5ea6",
  downloadWav: "\u4e0b\u8f7d WAV",

  selectVoice: "\u9009\u62e9\u58f0\u97f3",

  howItWorks: "\u4f7f\u7528\u65b9\u6cd5",
  step1: "\u8f93\u5165\u6587\u5b57\u6216\u4e0a\u4f20\u6587\u4ef6",
  step2: "\u9009\u62e9\u58f0\u97f3\u6216\u8bbe\u7f6e\u5bf9\u8bdd",
  step3: "\u70b9\u51fb\u751f\u6210\uff0c\u7acb\u5373\u6536\u542c",
  step4: "\u5c06\u97f3\u9891\u4e0b\u8f7d\u4e3a WAV \u6587\u4ef6",

  output: "\u8f93\u51fa",
  format: "\u683c\u5f0f",
  sampleRate: "\u91c7\u6837\u7387",
  channels: "\u58f0\u9053",
  maxText: "\u6700\u5927\u6587\u5b57",

  footer: "KhoolTech TTS \u00b7 \u57fa\u4e8e Next.js & Gemini 3.8 Flash TTS \u6784\u5efa",
};

export const translations: Record<Locale, Translations> = { en, kh, zh };

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN",
  kh: "\u1781\u17d2\u1798\u17c2\u179a",
  zh: "\u4e2d\u6587",
};
