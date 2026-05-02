/** 空状态组件 */
import { FileX2 } from 'lucide-react';

import { cn } from '../@/lib/cn';

import type { ReactNode } from 'react';

export interface EmptyStateProps {
  title?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function EmptyState(props: EmptyStateProps) {
  const { title = '暂无数据', description, icon, action, className } = props;
  return (
    <div
      className={cn('flex flex-col items-center justify-center gap-3 py-12 text-center', className)}
    >
      <div className="text-muted-foreground">{icon ?? <FileX2 className="h-10 w-10" />}</div>
      <div className="text-base font-medium text-foreground">{title}</div>
      {description && <div className="max-w-md text-sm text-muted-foreground">{description}</div>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
