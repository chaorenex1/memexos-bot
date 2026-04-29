# 脚手架规格说明

> 本文档源自 `react-universal-electron-starter.txt`，是脚手架的设计契约（What & Why），描述目标、技术栈、目录划分与分层原则。
> 实现细节请参考同目录下的 [`architecture.md`](./architecture.md)、[`electron.md`](./electron.md)、[`ui.md`](./ui.md)。

## 目录

- [一、目标](#一目标)
- [二、技术栈](#二技术栈)
- [三、核心原则](#三核心原则)
- [四、桌面端设计重点](#四桌面端设计重点)
- [五、目录分层](#五目录分层)
  - [5.1 仓库根](#51-仓库根)
  - [5.2 apps/web](#52-appsweb)
  - [5.3 apps/desktop](#53-appsdesktop)
  - [5.4 packages/ui](#54-packagesui)
  - [5.5 packages/request](#55-packagesrequest)
  - [5.6 packages/platform](#56-packagesplatform)
  - [5.7 packages/store](#57-packagesstore)
  - [5.8 configs](#58-configs)
- [六、分层原则](#六分层原则)
- [七、最终核心价值](#七最终核心价值)

---

## 一、目标

一个基于 **React + TypeScript + Vite + Electron** 的多端业务脚手架：

- 支持 **PC Web、Mobile Web、Desktop** 应用开发
- 通过 **Monorepo** 复用 UI、状态、请求和业务逻辑
- 桌面端基于 **Electron** 提供本地文件、系统托盘、窗口管理、CLI 调用和自动更新能力

## 二、技术栈

| 维度     | 技术                             |
| -------- | -------------------------------- |
| 构建     | Vite + electron-vite             |
| 框架     | React + TypeScript               |
| 桌面     | Electron                         |
| 包管理   | pnpm workspace                   |
| Monorepo | Turborepo                        |
| UI       | Tailwind CSS + shadcn/ui         |
| 状态     | Zustand                          |
| 请求     | TanStack Query + Axios           |
| 表单校验 | Zod                              |
| 表格     | TanStack Table                   |
| 国际化   | i18next                          |
| 日期处理 | dayjs                            |
| 工具库   | lodash-es                        |
| 路由     | React Router / TanStack Router   |
| 打包     | electron-builder                 |
| 测试     | Vitest + Playwright              |
| 代码规范 | ESLint + Prettier                |
| Git 规范 | Husky + lint-staged + commitlint |

## 三、核心原则

1. **Web 能力放 React**
2. **桌面能力放 Electron main**
3. **通信统一走 preload + IPC**
4. **不要在 renderer 直接使用 Node API**

## 四、桌面端设计重点

### main process

- 窗口管理
- 菜单栏
- 系统托盘
- 自动更新
- 文件系统
- 本地数据库
- 子进程 / CLI 调用

### preload

- 暴露安全 API
- 隔离 Node 能力
- 封装 IPC 调用

### renderer

- React 页面
- 复用 `packages/ui`
- 复用 `packages/store`
- 复用 `packages/request`

## 五、目录分层

### 5.1 仓库根

```
react-universal-electron-starter/
├─ apps/
│  ├─ web/                          # Web 应用：PC Web + Mobile Web，默认 SPA
│  ├─ web-ssr/                      # 可选：SSR / SSG 应用，例如 Next.js
│  └─ desktop/                      # Electron 桌面端
│
├─ packages/
│  ├─ ui/                           # 通用 UI 组件库
│  ├─ icons/                        # 图标封装，可基于 lucide-react
│  ├─ hooks/                        # 通用 React Hooks
│  ├─ store/                        # Zustand 状态管理
│  ├─ request/                      # Axios + TanStack Query 请求层
│  ├─ router/                       # 路由配置封装
│  ├─ theme/                        # 主题、暗黑模式、CSS Token
│  ├─ utils/                        # 通用工具函数
│  ├─ types/                        # 全局 TypeScript 类型
│  ├─ constants/                    # 常量
│  ├─ validators/                   # Zod 校验 Schema
│  ├─ i18n/                         # 国际化
│  └─ platform/                     # 平台能力抽象：web / desktop 差异
│
├─ configs/
│  ├─ eslint/                       # ESLint 公共配置
│  ├─ prettier/                     # Prettier 配置
│  ├─ typescript/                   # tsconfig 基础配置
│  ├─ tailwind/                     # Tailwind preset
│  ├─ vite/                         # Vite 公共配置
│  └─ commitlint/                   # Git 提交规范
│
├─ scripts/
│  ├─ create-package.ts             # 创建 package 脚本
│  ├─ create-page.ts                # 创建页面脚本
│  ├─ create-component.ts           # 创建组件脚本
│  ├─ clean.ts                      # 清理 node_modules/dist
│  ├─ release.ts                    # 发布脚本
│  └─ check-env.ts                  # 环境检查
│
├─ docs/
│  ├─ architecture.md               # 架构说明
│  ├─ security.md                   # 安全规范
│  ├─ electron.md                   # Electron 规范
│  ├─ ui.md                         # UI 规范
│  └─ deploy.md                     # 部署发布说明
│
├─ .github/
│  └─ workflows/
│     ├─ web-ci.yml                 # Web CI
│     ├─ desktop-build.yml          # Electron 打包
│     └─ release.yml                # 发布
│
├─ .changeset/                      # Changesets 版本管理
├─ pnpm-workspace.yaml
├─ turbo.json
├─ package.json
├─ tsconfig.json
├─ .eslintrc.cjs
├─ .prettierrc
├─ .gitignore
└─ README.md
```

### 5.2 apps/web

```
apps/web/
├─ public/
│  ├─ favicon.ico
│  └─ manifest.json
│
├─ src/
│  ├─ app/                          # 应用启动层
│  │  ├─ main.tsx                   # React 入口
│  │  ├─ app.tsx                    # 根组件
│  │  ├─ providers.tsx              # QueryClient、Theme、Store Provider
│  │  ├─ router.tsx                 # 路由入口
│  │  └─ error-boundary.tsx         # 全局异常边界
│  │
│  ├─ pages/                        # 页面层
│  │  ├─ dashboard/
│  │  │  ├─ index.tsx
│  │  │  ├─ components/
│  │  │  └─ hooks/
│  │  ├─ login/
│  │  └─ settings/
│  │
│  ├─ modules/                      # 业务模块层
│  │  ├─ auth/
│  │  │  ├─ api.ts
│  │  │  ├─ hooks.ts
│  │  │  ├─ types.ts
│  │  │  └─ components/
│  │  ├─ user/
│  │  └─ agent/
│  │
│  ├─ layouts/                      # 布局层
│  │  ├─ pc-layout.tsx
│  │  ├─ mobile-layout.tsx
│  │  ├─ auth-layout.tsx
│  │  └─ responsive-layout.tsx
│  │
│  ├─ routes/                       # 路由表
│  │  ├─ index.tsx
│  │  ├─ lazy.tsx
│  │  └─ guards.tsx
│  │
│  ├─ assets/
│  ├─ styles/
│  │  ├─ globals.css
│  │  └─ tailwind.css
│  │
│  └─ env.d.ts
│
├─ index.html
├─ vite.config.ts
├─ tailwind.config.ts
├─ tsconfig.json
└─ package.json
```

### 5.3 apps/desktop

```
apps/desktop/
├─ electron/
│  ├─ main/                         # 主进程
│  │  ├─ index.ts                   # Electron 启动入口
│  │  ├─ window.ts                  # BrowserWindow 管理
│  │  ├─ menu.ts                    # 菜单
│  │  ├─ tray.ts                    # 系统托盘
│  │  ├─ updater.ts                 # 自动更新
│  │  ├─ lifecycle.ts               # 生命周期
│  │  └─ security.ts                # 安全策略
│  │
│  ├─ preload/                      # 预加载层
│  │  ├─ index.ts                   # contextBridge 暴露 API
│  │  ├─ app.api.ts
│  │  ├─ file.api.ts
│  │  ├─ system.api.ts
│  │  └─ terminal.api.ts
│  │
│  ├─ ipc/                          # IPC 层
│  │  ├─ index.ts                   # IPC 注册入口
│  │  ├─ app.ipc.ts
│  │  ├─ file.ipc.ts
│  │  ├─ system.ipc.ts
│  │  └─ terminal.ipc.ts
│  │
│  ├─ services/                     # 主进程服务
│  │  ├─ file.service.ts
│  │  ├─ terminal.service.ts
│  │  ├─ storage.service.ts
│  │  └─ updater.service.ts
│  │
│  └─ shared/
│     ├─ channels.ts                # IPC channel 常量
│     └─ schemas.ts                 # IPC Zod 参数校验
│
├─ src/                             # Renderer：React 渲染层
│  ├─ app/
│  ├─ pages/
│  ├─ modules/
│  ├─ layouts/
│  │  ├─ desktop-layout.tsx
│  │  ├─ ide-layout.tsx
│  │  └─ simple-layout.tsx
│  ├─ routes/
│  ├─ styles/
│  └─ main.tsx
│
├─ resources/
│  ├─ icons/
│  ├─ installer/
│  └─ splash/
│
├─ build/
│  ├─ entitlements.mac.plist
│  └─ notarize.js
│
├─ electron.vite.config.ts
├─ electron-builder.yml
├─ tsconfig.json
└─ package.json
```

### 5.4 packages/ui

```
packages/ui/
├─ src/
│  ├─ components/
│  │  ├─ ui/                        # shadcn/ui 原子组件
│  │  │  ├─ button.tsx
│  │  │  ├─ input.tsx
│  │  │  ├─ dialog.tsx
│  │  │  ├─ sheet.tsx
│  │  │  ├─ tabs.tsx
│  │  │  ├─ card.tsx
│  │  │  └─ form.tsx
│  │  │
│  │  ├─ layout/                    # 通用布局组件
│  │  │  ├─ app-shell.tsx
│  │  │  ├─ sidebar.tsx
│  │  │  ├─ header.tsx
│  │  │  ├─ content.tsx
│  │  │  └─ responsive-container.tsx
│  │  │
│  │  ├─ business/                  # 业务组件
│  │  │  ├─ data-table/
│  │  │  ├─ search-form/
│  │  │  ├─ form-card/
│  │  │  └─ empty-state/
│  │  │
│  │  ├─ desktop/                   # Electron 桌面专用组件
│  │  │  ├─ window-titlebar.tsx
│  │  │  ├─ command-palette.tsx
│  │  │  ├─ split-pane.tsx
│  │  │  ├─ terminal-panel.tsx
│  │  │  └─ status-bar.tsx
│  │  │
│  │  └─ mobile/                    # Mobile Web 专用组件
│  │     ├─ mobile-tabbar.tsx
│  │     ├─ mobile-page.tsx
│  │     └─ pull-refresh.tsx
│  │
│  ├─ hooks/
│  │  ├─ use-breakpoint.ts
│  │  ├─ use-mobile.ts
│  │  └─ use-command-menu.ts
│  │
│  ├─ lib/
│  │  ├─ cn.ts
│  │  └─ variants.ts
│  │
│  ├─ styles/
│  │  ├─ globals.css
│  │  └─ tokens.css
│  │
│  └─ index.ts
│
├─ components.json
├─ tailwind.config.ts
├─ tsconfig.json
└─ package.json
```

### 5.5 packages/request

```
packages/request/
├─ src/
│  ├─ client/
│  │  ├─ axios-client.ts
│  │  ├─ interceptors.ts
│  │  └─ error-handler.ts
│  │
│  ├─ query/
│  │  ├─ query-client.ts
│  │  ├─ query-keys.ts
│  │  └─ mutation-options.ts
│  │
│  ├─ auth/
│  │  ├─ token.ts
│  │  └─ refresh-token.ts
│  │
│  ├─ types/
│  │  ├─ response.ts
│  │  └─ pagination.ts
│  │
│  └─ index.ts
│
└─ package.json
```

### 5.6 packages/platform

```
packages/platform/
├─ src/
│  ├─ index.ts
│  ├─ platform.ts                   # 判断 web / desktop / mobile
│  │
│  ├─ web/
│  │  ├─ storage.ts                 # localStorage / sessionStorage
│  │  ├─ file.ts                    # Web 文件 API
│  │  └─ system.ts
│  │
│  ├─ desktop/
│  │  ├─ storage.ts                 # electron-store / IPC
│  │  ├─ file.ts                    # 调用 preload API
│  │  ├─ system.ts
│  │  └─ terminal.ts
│  │
│  └─ types.ts
│
└─ package.json
```

**调用方式：**

```ts
import { platformFile } from '@repo/platform';

await platformFile.readText('/path/to/file');
```

### 5.7 packages/store

```
packages/store/
├─ src/
│  ├─ slices/
│  │  ├─ app.slice.ts
│  │  ├─ user.slice.ts
│  │  ├─ settings.slice.ts
│  │  └─ theme.slice.ts
│  │
│  ├─ stores/
│  │  ├─ app.store.ts
│  │  └─ user.store.ts
│  │
│  ├─ persist/
│  │  ├─ web-storage.ts
│  │  └─ desktop-storage.ts
│  │
│  └─ index.ts
│
└─ package.json
```

### 5.8 configs

```
configs/
├─ eslint/
│  ├─ base.cjs
│  ├─ react.cjs
│  └─ node.cjs
│
├─ typescript/
│  ├─ base.json
│  ├─ react.json
│  └─ node.json
│
├─ tailwind/
│  ├─ preset.ts
│  └─ tokens.ts
│
├─ vite/
│  ├─ base.ts
│  ├─ react.ts
│  └─ alias.ts
│
└─ commitlint/
   └─ index.cjs
```

## 六、分层原则

| 层                  | 职责                         |
| ------------------- | ---------------------------- |
| `apps`              | 只放应用入口，不沉淀通用能力 |
| `packages/ui`       | 沉淀组件体系                 |
| `packages/request`  | 沉淀请求规范                 |
| `packages/store`    | 沉淀状态模型                 |
| `packages/platform` | 隔离 Web / Desktop 能力差异  |
| `configs`           | 统一工程规范                 |
| `scripts`           | 自动化工程能力               |

最关键的是这个边界：

- 业务页面**可以**依赖 `packages`
- `packages` **不应该**反向依赖 `apps`
- Electron 能力**只能**从 `platform/desktop` 或 `preload` 暴露
- Renderer **不直接**访问 Node.js API

## 七、最终核心价值

> **一套** React 业务代码
> **两类**入口：Web / Desktop
> **三端**适配：PC Web / Mobile Web / Electron
> **四层**复用：UI / Store / Request / Platform
