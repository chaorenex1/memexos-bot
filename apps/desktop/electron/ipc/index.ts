/** IPC 注册入口 */
import { registerAppIpc } from './app.ipc';
import { registerFileIpc } from './file.ipc';
import { registerStorageIpc } from './storage.ipc';
import { registerSystemIpc } from './system.ipc';

export function registerIpc(): void {
  registerAppIpc();
  registerFileIpc();
  registerStorageIpc();
  registerSystemIpc();
}
