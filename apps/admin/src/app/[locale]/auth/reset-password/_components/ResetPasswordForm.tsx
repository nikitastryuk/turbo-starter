'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button, FormProvider } from '@llmaid/system';

import { AuthFormEmailField } from '../../_components/AuthFomEmailField';
import { AuthFormFooter } from '../../_components/AuthFormFooter';
import { AuthFormTitle } from '../../_components/AuthFormTitle';

const schema = z
  .object({
    email: z.string().email(),
    password: z.string().min(3, {
      message: 'Password must be at least 3 characters.',
    }),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match.',
    path: ['passwordConfirmation'],
  });

type ResetPasswordFormValues = z.infer<typeof schema>;

export const ResetPasswordForm = () => {
  const [submitted, setSubmitted] = useState(false);
  console.log(submitted);
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
    },
  });

  const handleSubmit = (data: ResetPasswordFormValues) => {
    console.log(data);
  };

  return (
    <>
      <AuthFormTitle>Reset password</AuthFormTitle>
      <p className="text-sm text-gray-400">
        Enter your email address below. You will receive a link to reset your password.
      </p>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <AuthFormEmailField />
          <Button onClick={() => setSubmitted(true)} className="block w-full" type="submit">
            Reset password
          </Button>
        </form>
      </FormProvider>
      <AuthFormFooter text="Back to" linkHref="/auth/sign-in" linkText="Sign in" />
    </>
  );
};
