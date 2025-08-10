'use client';

import { useEffect, useState } from 'react';

const REDIRECT_URL = 'https://huzi.pk';
const FIRST_REDIRECT_THRESHOLD = 25;
const SUBSEQUENT_REDIRECT_INTERVAL = 55;

export function useRedirect() {
  // useState is used to hold the count in the component's memory.
  const [clickCount, setClickCount] = useState<number>(0);

  // useEffect runs on the client and initializes the count from sessionStorage.
  useEffect(() => {
    const storedCount = sessionStorage.getItem('userClickCount');
    const initialCount = storedCount ? parseInt(storedCount, 10) : 0;
    setClickCount(initialCount);
  }, []);

  const handleClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    sessionStorage.setItem('userClickCount', newCount.toString());

    // Check if the first redirect has occurred in this session.
    const firstRedirectDone = sessionStorage.getItem('firstRedirectDone') === 'true';

    if (!firstRedirectDone) {
      if (newCount === FIRST_REDIRECT_THRESHOLD) {
        window.open(REDIRECT_URL, '_blank');
        sessionStorage.setItem('firstRedirectDone', 'true');
        // Reset count for the subsequent interval logic.
        setClickCount(0);
        sessionStorage.setItem('userClickCount', '0');
      }
    } else {
      // After the first redirect, check for intervals of 55.
      // The counter was reset to 0, so we check for multiples of 55.
      if (newCount > 0 && newCount % SUBSEQUENT_REDIRECT_INTERVAL === 0) {
        window.open(REDIRECT_URL, '_blank');
      }
    }
  };

  return { handleClick };
}
