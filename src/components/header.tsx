import { ThemeToggle } from '@/components/theme-toggle';
import Image from 'next/image';
import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="https://i.postimg.cc/sxTp3Zkv/Dr-allama-muhammad-iqbal.webp"
            alt="Allama Iqbal Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <h1 className="font-headline text-xl font-bold text-primary sm:text-2xl">
            Allama Iqbal
          </h1>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
