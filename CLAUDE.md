# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概览

React + TypeScript + Vite + Electron 的多端业务脚手架（Monorepo），一套代码同时支撑 **PC Web / Mobile Web / Electron Desktop**，外加可选的 **Next.js SSR** 入口。pnpm workspace + Turborepo 编排，UI / Store / Request / Platform 四层在 `packages/` 沉淀，`apps/` 只做业务编排。

## 常用命令

所有命令在仓库根目录执行；Turborepo 会按 `turbo.json` 处理依赖顺序与并行。

```bash
# 安装与环境
pnpm install
pnpm check-env                       # 校验 Node ≥ 22.10 / pnpm ≥ 9.0

# 开发（持久任务，cache: false）
pnpm dev                             # 同时启动所有 apps
pnpm dev:web                         # apps/web @ http://localhost:5173
pnpm dev:ssr                         # apps/web-ssr @ http://localhost:3000
pnpm dev:desktop                     # apps/desktop（Electron 窗口）

# 构建
pnpm build                           # 全量构建，依赖 ^build
pnpm build:web | build:ssr | build:desktop
pnpm --filter @app/desktop build:win   # 仅打 Windows 安装包
pnpm --filter @app/desktop build:mac   # 仅打 macOS（需在 Mac 上）
pnpm --filter @app/desktop build:linux

# 质量门禁
pnpm lint
pnpm lint:fix
pnpm typecheck
pnpm format:check
pnpm format

# 测试
pnpm test                            # turbo run test → 各 app/package vitest
pnpm test:e2e                        # Playwright
pnpm --filter @app/web test          # 单独跑某个 workspace
pnpm --filter @app/web test -- path/to/file.test.ts  # 单文件

# 清理
pnpm clean                           # 清 dist/build/.turbo/.next 等
pnpm clean -- --deps                 # 同时清 node_modules

# 脚手架
pnpm create:package <name>           # 新建 packages/<name>
pnpm create:page <name>              # 新建 apps/web/src/pages/<name>
pnpm create:component <Name>         # 新建 packages/ui/src/components/business/<name>

# 版本与发布（Changesets）
pnpm changeset                       # 交互式记录变更
pnpm changeset:version               # 计算新版本
pnpm changeset:publish               # 真实发布
```

`@app/web`、`@app/web-ssr`、`@app/desktop` 已在 `.changeset/config.json` 的 `ignore` 中，不参与 publish 但版本会随之 bump。

## 架构

### Workspace 拓扑

```
apps/{web,web-ssr,desktop}     ── 业务编排，三个独立入口
   │
   ▼ 只允许向下依赖
packages/{ui,store,request,router,platform,hooks,theme,i18n,
          icons,utils,types,constants,validators}
   │
   ▼
configs/{eslint,typescript,tailwind,vite,commitlint}
```

**强约束（违反即视为破坏架构）**：

- `apps → packages` 单向依赖；任何 `package` 出现 `import '@app/...'` 都是错误
- `packages` 内部按层级引用：types ← constants ← utils ← hooks/store/request/...
- Renderer 进程**禁止**直接 `import('node:*')` 或 `electron`；Node 能力只能从 `packages/platform/desktop` 或 preload 暴露
- 颜色/间距/圆角不写硬编码，统一走 `configs/tailwind/tokens.ts` + `packages/theme/src/globals.css` 中的 CSS 变量

### 路径别名

- `@/*` → 当前 app 的 `src/*`（apps/desktop 额外有 `@main/* @preload/* @ipc/* @shared/*`）
- `@repo/<pkg>` → `packages/<pkg>/src`（在 `configs/vite/alias.ts` 中集中维护，apps 通过 `createAliases({ appRoot })` 引入）

### 三端运行时

| 应用           | 入口                                      | 构建器                | 路由                                              |
| -------------- | ----------------------------------------- | --------------------- | ------------------------------------------------- |
| `apps/web`     | `src/app/main.tsx`                        | Vite 5                | React Router v6 **browser**                       |
| `apps/desktop` | `electron/main/index.ts` + `src/main.tsx` | electron-vite 2       | React Router v6 **hash**（避免 file:// 路径问题） |
| `apps/web-ssr` | `app/layout.tsx`                          | Next.js 14 App Router | Next.js 内置                                      |

Next.js 必须在 `next.config.mjs` 的 `transpilePackages` 中显式列出所有 `@repo/*` 包，因为这些包以 TS 源码形式导出（无 build 步骤）。

### 四层复用

- **UI**（`@repo/ui`）— shadcn/ui 模式：`components/ui/`（原子）+ `layout/` + `business/` + `desktop/` + `mobile/`。新增 shadcn 组件用 `pnpm --filter @repo/ui ui:add <name>`，配置在 `packages/ui/components.json`。生成后**必须**在 `packages/ui/src/index.ts` 追加 `export *`。
- **Store**（`@repo/store`）— Zustand：`slices/{app,user,settings,theme}.slice.ts` 是无 store 包装的可组合 slice；`stores/{app,user}.store.ts` 用 `persist` middleware 合并 slice；`persist/{web,desktop}-storage.ts` 是 `PersistStorage` 适配器。Desktop 持久化通过 `window.electron.storage` IPC 桥到 main 进程的 `electron-store`。
- **Request**（`@repo/request`）— `createAxiosClient({ getToken, onUnauthorized })` 工厂返回带拦截器的 instance；`withRefreshToken(client, { refresh })` 提供 401 单飞 refresh 队列；`createQueryClient()` 返回带默认 options 的 `QueryClient`。
- **Platform**（`@repo/platform`）— 业务侧只用 `import { platformFile, platformStorage, platformSystem, platformTerminal } from '@repo/platform'`。包内根据 `detectPlatform()` 自动选择 `web/` 或 `desktop/` 实现。Web 下 `platformTerminal` 是 noop。

