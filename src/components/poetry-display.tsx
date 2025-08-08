'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { allPoems } from '@/lib/poems';
import { PaginationControl } from '@/components/pagination-control';
import { useTheme } from 'next-themes';
import { useMounted } from '@/hooks/use-mounted';

const PAGE_SIZE = 50;

export function PoetryDisplay() {
  const [currentPage, setCurrentPage] = useState(1);
  const { theme } = useTheme();
  const mounted = useMounted();
  const totalPages = Math.ceil(allPoems.length / PAGE_SIZE);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const displayedPoems = allPoems.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getAnimationDelay = (index: number) => {
    if (mounted && theme === 'blue') {
      return { animationDelay: `${index * 100}ms` };
    }
    return {};
  };

  return (
    <div className="mx-auto max-w-4xl pb-24">
      <div className="space-y-8">
        {displayedPoems.map((poem, index) => (
          <Card
            key={`${startIndex}-${index}`}
            className="poem-card overflow-hidden shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl"
            style={getAnimationDelay(index)}
          >
            <CardHeader>
              <CardTitle className="font-headline text-2xl">{poem.englishTitle}</CardTitle>
              <CardDescription className="text-lg">{poem.title}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2 text-right" dir="rtl">
                  {poem.urdu.map((line, lineIndex) => (
                    <p key={lineIndex} className="poem-text font-body text-xl">
                      {line}
                    </p>
                  ))}
                </div>
                <div className="space-y-2">
                  {poem.english.map((line, lineIndex) => (
                    <p key={lineIndex} className="poem-text font-body text-lg italic">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <PaginationControl
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
