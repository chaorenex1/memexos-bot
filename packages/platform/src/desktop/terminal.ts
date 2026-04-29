/** Desktop 子进程/CLI 调用 */
import type { PlatformTerminal } from '../types';

export const terminal: PlatformTerminal = {
  async spawn(): Promise<string> {
    throw new Error('desktop terminal.spawn 已禁用；不要从渲染进程发起任意命令执行');
  },
  onData() {
    return () => {};
  },
};
