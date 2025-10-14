
import type { Metadata } from 'next';
import { LayoutProvider } from '@/components/layout-provider';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/header';
import './globals.css';
import { AdsterraSocialBar } from '@/components/adsterra-ads';

export const metadata: Metadata = {
  title: 'Allama Iqbal Poetry – Urdu & English Verses with Transliteration',
  description:
    "Discover the timeless poetry of Allama Iqbal in Urdu, Roman transliteration, and English translation. Explore his most celebrated verses—Shikwa, Jawab-e-Shikwa, Khudi, and more—and learn their profound meanings.",
  keywords: ['Allama Iqbal poetry', 'Iqbal Urdu poems', 'Allama Iqbal transliteration', 'Allama Iqbal English translation', 'Shikwa poem', 'Jawab-e-Shikwa poetry', 'Iqbal strong faith poetry', 'Iqbal Khudi poem'],
  openGraph: {
    title: 'Allama Iqbal Poetry – Urdu & English Verses with Transliteration',
    description: "Discover the timeless poetry of Allama Iqbal in Urdu, Roman transliteration, and English translation. Explore his most celebrated verses—Shikwa, J-e-Shikwa, Khudi, and more—and learn their profound meanings.",
    url: 'https://allamaiqbal.huzi.pk',
    siteName: 'Allama Iqbal Poetry',
    images: [
      {
        url: 'https://i.postimg.cc/sxTp3Zkv/Dr-allama-muhammad-iqbal.webp',
        width: 1200,
        height: 630,
        alt: 'Allama Iqbal Poetry Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Allama Iqbal Poetry – Urdu & English Verses with Transliteration',
    description: "Discover the timeless poetry of Allama Iqbal in Urdu, Roman transliteration, and English translation.",
    images: ['https://i.postimg.cc/sxTp3Zkv/Dr-allama-muhammad-iqbal.webp'],
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
        <link rel="icon" href="https://i.postimg.cc/sxTp3Zkv/Dr-allama-muhammad-iqbal.webp" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Literata:wght@400;700&family=Playfair+Display:wght@700&display=swap"
          rel="stylesheet"
          as="style"
        />
      </head>
      <body className="font-body antialiased">
        <LayoutProvider>
            <Header />
            <main className="flex-grow">{children}</main>
          <Toaster />
        </LayoutProvider>
        <AdsterraSocialBar />
      </body>
    </html>
  );
}
