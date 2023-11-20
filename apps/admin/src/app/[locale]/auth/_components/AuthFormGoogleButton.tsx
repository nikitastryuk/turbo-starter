import type { PropsWithChildren } from 'react';
import Image from 'next/image';

import { createBrowserClient } from '@llmaid/supabase/src/client';
import { Button } from '@llmaid/system';

import configuration from '~/configuration';

// import { signInWithGoogle } from '../authActions';

const supabase = createBrowserClient();

export const AuthFormGoogleButton = ({ children }: PropsWithChildren) => {
  const handleGoogleSignIn = async () => {
    // await signInWithGoogle()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}${configuration.paths.authCallback}`,
      },
    });
    // TODO: Handle error
    if (error) {
      throw new Error(error.message);
    }
  };

  return (
    <Button onClick={handleGoogleSignIn} variant="outline" className="relative w-full">
      <Image
        className="absolute left-3"
        decoding="async"
        loading="lazy"
        src="/assets/google.webp"
        alt="Google logo"
        width={22}
        height={22}
      />
      {children}
    </Button>
  );
};
