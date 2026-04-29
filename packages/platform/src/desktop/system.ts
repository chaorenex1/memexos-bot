/** Desktop 系统能力 */
import type { PlatformSystem } from '../types';

interface ElectronSystemBridge {
  openExternal: (url: string) => Promise<void>;
  copyText: (text: string) => Promise<void>;
  notify: (title: string, body?: string) => Promise<void>;
}

type ElectronWindow = Window & {
  electron?: { system?: ElectronSystemBridge };
};

function getBridge(): ElectronSystemBridge {
  const bridge =
    typeof window !== 'undefined' ? (window as ElectronWindow).electron?.system : undefined;
  if (!bridge) throw new Error('electron system bridge 未注入');
  return bridge;
}

export const system: PlatformSystem = {
  openExternal: (url) => getBridge().openExternal(url),
  copyText: (text) => getBridge().copyText(text),
  notify: (title, body) => getBridge().notify(title, body),
};
