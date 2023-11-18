import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '@llmaid/system';

export const AuthFormPasswordField = () => {
  const t = useTranslations('auth');
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('shared.password')}</FormLabel>
          <FormControl>
            <Input {...field} type="password" required />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
