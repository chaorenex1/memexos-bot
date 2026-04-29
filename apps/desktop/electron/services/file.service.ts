/** 文件读写 service */
import { promises as fs } from 'node:fs';
import { basename } from 'node:path';

import { dialog } from 'electron';

import type { FilePickInput } from '../shared/schemas';

export const fileService = {
  async pick(input: FilePickInput): Promise<Array<{ name: string; path: string; size?: number }>> {
    const properties: Array<'openFile' | 'multiSelections'> = ['openFile'];
    if (input.multiple) properties.push('multiSelections');
    const result = await dialog.showOpenDialog({
      properties,
      defaultPath: input.defaultPath,
      filters: input.accept
        ? [{ name: 'files', extensions: [input.accept.replace(/^\./, '')] }]
        : undefined,
    });
    if (result.canceled) return [];

    return Promise.all(
      result.filePaths.map(async (p) => {
        const stat = await fs.stat(p).catch(() => null);
        return { name: basename(p), path: p, size: stat?.size };
      }),
    );
  },
};
