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
  voiceFilterLabel: string;
  allLanguages: string;
  langEnglish: string;
  langKhmer: string;
  langChinese: string;
  langMultilingual: string;
  noVoicesFound: string;

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
  voiceFilterLabel: "Language Support",
  allLanguages: "All Languages",
  langEnglish: "English",
  langKhmer: "Khmer (ខ្មែរ)",
  langChinese: "Chinese (中文)",
  langMultilingual: "Multilingual",
  noVoicesFound: "No voices found for this language filter.",

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

  footer: "KhoolTech TTS · Built with Next.js & Gemini 3.8 Flash TTS",
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
  voiceFilterLabel: "ការគាំទ្រភាសា",
  allLanguages: "ភាសាទាំងអស់",
  langEnglish: "អង់គ្លេស",
  langKhmer: "ខ្មែរ (Khmer)",
  langChinese: "ចិន (Chinese)",
  langMultilingual: "ពហុភាសា (Multilingual)",
  noVoicesFound: "រកមិនឃើញសំឡេងសម្រាប់តម្រងភាសានេះទេ។",

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

  aiVoiceStudio: "AI 语音工作室",
  heroTitle: "将文字转化为",
  heroTitleAccent: "自然语音",
  heroSubtitle:
    "从 13 种富有表现力的 AI 声音中选择，生成单人旁白或多人对话，并即时下载录音室品质的 WAV 音频。",

  singleSpeaker: "单人模式",
  multiSpeaker: "多人模式",

  yourText: "您的文字",
  dialogueScript: "对话脚本",
  textareaPlaceholder: "在此输入或粘贴您的文字… 也可以上传 .txt 或 .md 文件。",
  charCount: (current, max) => `${current} / ${max}`,

  uploadFile: "上传 .txt / .md",

  speakerNamePlaceholder: (n) => `发言人 ${n} 的名字`,
  speakerSays: (name, n) => `${name || `发言人 ${n}`} 说的话…`,
  speakerNameLabel: (n) => `发言人 ${n} 的名字`,
  speakerVoiceLabel: (n) => `发言人 ${n} 的声音`,
  speakerDialogueLabel: (n) => `发言人 ${n} 的对话`,
  removeSpeaker: (n) => `删除发言人 ${n}`,

  addSpeaker: "添加发言人",
  addSpeakerLabel: "再添加一位发言人",

  generateSpeech: "生成语音",
  generatingSpeech: "正在生成语音…",

  errorEmptyText: "请输入要转换为语音的文字。",
  errorFewSpeakers: "请至少填写 2 位发言人的姓名和文字。",

  audioReady: "音频已就绪",
  playLabel: "播放",
  pauseLabel: "暂停",
  seekLabel: "拖动进度",
  downloadWav: "下载 WAV",

  selectVoice: "选择声音",
  voiceFilterLabel: "语言支持",
  allLanguages: "所有语言",
  langEnglish: "英语 (English)",
  langKhmer: "高棉语 (ខ្មែរ)",
  langChinese: "中文 (Chinese)",
  langMultilingual: "多语言 (Multilingual)",
  noVoicesFound: "未找到符合该语言筛选的声音。",

  howItWorks: "使用方法",
  step1: "输入文字或上传文件",
  step2: "选择声音或设置对话",
  step3: "点击生成，立即收听",
  step4: "将音频下载为 WAV 文件",

  output: "输出",
  format: "格式",
  sampleRate: "采样率",
  channels: "声道",
  maxText: "最大文字",

  footer: "KhoolTech TTS · 基于 Next.js & Gemini 3.8 Flash TTS 构建",
};

export const translations: Record<Locale, Translations> = { en, kh, zh };

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN",
  kh: "\u1781\u17d2\u1798\u17c2\u179a",
  zh: "\u4e2d\u6587",
};
