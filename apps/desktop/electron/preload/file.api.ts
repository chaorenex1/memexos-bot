/** 文件能力 preload bridge */
import { ipcRenderer } from 'electron';

import { IPC_CHANNELS } from '../shared/channels';

export interface FilePickArgs {
  multiple?: boolean;
  accept?: string;
  defaultPath?: string;
}
export interface PickedFile {
  name: string;
  path: string;
  size?: number;
}

export const fileApi = {
  pick: (options: FilePickArgs = {}): Promise<PickedFile[]> =>
    ipcRenderer.invoke(IPC_CHANNELS.FILE_PICK, options),
};
