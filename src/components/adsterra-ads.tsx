'use client';

import React from 'react';
import Script from 'next/script';

export function AdsterraAds() {
  return (
    <>
      {/* 
        Adsterra Social Bar Ad Unit
        This is your active Social Bar script.
      */}
      <Script
        id="adsterra-social-bar"
        strategy="lazyOnload"
        type='text/javascript'
        src='//pl27391411.profitableratecpm.com/2e/9f/13/2e9f137c2e929905630b5d05eee423bf.js'
      />

      {/* 
        Adsterra general script.
        You might have a general script or separate ones for each ad type.
        Place any other required Adsterra scripts here.
      */}
    </>
  );
}

/**
 * Adsterra Banner Ad.
 * This component now contains your Native Banner ad code.
 * It will be displayed between poems.
 */
export function AdsterraBannerAd() {
    return (
        <div className="my-4 flex justify-center">
            <Script 
                id="adsterra-native-banner-script"
                async={true}
                data-cfasync="false"
                src="//pl27391280.profitableratecpm.com/80b1d23fe81d799143c72e85121699bf/invoke.js" 
            />
            <div id="container-80b1d23fe81d799143c72e85121699bf"></div>
        </div>
    );
}


/**
 * Placeholder for a Native Banner Ad.
 * Adsterra will provide you with a div and a script for this.
 * Place this component where you want the native banner to appear.
 */
export function AdsterraNativeBanner() {
    return (
        <div className="my-4 flex justify-center">
            {/* 
                This is a placeholder for an Adsterra Native Banner ad.
                Replace the 'src' with your actual script from Adsterra.
            */}
            <Script 
                async
                src="//pl23719929.highcpmgate.com/e9/f8/f4/e9f8f4a83424d622f18398ba5da9319d.js" 
            />
        </div>
    );
}