### Electron 五层（`apps/desktop/electron/`）

```
main/         BrowserWindow / 菜单 / 托盘 / 自动更新 / 安全策略
preload/      contextBridge → window.electron.{app,file,storage,system,terminal}
ipc/          ipcMain.handle，入参用 Zod schema 校验后转发
services/     封装 fs / spawn / electron-store
shared/       channels.ts（IPC 通道常量）+ schemas.ts（Zod 校验）
```

**安全基线**（不要降级）：`contextIsolation: true` / `nodeIntegration: false` / `sandbox: true`；外链走 `shell.openExternal`；CSP 在 `apps/desktop/index.html` 的 `<meta>` 已设置；所有 IPC handler 必须先 `schema.parse(raw)` 再调 service。

### 状态持久化对照

| 平台    | 实现                     | 适配器                                                            |
| ------- | ------------------------ | ----------------------------------------------------------------- |
| Web SPA | `localStorage`           | `@repo/store/persist/web-storage`                                 |
| Desktop | `electron-store` via IPC | `@repo/store/persist/desktop-storage`（缺失桥时回退 web-storage） |
| SSR     | 仅会话内存               | 不持久化                                                          |

## 工具链关键约束

- **Node ≥ 22.10**（见 `package.json` engines），**pnpm 9.x**
- **`.npmrc`**：`auto-install-peers=true`、`strict-peer-dependencies=false`、`node-linker=isolated`。pnpm 严格隔离意味着**任何在源码中 `import` 的第三方包必须出现在该 workspace 自身的 `package.json`**，即使父项目已经依赖（不能依赖 hoist）。例：`packages/ui` 直接 `import { X } from 'lucide-react'`，则 `lucide-react` 必须列在 `packages/ui/package.json`。
- **`electron-store`**：v9+ 是 ESM-only。本仓库主进程编译为 CommonJS（electron-vite 默认），因此须锁定 `^8.2.0`。如果未来切到 ESM 主进程可解锁。
- **Tailwind v3.4**（不要升 v4）— 与 shadcn/ui 兼容性最好，所有 `tailwind.config.ts` 都通过 `presets: [preset]` 引用 `@repo/tailwind-config/preset`。
- **TypeScript references**：根 `tsconfig.json` 列出所有 `packages/*`；新建 package 后须在根加 `references` 项。
- **Husky 9** 通过根 `package.json` 的 `prepare: husky` 触发；hook 文件在 `.husky/`，`pre-commit` 跑 lint-staged，`commit-msg` 跑 commitlint（Conventional Commits）。

## 添加新内容的位置决策

| 需要添加                            | 位置                                                                                                                                                                                                          |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 一个跨端业务页面                    | `apps/web/src/pages/<name>` + `apps/desktop/src/pages/<name>`（共享逻辑提到 `apps/*/src/modules/`）                                                                                                           |
| 跨 app 复用的 React 组件            | `packages/ui/src/components/business/<name>` 并在 `src/index.ts` 导出                                                                                                                                         |
| 跨 app 复用的 hook                  | `packages/hooks/src/use-<name>.ts` 并在 `src/index.ts` 导出                                                                                                                                                   |
| 跨端能力（涉及 fs/系统/存储等差异） | 在 `packages/platform/src/types.ts` 定义接口；`web/` 与 `desktop/` 各实现一份；`index.ts` 按平台分发                                                                                                          |
| Electron 主进程新功能               | `electron/services/<name>.service.ts`（业务逻辑）+ `electron/ipc/<name>.ipc.ts`（带 Zod 校验的 handler）+ `electron/preload/<name>.api.ts`（contextBridge）+ `electron/shared/{channels,schemas}.ts` 各加一项 |
| Zod schema                          | `packages/validators/src/<domain>.ts`，在 `index.ts` 通过 namespace 导出                                                                                                                                      |
| 全局类型                            | `packages/types/src/<domain>.ts`，在 `index.ts` 重导出                                                                                                                                                        |

## 提交规范

Conventional Commits（commitlint 强制）。允许的 type：`feat | fix | docs | style | refactor | perf | test | build | ci | chore | revert`。subject ≤ 100 字符，header ≤ 120 字符。

## 文档索引

`docs/` 下中文规范，进一步细节查阅：

- `architecture.md` — 依赖方向、数据流、路由策略
- `security.md` — Electron 安全基线、IPC 边界、凭证管理
- `electron.md` — 主进程/preload/IPC 规范、自动更新、调试
- `ui.md` — 组件分层、设计 token、shadcn 添加流程、暗黑模式
- `deploy.md` — 三端构建产物与发布流水线
