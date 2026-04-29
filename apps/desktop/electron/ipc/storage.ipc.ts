/** 持久化 IPC */
import { ipcMain } from 'electron';

import { storageService } from '../services/storage.service';
import { IPC_CHANNELS } from '../shared/channels';
import { storageGetSchema, storageRemoveSchema, storageSetSchema } from '../shared/schemas';

export function registerStorageIpc(): void {
  ipcMain.handle(IPC_CHANNELS.STORAGE_GET, async (_e, raw: unknown) => {
    const { key } = storageGetSchema.parse(raw);
    return storageService.get(key);
  });

  ipcMain.handle(IPC_CHANNELS.STORAGE_SET, async (_e, raw: unknown) => {
    const { key, value } = storageSetSchema.parse(raw);
    return storageService.set(key, value);
  });

  ipcMain.handle(IPC_CHANNELS.STORAGE_REMOVE, async (_e, raw: unknown) => {
    const { key } = storageRemoveSchema.parse(raw);
    return storageService.remove(key);
  });

  ipcMain.handle(IPC_CHANNELS.STORAGE_CLEAR, async () => storageService.clear());
}
