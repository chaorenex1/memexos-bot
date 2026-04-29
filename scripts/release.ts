#!/usr/bin/env tsx
/**
 * release：通过 changesets 生成新版本并发布（占位骨架）
 * 一般在 CI 中调用，本地仅做模拟
 */
import { execSync } from 'node:child_process';

function run(cmd: string): void {
  console.info(`[release] $ ${cmd}`);
  execSync(cmd, { stdio: 'inherit' });
}

run('pnpm changeset version');
run('pnpm install');
run('pnpm build');
// 真正发布请按需开启：
// run('pnpm changeset publish');
console.info('[release] done（如需发布到 registry，请取消注释 changeset publish 行）');
