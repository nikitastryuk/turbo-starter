'use client';

import { useFormContext } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '@llmaid/system';

export const AuthFormPasswordField = () => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input {...field} type="password" required />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
