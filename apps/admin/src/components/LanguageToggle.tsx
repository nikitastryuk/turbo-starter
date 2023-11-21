'use client';

import { usePathname, useRouter } from 'next/navigation';

import { useLocale } from 'next-intl';

import { Button } from '@llmaid/system';

export const LanguageToggle = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathName = usePathname();

  const handleChangeLocale = (locale: string) => {
    // Replace the locale in the URL
    const updatedPath = pathName.replace(/\/(uk|en)?\/?/, `/${locale}/`);

    // Push the updated URL to the router
    router.push(updatedPath);
  };

  return (
    <>
      <Button
        onClick={() => handleChangeLocale(locale === 'uk' ? 'en' : 'uk')}
        variant="ghost"
        className="transition-none"
        size="icon"
      >
        {locale}
      </Button>
    </>
  );
};
