import type { ReactNode } from 'react';

interface SimpleLayoutProps {
  children: ReactNode;
}

/** 简单布局：仅内容区，用于登录、欢迎、设置等 */
export function SimpleLayout({ children }: SimpleLayoutProps) {
  return <div className="flex min-h-screen items-center justify-center p-6">{children}</div>;
}
