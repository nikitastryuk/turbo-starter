'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useAction } from 'next-safe-action/hook';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Alert, AlertDescription, Button, FormProvider } from '@llmaid/system';

import { AuthFormEmailField } from '../../_components/AuthFomEmailField';
import { AuthFormFooter } from '../../_components/AuthFormFooter';
import { AuthFormTitle } from '../../_components/AuthFormTitle';
import { resetPasswordForEmail } from '../../authActions';

const schema = z.object({
  email: z.string().email(),
});

type ResetPasswordFormValues = z.infer<typeof schema>;

export const ResetPasswordForm = () => {
  const { execute, status, reset } = useAction(resetPasswordForEmail);

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
    },
  });

  const handleSubmit = (data: ResetPasswordFormValues) => {
    reset();
    execute(data);
  };

  return (
    <>
      <AuthFormTitle>Reset password</AuthFormTitle>
      {status === 'hasSucceeded' ? (
        <Alert variant="success">
          <AlertDescription>
            Check your Inbox! We emailed you a link for resetting your password.
          </AlertDescription>
        </Alert>
      ) : (
        <>
          <p className="text-sm text-gray-400">
            Enter your email address below. You will receive a link to reset your password.
          </p>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <AuthFormEmailField />
              <Button disabled={status === 'executing'} className="block w-full" type="submit">
                Reset password
              </Button>
            </form>
          </FormProvider>
        </>
      )}
      <AuthFormFooter text="Back to" linkHref="/auth/sign-in" linkText="Sign in" />
    </>
  );
};
