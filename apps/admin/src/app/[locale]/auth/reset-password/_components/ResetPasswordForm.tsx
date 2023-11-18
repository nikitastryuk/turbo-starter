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
import { AuthFormTitle } from '../../_components/AuthFormTitle';
import { resetPasswordForEmail } from '../../authActions';

const schema = z.object({
  email: z.string().email(),
});

type ResetPasswordFormValues = z.infer<typeof schema>;

export const ResetPasswordForm = () => {
  const t = useTranslations('auth');

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
      <AuthFormTitle>{t('reset-password.title')}</AuthFormTitle>
      {status === 'hasSucceeded' ? (
        <Alert variant="success">
          <AlertDescription>
            {t('reset-password.success', { email: form.getValues('email') })}
          </AlertDescription>
        </Alert>
      ) : (
        <>
          <p className="text-sm text-gray-400">{t('reset-password.description')}</p>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <AuthFormEmailField />
              <Button disabled={status === 'executing'} className="block w-full" type="submit">
                {t('reset-password.submit')}
              </Button>
            </form>
          </FormProvider>
        </>
      )}
      <AuthFormFooter
        text={t('reset-password.footerText')}
        linkHref={configuration.paths.signIn}
        linkText={t('reset-password.footerLinkText')}
      />
    </>
  );
};
