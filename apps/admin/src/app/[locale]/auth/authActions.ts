'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { getTranslations } from 'next-intl/server';
import { createSafeActionClient } from 'next-safe-action';
import { z } from 'zod';

import { createServerClient } from '@llmaid/supabase';

import configuration from '~/configuration';

const { paths } = configuration;

const action = createSafeActionClient({
  handleReturnedServerError(e) {
    return {
      serverError: e.message,
    };
  },
});

// TODO: Map errors
// https://github.com/supabase/auth-ui/issues/86
export const signUpWithEmailAndPassword = action(
  z.object({
    email: z.string().email(),
    password: z.string(),
  }),
  async ({ email, password }) => {
    const origin = headers().get('origin');
    const supabase = createServerClient();
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: `${origin}${paths.authCallback}`,
      },
    });
    if (error) {
      throw new Error(error.message);
    }
    // if no identities - it means that the email is already taken
    const identities = data?.user?.identities ?? [];
    if (identities.length === 0) {
      const t = await getTranslations();
      throw new Error(t('auth.sign-in.errors.emailTaken'));
    }
  },
);

export const signInWithEmailAndPassword = action(
  z.object({
    email: z.string().email(),
    password: z.string(),
  }),
  async (data) => {
    const origin = headers().get('origin');
    const supabase = createServerClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    if (error) {
      throw new Error(error.message);
    }
    redirect(`${origin}${paths.home}`);
  },
);

export const signOut = async () => {
  const origin = headers().get('origin');
  const supabase = createServerClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
  redirect(`${origin}${paths.signIn}`);
};

export const resetPasswordForEmail = action(
  z.object({
    email: z.string().email(),
  }),
  async ({ email }) => {
    const origin = headers().get('origin');
    const supabase = createServerClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${origin}${paths.authCallback}?next=${origin}${paths.changePassword}`,
    });
    if (error) {
      throw new Error(error.message);
    }
  },
);

export const changePassword = action(
  z.object({
    password: z.string(),
  }),
  async ({ password }) => {
    const supabase = createServerClient();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      throw new Error(error.message);
    }
  },
);

// export const signInWithGoogle = async () => {
//   const origin = headers().get('origin');
//   const supabase = createServerClient();
//   const { error } = await supabase.auth.signInWithOAuth({
//     provider: 'google',
//     options: {
//       redirectTo: `${origin}${paths.authCallback}`,
//     },
//   });
//   if (error) {
//     throw new Error(error.message);
//   }
// };
