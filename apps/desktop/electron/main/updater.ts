/** 自动更新（基于 electron-updater，开发模式禁用） */
import { app } from 'electron';
import { autoUpdater } from 'electron-updater';

export function setupAutoUpdater(): void {
  if (!app.isPackaged) return; // 开发环境跳过

  autoUpdater.autoDownload = true;
  autoUpdater.autoInstallOnAppQuit = true;

  autoUpdater.on('error', (err) => {
    console.error('[updater] error', err);
  });

  void autoUpdater.checkForUpdatesAndNotify();
}
