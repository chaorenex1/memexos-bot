/**
 * Tailwind 公共 Preset
 * 所有 apps 与 packages/ui 都应在 tailwind.config.ts 中通过 presets: [preset] 引用
 */
import animate from 'tailwindcss-animate';

import { colors, borderRadius, fontFamily, screens } from './tokens';

import type { Config } from 'tailwindcss';

const preset: Config = {
  // content 在使用方各自定义；preset 不强制 content
  content: [],
  darkMode: ['class'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors,
      borderRadius,
      fontFamily,
      screens,
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [animate],
};

export default preset;
