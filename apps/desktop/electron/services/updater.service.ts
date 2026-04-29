/** 自动更新 service（占位封装） */
import { autoUpdater } from 'electron-updater';

export const updaterService = {
  async checkNow(): Promise<void> {
    await autoUpdater.checkForUpdates();
  },
  async quitAndInstall(): Promise<void> {
    autoUpdater.quitAndInstall();
  },
};
