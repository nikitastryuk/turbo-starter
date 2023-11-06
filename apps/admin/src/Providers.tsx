'use client';

import type { ReactNode } from 'react';

import { ThemeProvider } from 'next-themes';

// import { I18nProviderClient } from './locales/client';

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    // <I18nProviderClient locale={params.locale} fallback={<p>Loading...</p>}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      {children}
    </ThemeProvider>
    // </I18nProviderClient>
  );
};
