'use client';

import type { PropsWithChildren } from 'react';
import Image from 'next/image';

import { Button } from '@llmaid/system';

export const AuthFormGoogleButton = ({ children }: PropsWithChildren) => {
  return (
    <Button variant="outline" className="relative w-full">
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
