import { getI18n } from '../locales/server';

export const ServerComponent = async () => {
  const t = await getI18n();

  console.log('server');

  return <div>{t('hello')}</div>;
};
