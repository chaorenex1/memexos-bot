'use client';

/**
 * PullRefresh：下拉刷新骨架
 * 简化实现：监听 touchmove，在最顶端下拉超过阈值则触发 onRefresh
 */
import { useRef, useState, type ReactNode, type TouchEvent } from 'react';

import { cn } from '@/lib/cn';

export interface PullRefreshProps {
  threshold?: number;
  onRefresh?: () => Promise<void> | void;
  children: ReactNode;
  className?: string;
}

export function PullRefresh(props: PullRefreshProps) {
  const { threshold = 60, onRefresh, children, className } = props;
  const [pulling, setPulling] = useState(false);
  const [distance, setDistance] = useState(0);
  const startY = useRef<number | null>(null);

  const onTouchStart = (e: TouchEvent<HTMLDivElement>): void => {
    if (window.scrollY > 0) return;
    const t = e.touches[0];
    if (!t) return;
    startY.current = t.clientY;
  };

  const onTouchMove = (e: TouchEvent<HTMLDivElement>): void => {
    if (startY.current === null) return;
    const t = e.touches[0];
    if (!t) return;
    const dy = t.clientY - startY.current;
    if (dy > 0) {
      setPulling(true);
      setDistance(Math.min(dy, threshold * 1.5));
    }
  };

  const onTouchEnd = async (): Promise<void> => {
    if (pulling && distance >= threshold) {
      try {
        await onRefresh?.();
      } finally {
        setPulling(false);
        setDistance(0);
      }
    } else {
      setPulling(false);
      setDistance(0);
    }
    startY.current = null;
  };

  return (
    <div
      className={cn('relative', className)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 flex h-10 items-center justify-center text-xs text-muted-foreground"
        style={{ transform: `translateY(${distance - 40}px)` }}
      >
        {distance >= threshold ? '释放刷新' : '下拉刷新'}
      </div>
      <div
        style={{
          transform: `translateY(${distance}px)`,
          transition: pulling ? 'none' : 'transform .2s',
        }}
      >
        {children}
      </div>
    </div>
  );
}
