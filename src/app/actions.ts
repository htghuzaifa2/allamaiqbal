'use server';

import {
  analyzePoemSentiment,
  type AnalyzePoemSentimentInput,
  type AnalyzePoemSentimentOutput,
} from '@/ai/flows/analyze-poem-sentiment';

export async function getSentimentAnalysis(
  input: AnalyzePoemSentimentInput
): Promise<{ data: AnalyzePoemSentimentOutput | null; error: string | null }> {
  try {
    if (!input.poemTextUrdu || !input.poemTextEnglish) {
      return {
        data: null,
        error: 'Both Urdu and English poem text are required.',
      };
    }

    const result = await analyzePoemSentiment(input);
    return { data: result, error: null };
  } catch (e) {
    console.error('Sentiment analysis failed:', e);
    const errorMessage =
      e instanceof Error ? e.message : 'An unknown error occurred.';
    return { data: null, error: `Analysis failed: ${errorMessage}` };
  }
}
