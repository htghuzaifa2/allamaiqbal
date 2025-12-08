
import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full py-8 md:py-12">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-6">
          <p className="text-lg text-foreground">
            Credits :{' '}
            <Link
              href="https://www.youtube.com/@ADDXZONE/videos"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-foreground transition-all duration-300 ease-in-out hover:text-primary hover:scale-110 hover:drop-shadow-[0_0_8px_hsl(var(--primary))] inline-block"
            >
              ADDX ZONE
            </Link>
          </p>
        </div>
        <div className="relative overflow-hidden rounded-lg shadow-2xl" style={{ paddingTop: '56.25%' }}>
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
