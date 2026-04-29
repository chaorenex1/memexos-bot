import { createAliases } from '@repo/vite-config/alias';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: createAliases({ appRoot: __dirname }),
  },
  server: {
    port: 5173,
    host: true,
  },
  build: {
    sourcemap: true,
    target: 'es2022',
    outDir: 'dist',
  },
});
