'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { allPoems } from '@/lib/poems';

const PAGE_SIZE = 25;
const MAX_POEMS = 50;

export function PoetryDisplay() {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [startIndex, setStartIndex] = useState(0);

  const handleLoadMore = () => {
    const newVisibleCount = visibleCount + PAGE_SIZE;

    if (newVisibleCount > MAX_POEMS) {
      // We have 50 poems, slide the window
      const newStartIndex = startIndex + PAGE_SIZE;
      if (newStartIndex + MAX_POEMS > allPoems.length) {
        // Not enough poems to slide a full window, just go to the end
        setStartIndex(allPoems.length - MAX_POEMS);
      } else {
        setStartIndex(newStartIndex);
      }
    } else {
      // We have less than 50 poems, just add more
      setVisibleCount(newVisibleCount);
    }
  };
  
  const displayedPoems = allPoems.slice(startIndex, startIndex + visibleCount);
  const canLoadMore = (startIndex + visibleCount) < allPoems.length;

  return (
    <div className="mx-auto max-w-4xl">
      <div className="space-y-8">
        {displayedPoems.map((poem, index) => (
          <Card key={`${startIndex}-${index}`} className="overflow-hidden shadow-lg transition-all duration-500 ease-in-out hover:shadow-xl">
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
      {canLoadMore && (
        <div className="mt-12 flex justify-center">
          <Button onClick={handleLoadMore} size="lg">
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
