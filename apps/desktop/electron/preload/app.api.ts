/** App 自身能力 preload bridge */
import { ipcRenderer } from 'electron';

import { IPC_CHANNELS } from '../shared/channels';

export const appApi = {
  getVersion: (): Promise<string> => ipcRenderer.invoke(IPC_CHANNELS.APP_GET_VERSION),
  getPlatform: (): Promise<NodeJS.Platform> => ipcRenderer.invoke(IPC_CHANNELS.APP_GET_PLATFORM),
  quit: (): Promise<void> => ipcRenderer.invoke(IPC_CHANNELS.APP_QUIT),
  minimize: (): Promise<void> => ipcRenderer.invoke(IPC_CHANNELS.APP_MINIMIZE),
  toggleMaximize: (): Promise<void> => ipcRenderer.invoke(IPC_CHANNELS.APP_TOGGLE_MAXIMIZE),
};
