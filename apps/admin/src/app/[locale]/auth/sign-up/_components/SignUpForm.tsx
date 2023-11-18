'use client';

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
import { AuthFormPasswordConfirmationField } from '../../_components/AuthFormPasswordConfirmationField';
import { AuthFormPasswordField } from '../../_components/AuthFormPasswordField';
import { AuthFormTitle } from '../../_components/AuthFormTitle';
import { signUpWithEmailAndPassword } from '../../authActions';

export const SignUpForm = () => {
  const t = useTranslations('auth');

  const { execute, result, status, reset } = useAction(signUpWithEmailAndPassword);

  const schema = z
    .object({
      email: z.string().email(),
      password: z.string().min(6, {
        message: t('shared.validation.passwordLength', { count: 6 }),
      }),
      passwordConfirmation: z.string(),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: t('shared.validation.passwordNotMatch'),
      path: ['passwordConfirmation'],
    });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
    },
  });

  const handleSubmit = (data: z.infer<typeof schema>) => {
    reset();
    execute(data);
  };

  return (
    <>
      <AuthFormTitle>{t('sing-up.title')}</AuthFormTitle>
      <AuthFormGoogleButton>{t('sing-up.googleButton')}</AuthFormGoogleButton>
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
          <AuthFormPasswordConfirmationField />
          <Button disabled={status === 'executing'} className="block w-full" type="submit">
            {t('sing-up.submit')}
          </Button>
        </form>
      </FormProvider>
      <AuthFormFooter
        text={t('sing-up.footerText')}
        linkHref={configuration.paths.signIn}
        linkText={t('sing-up.footerLinkText')}
      />
    </>
  );
};
