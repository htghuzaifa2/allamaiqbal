'use client';

import { ThemeProvider } from '@/components/theme-provider';
import { useRedirect } from '@/hooks/useRedirect';
import { useEffect } from 'react';

export function LayoutProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { handleClick } = useRedirect();

  useEffect(() => {
    // Dynamically import the prefetcher only on the client side.
    // The import() function returns a promise, but we don't need to await it.
    // Just calling it will execute the module's top-level code.
    import('@/lib/prefetch');
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      storageKey="iqbalverse-theme"
      defaultTheme="orange"
      disableTransitionOnChange
    >
      <div className="flex min-h-screen flex-col bg-background" onClick={handleClick}>
        {children}
      </div>
    </ThemeProvider>
  );
}
