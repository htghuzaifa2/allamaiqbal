'use server';

/**
 * @fileOverview This file defines a Genkit flow for analyzing the sentiment of a poem.
 *
 * It includes:
 * - analyzePoemSentiment - A function that analyzes the sentiment of a poem.
 * - AnalyzePoemSentimentInput - The input type for the analyzePoemSentiment function.
 * - AnalyzePoemSentimentOutput - The return type for the analyzePoemSentiment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzePoemSentimentInputSchema = z.object({
  poemTextUrdu: z
    .string()
    .describe('The original Urdu text of the poem.'),
  poemTextEnglish: z
    .string()
    .describe('The English translation of the poem.'),
});
export type AnalyzePoemSentimentInput = z.infer<
  typeof AnalyzePoemSentimentInputSchema
>;

const AnalyzePoemSentimentOutputSchema = z.object({
  sentimentAnalysis: z
    .string()
    .describe('A detailed sentiment analysis of the poem.'),
});
export type AnalyzePoemSentimentOutput = z.infer<
  typeof AnalyzePoemSentimentOutputSchema
>;

export async function analyzePoemSentiment(
  input: AnalyzePoemSentimentInput
): Promise<AnalyzePoemSentimentOutput> {
  return analyzePoemSentimentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzePoemSentimentPrompt',
  input: {schema: AnalyzePoemSentimentInputSchema},
  output: {schema: AnalyzePoemSentimentOutputSchema},
  prompt: `You are an expert literary analyst specializing in Urdu poetry.

You are provided with the original Urdu text of a poem and its English translation.

Your task is to perform a sentiment analysis of the poem, considering both the Urdu and English versions to provide a comprehensive understanding of the poem's emotional tone and themes.

Provide a detailed analysis of the poem's sentiment, identifying the primary emotions conveyed, any shifts in sentiment throughout the poem, and the overall emotional impact on the reader.

Urdu Text: {{{poemTextUrdu}}}
English Translation: {{{poemTextEnglish}}}`,
});

const analyzePoemSentimentFlow = ai.defineFlow(
  {
    name: 'analyzePoemSentimentFlow',
    inputSchema: AnalyzePoemSentimentInputSchema,
    outputSchema: AnalyzePoemSentimentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
