// Importing env files here to validate on build
import './src/env.mjs';

import withNextIntlFactory from 'next-intl/plugin';

export const withNextIntl = withNextIntlFactory('./src/i18n.ts');

export default withNextIntl({
  reactStrictMode: true,
  /** Enables hot reloading for local packages without a build step */
  transpilePackages: ['@llmaid/system'],
});
