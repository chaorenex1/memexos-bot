#!/usr/bin/env tsx
/**
 * 在 apps/web/src/pages 下创建新页面
 * 用法：pnpm create:page user-list
 */
import { existsSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const name = process.argv[2];
if (!name) {
  console.error('请提供页面名：pnpm create:page <name>');
  process.exit(1);
}

const root = join(process.cwd(), 'apps', 'web', 'src', 'pages', name);
if (existsSync(root)) {
  console.error(`apps/web/src/pages/${name} 已存在`);
  process.exit(1);
}

await mkdir(root, { recursive: true });

const indexTsx = `export default function ${pascal(name)}(): JSX.Element {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">${name}</h1>
    </div>
  );
}
`;

await writeFile(join(root, 'index.tsx'), indexTsx);

console.info(`[create-page] ✓ apps/web/src/pages/${name}/index.tsx 已创建`);

function pascal(s: string): string {
  return s
    .split(/[-_\s]/)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join('');
}
