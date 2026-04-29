/** 文件 IPC（带 Zod 校验） */
import { ipcMain } from 'electron';

import { fileService } from '../services/file.service';
import { IPC_CHANNELS } from '../shared/channels';
import { filePickSchema } from '../shared/schemas';

export function registerFileIpc(): void {
  ipcMain.handle(IPC_CHANNELS.FILE_PICK, async (_e, raw: unknown) => {
    const input = filePickSchema.parse(raw ?? {});
    return fileService.pick(input);
  });
}
