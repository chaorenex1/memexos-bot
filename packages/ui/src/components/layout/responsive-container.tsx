import type { HTMLAttributes } from 'react';

import { cn } from '@/lib/cn';

/** 响应式容器：移动端全宽，桌面端 max-width */
export function ResponsiveContainer({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8', className)}
      {...rest}
    />
  );
}
