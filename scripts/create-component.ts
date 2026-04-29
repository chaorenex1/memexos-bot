#!/usr/bin/env tsx
/**
 * 在 packages/ui/src/components/business 下创建新业务组件
 * 用法：pnpm create:component Foo
 */
import { existsSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const name = process.argv[2];
if (!name) {
  console.error('请提供组件名：pnpm create:component <Name>');
  process.exit(1);
}

const dirName = name
  .replace(/^[A-Z]/, (c) => c.toLowerCase())
  .replace(/[A-Z]/g, (c) => '-' + c.toLowerCase());
const componentName = name.charAt(0).toUpperCase() + name.slice(1);

const root = join(process.cwd(), 'packages', 'ui', 'src', 'components', 'business', dirName);
if (existsSync(root)) {
  console.error(`组件目录 ${dirName} 已存在`);
  process.exit(1);
}
await mkdir(root, { recursive: true });

const indexTsx = `import { cn } from '../../../lib/cn';

export interface ${componentName}Props {
  className?: string;
}

export function ${componentName}({ className }: ${componentName}Props): JSX.Element {
  return <div className={cn('p-4', className)}>${componentName}</div>;
}
`;

await writeFile(join(root, 'index.tsx'), indexTsx);

console.info(
  `[create-component] ✓ packages/ui/src/components/business/${dirName}/index.tsx 已创建`,
);
console.info(`  请记得在 packages/ui/src/index.ts 中追加导出：`);
console.info(`    export * from './components/business/${dirName}';`);
