import { cn } from '../../lib/cn';

import type { HTMLAttributes } from 'react';

export function Content({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex-1 overflow-auto p-6', className)} {...props} />;
}
