/** 运行平台检测 */
import { isBrowser } from '@repo/utils';

import type { PlatformInfo, PlatformKind } from '@repo/types';

declare global {
  interface Window {
    __APP_PLATFORM__?: PlatformKind;
    electron?: { app?: { platform?: string; version?: string } };
  }
}

/** 检测当前运行平台 */
export function detectPlatform(): PlatformInfo {
  if (!isBrowser()) {
    return { kind: 'web', isElectron: false, isWeb: true, isMobile: false, os: 'unknown' };
  }

  const ua = navigator.userAgent.toLowerCase();
  const isElectron = Boolean(window.electron) || ua.includes('electron');
  const isMobile = /iphone|ipad|ipod|android|mobile/i.test(ua);

  let kind: PlatformKind = 'web';
  if (isElectron) kind = 'desktop';
  else if (isMobile) kind = 'mobile-web';

  let os: PlatformInfo['os'] = 'unknown';
  if (ua.includes('win')) os = 'windows';
  else if (ua.includes('mac')) os = 'macos';
  else if (ua.includes('linux')) os = 'linux';
  else if (ua.includes('android')) os = 'android';
  else if (ua.includes('iphone') || ua.includes('ipad')) os = 'ios';

  return {
    kind,
    isElectron,
    isWeb: !isElectron,
    isMobile,
    os,
    appVersion: window.electron?.app?.version,
  };
}

/** 简单查询当前平台标识 */
export function getPlatform(): PlatformKind {
  return detectPlatform().kind;
}
