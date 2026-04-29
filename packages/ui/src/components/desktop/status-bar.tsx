/** StatusBar：底部状态栏 */
import { cn } from '../../lib/cn';

import type { HTMLAttributes, ReactNode } from 'react';

export interface StatusBarProps extends HTMLAttributes<HTMLDivElement> {
  left?: ReactNode;
  right?: ReactNode;
}

export function StatusBar({ left, right, className, ...rest }: StatusBarProps) {
  return (
    <div
      className={cn(
        'flex h-6 items-center justify-between border-t bg-muted/40 px-3 text-xs text-muted-foreground',
        className,
      )}
      {...rest}
    >
      <div className="flex items-center gap-3">{left}</div>
      <div className="flex items-center gap-3">{right}</div>
    </div>
  );
}
