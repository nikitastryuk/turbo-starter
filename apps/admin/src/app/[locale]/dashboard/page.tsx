import { redirect } from 'next/navigation';

import { createServerClient } from '@llmaid/supabase';
import { Button } from '@llmaid/system';

import { signOut } from '../auth/authActions';

export default async function DashboardPage() {
  const supabase = createServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/auth/sign-in');
  }

  return (
    <div>
      <p>Dashboard</p>
      <form action={signOut}>
        <Button type="submit">Sign out</Button>
      </form>
    </div>
  );
}
