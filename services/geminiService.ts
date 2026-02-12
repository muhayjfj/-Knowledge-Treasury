
import { GoogleGenAI } from "@google/genai";

export const askGemini = async (prompt: string, lang: string) => {
  // Always initialize with process.env.API_KEY directly as per SDK guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstruction = `
    Identity: Knowledge Treasury Senior AI.
    Role: Provide high-quality, authentic Islamic information across Fiqh, Hadith, History, and Tafsir.
    Language Policy: ALWAYS respond in ${lang === 'ar' ? 'Arabic' : lang === 'am' ? 'Amharic' : 'English'}.
    Knowledge Base: Use your internal training + the Google Search tool for current events or place-specific queries.
    Style: Respectful, scholarly yet accessible, and structured with bullet points where helpful.
    Forbidden: Avoid modern political debates; focus on traditional authentic knowledge.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview', // High quality for global release
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        systemInstruction: systemInstruction,
        tools: [{ googleSearch: {} }],
        temperature: 0.7,
      },
    });

    // Directly access the .text property from GenerateContentResponse
    const text = response.text || "No response generated.";
    
    // Check for search grounding metadata and extract URLs
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    if (chunks && chunks.length > 0) {
      const sources = chunks
        .filter(c => c.web)
        .map(c => `\n- [${c.web.title}](${c.web.uri})`)
        .join('');
      return text + (sources ? `\n\n**المصادر من بحث جوجل:**${sources}` : '');
    }

    return text;
  } catch (error) {
    console.error("Gemini Global Error:", error);
    return lang === 'ar' ? "نعتذر، هناك ضغط كبير على الخادم العالمي حالياً." : "Global server load high, try again soon.";
  }
};
