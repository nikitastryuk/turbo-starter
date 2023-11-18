import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '@llmaid/system';

export const AuthFormEmailField = () => {
  const t = useTranslations('auth');
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('shared.email')}</FormLabel>
          <FormControl>
            <Input {...field} type="email" required />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
