'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button, FormProvider } from '@llmaid/system';

import { AuthFormEmailField } from '../../_components/AuthFomEmailField';
import { AuthFormFooter } from '../../_components/AuthFormFooter';
import { AuthFormGoogleButton } from '../../_components/AuthFormGoogleButton';
import { AuthFormPasswordConfirmationField } from '../../_components/AuthFormPasswordConfirmationField';
import { AuthFormPasswordField } from '../../_components/AuthFormPasswordField';
import { AuthFormTitle } from '../../_components/AuthFormTitle';
import { signUpWithEmailAndPassword } from '../../authActions';

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

type SignUpFormValues = z.infer<typeof schema>;

export const SignUpForm = () => {
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
    },
  });

  const handleSubmit = async (data: SignUpFormValues) => {
    try {
      await signUpWithEmailAndPassword(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AuthFormTitle>Create an account</AuthFormTitle>
      <AuthFormGoogleButton>Sign up with Google</AuthFormGoogleButton>
      <p className="text-center text-xs text-gray-400">or continue with email and password</p>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <AuthFormEmailField />
          <AuthFormPasswordField />
          <AuthFormPasswordConfirmationField />
          <Button className="block w-full" type="submit">
            Sign up
          </Button>
        </form>
      </FormProvider>
      <AuthFormFooter text="Already have an account?" linkHref="/auth/sign-in" linkText="Sign in" />
    </>
  );
};
