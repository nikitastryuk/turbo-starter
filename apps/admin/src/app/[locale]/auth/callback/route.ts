import { NextResponse } from 'next/server';

import { createServerClient } from '@llmaid/supabase';

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the Auth Helpers package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-sign-in-with-code-exchange
  const requestUrl = new URL(request.url);
  const searchParams = requestUrl.searchParams;

  const code = searchParams.get('code');
  const nextUrl = searchParams.get('next');

  if (code) {
    const supabase = createServerClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(nextUrl ?? requestUrl.origin);
}
