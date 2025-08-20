'use client';

import React, { useEffect, useRef } from 'react';

export function AdsterraSocialBar() {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//pl27391411.profitableratecpm.com/2e/9f/13/2e9f137c2e929905630b5d05eee423bf.js';
    script.async = true;
    
    document.body.appendChild(script);

    return () => {
      // Try to find and remove the script when the component unmounts
      const existingScript = document.querySelector(`script[src="${script.src}"]`);
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return null;
}


export function AdsterraBannerAd({ adKey }: { adKey: string }) {
    const adContainerRef = useRef<HTMLDivElement>(null);
    const scriptId = `adsterra-banner-script-${adKey}`;

    useEffect(() => {
        const adContainer = adContainerRef.current;
        if (!adContainer) return;

        // Clear previous ad content to force a reload
        adContainer.innerHTML = '';
        const containerDiv = document.createElement('div');
        containerDiv.id = 'container-80b1d23fe81d799143c72e85121699bf';
        adContainer.appendChild(containerDiv);

        const script = document.createElement('script');
        script.id = scriptId;
        script.async = true;
        script.setAttribute('data-cfasync', 'false');
        script.src = '//pl27391280.profitableratecpm.com/80b1d23fe81d799143c72e85121699bf/invoke.js';
        
        adContainer.appendChild(script);
        
        return () => {
            // Cleanup on component unmount
            const existingScript = document.getElementById(scriptId);
            if (existingScript && existingScript.parentElement) {
                existingScript.parentElement.removeChild(existingScript);
            }
            if (adContainer) {
                adContainer.innerHTML = '';
            }
        }
    }, [adKey, scriptId]); // Re-run effect if the key changes

    return <div ref={adContainerRef} className="my-4"/>;
}
