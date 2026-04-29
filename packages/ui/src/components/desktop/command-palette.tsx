'use client';

/**
 * CommandPalette：⌘K 命令面板（Cmd+K / Ctrl+K）
 * 占位骨架，业务侧可以扩展为含搜索的快捷入口
 */
import { useEffect, useState, type ReactNode } from 'react';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';

export interface CommandPaletteProps {
  /** 受控 open，未传入则内部维护 */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  placeholder?: string;
  children?: ReactNode;
}

export function CommandPalette(props: CommandPaletteProps) {
  const { open, onOpenChange, placeholder = '输入命令...', children } = props;
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = open !== undefined;
  const visible = isControlled ? open : internalOpen;

  const setOpen = (next: boolean): void => {
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent): void => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(!visible);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  return (
    <Dialog open={visible} onOpenChange={setOpen}>
      <DialogContent className="max-w-xl p-0">
        <DialogHeader className="border-b px-4 py-3">
          <DialogTitle className="text-sm font-medium">命令面板</DialogTitle>
        </DialogHeader>
        <div className="px-4 pt-4">
          <Input placeholder={placeholder} autoFocus />
        </div>
        <div className="max-h-80 overflow-auto px-4 py-3">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
