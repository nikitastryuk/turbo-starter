'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useAction } from 'next-safe-action/hook';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Alert, AlertDescription, FormProvider } from '@llmaid/system';

import configuration from '~/configuration';

import { AuthFormFooter } from '../../_components/AuthFormFooter';
import { AuthFormPasswordConfirmationField } from '../../_components/AuthFormPasswordConfirmationField';
import { AuthFormPasswordField } from '../../_components/AuthFormPasswordField';
import { AuthFormSubmitButton } from '../../_components/AuthFormSubmitButton';
import { AuthFormTitle } from '../../_components/AuthFormTitle';
import { changePassword } from '../../authActions';

const MAX_PASSWORD_LENGTH = 6;

export const ChangePasswordForm = () => {
  const t = useTranslations('auth');

  const { execute, result, status, reset } = useAction(changePassword);
  const schema = z
    .object({
      password: z.string().min(MAX_PASSWORD_LENGTH, {
        message: t('shared.validation.passwordLength', { count: MAX_PASSWORD_LENGTH }),
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
      <AuthFormTitle>{t('change-password.title')}</AuthFormTitle>
      {result.serverError && (
        <Alert variant="destructive">
          <AlertDescription>{result.serverError}</AlertDescription>
        </Alert>
      )}
      {!result.serverError && status === 'hasSucceeded' ? (
        <Alert variant="success">
          <AlertDescription>{t('change-password.success')}</AlertDescription>
        </Alert>
      ) : (
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <AuthFormPasswordField />
            <AuthFormPasswordConfirmationField />
            <AuthFormSubmitButton disabled={status === 'executing'}>
              {t('change-password.submit')}
            </AuthFormSubmitButton>
          </form>
        </FormProvider>
      )}
      <AuthFormFooter
        text={t('change-password.footerText')}
        linkHref={configuration.paths.home}
        linkText={t('change-password.footerLinkText')}
      />
    </>
  );
};
