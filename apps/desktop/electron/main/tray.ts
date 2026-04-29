/** 系统托盘 */
import { join } from 'node:path';

import { Menu, Tray, app, nativeImage } from 'electron';

import { getMainWindow } from './window';

let tray: Tray | null = null;

export function setupTray(): void {
  // 托盘图标占位：实际项目应使用 resources/icons/tray.png
  const iconPath = join(__dirname, '../../resources/icons/tray.png');
  const image = nativeImage.createFromPath(iconPath);
  tray = new Tray(image.isEmpty() ? nativeImage.createEmpty() : image);

  const menu = Menu.buildFromTemplate([
    {
      label: '显示主窗口',
      click: () => {
        const win = getMainWindow();
        if (win) {
          win.show();
          win.focus();
        }
      },
    },
    { type: 'separator' },
    { label: '退出', click: () => app.quit() },
  ]);

  tray.setToolTip(app.getName());
  tray.setContextMenu(menu);
}
