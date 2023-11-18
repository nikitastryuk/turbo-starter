'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useAction } from 'next-safe-action/hook';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Alert, AlertDescription, Button, FormProvider } from '@llmaid/system';

import { AuthFormFooter } from '../../_components/AuthFormFooter';
import { AuthFormPasswordConfirmationField } from '../../_components/AuthFormPasswordConfirmationField';
import { AuthFormPasswordField } from '../../_components/AuthFormPasswordField';
import { AuthFormTitle } from '../../_components/AuthFormTitle';
import { changePassword } from '../../authActions';

const schema = z
  .object({
    password: z.string().min(3, {
      message: 'Password must be at least 3 characters.',
    }),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match.',
    path: ['passwordConfirmation'],
  });

type ChangePasswordFormValues = z.infer<typeof schema>;

export const ChangePasswordForm = () => {
  const { execute, result, status, reset } = useAction(changePassword);

  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: '',
      passwordConfirmation: '',
    },
  });

  const handleSubmit = (data: ChangePasswordFormValues) => {
    reset();
    execute(data);
  };

  return (
    <>
      <AuthFormTitle>Change password</AuthFormTitle>
      {result.serverError && (
        <Alert variant="destructive">
          <AlertDescription>{result.serverError}</AlertDescription>
        </Alert>
      )}
      {result.data ? (
        <Alert variant="success">
          <AlertDescription>
            Your password has been updated, and you were automatically signed in.
          </AlertDescription>
        </Alert>
      ) : (
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <AuthFormPasswordField />
            <AuthFormPasswordConfirmationField />
            <Button disabled={status === 'executing'} className="block w-full" type="submit">
              Change password
            </Button>
          </form>
        </FormProvider>
      )}
      <AuthFormFooter text="Go to" linkHref="/" linkText="Dashboard" />
    </>
  );
};
