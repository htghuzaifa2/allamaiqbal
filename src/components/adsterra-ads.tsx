'use client';

import React, { useEffect, useRef } from 'react';

export function AdsterraSocialBar() {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//pl27391411.profitableratecpm.com/2e/9f/13/2e9f137c2e929905630b5d05eee423bf.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Check if the script is still in the head before trying to remove it
      if (script.parentNode) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return null; // This component doesn't render anything itself
}


export function AdsterraBannerAd() {
    const adContainerRef = useRef<HTMLDivElement>(null);
    const scriptInjectedRef = useRef(false);

    useEffect(() => {
        if (adContainerRef.current && !scriptInjectedRef.current) {
            const script = document.createElement('script');
            script.async = true;
            script.setAttribute('data-cfasync', 'false');
            script.src = '//pl27391280.profitableratecpm.com/80b1d23fe81d799143c72e85121699bf/invoke.js';
            adContainerRef.current.appendChild(script);
            scriptInjectedRef.current = true;
        }
    }, []);

    // The ad script itself creates the div with the specific ID, but we need a container to append the script to.
    return <div ref={adContainerRef} id="container-80b1d23fe81d799143c72e85121699bf" className="my-4"/>;
}
