'use client';

import React, { useEffect, useRef } from 'react';

export function AdsterraSocialBar() {
  useEffect(() => {
    // Check if the script is already present to avoid duplicates
    if (document.getElementById('adsterra-social-bar-script')) {
      return;
    }

    const script = document.createElement('script');
    script.id = 'adsterra-social-bar-script';
    script.type = 'text/javascript';
    script.src = '//pl27391411.profitableratecpm.com/2e/9f/13/2e9f137c2e929905630b5d05eee423bf.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup script on component unmount
      const existingScript = document.getElementById('adsterra-social-bar-script');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return null; // This component doesn't render anything itself
}


export function AdsterraBannerAd({ adKey }: { adKey: string }) {
    const adContainerRef = useRef<HTMLDivElement>(null);
    const scriptId = `adsterra-banner-script-${adKey}`;

    useEffect(() => {
        const adContainer = adContainerRef.current;
        
        const timer = setTimeout(() => {
            if (adContainer) {
                // Clear previous ad content to force a reload
                adContainer.innerHTML = '';

                const script = document.createElement('script');
                script.id = scriptId;
                script.async = true;
                script.setAttribute('data-cfasync', 'false');
                script.src = '//pl27391280.profitableratecpm.com/80b1d23fe81d799143c72e85121699bf/invoke.js';
                
                adContainer.appendChild(script);
            }
        }, 50); // Small delay to ensure DOM is ready
        
        return () => {
            clearTimeout(timer);
            const existingScript = document.getElementById(scriptId);
            if (existingScript && existingScript.parentElement) {
                existingScript.parentElement.removeChild(existingScript);
            }
        }
    }, [adKey, scriptId]); // Re-run effect if the key changes

    // The ad script itself creates the div with the specific ID, but we need a container to append the script to.
    return <div ref={adContainerRef} id="container-80b1d23fe81d799143c72e85121699bf" className="my-4"/>;
}
