/** Preload 入口：在隔离上下文中通过 contextBridge 暴露受控 API */
import { contextBridge } from 'electron';

import { appApi } from './app.api';
import { fileApi } from './file.api';
import { storageApi } from './storage.api';
import { systemApi } from './system.api';

const electronApi = {
  app: appApi,
  file: fileApi,
  storage: storageApi,
  system: systemApi,
};

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronApi);
  } catch (err) {
    console.error('[preload] expose failed', err);
  }
} else {
  // 兜底：如果未启用 contextIsolation（不应发生）
  (window as Window & { electron: typeof electronApi }).electron = electronApi;
}

export type ElectronApi = typeof electronApi;
