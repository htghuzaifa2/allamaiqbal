'use client';

import { useEffect, useState } from 'react';

const REDIRECT_URL = 'https://huzi.pk';
const REDIRECT_INTERVAL = 33;

export function useRedirect() {
  const [clickCount, setClickCount] = useState(0);

  // On component mount, get the click count from sessionStorage.
  useEffect(() => {
    const storedCount = sessionStorage.getItem('userClickCount');
    setClickCount(storedCount ? parseInt(storedCount, 10) : 0);
  }, []);

  const handleClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    sessionStorage.setItem('userClickCount', newCount.toString());

    // Check if the new count is a multiple of the interval.
    if (newCount > 0 && newCount % REDIRECT_INTERVAL === 0) {
      window.open(REDIRECT_URL, '_blank');
    }
  };

  return { handleClick };
}
