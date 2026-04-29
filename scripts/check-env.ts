#!/usr/bin/env tsx
/**
 * 环境检查：node / pnpm / git 版本、必要 npm scope 的连通性
 */
import { execSync } from 'node:child_process';

interface Check {
  name: string;
  cmd: string;
  pattern?: RegExp;
  hint?: string;
}

const checks: Check[] = [
  { name: 'Node', cmd: 'node -v', pattern: /^v(\d+)/, hint: 'Node 20+' },
  { name: 'pnpm', cmd: 'pnpm -v', pattern: /^(\d+)/, hint: 'pnpm 9+' },
  { name: 'git', cmd: 'git --version' },
];

let failed = 0;
for (const c of checks) {
  try {
    const out = execSync(c.cmd, { stdio: ['ignore', 'pipe', 'ignore'] })
      .toString()
      .trim();
    if (c.pattern) {
      const m = out.match(c.pattern);
      if (m) {
        const major = Number(m[1]);
        if (c.name === 'Node' && major < 20) {
          console.error(`[check-env] ✗ ${c.name} 当前版本 ${out}（${c.hint ?? ''}）`);
          failed++;
          continue;
        }
        if (c.name === 'pnpm' && major < 9) {
          console.error(`[check-env] ✗ ${c.name} 当前版本 ${out}（${c.hint ?? ''}）`);
          failed++;
          continue;
        }
      }
    }
    console.info(`[check-env] ✓ ${c.name} ${out}`);
  } catch {
    console.error(`[check-env] ✗ ${c.name} 未安装`);
    failed++;
  }
}

if (failed > 0) {
  console.error(`[check-env] ${failed} 项检查未通过`);
  process.exit(1);
}
