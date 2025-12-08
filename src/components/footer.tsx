
import React from 'react';

export function Footer() {
  return (
    <footer className="w-full py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="relative mx-auto max-w-3xl overflow-hidden rounded-lg shadow-2xl" style={{ paddingTop: '56.25%' }}>
          <iframe
            className="absolute top-0 left-0 h-full w-full"
            src="https://www.youtube-nocookie.com/embed/qFmyV1Oextg?si=2pTJPq8WsNnZBCxs"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </footer>
  );
}
