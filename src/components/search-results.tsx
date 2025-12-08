
'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { allPoems } from '@/lib/poems';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useMemo, useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { StaticPaginationControl } from '@/components/static-pagination-control';
import { Badge } from '@/components/ui/badge';
import Fuse from 'fuse.js';

const PAGE_SIZE = 50;

// Create a map to get original index from the poem object
const poemIndexMap = new Map(allPoems.map((poem, index) => [poem.englishTitle, index]));
const totalPoems = allPoems.length;

const fuseOptions = {
  includeScore: true,
  includeMatches: true,
  threshold: 0.3, // Adjust this for more/less fuzzy matching
  keys: [
    'englishTitle',
    'title',
    'urdu',
    'romanUrdu',
    'english',
  ],
};

const fuse = new Fuse(allPoems, fuseOptions);

export function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [currentPage, setCurrentPage] = useState(1);
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  const searchResults = useMemo(() => {
    if (!query) {
      return [];
    }
    // Fuse.js returns results with item and score, we just need the item
    return fuse.search(query).map(result => result.item);
  }, [query]);

  const totalPages = Math.ceil(searchResults.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedResults = searchResults.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    if (resultsContainerRef.current) {
      resultsContainerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentPage]);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12" ref={resultsContainerRef}>
        <Button asChild variant="outline" className="mb-8">
            <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
            </Link>
        </Button>

      <section className="mb-8 text-center">
        <h1 className="page-title font-headline text-3xl font-bold tracking-tight md:text-5xl">
          Search Results
        </h1>
        <p className="page-description mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
          {searchResults.length > 0
            ? `Showing ${startIndex + 1}-${Math.min(endIndex, searchResults.length)} of ${searchResults.length} results for "${query}"`
            : `No results found for "${query}"`}
        </p>
      </section>

      <div className="mx-auto max-w-7xl">
        <div className="space-y-8">
          {paginatedResults.map((poem, index) => {
            const originalIndex = poemIndexMap.get(poem.englishTitle) ?? -1;
            const poemNumber = totalPoems - originalIndex;
            return (
              <React.Fragment key={`${poem.englishTitle}-${originalIndex}`}>
                <Card
                  className="poem-card relative overflow-hidden shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl"
                >
                  <CardHeader>
                    {poem.isPopular && (
                      <Badge variant="popular" className="absolute top-4 right-4 shadow-md">Popular</Badge>
                    )}
                    <div className="flex items-baseline gap-4">
                      <span className="text-xl font-bold text-primary/80">#{poemNumber}</span>
                      <div className="flex-1">
                        <CardTitle className="font-headline text-xl md:text-2xl">{poem.englishTitle}</CardTitle>
                        <CardDescription className="text-base md:text-lg">{poem.title}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                      <div className="space-y-2 text-right" dir="rtl">
                        <h3 className="mb-2 text-lg md:text-xl font-semibold text-primary">اردو</h3>
                        {poem.urdu.map((line, lineIndex) => (
                          <p key={lineIndex} className="font-body text-lg md:text-xl">
                            {line}
                          </p>
                        ))}
                      </div>
                       <div className="space-y-2">
                         <h3 className="mb-2 text-lg md:text-xl font-semibold text-primary">Roman</h3>
                         {poem.romanUrdu && poem.romanUrdu.map((line, lineIndex) => (
                          <p key={lineIndex} className="font-body text-base md:text-lg">
                            {line}
                          </p>
                        ))}
                      </div>
                      <div className="space-y-2">
                        <h3 className="mb-2 text-lg md:text-xl font-semibold text-primary">English</h3>
                        {poem.english.map((line, lineIndex) => (
                          <p key={lineIndex} className="font-body text-base md:text-lg italic">
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </React.Fragment>
            )
          })}
        </div>

        {searchResults.length > PAGE_SIZE && (
          <div className="mt-8">
            <StaticPaginationControl 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
