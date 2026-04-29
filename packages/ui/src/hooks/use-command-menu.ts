'use client';

/** 命令面板状态 hook */
import { useCallback, useState } from 'react';

export function useCommandMenu(): {
  open: boolean;
  setOpen: (next: boolean) => void;
  toggle: () => void;
} {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen((s) => !s), []);
  return { open, setOpen, toggle };
}
