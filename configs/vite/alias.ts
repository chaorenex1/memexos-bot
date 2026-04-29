/**
 * 公共别名映射
 * 与 tsconfig paths 保持一致：
 *   @/*           → src/*
 *   @repo/<pkg>   → packages/<pkg>/src
 */
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/** 计算 monorepo 根路径（从 configs/vite/alias.ts 出发回退两级） */
const monorepoRoot = resolve(fileURLToPath(import.meta.url), '../../..');

export interface CreateAliasOptions {
  /** app 根目录（包含 src/） */
  appRoot: string;
  /** 是否注入 @repo/* 全部包别名（默认 true） */
  withRepoAliases?: boolean;
}

const repoPackages = [
  'types',
  'constants',
  'utils',
  'validators',
  'i18n',
  'theme',
  'icons',
  'hooks',
  'store',
  'request',
  'router',
  'platform',
  'ui',
];

export function createAliases(options: CreateAliasOptions): Record<string, string> {
  const { appRoot, withRepoAliases = true } = options;

  const aliases: Record<string, string> = {
    '@': resolve(appRoot, 'src'),
  };

  if (withRepoAliases) {
    for (const pkg of repoPackages) {
      aliases[`@repo/${pkg}`] = resolve(monorepoRoot, 'packages', pkg, 'src');
    }
  }

  return aliases;
}

export { monorepoRoot };
