/** 系统 IPC */
import { Notification, clipboard, ipcMain, shell } from 'electron';

import { IPC_CHANNELS } from '../shared/channels';
import {
  systemCopyTextSchema,
  systemNotifySchema,
  systemOpenExternalSchema,
} from '../shared/schemas';

export function registerSystemIpc(): void {
  ipcMain.handle(IPC_CHANNELS.SYSTEM_OPEN_EXTERNAL, async (_e, raw: unknown) => {
    const { url } = systemOpenExternalSchema.parse(raw);
    await shell.openExternal(url);
  });

  ipcMain.handle(IPC_CHANNELS.SYSTEM_COPY_TEXT, (_e, raw: unknown) => {
    const { text } = systemCopyTextSchema.parse(raw);
    clipboard.writeText(text);
  });

  ipcMain.handle(IPC_CHANNELS.SYSTEM_NOTIFY, (_e, raw: unknown) => {
    const { title, body } = systemNotifySchema.parse(raw);
    if (Notification.isSupported()) {
      new Notification({ title, body }).show();
    }
  });
}
