import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

export interface AppShellProps {
  className?: string;
  /** 顶部 header 区 */
  header?: ReactNode;
  /** 左侧 sidebar 区 */
  sidebar?: ReactNode;
  /** 右侧扩展区 */
  aside?: ReactNode;
  /** 底部 footer */
  footer?: ReactNode;
  /** 主体内容 */
  children: ReactNode;
}

/** 应用骨架：header + sidebar + content + aside + footer 五区 */
export function AppShell(props: AppShellProps) {
  const { className, header, sidebar, aside, footer, children } = props;
  return (
    <div className={cn('flex min-h-screen flex-col bg-background text-foreground', className)}>
      {header}
      <div className="flex flex-1 overflow-hidden">
        {sidebar}
        <main className="flex flex-1 flex-col overflow-auto">{children}</main>
        {aside}
      </div>
      {footer}
    </div>
  );
}
