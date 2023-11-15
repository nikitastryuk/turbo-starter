import { type NextRequest } from 'next/server';

import createIntlMiddleware from 'next-intl/middleware';

import { createMiddlewareClient } from '@llmaid/supabase';

export async function middleware(request: NextRequest) {
  const handleI18nRouting = createIntlMiddleware({
    // A list of all locales that are supported
    locales: ['en', 'uk'],
    // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
    defaultLocale: 'en',
    localePrefix: 'as-needed',
  });

  const { supabase, response } = createMiddlewareClient(request, handleI18nRouting(request));

  // Refresh session if expired - required for Server Components
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
  await supabase.auth.getSession();

  return response;
}

export const config = {
  // Skip all paths that should not be internationalized. This example skips
  // certain folders and all pathnames with a dot (e.g. favicon.ico)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
