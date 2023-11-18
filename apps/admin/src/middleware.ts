import { NextResponse, type NextRequest } from 'next/server';

import createIntlMiddleware from 'next-intl/middleware';

import { createMiddlewareClient } from '@llmaid/supabase';

const with18nRouting = createIntlMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'uk'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
});

// List of paths that do not require authentication and will be redirected to home page if user is already authenticated
const UNAUTHENTICATED_PATHS = ['/auth/sign-in', '/auth/sign-up', '/auth/reset-password'];

const withAuth = async (request: NextRequest, response: NextResponse) => {
  const { supabase, response: enrichedResponse } = createMiddlewareClient(request, response);

  // Refresh session if expired - required for Server Components
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { pathname } = request.nextUrl;
  const isUnAuthenticatedPath: boolean = UNAUTHENTICATED_PATHS.some((path) =>
    pathname.includes(path),
  );

  // Redirect to home page if user is already authenticated
  if (session && isUnAuthenticatedPath) {
    return NextResponse.redirect('http://localhost:3000/');
  }

  // Redirect to sign in page if user is not authenticated
  if (!session && (!isUnAuthenticatedPath || pathname === '/auth/change-password')) {
    return NextResponse.redirect('http://localhost:3000/auth/sign-in');
  }

  return enrichedResponse;
};

export async function middleware(request: NextRequest) {
  const i18nRoutingResponse = with18nRouting(request);
  return await withAuth(request, i18nRoutingResponse);
}

export const config = {
  // Skip all paths that should not be internationalized. This example skips
  // certain folders and all pathnames with a dot (e.g. favicon.ico)
  matcher: ['/((?!_next|_vercel|.*\\..*).*)'],
};
