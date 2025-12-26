
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

const SYSTEM_INSTRUCTION = `You are an AWS Solutions Architect tutor. 
Given an AWS article or announcement, explain it specifically for the AWS Certified Solutions Architect – Associate (SAA-C03) exam.

Respond in this exact format for the exam note:
Why this matters for SAA-C03:
- Architecture concept: [Explanation]
- Key AWS services involved: [List]
- Design trade-off: [Description]
- Common exam trap: [Specific warning]

Keep the explanation short, factual, and exam-focused. Do not add opinions or extra text.`;

export const analyzeArticleForSAA = async (title: string, summary: string): Promise<AnalysisResult> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Analyze this AWS update:
      Title: ${title}
      Summary: ${summary}`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            relevance: { 
              type: Type.STRING, 
              enum: ['Low', 'Medium', 'High'],
              description: "Relevance to SAA-C03 exam objectives"
            },
            domains: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "Relevant SAA-C03 Domains (Secure Architectures, Resilient Architectures, High-Performing Architectures, Cost-Optimized Architectures, Deployment & Operations)"
            },
            examNote: { 
              type: Type.STRING,
              description: "The formatted explanation following the tutor's rules"
            },
            services: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "Key AWS Services mentioned"
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
