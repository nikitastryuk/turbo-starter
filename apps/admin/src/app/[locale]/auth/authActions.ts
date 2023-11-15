'use server';

import { createServerClient } from '@llmaid/supabase';

export async function signUpWithEmailAndPassword(data: { email: string; password: string }) {
  const supabase = createServerClient();
  const result = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      emailRedirectTo: 'http://localhost:3000/auth/callback',
    },
  });
  return JSON.stringify(result);
}

export async function signInWithEmailAndPassword(data: { email: string; password: string }) {
  const supabase = createServerClient();
  const result = await supabase.auth.signInWithPassword(data);
  console.log(result);
  return JSON.stringify(result);
}

export async function signOut() {
  const supabase = createServerClient();
  const result = await supabase.auth.signOut();
  return JSON.stringify(result);
}
