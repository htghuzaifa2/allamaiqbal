import { SentimentAnalyzer } from '@/components/sentiment-analyzer';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <section className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-6xl">
          IqbalVerse Sentiment Analysis
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Uncover the emotional depth of Allama Iqbal's poetry. Enter a poem in
          its original Urdu and English translation to receive a detailed
          sentiment analysis powered by AI.
        </p>
      </section>
      <SentimentAnalyzer />
    </div>
  );
}
