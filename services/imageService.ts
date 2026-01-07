
import { GoogleGenAI } from "@google/genai";

const getAPIKey = () => process.env.API_KEY || "";

export const generateSafetyImage = async (prompt: string, _stage: string): Promise<string | null> => {
  const apiKey = getAPIKey();
  if (!apiKey) {
    console.error("API Key is missing for image generation.");
    return null;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const enhancedPrompt = `
      Create a high-quality 3D digital cartoon illustration in the style of a Pixar movie.
      SCENE DESCRIPTION: ${prompt}.
      MANDATORY: NO TEXT, NO WORDS, child-friendly, vibrant colors, 16:9 aspect ratio.
    `.trim();
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: enhancedPrompt }],
      },
      config: { 
        imageConfig: { 
          aspectRatio: "16:9" 
        } 
      },
    });

    // استخدام Optional Chaining والتحقق من القيمة لضمان سلامة النوع (Type Safety)
    const candidate = response.candidates?.[0];
    const parts = candidate?.content?.parts;

    if (parts && Array.isArray(parts)) {
      const imagePart = parts.find(p => p.inlineData);
      if (imagePart?.inlineData?.data) {
        const mimeType = imagePart.inlineData.mimeType || "image/png";
        const data = imagePart.inlineData.data;
        return `data:${mimeType};base64,${data}`;
      }
    }
    
    return null;
  } catch (e) {
    console.error("Image generation service error:", e);
    return null;
  }
};
