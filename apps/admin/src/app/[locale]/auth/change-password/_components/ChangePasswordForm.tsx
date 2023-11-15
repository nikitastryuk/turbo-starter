'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Alert, AlertDescription, Button, FormProvider } from '@llmaid/system';

import { AuthFormFooter } from '../../_components/AuthFormFooter';
import { AuthFormPasswordConfirmationField } from '../../_components/AuthFormPasswordConfirmationField';
import { AuthFormPasswordField } from '../../_components/AuthFormPasswordField';
import { AuthFormTitle } from '../../_components/AuthFormTitle';

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
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: '',
      passwordConfirmation: '',
    },
  });

  const handleSubmit = (data: ChangePasswordFormValues) => {
    console.log(data);
  };

  return (
    <>
      <AuthFormTitle>Change password</AuthFormTitle>
      {submitted ? (
        <Alert variant="success">
          <AlertDescription>
            Your password has been changed. You can now sign in with your new password.
          </AlertDescription>
        </Alert>
      ) : (
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <AuthFormPasswordField />
            <AuthFormPasswordConfirmationField />
            <Button onClick={() => setSubmitted(true)} className="block w-full" type="submit">
              Change password
            </Button>
          </form>
        </FormProvider>
      )}
      <AuthFormFooter text="Back to" linkHref="/auth/sign-in" linkText="Sign in" />
    </>
  );
};
