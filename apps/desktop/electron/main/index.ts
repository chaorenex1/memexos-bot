/** Electron 主进程入口 */
import { app } from 'electron';

import { registerIpc } from '../ipc';

import { setupLifecycle } from './lifecycle';
import { setupAppMenu } from './menu';
import { applySecurityPolicy } from './security';
import { setupTray } from './tray';
import { setupAutoUpdater } from './updater';
import { createMainWindow, getMainWindow } from './window';

// 单例运行：避免双开
const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    const win = getMainWindow();
    if (win) {
      if (win.isMinimized()) win.restore();
      win.focus();
    }
  });

  app.whenReady().then(async () => {
    applySecurityPolicy();
    registerIpc();
    setupLifecycle();
    setupAppMenu();
    await createMainWindow();
    setupTray();
    setupAutoUpdater();
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });
}
