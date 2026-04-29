/** 平台与运行环境 */

export type PlatformKind = 'web' | 'desktop' | 'mobile-web';

export interface PlatformInfo {
  kind: PlatformKind;
  isElectron: boolean;
  isWeb: boolean;
  isMobile: boolean;
  os?: 'windows' | 'macos' | 'linux' | 'ios' | 'android' | 'unknown';
  /** Electron App 版本 */
  appVersion?: string;
}
