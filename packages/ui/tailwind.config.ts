import preset from '@repo/tailwind-config/preset';

import type { Config } from 'tailwindcss';

const config: Config = {
  presets: [preset],
  content: ['./src/**/*.{ts,tsx}'],
};

export default config;
