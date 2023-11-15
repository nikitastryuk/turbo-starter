import { useFormContext } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '@llmaid/system';

export const AuthFormEmailField = () => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email Address</FormLabel>
          <FormControl>
            <Input {...field} type="email" required />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
