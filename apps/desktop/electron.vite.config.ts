import { resolve } from 'node:path';

import { createAliases } from '@repo/vite-config/alias';
import react from '@vitejs/plugin-react';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    build: {
      outDir: 'out/main',
      rollupOptions: {
        input: { index: resolve(__dirname, 'electron/main/index.ts') },
      },
    },
    resolve: {
      alias: {
        '@main': resolve(__dirname, 'electron/main'),
        '@ipc': resolve(__dirname, 'electron/ipc'),
        '@shared': resolve(__dirname, 'electron/shared'),
      },
    },
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    build: {
      outDir: 'out/preload',
      rollupOptions: {
        input: { index: resolve(__dirname, 'electron/preload/index.ts') },
      },
    },
  },
  renderer: {
    root: '.',
    plugins: [react(), tsconfigPaths()],
    resolve: {
      alias: createAliases({ appRoot: __dirname }),
    },
    build: {
      outDir: 'out/renderer',
      rollupOptions: {
        input: { index: resolve(__dirname, 'index.html') },
      },
    },
    server: {
      port: 5174,
    },
  },
});
