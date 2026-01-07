
import { GoogleGenAI } from "@google/genai";

const getAPIKey = () => process.env.API_KEY || "";

export const generateSafetyImage = async (prompt: string, stage: string): Promise<string | null> => {
  const apiKey = getAPIKey();
  if (!apiKey) {
    console.error("API Key is missing for image generation.");
    return null;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    /**
     * محفز (Prompt) فائق الدقة:
     * - يمنع النصوص تماماً لمنع ظهور كلمات مثل 'Tropical'
     * - يركز على الشخصيات والأفعال
     * - يطلب أسلوب كرتوني ثلاثي الأبعاد احترافي
     */
    const enhancedPrompt = `
      Create a high-quality 3D digital cartoon illustration in the style of a Pixar movie.
      SCENE DESCRIPTION: ${prompt}.
      MANDATORY REQUIREMENTS:
      - NO TEXT: Absolutely NO words, letters, or logos inside the image.
      - NO ABSTRACT BACKGROUNDS: Do not create wallpapers or generic patterns.
      - REALISTIC CARTOON SCENE: Show the specific character interaction and environment.
      - LIGHTING: Soft, vibrant, and child-friendly.
      - COMPOSITION: Full scene, not a collage or a background design.
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

    if (response.candidates && response.candidates[0].content.parts) {
      const imagePart = response.candidates[0].content.parts.find(p => p.inlineData);
      if (imagePart?.inlineData?.data) {
        return `data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`;
      }
    }
    return null;
  } catch (e) {
    console.error("Image generation service error:", e);
    return null;
  }
};
