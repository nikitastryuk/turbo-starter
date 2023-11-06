import { getI18n } from '~/locales/server';

export const ServerComponent = async () => {
  const t = await getI18n();
  return (
    <div>
      <p>{t('test', { count: 0 })}</p>
      <p>{t('test', { count: 1 })}</p>
      <p>{t('test', { count: 2 })}</p>
    </div>
  );
};
