'use client';

import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useAction } from 'next-safe-action/hook';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Alert, AlertDescription, Button, FormProvider } from '@llmaid/system';

import configuration from '~/configuration';

import { AuthFormEmailField } from '../../_components/AuthFomEmailField';
import { AuthFormFooter } from '../../_components/AuthFormFooter';
import { AuthFormGoogleButton } from '../../_components/AuthFormGoogleButton';
import { AuthFormPasswordField } from '../../_components/AuthFormPasswordField';
import { AuthFormTitle } from '../../_components/AuthFormTitle';
import { signInWithEmailAndPassword } from '../../authActions';

export const SignInForm = () => {
  const t = useTranslations('auth');

  const { execute, result, status, reset } = useAction(signInWithEmailAndPassword);

  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6, {
      message: t('shared.validation.passwordLength', { count: 6 }),
    }),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = (data: z.infer<typeof schema>) => {
    reset();
    execute(data);
  };

  return (
    <>
      <AuthFormTitle>{t('sing-in.title')}</AuthFormTitle>
      <AuthFormGoogleButton>{t('sing-in.googleButton')}</AuthFormGoogleButton>
      <p className="text-center text-xs text-gray-400">{t('shared.continueWithEmail')}</p>
      {result.serverError && (
        <Alert variant="destructive">
          <AlertDescription>{result.serverError}</AlertDescription>
        </Alert>
      )}
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <AuthFormEmailField />
          <AuthFormPasswordField />
          <Link href={configuration.paths.resetPassword} className="block text-sm hover:underline">
            {t('sing-in.forgotPassword')}
          </Link>
          <Button disabled={status === 'executing'} className="block w-full" type="submit">
            {t('sing-in.submit')}
          </Button>
        </form>
      </FormProvider>
      <AuthFormFooter
        text={t('sing-in.footerText')}
        linkHref={configuration.paths.signUp}
        linkText={t('sing-in.footerLinkText')}
      />
    </>
  );
};
