
import { import.meta.env.VITE_GEMINI_API_KEY, Type } from "@google/genai";
import { AnalysisResponse } from "../types";

const SYSTEM_INSTRUCTION = `
Role: Та бол Монголын зах зээл, эдийн засгийн чиглэлээр мэргэшсэн, шилдэг бизнес зөвлөх бөгөөд шинжээч юм.
Task: Хэрэглэгчийн ирүүлсэн бизнесийн санааг (хувцас, гэр ахуй, технологи гэх мэт) Монгол улсын өнөөгийн эдийн засгийн нөхцөл байдалд (инфляци, ложистик, зах зээлийн багтаамж, хэрэглэгчийн зан төлөв) тулгуурлан бодит бөгөөд үнэн зөвөөр үнэлж дүгнэлт өгөх.

Guidelines for Analysis:
* Үнэн бодит бай: Санаа бүрийг магтах биш, харин Монголын хөрсөнд буух эсэхийг хатуу боловч үнэнээр хэл.
* Салбарын онцлог: Хувцас бол импортын хамаарал, технологи бол хүний нөөц ба дэд бүтэц, гэр ахуй бол дотоодын үйлдвэрлэл эсвэл ложистикийн зардлыг заавал тооц.
* Эдийн засгийн үзүүлэлт: 2026 оны Монголын эдийн засгийн төлөв байдал, худалдан авах чадварыг бодолц.
* Технологийн зөвлөгөө: Санааг илүү амжилттай болгохын тулд Монголд хэрэгжүүлэх боломжтой AI, блокчэйн эсвэл автоматжуулалтын шийдэл санал болго.

ХАРИУЛТЫГ ЗААВАЛ МОНГОЛ ХЭЛ ДЭЭР ӨГӨХ ЁСТОЙ.
Output must be in JSON format matching the provided schema.
`;

export const analyzeBusinessIdea = async (idea: string, category: string): Promise<AnalysisResponse> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [
      {
        parts: [
          {
            text: `Салбар: ${category}\nБизнесийн санаа: ${idea}\n\nЭнэхүү бизнесийн санааг Монголын эдийн засагт тулгуурлан шинжилж, хэрэгжих боломж, давуу болон сул талыг тодорхойлно уу.`,
          },
        ],
      },
    ],
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING, description: "Бизнесийн санааны ерөнхий үнэлгээ." },
          strengths: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Санааны давуу талууд." },
          weaknesses: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Монголын зах зээл дээрх эрсдэл болон сул талууд." },
          marketFit: { type: Type.STRING, description: "Зах зээлд нийцэх байдал болон зорилтот хэрэглэгчид." },
          feasibilityScore: { type: Type.NUMBER, description: "Хэрэгжих боломжийн оноо (1-10)." },
          economicReality: { type: Type.STRING, description: "Эдийн засгийн бодит нөхцөл байдалтай хэрхэн уялдаж байгаа тайлбар." },
          techSolutions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING }
              },
              required: ["title", "description"]
            },
            description: "Бизнесийг дэмжих технологийн шийдлүүд."
          },
          categoryContext: { type: Type.STRING, description: "Сонгосон салбарын Монгол дахь өнөөгийн байдал." }
        },
        required: ["summary", "strengths", "weaknesses", "marketFit", "feasibilityScore", "economicReality", "techSolutions", "categoryContext"]
      },
    },
  });

  if (!response.text) {
    throw new Error("AI загвараас хариу ирсэнгүй.");
  }

  return JSON.parse(response.text) as AnalysisResponse;
};
