
import { PoetryDisplay } from '@/components/poetry-display';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';

function HomePageFallback() {
  return (
    <>
      <section className="mb-12 text-center">
        <Skeleton className="mx-auto h-16 w-3/4 md:w-1/2" />
        <Skeleton className="mx-auto mt-4 h-6 w-full max-w-xl" />
      </section>
      <div className="mx-auto max-w-7xl space-y-8 pb-12">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-4 rounded-lg border p-6">
            <div className="flex items-baseline gap-4">
              <Skeleton className="h-6 w-12" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-5 w-1/2" />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 pt-2 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="space-y-2">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <Suspense fallback={<HomePageFallback />}>
        <section className="mb-12 text-center">
          <h1 className="page-title font-headline text-4xl font-bold tracking-tight md:text-6xl">
            The Poetry of Allama Iqbal
          </h1>
          <p className="page-description mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Explore the profound verses of Muhammad Iqbal, the "Spiritual Father
            of Pakistan."
          </p>
        </section>
        <PoetryDisplay />
      </Suspense>
    </div>
  );
}
