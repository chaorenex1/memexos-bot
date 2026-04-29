'use client';

/** 简单分栏：左右或上下两栏，左/上栏可调宽 */
import { useEffect, useRef, useState, type ReactNode } from 'react';

import { cn } from '../../lib/cn';

export interface SplitPaneProps {
  direction?: 'horizontal' | 'vertical';
  initial?: number;
  min?: number;
  max?: number;
  className?: string;
  first: ReactNode;
  second: ReactNode;
}

export function SplitPane(props: SplitPaneProps) {
  const {
    direction = 'horizontal',
    initial = 240,
    min = 160,
    max = 600,
    className,
    first,
    second,
  } = props;
  const [size, setSize] = useState(initial);
  const dragging = useRef(false);

  useEffect(() => {
    const onMove = (e: MouseEvent): void => {
      if (!dragging.current) return;
      const next = direction === 'horizontal' ? e.clientX : e.clientY;
      setSize(Math.min(Math.max(next, min), max));
    };
    const onUp = (): void => {
      dragging.current = false;
      document.body.style.cursor = '';
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [direction, min, max]);

  const isH = direction === 'horizontal';

  return (
    <div className={cn('flex h-full w-full', isH ? 'flex-row' : 'flex-col', className)}>
      <div style={{ [isH ? 'width' : 'height']: size }} className="overflow-auto">
        {first}
      </div>
      <div
        role="separator"
        aria-orientation={isH ? 'vertical' : 'horizontal'}
        onMouseDown={() => {
          dragging.current = true;
          document.body.style.cursor = isH ? 'col-resize' : 'row-resize';
        }}
        className={cn(
          'flex-shrink-0 bg-border hover:bg-primary/30',
          isH ? 'w-1 cursor-col-resize' : 'h-1 cursor-row-resize',
        )}
      />
      <div className="flex-1 overflow-auto">{second}</div>
    </div>
  );
}
