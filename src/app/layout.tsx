import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/header';
import './globals.css';

export const metadata: Metadata = {
  title: 'IqbalVerse | Allama Iqbal Poetry',
  description:
    "An extensive collection of Allama Iqbal's poetry in Urdu with English translations. Explore the profound verses and wisdom of the Spiritual Father of Pakistan on allamaiqbal.huzi.pk.",
  keywords: ['Allama Iqbal', 'Iqbal poetry', 'Urdu poetry', 'English translation', 'IqbalVerse', 'Spiritual Father of Pakistan', 'allamaiqbal.huzi.pk'],
  openGraph: {
    title: 'IqbalVerse | Allama Iqbal Poetry',
    description: "An extensive collection of Allama Iqbal's poetry in Urdu with English translations.",
    url: 'https://allamaiqbal.huzi.pk',
    siteName: 'IqbalVerse',
    images: [
      {
        url: 'https://placehold.co/1200x630.png', // Waiting for user to provide logo
        width: 1200,
        height: 630,
        alt: 'IqbalVerse Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IqbalVerse | Allama Iqbal Poetry',
    description: "An extensive collection of Allama Iqbal's poetry in Urdu with English translations.",
    images: ['https://placehold.co/1200x630.png'], // Waiting for user to provide logo
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Literata:wght@400;700&family=Playfair+Display:wght@700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          storageKey="iqbalverse-theme"
          defaultTheme="dark"
        >
          <div className="flex min-h-screen flex-col bg-background">
            <Header />
            <main className="flex-grow">{children}</main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
