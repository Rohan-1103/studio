'use server';

/**
 * @fileOverview A perfume suggestion AI agent based on user preferences.
 *
 * - suggestPerfume - A function that suggests a perfume based on user preferences.
 * - SuggestPerfumeInput - The input type for the suggestPerfume function.
 * - SuggestPerfumeOutput - The return type for the suggestPerfume function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestPerfumeInputSchema = z.object({
  occasion: z.string().describe('The occasion for wearing the perfume.'),
  personality: z.string().describe('The user\u2019s personality.'),
  weather: z.string().describe('The weather conditions.'),
  notes: z.string().describe('Preferred fragrance notes.'),
  pastExperiences: z.string().describe('Past perfume experiences.'),
});
export type SuggestPerfumeInput = z.infer<typeof SuggestPerfumeInputSchema>;

const SuggestPerfumeOutputSchema = z.object({
  perfumeSuggestion: z.string().describe('The name of the suggested perfume.'),
  reason: z.string().describe('The reason for the perfume suggestion.'),
});
export type SuggestPerfumeOutput = z.infer<typeof SuggestPerfumeOutputSchema>;

export async function suggestPerfume(input: SuggestPerfumeInput): Promise<SuggestPerfumeOutput> {
  return suggestPerfumeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestPerfumePrompt',
  input: {schema: SuggestPerfumeInputSchema},
  output: {schema: SuggestPerfumeOutputSchema},
  prompt: `You are a perfume expert. Based on the user's preferences and past experiences, suggest a perfume that matches their profile.

Occasion: {{{occasion}}}
Personality: {{{personality}}}
Weather: {{{weather}}}
Preferred fragrance notes: {{{notes}}}
Past perfume experiences: {{{pastExperiences}}}

Suggest a perfume and explain why it is a good match.`,
});

const suggestPerfumeFlow = ai.defineFlow(
  {
    name: 'suggestPerfumeFlow',
    inputSchema: SuggestPerfumeInputSchema,
    outputSchema: SuggestPerfumeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
