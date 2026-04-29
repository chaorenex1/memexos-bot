/**
 * React + Vite 公共配置
 * 在 base 之上加入 @vitejs/plugin-react
 */
import react from '@vitejs/plugin-react';
import { defineConfig, mergeConfig, type UserConfig } from 'vite';

import { baseConfig } from './base';

export const reactConfig: UserConfig = mergeConfig(
  baseConfig,
  defineConfig({
    plugins: [
      react({
        babel: {
          plugins: [],
        },
      }),
    ],
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom'],
    },
  }),
);

export default reactConfig;
