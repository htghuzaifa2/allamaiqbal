'use client';

import React from 'react';
import Script from 'next/script';

export function AdsterraAds() {
  return (
    <>
      {/* 
        Adsterra Social Bar Ad Unit
        This script is loaded on all pages.
      */}
      <Script
        id="adsterra-social-bar"
        strategy="lazyOnload"
        type='text/javascript'
        src='//pl27391411.profitableratecpm.com/2e/9f/13/2e9f137c2e929905630b5d05eee423bf.js'
      />
    </>
  );
}

/**
 * Adsterra Banner Ad.
 * This component contains the Native Banner ad code.
 * It is displayed between poems.
 */
export function AdsterraBannerAd() {
    return (
        <div className="my-4 flex justify-center">
            <Script 
                id="adsterra-native-banner-script"
                strategy="lazyOnload"
                async={true}
                data-cfasync={false}
                src="//pl27391280.profitableratecpm.com/80b1d23fe81d799143c72e85121699bf/invoke.js" 
            />
            <div id="container-80b1d23fe81d799143c72e85121699bf"></div>
        </div>
    );
}
