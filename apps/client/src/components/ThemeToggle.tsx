'use client';

import { useEffect, useState, useTransition } from 'react';

import { useTheme } from 'next-themes';

import { Button } from '@llmaid/system';

export const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();
  const [_, startTransition] = useTransition();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <Button
      size="icon"
      onClick={() => {
        startTransition(() => {
          setTheme(theme === 'light' ? 'dark' : 'light');
        });
      }}
    >
      {!theme ? null : theme === 'dark' ? <p>Light</p> : <p>Dark</p>}
    </Button>
  );
};
