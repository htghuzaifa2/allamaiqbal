'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    // Visibility
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }

    // Progress
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const totalScrollable = scrollHeight - clientHeight;
    
    if (totalScrollable > 0) {
      const progress = (scrollTop / totalScrollable) * 100;
      setScrollProgress(progress);
    } else {
      setScrollProgress(0);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    // Initial check in case the page is reloaded with a scroll position
    handleScroll(); 
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <Button
        size="icon"
        onClick={scrollToTop}
        className={cn(
          'scroll-to-top-button relative h-12 w-12 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:bg-primary/90 bg-background/50 backdrop-blur-sm',
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0 pointer-events-none'
        )}
        aria-label="Scroll to top"
      >
        <svg
          className="absolute h-full w-full"
          width="48"
          height="48"
          viewBox="0 0 48 48"
        >
          {/* Background Circle */}
          <circle
            className="stroke-current text-border"
            cx="24"
            cy="24"
            r={radius}
            strokeWidth="4"
            fill="transparent"
          />
          {/* Progress Circle */}
          <circle
            className="stroke-current text-primary transition-all duration-300 ease-linear"
            cx="24"
            cy="24"
            r={radius}
            strokeWidth="4"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 24 24)"
            strokeLinecap="round"
          />
        </svg>
        <ArrowUp className="h-6 w-6" />
      </Button>
    </div>
  );
}
