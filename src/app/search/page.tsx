
import { Suspense } from 'react';
import { SearchResults } from '@/components/search-results';
import { Skeleton } from '@/components/ui/skeleton';

function SearchPageFallback() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
       <section className="mb-8 text-center">
        <Skeleton className="h-12 w-1/2 mx-auto" />
        <Skeleton className="h-6 w-3/4 mx-auto mt-4" />
      </section>
      <div className="space-y-8 max-w-7xl mx-auto">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="p-6 border rounded-lg">
            <div className="flex items-baseline gap-4">
              <Skeleton className="h-6 w-16" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              <div className="space-y-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
               <div className="space-y-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchPageFallback />}>
      <SearchResults />
    </Suspense>
  );
}
