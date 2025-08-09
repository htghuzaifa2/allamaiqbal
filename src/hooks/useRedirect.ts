'use client';

import { useEffect, useState } from 'react';

const REDIRECT_URL = 'https://huzi.pk';
const FIRST_REDIRECT_THRESHOLD = 25;
const SUBSEQUENT_REDIRECT_INTERVAL = 55;

export function useRedirect() {
  const [clickCount, setClickCount] = useState<number>(0);
  const [hasHadFirstRedirect, setHasHadFirstRedirect] = useState<boolean>(false);

  useEffect(() => {
    // This code runs only on the client
    const storedCount = localStorage.getItem('userClickCount');
    const storedFirstRedirect = localStorage.getItem('userHasHadFirstRedirect');
    
    const initialCount = storedCount ? parseInt(storedCount, 10) : 0;
    const initialFirstRedirect = storedFirstRedirect ? JSON.parse(storedFirstRedirect) : false;

    setClickCount(initialCount);
    setHasHadFirstRedirect(initialFirstRedirect);
  }, []);

  const handleClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    localStorage.setItem('userClickCount', newCount.toString());

    if (!hasHadFirstRedirect) {
      if (newCount === FIRST_REDIRECT_THRESHOLD) {
        window.open(REDIRECT_URL, '_blank');
        setHasHadFirstRedirect(true);
        localStorage.setItem('userHasHadFirstRedirect', 'true');
        // Reset count after first redirect to start the 55-click cycle
        setClickCount(0);
        localStorage.setItem('userClickCount', '0');
      }
    } else {
      if (newCount % SUBSEQUENT_REDIRECT_INTERVAL === 0 && newCount > 0) {
        window.open(REDIRECT_URL, '_blank');
      }
    }
  };

  return { handleClick };
}
