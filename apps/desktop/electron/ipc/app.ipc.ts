/** App 自身能力：版本、平台、窗口控制 */
import { BrowserWindow, app, ipcMain } from 'electron';

import { IPC_CHANNELS } from '../shared/channels';

export function registerAppIpc(): void {
  ipcMain.handle(IPC_CHANNELS.APP_GET_VERSION, () => app.getVersion());
  ipcMain.handle(IPC_CHANNELS.APP_GET_PLATFORM, () => process.platform);

  ipcMain.handle(IPC_CHANNELS.APP_QUIT, () => app.quit());
  ipcMain.handle(IPC_CHANNELS.APP_MINIMIZE, (event) => {
    BrowserWindow.fromWebContents(event.sender)?.minimize();
  });
  ipcMain.handle(IPC_CHANNELS.APP_TOGGLE_MAXIMIZE, (event) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (!win) return;
    if (win.isMaximized()) win.unmaximize();
    else win.maximize();
  });
}
