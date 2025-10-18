import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const resumeAnalysisSchema = {
  type: Type.OBJECT,
  properties: {
    strengths: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of strengths from the resume, highlighting key skills and experiences.",
    },
    weaknesses: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of potential weaknesses or areas for improvement in the resume.",
    },
    summary: {
      type: Type.STRING,
      description: "A brief overall summary of the candidate's profile based on the resume.",
    },
  },
  required: ["strengths", "weaknesses", "summary"],
};

export const analyzeResume = async (resumeText: string): Promise<AnalysisResult> => {
  const prompt = `
    Analyze the following resume for a software engineering role. 
    Identify its key strengths and weaknesses, and provide a concise summary.
    Format the output as a JSON object matching the provided schema.
    
    Resume:
    ---
    ${resumeText}
    ---
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: resumeAnalysisSchema,
      },
    });
    
    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    
    // Basic validation
    if (result && Array.isArray(result.strengths) && Array.isArray(result.weaknesses) && typeof result.summary === 'string') {
        return result as AnalysisResult;
    } else {
        throw new Error("Invalid JSON structure received from API.");
    }

  } catch (error) {
    console.error("Error analyzing resume with Gemini API:", error);
    throw new Error("Failed to analyze resume. Please try again.");
  }
};