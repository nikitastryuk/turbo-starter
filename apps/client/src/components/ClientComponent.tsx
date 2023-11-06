'use client';

import { useTranslations } from 'next-intl';

export const ClientComponent = () => {
  const t = useTranslations('Index');

  return (
    <div>
      <p>{t('title', { count: 0 })}</p>
    </div>
  );
};
