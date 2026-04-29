# MemexOS AI Chatbot

> 基于 React + TypeScript + Vite + Electron 构建的 **AI Chatbot 多端应用**，
> 一套代码同时支撑 **PC Web / Mobile Web / Desktop** 三端，提供流畅的 AI 对话体验。

## 核心特性

- **AI 对话引擎**：集成大语言模型，支持多轮对话、流式响应、上下文记忆
- **多端覆盖**：PC Web / Mobile Web / Electron Desktop 统一代码库
- **Monorepo 架构**：pnpm workspace + Turborepo，四层复用（UI / Store / Request / Platform）
- **现代工具链**：Vite 5、electron-vite 2、TypeScript 5.5
- **企业级规范**：ESLint 9 + Prettier 3 + Husky 9 + commitlint + Changesets

## 技术栈

| 维度     | 技术                                  |
| -------- | ------------------------------------- |
| 框架     | React 19 + TypeScript 5               |
| 构建     | Vite 5 / electron-vite 2 / Next.js 14 |
| 桌面     | Electron 31 + electron-builder        |
| 包管理   | pnpm 9.x workspace                    |
| Monorepo | Turborepo 2                           |
| UI       | Tailwind CSS 3.4 + shadcn/ui          |
| 状态     | Zustand 4                             |
| 请求     | TanStack Query 5 + Axios 1            |
| 表单校验 | Zod 3                                 |
| 表格     | TanStack Table 8                      |
| 国际化   | i18next 23                            |
| 路由     | React Router 6                        |
| 测试     | Vitest 2 + Playwright 1               |

## 目录结构

```
memexos-bot/
├─ apps/
│  ├─ web/          # PC Web + Mobile Web SPA
│  ├─ web-ssr/      # Next.js SSR/SSG 应用
│  └─ desktop/      # Electron 桌面端
├─ packages/
│  ├─ ui/           # 通用 UI 组件库（shadcn/ui）
│  ├─ icons/        # 图标封装（基于 lucide-react）
│  ├─ hooks/        # 通用 React Hooks
│  ├─ store/        # Zustand 状态管理
│  ├─ request/      # Axios + TanStack Query 请求层
│  ├─ router/       # 路由封装
│  ├─ theme/        # 主题、暗黑模式、CSS Token
│  ├─ utils/        # 通用工具函数
│  ├─ types/        # 全局 TypeScript 类型
│  ├─ constants/    # 常量
│  ├─ validators/   # Zod 校验 Schema
│  ├─ i18n/         # 国际化
│  └─ platform/     # 平台能力抽象（web/desktop 差异）
├─ configs/         # ESLint/TS/Tailwind/Vite/commitlint 公共配置
├─ scripts/         # 自动化脚本
├─ docs/            # 项目文档
└─ .github/         # CI/CD
```

## 快速开始

### 环境要求

- Node.js >= 22.10
- pnpm >= 9.0
- Windows / macOS / Linux

```bash
# 检查环境
pnpm check-env

# 安装依赖
pnpm install

# 启动 Web 开发
pnpm dev:web         # http://localhost:5173

# 启动 SSR 开发
pnpm dev:ssr         # http://localhost:3000

# 启动 Desktop 开发
pnpm dev:desktop     # 启动 Electron 窗口

# 全量构建
pnpm build

# 代码检查
pnpm lint
pnpm typecheck
pnpm format:check

# 测试
pnpm test
pnpm test:e2e
```

### 创建新内容

```bash
# 创建新 package
pnpm create:package <name>

# 创建新页面（apps/web）
pnpm create:page <name>

# 创建新组件（packages/ui）
pnpm create:component <name>
```

## 设计原则

1. **依赖方向**：apps → packages，packages 之间允许引用，packages **不可**反向依赖 apps
2. **Electron 安全边界**：Renderer 不直接访问 Node API，必须经 preload + IPC
3. **平台抽象**：业务侧统一从 `@repo/platform` 引入跨端能力
4. **样式 token 化**：颜色/间距/圆角全部走 `configs/tailwind/tokens.ts`

## 文档

- [架构说明](./docs/architecture.md)
- [安全规范](./docs/security.md)
- [Electron 规范](./docs/electron.md)
- [UI 规范](./docs/ui.md)
- [部署发布](./docs/deploy.md)

## 提交规范

使用 [Conventional Commits](https://www.conventionalcommits.org/zh-hans/)：

```
<type>(<scope>): <subject>

# 示例
feat(web): 新增对话页骨架
fix(desktop): 修复托盘菜单退出失败
docs(architecture): 补充 IPC 流程图
```

## License

MIT
