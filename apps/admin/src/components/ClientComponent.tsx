'use client';

import { useI18n } from '~/locales/client';

export const ClientComponent = () => {
  const t = useI18n();

  return (
    <div>
      <p>{t('test', { count: 0 })}</p>
      <p>{t('test', { count: 1 })}</p>
      <p>{t('test', { count: 2 })}</p>
      <p>{t('test', { count: 3 })}</p>
      <p>{t('test', { count: 4 })}</p>
      <p>{t('test', { count: 5 })}</p>
      <p>{t('test', { count: 6 })}</p>
      <p>{t('test', { count: 7 })}</p>
      <p>{t('test', { count: 8 })}</p>
      <p>{t('test', { count: 9 })}</p>
      <p>{t('test', { count: 10 })}</p>
      <p>{t('test', { count: 21 })}</p>
    </div>
  );
};
