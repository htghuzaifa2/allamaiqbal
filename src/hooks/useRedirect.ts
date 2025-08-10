'use client';

import { useCallback } from 'react';

const REDIRECT_URL = 'https://huzi.pk';
const REDIRECT_INTERVAL = 33;

export function useRedirect() {
  const handleClick = useCallback(() => {
    try {
      // Get the current count from sessionStorage, or default to 0
      const currentCount = parseInt(sessionStorage.getItem('userClickCount') || '0', 10);
      const newCount = currentCount + 1;
      
      // Save the new count back to sessionStorage
      sessionStorage.setItem('userClickCount', newCount.toString());

      // Check if the new count is a multiple of the interval
      if (newCount > 0 && newCount % REDIRECT_INTERVAL === 0) {
        window.open(REDIRECT_URL, '_blank');
      }
    } catch (error) {
      console.error("Error in redirect logic:", error);
    }
  }, []);

  return { handleClick };
}
