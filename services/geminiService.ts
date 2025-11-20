import { GoogleGenAI, Type } from "@google/genai";
import { DrugAnalysis, ControlStatus } from "../types";

// Initialize the client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const checkDrugStatus = async (drugName: string): Promise<DrugAnalysis> => {
  try {
    const model = "gemini-2.5-flash";
    
    const response = await ai.models.generateContent({
      model,
      contents: `Analyze the drug "${drugName}". Determine if it is a controlled substance (narcotic, psychotropic, or precursor) under general international standards (like NDLEA, DEA, WHO). Differentiate between strictly controlled/banned substances, prescription-only medications, and over-the-counter drugs.`,
      config: {
        systemInstruction: `You are an expert regulatory compliance officer for a drug law enforcement agency. 
        Your job is to identify if a drug is "CONTROLLED" (Strictly regulated, potential for abuse, scheduled narcotics/psychotropics), 
        "PRESCRIPTION_ONLY" (Rx only, but not necessarily a scheduled narcotic), 
        or "OTC" (Over the Counter/Not Controlled).
        Be conservative and prioritize safety. If a drug has multiple names or is a slang term, identify the active ingredient.`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            drugName: { type: Type.STRING, description: "Standardized name of the drug" },
            scientificName: { type: Type.STRING, description: "Chemical or generic name" },
            status: { 
              type: Type.STRING, 
              enum: ["CONTROLLED", "PRESCRIPTION_ONLY", "OTC", "UNKNOWN"],
              description: "The regulatory status of the drug."
            },
            classification: { type: Type.STRING, description: "e.g., 'Schedule II Opioid', 'NSAID', 'Benzodiazepine'" },
            reason: { type: Type.STRING, description: "Short explanation of why it has this status." },
            legalImplications: { type: Type.STRING, description: "Brief legal note (e.g., 'Possession without prescription is illegal')." },
            commonUses: { type: Type.ARRAY, items: { type: Type.STRING } },
            safetyWarnings: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ["drugName", "status", "classification", "reason", "legalImplications", "safetyWarnings"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI");
    }

    const data = JSON.parse(text) as DrugAnalysis;
    
    // Map the string status from JSON to our Enum if necessary (though the schema enforces it)
    return data;
  } catch (error) {
    console.error("Gemini Analysis Failed:", error);
    throw new Error("Unable to analyze drug status. Please try again.");
  }
};
