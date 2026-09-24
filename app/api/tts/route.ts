import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildWav } from "@/lib/wav";
import { NextRequest } from "next/server";

interface SingleSpeakerPayload {
  mode: "single";
  text: string;
  voice: string;
}

interface Speaker {
  name: string;
  voice: string;
  text: string;
}

interface MultiSpeakerPayload {
  mode: "multi";
  speakers: Speaker[];
}

type TTSPayload = SingleSpeakerPayload | MultiSpeakerPayload;

/**
 * Retry wrapper that handles transient 503 overload errors from Gemini.
 * Gemini TTS can hit capacity spikes; exponential backoff resolves most of them.
 */
async function withRetry<T>(
  fn: () => Promise<T>,
  maxAttempts = 3,
  baseDelayMs = 1500
): Promise<T> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (err: unknown) {
      lastError = err;
      const msg = err instanceof Error ? err.message : String(err);
      const is503 =
        msg.includes("503") ||
        msg.includes("Service Unavailable") ||
        msg.includes("high demand") ||
        msg.includes("overloaded");

      if (!is503 || attempt === maxAttempts) throw err;

      const delay = baseDelayMs * Math.pow(2, attempt - 1); // 1.5s, 3s, 6s
      console.warn(`[TTS] Gemini 503 on attempt ${attempt}/${maxAttempts}. Retrying in ${delay}ms...`);
      await new Promise((r) => setTimeout(r, delay));
    }
  }
  throw lastError;
}

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const model = process.env.GEMINI_TTS_MODEL || "gemini-2.5-flash-preview-tts";

    if (!apiKey || apiKey === "your_google_ai_api_key_here") {
      return Response.json(
        {
          error:
            "GEMINI_API_KEY is not configured. Open .env.local and replace the placeholder with your real key from aistudio.google.com/apikey",
        },
        { status: 500 }
      );
    }

    const payload: TTSPayload = await req.json();

    let prompt: string;
    let speechConfig: Record<string, unknown>;

    if (payload.mode === "single") {
      const { text, voice } = payload;
      if (!text?.trim()) {
        return Response.json({ error: "Text cannot be empty." }, { status: 400 });
      }
      prompt = text;
      speechConfig = {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: voice },
        },
      };
    } else {
      const { speakers } = payload;
      if (!speakers || speakers.length < 2) {
        return Response.json(
          { error: "Multi-speaker mode requires at least 2 speakers." },
          { status: 400 }
        );
      }
      const emptyCheck = speakers.find((s) => !s.text?.trim() || !s.name?.trim());
      if (emptyCheck) {
        return Response.json(
          { error: "All speakers must have a name and text." },
          { status: 400 }
        );
      }

      prompt = speakers.map((s) => `${s.name}: ${s.text}`).join("\n");

      speechConfig = {
        multiSpeakerVoiceConfig: {
          speakerVoiceConfigs: speakers.map((s) => ({
            speaker: s.name,
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: s.voice },
            },
          })),
        },
      };
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const genModel = genAI.getGenerativeModel({ model });

    // Call Gemini with automatic retry on 503 overload
    const result = await withRetry(() =>
      genModel.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          // @ts-expect-error - TTS-specific config not yet in @google/generative-ai types
          responseModalities: ["AUDIO"],
          speechConfig,
        },
      })
    );

    const candidate = result.response.candidates?.[0];
    if (!candidate) {
      return Response.json({ error: "No response from Gemini." }, { status: 500 });
    }

    const inlineData = candidate.content?.parts?.[0]?.inlineData;
    if (!inlineData?.data) {
      return Response.json(
        {
          error:
            `Gemini returned no audio data. Ensure your model supports audio output ` +
            `(current model: "${process.env.GEMINI_TTS_MODEL || "gemini-3.8-flash"}"). ` +
            `If the issue persists, try "gemini-2.5-flash-preview-tts" as a fallback.`,
        },
        { status: 500 }
      );
    }

    const pcmBuffer = Buffer.from(inlineData.data, "base64");
    const wavBuffer = buildWav(pcmBuffer);
    // Slice to get a standalone ArrayBuffer (valid BodyInit for Response)
    const wavArrayBuffer = wavBuffer.buffer.slice(
      wavBuffer.byteOffset,
      wavBuffer.byteOffset + wavBuffer.byteLength
    );

    return new Response(wavArrayBuffer as ArrayBuffer, {
      headers: {
        "Content-Type": "audio/wav",
        "Content-Disposition": 'attachment; filename="khooltech-tts.wav"',
        "Content-Length": wavBuffer.length.toString(),
      },
    });
  } catch (err: unknown) {
    console.error("[TTS API Error]", err);

    const msg = err instanceof Error ? err.message : String(err);

    // Friendly messages for known Gemini errors
    if (msg.includes("503") || msg.includes("Service Unavailable") || msg.includes("high demand")) {
      return Response.json(
        {
          error:
            "The Gemini TTS service is temporarily overloaded. Please wait a few seconds and try again.",
        },
        { status: 503 }
      );
    }

    if (msg.includes("API_KEY_INVALID") || msg.includes("401") || msg.includes("403")) {
      return Response.json(
        {
          error:
            "Invalid or unauthorized API key. Check your GEMINI_API_KEY in .env.local and make sure it's from aistudio.google.com/apikey.",
        },
        { status: 401 }
      );
    }

    if (msg.includes("404") || msg.includes("not found") || msg.includes("INVALID_ARGUMENT")) {
      return Response.json(
        {
          error:
            `Model not found or invalid. Set GEMINI_TTS_MODEL=gemini-2.5-flash-preview-tts in .env.local. ` +
            `Current model: "${process.env.GEMINI_TTS_MODEL}"`,
        },
        { status: 400 }
      );
    }

    return Response.json({ error: msg }, { status: 500 });
  }
}
