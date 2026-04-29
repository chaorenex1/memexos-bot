import { cn } from '../../lib/cn';

import type { HTMLAttributes, ReactNode } from 'react';

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  /** 左侧（logo / 菜单按钮） */
  left?: ReactNode;
  /** 中部（搜索 / 路径） */
  center?: ReactNode;
  /** 右侧（用户头像 / 通知） */
  right?: ReactNode;
}

export function Header({ left, center, right, className, ...rest }: HeaderProps) {
  return (
    <header
      className={cn('flex h-14 items-center gap-3 border-b bg-background px-4', className)}
      {...rest}
    >
      <div className="flex items-center gap-2">{left}</div>
      <div className="flex flex-1 items-center justify-center">{center}</div>
      <div className="flex items-center gap-2">{right}</div>
    </header>
  );
}
