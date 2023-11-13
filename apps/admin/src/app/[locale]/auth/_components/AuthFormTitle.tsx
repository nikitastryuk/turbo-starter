import type { PropsWithChildren } from 'react';

export const AuthFormTitle = ({ children }: PropsWithChildren) => {
  return <h5 className="text-center text-lg font-medium">{children}</h5>;
};
