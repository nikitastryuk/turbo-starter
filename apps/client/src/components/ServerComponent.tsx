import { useTranslations } from 'next-intl';

export default function ServerComponent() {
  const t = useTranslations('Index');
  console.log('server');

  return (
    <div>
      <p>{t('title', { count: 15445 })}</p>
    </div>
  );
}
