/**
 * TerminalPanel：终端面板骨架
 * 真实输出来自 desktop preload 的 terminal IPC（@repo/platform/terminal）
 */
import { cn } from '../../lib/cn';

import type { ReactNode } from 'react';

export interface TerminalPanelProps {
  className?: string;
  /** 输出文本流 */
  output?: string;
  /** 输入框（业务自行接 prompt + spawn 调用） */
  inputSlot?: ReactNode;
}

export function TerminalPanel(props: TerminalPanelProps) {
  const { className, output = '', inputSlot } = props;
  return (
    <div
      className={cn('flex h-full flex-col bg-black font-mono text-xs text-green-400', className)}
    >
      <pre className="flex-1 overflow-auto p-3 whitespace-pre-wrap">{output}</pre>
      <div className="border-t border-zinc-800 px-3 py-2">{inputSlot}</div>
    </div>
  );
}
