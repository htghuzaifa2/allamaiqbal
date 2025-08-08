'use client';

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
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';

const PAGE_SIZE = 50;

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [currentPage, setCurrentPage] = useState(1);
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  const searchResults = useMemo(() => {
    if (!query) {
      return [];
    }
    const lowerCaseQuery = query.toLowerCase();
    return allPoems.filter(poem =>
      poem.englishTitle.toLowerCase().includes(lowerCaseQuery) ||
      poem.title.toLowerCase().includes(lowerCaseQuery) ||
      poem.english.some(line => line.toLowerCase().includes(lowerCaseQuery)) ||
      poem.urdu.some(line => line.toLowerCase().includes(lowerCaseQuery)) ||
      (poem.romanUrdu && poem.romanUrdu.some(line => line.toLowerCase().includes(lowerCaseQuery)))
    );
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
        <p className="page-description mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          {searchResults.length > 0
            ? `Showing ${paginatedResults.length} of ${searchResults.length} results for "${query}"`
            : `No results found for "${query}"`}
        </p>
      </section>

      <div className="mx-auto max-w-7xl">
        {currentPage > 1 && (
          <div className="mb-8 flex justify-center">
            <Button variant="outline" onClick={() => handlePageChange(currentPage - 1)}>
              <ChevronUp className="mr-2 h-4 w-4" />
              Load Previous
            </Button>
          </div>
        )}

        <div className="space-y-8">
          {paginatedResults.map((poem, index) => (
            <Card
              key={`${poem.englishTitle}-${index}`}
              className="poem-card overflow-hidden shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl"
            >
              <CardHeader>
                <CardTitle className="font-headline text-2xl">{poem.englishTitle}</CardTitle>
                <CardDescription className="text-lg">{poem.title}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div className="space-y-2 text-right" dir="rtl">
                    <h3 className="mb-2 text-xl font-semibold text-primary">اردو</h3>
                    {poem.urdu.map((line, lineIndex) => (
                      <p key={lineIndex} className="font-body text-xl">
                        {line}
                      </p>
                    ))}
                  </div>
                   <div className="space-y-2">
                     <h3 className="mb-2 text-xl font-semibold text-primary">Roman</h3>
                     {poem.romanUrdu.map((line, lineIndex) => (
                      <p key={lineIndex} className="font-body text-lg">
                        {line}
                      </p>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <h3 className="mb-2 text-xl font-semibold text-primary">English</h3>
                    {poem.english.map((line, lineIndex) => (
                      <p key={lineIndex} className="font-body text-lg italic">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {currentPage < totalPages && (
          <div className="mt-8 flex justify-center">
            <Button onClick={() => handlePageChange(currentPage + 1)}>
              Load More
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
