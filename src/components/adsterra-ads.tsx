'use client';

import React from 'react';
import Script from 'next/script';

export function AdsterraAds() {
  return (
    <>
      {/* 
        Adsterra Social Bar Ad Unit
        Replace the 'src' with your actual Social Bar script link from Adsterra.
        This script will automatically create the social bar ad.
      */}
      <Script
        id="adsterra-social-bar"
        strategy="lazyOnload"
        src="//pl23719929.highcpmgate.com/08/8a/b2/088ab2ce2876618d34d3d875080ca25e.js" 
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
 * Placeholder for a Banner Ad.
 * Adsterra will provide you with a div and a script.
 * You can place this component wherever you want a banner to appear.
 * Remember to replace the ad unit code inside the script.
 */
export function AdsterraBannerAd() {
    return (
        <div className="my-4 flex justify-center">
            {/* 
                This is a placeholder for an Adsterra Banner ad.
                Adsterra typically provides a script that looks something like this.
                You will need to replace the 'src' with the one from your Adsterra account.
            */}
            <Script 
                async 
                src="//pl23719929.highcpmgate.com/e9/f8/f4/e9f8f4a83424d622f18398ba5da9319d.js" 
            />
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