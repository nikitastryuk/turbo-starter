'use server';

import { redirect } from 'next/navigation';

import { getTranslations } from 'next-intl/server';
import { createSafeActionClient } from 'next-safe-action';
import { z } from 'zod';

import { createServerClient } from '@llmaid/supabase';

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
    const supabase = createServerClient();
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: 'http://localhost:3000/auth/callback',
      },
    });
    if (error) {
      throw new Error(error.message);
    }
    // if no identities - it means that the email is already taken
    const identities = data?.user?.identities ?? [];
    if (identities.length === 0) {
      const t = await getTranslations();
      // TODO: translate
      // Email is already taken
      throw new Error(t('test'));
    }
  },
);

export const signInWithEmailAndPassword = action(
  z.object({
    email: z.string().email(),
    password: z.string(),
  }),
  async (data) => {
    const supabase = createServerClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    if (error) {
      throw new Error(error.message);
    }
    redirect('http://localhost:3000/');
  },
);

export const signOut = async () => {
  const supabase = createServerClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
  redirect('http://localhost:3000/auth/sign-in');
};

export const resetPasswordForEmail = action(
  z.object({
    email: z.string().email(),
  }),
  async ({ email }) => {
    const supabase = createServerClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:3000/auth/callback?next=http://localhost:3000/change-password',
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
