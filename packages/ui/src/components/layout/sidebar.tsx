import { cn } from '../../lib/cn';

import type { HTMLAttributes, ReactNode } from 'react';

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  collapsed?: boolean;
  width?: number;
  collapsedWidth?: number;
  children?: ReactNode;
}

export function Sidebar({
  collapsed = false,
  width = 240,
  collapsedWidth = 64,
  className,
  children,
  ...rest
}: SidebarProps) {
  return (
    <aside
      className={cn('flex flex-col border-r bg-background transition-all duration-200', className)}
      style={{ width: collapsed ? collapsedWidth : width }}
      {...rest}
    >
      {children}
    </aside>
  );
}
