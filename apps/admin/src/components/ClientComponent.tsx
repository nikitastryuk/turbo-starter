'use client';

import { useTranslations } from 'next-intl';

export const ClientComponent = () => {
  const t = useTranslations();

  return (
    <div>
      <p>{t('test', { count: 2 })}</p>
      <p>{t('test', { count: 21 })}</p>
    </div>
  );
};
