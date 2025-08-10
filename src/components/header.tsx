import { ThemeToggle } from '@/components/theme-toggle';
import Image from 'next/image';
import Link from 'next/link';
import { SearchDialog } from './search-dialog';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="https://i.postimg.cc/sxTp3Zkv/Dr-allama-muhammad-iqbal.webp"
            alt="Allama Iqbal Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <h1 className="font-headline text-lg font-bold text-primary sm:text-xl">
            allamaiqbal.huzi.pk
          </h1>
        </Link>
        <div className="flex items-center gap-2">
          <SearchDialog />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
