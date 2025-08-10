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
    const storedCount = sessionStorage.getItem('userClickCount');
    const storedFirstRedirect = sessionStorage.getItem('userHasHadFirstRedirect');
    
    const initialCount = storedCount ? parseInt(storedCount, 10) : 0;
    const initialFirstRedirect = storedFirstRedirect ? JSON.parse(storedFirstRedirect) : false;

    setClickCount(initialCount);
    setHasHadFirstRedirect(initialFirstRedirect);
  }, []);

  const handleClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    sessionStorage.setItem('userClickCount', newCount.toString());

    if (!hasHadFirstRedirect) {
      if (newCount === FIRST_REDIRECT_THRESHOLD) {
        window.open(REDIRECT_URL, '_blank');
        setHasHadFirstRedirect(true);
        sessionStorage.setItem('userHasHadFirstRedirect', 'true');
        // Reset count after first redirect to start the 55-click cycle
        setClickCount(0);
        sessionStorage.setItem('userClickCount', '0');
      }
    } else {
      // After the first redirect, trigger every 55 clicks.
      // The count was reset to 0 after the first redirect.
      if (newCount > 0 && newCount % SUBSEQUENT_REDIRECT_INTERVAL === 0) {
        window.open(REDIRECT_URL, '_blank');
      }
    }
  };

  return { handleClick };
}
