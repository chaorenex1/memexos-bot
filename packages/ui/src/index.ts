/**
 * @repo/ui 入口
 * 通过该入口可统一获取所有 UI 组件
 */

// 基础原子组件（shadcn/ui）
export * from './components/ui/button';
export * from './components/ui/input';
export * from './components/ui/dialog';
export * from './components/ui/sheet';
export * from './components/ui/tabs';
export * from './components/ui/card';
export * from './components/ui/form';
export * from './components/ui/label';

// 布局组件
export * from './components/layout/app-shell';
export * from './components/layout/sidebar';
export * from './components/layout/header';
export * from './components/layout/content';
export * from './components/layout/responsive-container';

// 业务组件
export * from './components/business/data-table';
export * from './components/business/search-form';
export * from './components/business/form-card';
export * from './components/business/empty-state';
export * from './components/business/permission-guard';
export * from './components/business/nav-menu';

// 桌面组件
export * from './components/desktop/window-titlebar';
export * from './components/desktop/command-palette';
export * from './components/desktop/split-pane';
export * from './components/desktop/terminal-panel';
export * from './components/desktop/status-bar';

// 移动组件
export * from './components/mobile/mobile-tabbar';
export * from './components/mobile/mobile-page';
export * from './components/mobile/pull-refresh';

// 工具
export * from './lib/cn';
export * from './lib/variants';
