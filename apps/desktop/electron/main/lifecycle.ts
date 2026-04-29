/** 应用生命周期事件 */
import { app } from 'electron';

import { createMainWindow, getMainWindow } from './window';

export function setupLifecycle(): void {
  app.on('activate', async () => {
    // macOS：点击 dock 图标且无窗口时重新创建
    if (!getMainWindow()) {
      await createMainWindow();
    }
  });

  app.on('before-quit', () => {
    // 这里可以做：保存状态、关闭子进程
  });
}
