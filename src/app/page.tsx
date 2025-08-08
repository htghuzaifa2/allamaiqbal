import { PoetryDisplay } from '@/components/poetry-display';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <section className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-6xl">
          The Poetry of Allama Iqbal
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Explore the profound verses of Muhammad Iqbal, the "Spiritual Father
          of Pakistan."
        </p>
      </section>
      <PoetryDisplay />
    </div>
  );
}
