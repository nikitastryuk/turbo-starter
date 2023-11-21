import { NextResponse, type NextRequest } from 'next/server';

import createIntlMiddleware from 'next-intl/middleware';

import { createMiddlewareClient } from '@llmaid/supabase';

import configuration from './configuration';

const with18nRouting = createIntlMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'uk'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
});

const { paths } = configuration;
// List of paths that do not require authentication and will be redirected to home page if user is already authenticated
const UNAUTHENTICATED_PATHS = [paths.signIn, paths.signUp, paths.resetPassword];

const withAuth = async (request: NextRequest, response: NextResponse) => {
  const { supabase, response: enrichedResponse } = createMiddlewareClient(request, response);

  // Refresh session if expired - required for Server Components
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const { pathname } = request.nextUrl;

  const isAuthCallbackPath: boolean = pathname === paths.authCallback;
  const isUnAuthenticatedPath: boolean = UNAUTHENTICATED_PATHS.some((path) =>
    pathname.includes(path),
  );

  if (isAuthCallbackPath) {
    return enrichedResponse;
  }

  // Redirect to home page if user is already authenticated
  if (session && isUnAuthenticatedPath) {
    return NextResponse.redirect(request.nextUrl.origin + paths.home);
  }

  // Redirect to sign in page if user is not authenticated
  if (!session && (!isUnAuthenticatedPath || pathname === paths.changePassword)) {
    return NextResponse.redirect(request.nextUrl.origin + paths.signIn);
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
  matcher: ['/((?!_next|api|_vercel|.*\\..*).*)'],
};
