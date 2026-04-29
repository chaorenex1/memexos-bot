/** 持久化能力 preload bridge */
import { ipcRenderer } from 'electron';

import { IPC_CHANNELS } from '../shared/channels';

export const storageApi = {
  get: <T>(key: string): Promise<T | null> => ipcRenderer.invoke(IPC_CHANNELS.STORAGE_GET, { key }),
  set: <T>(key: string, value: T): Promise<void> =>
    ipcRenderer.invoke(IPC_CHANNELS.STORAGE_SET, { key, value }),
  remove: (key: string): Promise<void> => ipcRenderer.invoke(IPC_CHANNELS.STORAGE_REMOVE, { key }),
  clear: (): Promise<void> => ipcRenderer.invoke(IPC_CHANNELS.STORAGE_CLEAR),
};
