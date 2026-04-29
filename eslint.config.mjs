// 根 ESLint 扁平配置（v9 flat config）
// 注意：react 配置内部已 spread base，此处直接用 react 即可覆盖 base + react 规则
import reactConfig from './configs/eslint/react.cjs';

export default [
  ...reactConfig,
  // CJS / 配置文件 / 脚本：注入 Node 全局变量，避免 'module is not defined'
  {
    files: [
      '**/*.cjs',
      '**/*.config.{js,cjs,mjs,ts}',
      '**/postcss.config.*',
      '**/tailwind.config.*',
      '**/vite.config.*',
      '**/electron.vite.config.*',
      '**/next.config.*',
      'scripts/**/*.{js,cjs,mjs,ts}',
      'apps/desktop/electron/**/*.ts',
    ],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        module: 'writable',
        require: 'readonly',
        exports: 'writable',
        __dirname: 'readonly',
        __filename: 'readonly',
        process: 'readonly',
        global: 'readonly',
        Buffer: 'readonly',
        console: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      'no-undef': 'off',
    },
  },
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/out/**',
      '**/.next/**',
      '**/.turbo/**',
      '**/coverage/**',
      '**/release/**',
      '**/dist-electron/**',
      '**/*.d.ts',
      'pnpm-lock.yaml',
    ],
  },
];
