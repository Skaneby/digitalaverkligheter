
import { GoogleGenAI, Type } from "@google/genai";
import { Language, SiteContent } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Intelligent skrapa som analyserar digitalaverkligheter.se.
 * Den letar efter kärntjänster, vision och blogginlägg.
 */
export const analyzeSiteContent = async (url: string): Promise<SiteContent | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Gör en professionell analys av webbplatsen ${url}. 
      Agera som en webbutvecklare som ska migrera innehåll till en ny modern plattform.
      
      Leta efter:
      1. HUVUDTEXT: Vad är kärnbudskapet på startsidan?
      2. TJÄNSTER: Vilka är de faktiska tjänsterna (t.ex. Videoproduktion, Digital Strategi, IT-konsulting)?
      3. PROJEKT: Leta efter projektbeskrivningar (inklusive eventuella referenser till VibeResearcher som ett pågående projekt).
      4. BLOGG: Extrahera de senaste nyheterna eller artiklarna.
      
      Viktigt: Ignorera 404-länkar. Returnera ett JSON-objekt på SVENSKA med korrekt struktur för en portföljsida.`,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            heroTitle: { type: Type.STRING },
            heroSubtitle: { type: Type.STRING },
            capabilities: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  icon: { type: Type.STRING }
                }
              }
            },
            blogPosts: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  title: { type: Type.STRING },
                  excerpt: { type: Type.STRING },
                  tag: { type: Type.STRING },
                  imageUrl: { type: Type.STRING }
                }
              }
            }
          }
        }
      }
    });

    return JSON.parse(response.text || '{}') as SiteContent;
  } catch (error) {
    console.error("Scraper error:", error);
    return null;
  }
};

export const translateContent = async (content: any, targetLang: Language) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Translate this content to ${targetLang === 'sv' ? 'Swedish' : 'English'}. Return JSON only. Content: ${JSON.stringify(content)}`,
      config: { responseMimeType: "application/json" }
    });
    return JSON.parse(response.text || '{}');
  } catch (error) {
    return content;
  }
};

export const fetchFacebookContent = async (pageId: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Hitta de 3 senaste offentliga inläggen från Facebook-sidan "${pageId}". Sammanfatta dem som blogginlägg för en webbplats. Inkludera datum om möjligt.`,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              excerpt: { type: Type.STRING },
              tag: { type: Type.STRING },
              imageUrl: { type: Type.STRING }
            }
          }
        }
      }
    });
    return JSON.parse(response.text || '[]');
  } catch (error) {
    return [];
  }
};
