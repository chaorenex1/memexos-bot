import type { HTMLAttributes } from 'react';

import { cn } from '@/lib/cn';

export function Content({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex-1 overflow-auto p-6', className)} {...props} />;
}
