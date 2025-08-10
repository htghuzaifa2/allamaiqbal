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
        if (scriptInjectedRef.current) {
            return;
        }

        const script = document.createElement('script');
        script.async = true;
        script.setAttribute('data-cfasync', 'false');
        script.src = '//pl27391280.profitableratecpm.com/80b1d23fe81d799143c72e85121699bf/invoke.js';

        const adContainer = adContainerRef.current;
        if (adContainer) {
            adContainer.appendChild(script);
            scriptInjectedRef.current = true;
        }
        
        return () => {
            if (adContainer && script.parentNode === adContainer) {
                adContainer.removeChild(script);
                // Also remove the ad content div if it exists
                const adContent = adContainer.querySelector('#container-80b1d23fe81d799143c72e85121699bf');
                if (adContent) {
                    adContainer.removeChild(adContent);
                }
                scriptInjectedRef.current = false;
            }
        }
    }, []);

    // The ad script itself creates the div with the specific ID, so we just need a container
    return <div ref={adContainerRef} className="my-4"/>;
}
