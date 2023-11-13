import type { PropsWithChildren } from 'react';

function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="absolute left-1/2 top-1/2 w-[380px] -translate-x-1/2 -translate-y-1/2">
      <div className="space-y-4 rounded-xl border p-6 shadow-[0px_0px_2200px_0px] shadow-primary/10">
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
