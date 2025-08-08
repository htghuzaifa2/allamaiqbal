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
import { useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const searchResults = useMemo(() => {
    if (!query) {
      return [];
    }
    const lowerCaseQuery = query.toLowerCase();
    return allPoems.filter(poem =>
      poem.englishTitle.toLowerCase().includes(lowerCaseQuery) ||
      poem.title.toLowerCase().includes(lowerCaseQuery) ||
      poem.english.some(line => line.toLowerCase().includes(lowerCaseQuery)) ||
      poem.urdu.some(line => line.toLowerCase().includes(lowerCaseQuery))
    );
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
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
            ? `Found ${searchResults.length} poem(s) for "${query}"`
            : `No results found for "${query}"`}
        </p>
      </section>

      <div className="mx-auto max-w-4xl">
        <div className="space-y-8">
          {searchResults.map((poem, index) => (
            <Card
              key={index}
              className="poem-card overflow-hidden shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl"
            >
              <CardHeader>
                <CardTitle className="font-headline text-2xl">{poem.englishTitle}</CardTitle>
                <CardDescription className="text-lg">{poem.title}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2 text-right" dir="rtl">
                    {poem.urdu.map((line, lineIndex) => (
                      <p key={lineIndex} className="font-body text-xl">
                        {line}
                      </p>
                    ))}
                  </div>
                  <div className="space-y-2">
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
      </div>
    </div>
  );
}
