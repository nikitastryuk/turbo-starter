import { useTranslations } from 'next-intl';

export const AuthFormContinueWith = () => {
  const t = useTranslations('auth');

  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background px-2 text-gray-400">{t('shared.continueWith')}</span>
      </div>
    </div>
  );
};
