/**
 * WindowTitlebar：Electron 自定义标题栏
 * 通过 -webkit-app-region 实现可拖动；按钮区禁用拖动
 */
import { Maximize2, Minimize2, Minus, X } from 'lucide-react';

import type { CSSProperties, ReactNode } from 'react';

import { cn } from '@/lib/cn';

export interface WindowTitlebarProps {
  title?: ReactNode;
  /** 左侧扩展（菜单/logo） */
  left?: ReactNode;
  /** 中部扩展 */
  center?: ReactNode;
  /** 是否最大化（控制 icon 显示） */
  isMaximized?: boolean;
  className?: string;
  onMinimize?: () => void;
  onToggleMaximize?: () => void;
  onClose?: () => void;
}

export function WindowTitlebar(props: WindowTitlebarProps) {
  const { title, left, center, isMaximized, className, onMinimize, onToggleMaximize, onClose } =
    props;
  return (
    <div
      className={cn(
        'flex h-9 select-none items-center justify-between border-b bg-background text-sm',
        className,
      )}
      style={{ WebkitAppRegion: 'drag' } as CSSProperties}
    >
      <div className="flex items-center gap-2 px-3">{left}</div>
      <div className="flex flex-1 items-center justify-center px-3">
        {center ?? <span className="text-muted-foreground">{title}</span>}
      </div>
      <div className="flex items-center" style={{ WebkitAppRegion: 'no-drag' } as CSSProperties}>
        <button
          type="button"
          onClick={onMinimize}
          className="flex h-9 w-11 items-center justify-center hover:bg-accent"
          aria-label="最小化"
        >
          <Minus className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={onToggleMaximize}
          className="flex h-9 w-11 items-center justify-center hover:bg-accent"
          aria-label={isMaximized ? '还原' : '最大化'}
        >
          {isMaximized ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="flex h-9 w-11 items-center justify-center hover:bg-destructive hover:text-destructive-foreground"
          aria-label="关闭"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
