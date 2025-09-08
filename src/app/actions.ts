'use server';

import { analyzeUserPreferences, AnalyzeUserPreferencesOutput } from '@/ai/flows/analyze-user-preferences';

export async function getPerfumeSuggestion(responses: string[]): Promise<AnalyzeUserPreferencesOutput> {
  try {
    const fragranticaDatasetDescription = "The dataset contains information about various perfumes including their brand, name, main accords (e.g., floral, woody, citrus), and individual notes (e.g., rose, sandalwood, bergamot). Match the user's preferences to these characteristics to find the best perfume.";
    
    const result = await analyzeUserPreferences({
      responses,
      fragranticaDatasetDescription
    });

    return result;
  } catch (error) {
    console.error("Error in getPerfumeSuggestion server action: ", error);
    throw new Error("Failed to get perfume suggestion from AI.");
  }
}
