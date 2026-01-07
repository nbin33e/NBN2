
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

    // إصلاح الخطأ البرمجي هنا باستخدام تحققات صريحة (Explicit Checks)
    const candidates = response.candidates;
    if (candidates && candidates.length > 0 && candidates[0].content && candidates[0].content.parts) {
      const parts = candidates[0].content.parts;
      const imagePart = parts.find(p => p.inlineData);
      
      // التأكد من وجود inlineData و data قبل استخدامهما
      if (imagePart && imagePart.inlineData && imagePart.inlineData.data) {
        const mimeType = imagePart.inlineData.mimeType;
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
