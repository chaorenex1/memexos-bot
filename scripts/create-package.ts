#!/usr/bin/env tsx
/**
 * 创建一个新的 packages/<name>
 * 用法：pnpm create:package my-feature
 */
import { existsSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const name = process.argv[2];
if (!name) {
  console.error('请提供包名：pnpm create:package <name>');
  process.exit(1);
}

const root = join(process.cwd(), 'packages', name);
if (existsSync(root)) {
  console.error(`packages/${name} 已存在`);
  process.exit(1);
}

await mkdir(join(root, 'src'), { recursive: true });

const pkg = {
  name: `@repo/${name}`,
  version: '0.1.0',
  private: true,
  type: 'module',
  main: './src/index.ts',
  types: './src/index.ts',
  exports: {
    '.': { types: './src/index.ts', import: './src/index.ts' },
  },
  files: ['src'],
  scripts: { lint: 'eslint src', typecheck: 'tsc --noEmit' },
};

const tsconfig = {
  extends: '@repo/tsconfig/base.json',
  compilerOptions: { rootDir: 'src', outDir: 'dist', noEmit: true },
  include: ['src'],
};

await writeFile(join(root, 'package.json'), JSON.stringify(pkg, null, 2) + '\n');
await writeFile(join(root, 'tsconfig.json'), JSON.stringify(tsconfig, null, 2) + '\n');
await writeFile(join(root, 'src', 'index.ts'), `/** @repo/${name} 入口 */\nexport {};\n`);

console.info(`[create-package] ✓ packages/${name} 已创建`);
