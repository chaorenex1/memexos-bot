/** 系统能力 preload bridge */
import { ipcRenderer } from 'electron';

import { IPC_CHANNELS } from '../shared/channels';

export const systemApi = {
  openExternal: (url: string): Promise<void> =>
    ipcRenderer.invoke(IPC_CHANNELS.SYSTEM_OPEN_EXTERNAL, { url }),
  copyText: (text: string): Promise<void> =>
    ipcRenderer.invoke(IPC_CHANNELS.SYSTEM_COPY_TEXT, { text }),
  notify: (title: string, body?: string): Promise<void> =>
    ipcRenderer.invoke(IPC_CHANNELS.SYSTEM_NOTIFY, { title, body }),
};
