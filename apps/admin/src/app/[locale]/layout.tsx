import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import '@llmaid/system//globals.css';
import '../globals.css';

import { notFound } from 'next/navigation';

import { NextIntlClientProvider } from 'next-intl';

import { Providers } from '~/Providers';

const inter = Inter({ subsets: ['latin'] });

type Messages = Record<string, string>;

export const metadata: Metadata = {
  title: 'Admin',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let messages: Messages;
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    messages = (await import(`../../i18n/locales/${locale}.json`)).default as Messages;
  } catch (error) {
    console.error(error);
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
