/** Mobile 底部 TabBar */
import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

export interface MobileTabItem {
  key: string;
  label: ReactNode;
  icon?: ReactNode;
}

export interface MobileTabbarProps {
  items: MobileTabItem[];
  active?: string;
  onChange?: (key: string) => void;
  className?: string;
}

export function MobileTabbar(props: MobileTabbarProps) {
  const { items, active, onChange, className } = props;
  return (
    <nav
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 flex h-14 items-center justify-around border-t bg-background',
        className,
      )}
    >
      {items.map((item) => {
        const isActive = item.key === active;
        return (
          <button
            type="button"
            key={item.key}
            onClick={() => onChange?.(item.key)}
            className={cn(
              'flex flex-1 flex-col items-center justify-center gap-0.5 px-2 py-1 text-xs',
              isActive ? 'text-primary' : 'text-muted-foreground',
            )}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
