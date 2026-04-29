/** Desktop 文件 IPC */
import type { PickOptions, PickedFile, PlatformFile } from '../types';

interface ElectronFileBridge {
  pick: (options: PickOptions) => Promise<PickedFile[]>;
}

type ElectronWindow = Window & {
  electron?: { file?: ElectronFileBridge };
};

function getBridge(): ElectronFileBridge {
  const bridge =
    typeof window !== 'undefined' ? (window as ElectronWindow).electron?.file : undefined;
  if (!bridge) throw new Error('electron file bridge 未注入');
  return bridge;
}

export const file: PlatformFile = {
  async readText(): Promise<string> {
    throw new Error('desktop file.readText 已禁用；请改用用户主动选择文件后的受控读取流程');
  },
  async writeText(): Promise<void> {
    throw new Error('desktop file.writeText 已禁用；请改用受控导出流程');
  },
  pick: (options = {}) => getBridge().pick(options),
};
