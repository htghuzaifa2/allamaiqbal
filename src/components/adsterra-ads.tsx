'use client';

import React, { useEffect } from 'react';

export function AdsterraSocialBar() {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//pl27391411.profitableratecpm.com/2e/9f/13/2e9f137c2e929905630b5d05eee423bf.js';
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
  const adHtml = `
    <script async="async" data-cfasync="false" src="//pl27391280.profitableratecpm.com/80b1d23fe81d799143c72e85121699bf/invoke.js"></script>
    <div id="container-80b1d23fe81d799143c72e85121699bf"></div>
  `;

  return (
    <div 
      className="my-4 flex justify-center" 
      dangerouslySetInnerHTML={{ __html: adHtml }} 
    />
  );
}