/**
 * @repo/platform 入口
 *
 * 业务侧统一从这里导入跨端能力，包内部根据运行平台自动切换实现：
 *   import { platformFile, platformStorage, getPlatform } from '@repo/platform'
 */
import { detectPlatform } from './platform';

export * from './types';
export * from './platform';

import * as web from './web';
import * as desktop from './desktop';

const platform = detectPlatform();

/** 当前平台实现：根据运行环境自动选择 */
const impl = platform.isElectron ? desktop : web;

export const platformFile = impl.file;
export const platformStorage = impl.storage;
export const platformSystem = impl.system;
/** 仅 desktop 可用，web 下为 noop */
export const platformTerminal = (impl as typeof desktop).terminal ?? web.terminalNoop;
