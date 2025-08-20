'use client';

import React from 'react';
import { useState } from 'react';
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
import { StaticPaginationControl } from './static-pagination-control';
import { Badge } from '@/components/ui/badge';
import { AdsterraBannerAd } from './adsterra-ads';
import { ScrollToTopButton } from './scroll-to-top-button';

const PAGE_SIZE = 50;

export function PoetryDisplay() {
  const [currentPage, setCurrentPage] = useState(1);
  const { theme } = useTheme();
  const mounted = useMounted();
  const totalPoems = allPoems.length;
  const totalPages = Math.ceil(totalPoems / PAGE_SIZE);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const displayedPoems = allPoems.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getAnimationDelay = (index: number) => {
    if (mounted && (theme === 'blue' || theme === 'orange')) {
      return { animationDelay: `${index * 100}ms` };
    }
    return {};
  };

  return (
    <div className="mx-auto max-w-7xl pb-24">
      <div className="space-y-8">
        {displayedPoems.map((poem, index) => {
          const poemNumber = totalPoems - (startIndex + index);
          return (
            <React.Fragment key={`${poem.englishTitle}-${startIndex}-${index}`}>
              <Card
                className="poem-card relative overflow-hidden shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl cursor-pointer"
                style={getAnimationDelay(index)}
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
                        <p key={lineIndex} className="poem-text font-body text-lg md:text-xl">
                          {line}
                        </p>
                      ))}
                    </div>
                    <div className="space-y-2">
                       <h3 className="mb-2 text-lg md:text-xl font-semibold text-primary">Roman</h3>
                       {poem.romanUrdu && poem.romanUrdu.map((line, lineIndex) => (
                        <p key={lineIndex} className="poem-text font-body text-base md:text-lg">
                          {line}
                        </p>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <h3 className="mb-2 text-lg md:text-xl font-semibold text-primary">English</h3>
                      {poem.english.map((line, lineIndex) => (
                        <p key={lineIndex} className="poem-text font-body text-base md:text-lg italic">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              {(index + 1) % 25 === 0 && <AdsterraBannerAd key={`ad-${poem.englishTitle}-${index}`} adKey={`ad-${poem.englishTitle}-${index}`} />}
            </React.Fragment>
          )
        })}
      </div>

      <StaticPaginationControl
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <PaginationControl
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <ScrollToTopButton />
    </div>
  );
}
