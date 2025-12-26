
import { GoogleGenAI, Type } from "@google/genai";
import { SAADomain, RelevanceLevel } from '../types';

// Use named parameter and direct process.env.API_KEY reference
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface AnalysisResult {
  relevance: RelevanceLevel;
  domains: SAADomain[];
  examNote: string;
  services: string[];
}

export const analyzeArticleForSAA = async (title: string, summary: string): Promise<AnalysisResult> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `
        Analyze this AWS update for SAA-C03 (Solutions Architect Associate) exam candidates.
        Title: ${title}
        Summary: ${summary}
        
        Provide:
        1. Relevance level (Low, Medium, High).
        2. Relevant SAA-C03 Domains (Secure Architectures, Resilient Architectures, High-Performing Architectures, Cost-Optimized Architectures, Deployment & Operations).
        3. A short "Exam Note" explaining why this matters for the exam.
        4. Key AWS Services mentioned.
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            relevance: { type: Type.STRING, enum: ['Low', 'Medium', 'High'] },
            domains: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING }
            },
            examNote: { type: Type.STRING },
            services: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING }
            }
          },
          required: ['relevance', 'domains', 'examNote', 'services']
        }
      }
    });

    const result = JSON.parse(response.text || '{}');
    return {
      relevance: (result.relevance as RelevanceLevel) || RelevanceLevel.LOW,
      domains: (result.domains as SAADomain[]) || [],
      examNote: result.examNote || "Informational update regarding general AWS services.",
      services: result.services || []
    };
  } catch (error) {
    console.error("Gemini analysis failed:", error);
    return {
      relevance: RelevanceLevel.LOW,
      domains: [],
      examNote: "Could not generate AI summary.",
      services: []
    };
  }
};
