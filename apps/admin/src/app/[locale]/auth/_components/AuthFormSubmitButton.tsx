import type { ReactNode } from 'react';

import { Button } from '@llmaid/system';

interface AuthFormSubmitButtonProps {
  children: ReactNode;
  disabled?: boolean;
}

export const AuthFormSubmitButton = ({ children, disabled }: AuthFormSubmitButtonProps) => {
  return (
    <Button disabled={disabled} className="block w-full transition-none" type="submit">
      {children}
    </Button>
  );
};
