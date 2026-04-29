/** Mobile 页面壳：标题栏 + 内容区 + 可选 tabbar */
import { cn } from '../../lib/cn';

import type { ReactNode } from 'react';

export interface MobilePageProps {
  title?: ReactNode;
  left?: ReactNode;
  right?: ReactNode;
  children: ReactNode;
  /** 底部 tabbar 占位高度（px） */
  bottomGap?: number;
  className?: string;
}

export function MobilePage(props: MobilePageProps) {
  const { title, left, right, children, bottomGap = 0, className } = props;
  return (
    <div className={cn('flex min-h-screen flex-col bg-background', className)}>
      <header className="flex h-12 items-center justify-between border-b px-3">
        <div className="w-10">{left}</div>
        <div className="flex-1 text-center text-base font-medium">{title}</div>
        <div className="flex w-10 justify-end">{right}</div>
      </header>
      <main className="flex-1 overflow-auto" style={{ paddingBottom: bottomGap }}>
        {children}
      </main>
    </div>
  );
}
