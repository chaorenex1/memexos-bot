# 架构说明

> 本文档描述 react-universal-electron-starter 的整体架构、依赖方向与关键设计决策。

## 总览

```
┌──────────────────────────────────────────────┐
│                    apps                      │
│   ┌─────────┐  ┌──────────┐  ┌─────────────┐ │
│   │   web   │  │ web-ssr  │  │   desktop   │ │
│   │ (Vite)  │  │ (Next)   │  │ (Electron)  │ │
│   └────┬────┘  └────┬─────┘  └──────┬──────┘ │
│        │            │               │        │
│        └────────────┼───────────────┘        │
│                     ▼                        │
│ ┌──────────────────────────────────────────┐ │
│ │                packages                  │ │
│ │  ui · store · request · router · platform│ │
│ │  hooks · theme · i18n · utils · icons    │ │
│ │  types · constants · validators          │ │
│ └──────────────────────────────────────────┘ │
│                     ▲                        │
│ ┌──────────────────────────────────────────┐ │
│ │                 configs                  │ │
│ │  eslint · typescript · tailwind · vite   │ │
│ └──────────────────────────────────────────┘ │
└──────────────────────────────────────────────┘
```

## 依赖方向（强约束）

1. **apps → packages**：业务页面只能依赖 packages，禁止反向依赖
2. **packages 之间**：可以引用更底层的包（types ← constants ← utils ← hooks ← store ← ...）
3. **packages 不依赖 apps**：任何 package 出现 `import '@app/...'` 都视为违规
4. **Electron 能力**：仅能从 `packages/platform/desktop` 或 preload 暴露

## 三端运行时

| 应用           | 入口                                      | 构建                 | 渲染          |
| -------------- | ----------------------------------------- | -------------------- | ------------- |
| `apps/web`     | `src/app/main.tsx`                        | Vite 5               | CSR / SPA     |
| `apps/web-ssr` | `app/layout.tsx`                          | Next.js 14           | SSR / SSG     |
| `apps/desktop` | `electron/main/index.ts` + `src/main.tsx` | electron-vite + Vite | 主进程 + 渲染 |

## 四层复用

- **UI**（`@repo/ui`）：原子组件 + 业务组件 + 桌面/移动专用
- **Store**（`@repo/store`）：Zustand slice + persist，按平台切换持久化
- **Request**（`@repo/request`）：Axios + TanStack Query，统一拦截器/refresh 队列
- **Platform**（`@repo/platform`）：屏蔽 web/desktop 差异（storage / file / system / terminal）

## Electron 三层

```
electron/
├─ main/         主进程（窗口、托盘、菜单、安全策略）
├─ preload/      预加载（contextBridge 暴露 window.electron）
├─ ipc/          IPC handler（Zod 校验后调用 services）
├─ services/     服务层（封装 fs / spawn / electron-store）
└─ shared/       channels & schemas（main/preload 共用）
```

## 数据流

1. Renderer 业务组件调用 `@repo/platform`
2. 在 desktop 下，`platform.desktop.*` 通过 `window.electron.*` 调 IPC
3. IPC handler 校验入参、转发给 service 层
4. service 操作系统资源（fs / spawn / electron-store）
5. 结果原路返回 renderer

## 路由策略

- `apps/web`：`react-router-dom` browser router
- `apps/desktop`：`react-router-dom` hash router（避免 file:// 路径问题）
- `apps/web-ssr`：Next.js App Router

## 状态持久化

| 平台    | 存储                   | 说明                                  |
| ------- | ---------------------- | ------------------------------------- |
| Web     | localStorage           | `@repo/store/persist/web-storage`     |
| Desktop | electron-store via IPC | `@repo/store/persist/desktop-storage` |
| SSR     | 仅会话内存（不持久化） | 服务端不写浏览器存储                  |
