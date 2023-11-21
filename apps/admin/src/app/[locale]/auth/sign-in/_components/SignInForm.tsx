'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useAction } from 'next-safe-action/hook';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Alert, AlertDescription, FormProvider } from '@llmaid/system';

import configuration from '~/configuration';

import { AuthFormEmailField } from '../../_components/AuthFomEmailField';
import { AuthFormFooter } from '../../_components/AuthFormFooter';
import { AuthFormGoogleButton } from '../../_components/AuthFormGoogleButton';
import { AuthFormPasswordField } from '../../_components/AuthFormPasswordField';
import { AuthFormSubmitButton } from '../../_components/AuthFormSubmitButton';
import { AuthFormTitle } from '../../_components/AuthFormTitle';
import { signInWithEmailAndPassword } from '../../authActions';

const MAX_PASSWORD_LENGTH = 6;

// TODO: Move to utils
function getHashParameterValue(parameterName: string, url: string): string | null {
  const params = new URLSearchParams(url.split(/[?#]/).slice(1).join('&'));
  return params.get(parameterName) ?? null;
}

export const SignInForm = () => {
  const t = useTranslations('auth');

  const [paramsError, setParamsError] = useState<string | null>(null);
  const { execute, result, status, reset } = useAction(signInWithEmailAndPassword);

  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(MAX_PASSWORD_LENGTH, {
      message: t('shared.validation.passwordLength', { count: MAX_PASSWORD_LENGTH }),
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

  useEffect(() => {
    const error = getHashParameterValue('error_description', window.location.hash);
    if (error) {
      setParamsError(error);
    }
  }, []);

  return (
    <>
      <AuthFormTitle>{t('sign-in.title')}</AuthFormTitle>
      <AuthFormGoogleButton>{t('sign-in.googleButton')}</AuthFormGoogleButton>
      <p className="text-center text-xs text-gray-400">{t('shared.continueWithEmail')}</p>
      {(result.serverError ?? paramsError) && (
        <Alert variant="destructive">
          <AlertDescription>{result.serverError ?? paramsError}</AlertDescription>
        </Alert>
      )}
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <AuthFormEmailField />
          <AuthFormPasswordField />
          <Link href={configuration.paths.resetPassword} className="block text-sm hover:underline">
            {t('sign-in.forgotPassword')}
          </Link>
          <AuthFormSubmitButton disabled={status === 'executing'}>
            {t('sign-in.submit')}
          </AuthFormSubmitButton>
        </form>
      </FormProvider>
      <AuthFormFooter
        text={t('sign-in.footerText')}
        linkHref={configuration.paths.signUp}
        linkText={t('sign-in.footerLinkText')}
      />
    </>
  );
};
