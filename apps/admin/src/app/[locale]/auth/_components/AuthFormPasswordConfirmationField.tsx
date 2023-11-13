'use client';

import { useFormContext } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '@llmaid/system';

export const AuthFormPasswordConfirmationField = () => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="passwordConfirmation"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Password confirmation</FormLabel>
          <FormControl>
            <Input {...field} type="password" required />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
