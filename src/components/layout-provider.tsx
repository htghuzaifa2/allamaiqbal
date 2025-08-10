'use client';

import { ThemeProvider } from '@/components/theme-provider';
import { useRedirect } from '@/hooks/useRedirect';

export function LayoutProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { handleClick } = useRedirect();
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
