'use server';

/**
 * @fileOverview Analyzes user preferences based on questionnaire responses to suggest perfumes.
 *
 * - analyzeUserPreferences - A function that takes user responses and returns a perfume recommendation.
 * - AnalyzeUserPreferencesInput - The input type for the analyzeUserPreferences function.
 * - AnalyzeUserPreferencesOutput - The return type for the analyzeUserPreferences function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeUserPreferencesInputSchema = z.object({
  responses: z.array(z.string()).describe('An array of user responses to the questionnaire.'),
  fragranticaDatasetDescription: z
    .string()
    .describe(
      'A description of the Fragrantica dataset, including the structure and available fields.'
    ),
});
export type AnalyzeUserPreferencesInput = z.infer<typeof AnalyzeUserPreferencesInputSchema>;

const AnalyzeUserPreferencesOutputSchema = z.object({
  perfumeSuggestion: z.string().describe('The suggested perfume based on the user responses.'),
  reasoning: z
    .string()
    .describe('The reasoning behind the perfume suggestion based on the user responses.'),
  imageUrl: z.string().url().describe('A URL to an image of the perfume bottle.'),
  buyingLink: z.string().url().describe('A link to a reputable online store to buy the perfume.'),
});
export type AnalyzeUserPreferencesOutput = z.infer<typeof AnalyzeUserPreferencesOutputSchema>;

export async function analyzeUserPreferences(
  input: AnalyzeUserPreferencesInput
): Promise<AnalyzeUserPreferencesOutput> {
  return analyzeUserPreferencesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeUserPreferencesPrompt',
  input: {schema: AnalyzeUserPreferencesInputSchema},
  output: {schema: AnalyzeUserPreferencesOutputSchema},
  prompt: `You are an expert perfume consultant. A user has answered a questionnaire about their preferences, and you will use these responses to recommend a perfume from the Fragrantica dataset.

Fragrantica Dataset Description: {{{fragranticaDatasetDescription}}}

User Responses:
{{#each responses}}
- {{{this}}}
{{/each}}

Based on these responses and your knowledge of perfumes, suggest a specific perfume and explain your reasoning.  Consider various factors such as notes, accords, and the user's stated preferences.
You must also provide a URL to an image of the perfume bottle and a buying link from a reputable online retailer.
Provide a real image URL and a valid buying link. Do not use placeholder URLs.

Perfume Suggestion:`, // Keep the formatting of this prompt, its critical
});

const analyzeUserPreferencesFlow = ai.defineFlow(
  {
    name: 'analyzeUserPreferencesFlow',
    inputSchema: AnalyzeUserPreferencesInputSchema,
    outputSchema: AnalyzeUserPreferencesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
