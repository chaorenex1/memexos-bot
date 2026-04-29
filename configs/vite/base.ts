/**
 * Vite 公共基础配置
 * 不绑定 React/Node，只提供通用插件与构建优化
 */
import { defineConfig, type UserConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export const baseConfig: UserConfig = defineConfig({
  plugins: [tsconfigPaths()],
  build: {
    target: 'es2022',
    sourcemap: true,
    minify: 'esbuild',
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  server: {
    host: true,
    port: 5173,
    strictPort: false,
  },
  preview: {
    host: true,
    port: 4173,
  },
  esbuild: {
    target: 'es2022',
    legalComments: 'none',
  },
});

export default baseConfig;
