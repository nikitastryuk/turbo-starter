import type { Config } from 'tailwindcss';

import tailwindConfig from '@llmaid/system/tailwind.config';

export default {
  content: ['./src/**/*.tsx', '../../packages/system/src/**/*{.js,.ts,.jsx,.tsx}'],
  presets: [tailwindConfig],
  darkMode: 'class',
} satisfies Config;
