/** Web 平台实现 */
import { file } from './file';
import { storage } from './storage';
import { system } from './system';

import type { PlatformFile, PlatformStorage, PlatformSystem, PlatformTerminal } from '../types';

const terminalNoop: PlatformTerminal = {
  async spawn() {
    throw new Error('terminal.spawn 在 Web 平台不可用');
  },
  onData() {
    return () => {};
  },
};

export { storage, file, system, terminalNoop };
export type { PlatformFile, PlatformStorage, PlatformSystem };
