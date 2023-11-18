'use client';

import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';
import { useAction } from 'next-safe-action/hook';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Alert, AlertDescription, Button, FormProvider } from '@llmaid/system';

import { AuthFormEmailField } from '../../_components/AuthFomEmailField';
import { AuthFormFooter } from '../../_components/AuthFormFooter';
import { AuthFormGoogleButton } from '../../_components/AuthFormGoogleButton';
import { AuthFormPasswordField } from '../../_components/AuthFormPasswordField';
import { AuthFormTitle } from '../../_components/AuthFormTitle';
import { signInWithEmailAndPassword } from '../../authActions';

const schema = z.object({
  email: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  password: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
});

type SignInFormValues = z.infer<typeof schema>;

export const SignInForm = () => {
  const { execute, result, status, reset } = useAction(signInWithEmailAndPassword);

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = (data: SignInFormValues) => {
    reset();
    execute(data);
  };

  return (
    <>
      <AuthFormTitle>Sign in to your account</AuthFormTitle>
      <AuthFormGoogleButton>Sign in with Google</AuthFormGoogleButton>
      <p className="text-center text-xs text-gray-400">or continue with email and password</p>
      {result.serverError && (
        <Alert variant="destructive">
          <AlertDescription>{result.serverError}</AlertDescription>
        </Alert>
      )}
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <AuthFormEmailField />
          <AuthFormPasswordField />
          <Link href={'/auth/reset-password'} className="block text-sm hover:underline">
            Forgot password?
          </Link>
          <Button disabled={status === 'executing'} className="block w-full" type="submit">
            Sign in
          </Button>
        </form>
      </FormProvider>
      <AuthFormFooter
        text="Do not have an account yet?"
        linkHref="/auth/sign-up"
        linkText="Sign up"
      />
    </>
  );
};
