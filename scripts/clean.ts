#!/usr/bin/env tsx
/**
 * 清理脚本：删除所有包/应用的 dist / build / .turbo / node_modules（可选）
 * 用法：
 *   pnpm clean              # 仅清构建产物
 *   pnpm clean --deps       # 同时清 node_modules
 */
import { rm } from 'node:fs/promises';
import { glob } from 'node:fs/promises';
import { join } from 'node:path';

const ROOT = process.cwd();
const cleanDeps = process.argv.includes('--deps');

const targets = [
  'dist',
  'build',
  'out',
  '.next',
  '.turbo',
  '.vite',
  'release',
  'dist-electron',
  'coverage',
  '*.tsbuildinfo',
];
if (cleanDeps) targets.push('node_modules');

async function removeMatches(): Promise<void> {
  for (const pattern of targets) {
    const iter = glob(`**/${pattern}`, { cwd: ROOT });
    for await (const match of iter) {
      const full = join(ROOT, match);
      console.info(`[clean] removing ${full}`);
      await rm(full, { recursive: true, force: true });
    }
  }
}

await removeMatches();
console.info('[clean] done');
