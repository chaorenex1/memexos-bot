/**
 * ESLint v9 flat config — Node.js / Electron main 进程
 * 在 base 基础上增加 Node 全局变量与 require 允许
 */
const baseConfig = require('./base.cjs');

module.exports = [
  ...baseConfig,
  {
    files: ['**/*.{ts,js,cjs,mjs}'],
    languageOptions: {
      globals: {
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly',
        module: 'writable',
        require: 'readonly',
        exports: 'writable',
      },
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
];
