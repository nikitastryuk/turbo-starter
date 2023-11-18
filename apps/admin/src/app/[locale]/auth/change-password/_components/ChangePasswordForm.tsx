'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useAction } from 'next-safe-action/hook';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Alert, AlertDescription, Button, FormProvider } from '@llmaid/system';

import configuration from '~/configuration';

import { AuthFormFooter } from '../../_components/AuthFormFooter';
import { AuthFormPasswordConfirmationField } from '../../_components/AuthFormPasswordConfirmationField';
import { AuthFormPasswordField } from '../../_components/AuthFormPasswordField';
import { AuthFormTitle } from '../../_components/AuthFormTitle';
import { changePassword } from '../../authActions';

export const ChangePasswordForm = () => {
  const t = useTranslations('auth');

  const { execute, result, status, reset } = useAction(changePassword);

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
      {result.data ? (
        <Alert variant="success">
          <AlertDescription>{t('change-password.success')}</AlertDescription>
        </Alert>
      ) : (
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <AuthFormPasswordField />
            <AuthFormPasswordConfirmationField />
            <Button disabled={status === 'executing'} className="block w-full" type="submit">
              {t('change-password.submit')}
            </Button>
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
