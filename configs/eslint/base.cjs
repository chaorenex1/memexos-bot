/**
 * ESLint v9 flat config — 基础规则
 * 通用 TS/JS 项目使用，不含框架/Node 专属规则
 */
const js = require('@eslint/js');
const prettierConfig = require('eslint-config-prettier');
const importPlugin = require('eslint-plugin-import');
const tseslint = require('typescript-eslint');

const restrictedDeepRelativeImportPatterns = [
  '../../*',
  '../../../*',
  '../../../../*',
  '../../../../../*',
  '../../../../../../*',
  '../../../../../../../*',
  '../../../../../../../../*',
];

const restrictedDeepRelativeImportRule = {
  patterns: [
    {
      group: restrictedDeepRelativeImportPatterns,
      message: 'Do not import across more than one parent level. Only ./ and ../ are allowed.',
    },
  ],
};

module.exports = [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      import: importPlugin,
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
      },
    },
    rules: {
      // TypeScript
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-non-null-assertion': 'warn',

      // 通用
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      'no-debugger': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      eqeqeq: ['error', 'smart'],

      // import 顺序
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'type'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import/no-duplicates': 'warn',
      'no-restricted-imports': ['error', restrictedDeepRelativeImportRule],
    },
  },
  {
    files: ['packages/**/*.{js,jsx,ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            ...restrictedDeepRelativeImportRule.patterns,
            {
              group: ['@app/*'],
              message:
                'packages must not import from apps; keep the dependency direction as apps -> packages.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['apps/web/src/**/*.{js,jsx,ts,tsx}', 'apps/desktop/src/**/*.{js,jsx,ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'electron',
              message:
                'Renderer code must not import electron directly; go through packages/platform/desktop or the preload bridge.',
            },
          ],
          patterns: [
            ...restrictedDeepRelativeImportRule.patterns,
            {
              group: ['node:*'],
              message:
                'Renderer code must not import Node builtins directly; go through packages/platform/desktop or the preload bridge.',
            },
          ],
        },
      ],
    },
  },
  prettierConfig,
];
