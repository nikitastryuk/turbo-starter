/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => ({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  messages: (await import(`./locales/${locale}.json`)).default,
}));
