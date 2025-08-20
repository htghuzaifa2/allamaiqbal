'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <Button
        size="icon"
        onClick={scrollToTop}
        className={cn(
          'rounded-full shadow-lg transition-all duration-300 hover:scale-110',
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0 pointer-events-none'
        )}
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
    </div>
  );
}
