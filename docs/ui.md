# UI 规范

## 组件分层

| 目录                   | 用途                  | 举例                                |
| ---------------------- | --------------------- | ----------------------------------- |
| `components/ui/`       | 原子组件（shadcn/ui） | Button / Input / Dialog             |
| `components/layout/`   | 通用布局              | AppShell / Sidebar / Header         |
| `components/business/` | 业务组合              | DataTable / SearchForm / EmptyState |
| `components/desktop/`  | 桌面专用              | WindowTitlebar / CommandPalette     |
| `components/mobile/`   | 移动专用              | MobileTabbar / PullRefresh          |

## 设计 Token

- 颜色 / 间距 / 圆角 / 阴影 → `configs/tailwind/tokens.ts`
- CSS 变量 → `packages/theme/src/globals.css`
- 业务侧通过 Tailwind 工具类访问，**不直接写颜色十六进制**

## 暗黑模式

- 模式：`'light' | 'dark' | 'system'`
- 切换 API：`@repo/theme` 的 `applyTheme(mode)`、`bootstrapTheme()`
- 实现：在 `<html>` 上加/移 `dark` class，与 Tailwind `darkMode: 'class'` 协作

## 添加 shadcn 组件

```bash
pnpm --filter @repo/ui ui:add button
pnpm --filter @repo/ui ui:add dialog
```

- shadcn 配置：`packages/ui/components.json`
- 生成代码会落到 `packages/ui/src/components/ui/`
- 务必在 `packages/ui/src/index.ts` 中追加导出

## 国际化

- 默认 zh-CN，文案放 `packages/i18n/src/locales/<locale>/common.json`
- 业务侧：`const { t } = useTranslation();`
- 切换语言：`i18n.changeLanguage('en-US')`

## 响应式

- PC + Mobile 一套代码，使用 `@repo/hooks/use-mobile` 或 `useBreakpoint`
- `apps/web/src/layouts/responsive-layout.tsx` 自动选择 PcLayout / MobileLayout

## 可访问性

- 按钮必须可键盘聚焦
- 图片必须 `alt`
- 颜色对比满足 WCAG AA
