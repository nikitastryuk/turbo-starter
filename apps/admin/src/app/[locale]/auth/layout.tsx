import type { PropsWithChildren } from 'react';
import { redirect } from 'next/navigation';

import { createServerClient } from '@llmaid/supabase';

async function AuthLayout({ children }: PropsWithChildren) {
  const supabase = createServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect('/dashboard');
  }
  return (
    <div className="absolute left-1/2 top-1/2 w-[380px] -translate-x-1/2 -translate-y-1/2">
      <div className="space-y-4 rounded-xl border p-6 shadow-[0px_0px_2200px_0px] shadow-primary/10">
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
