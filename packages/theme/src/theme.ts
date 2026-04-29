/** 主题模式管理（light/dark/system） */
import { STORAGE_KEYS } from '@repo/constants';
import { isBrowser, safeGet, safeSet } from '@repo/utils';

import type { ThemeMode } from '@repo/types';

const ROOT_CLASS_DARK = 'dark';

/** 读取当前模式（已持久化）；默认 system */
export function getThemeMode(): ThemeMode {
  return safeGet<ThemeMode>(STORAGE_KEYS.Theme, 'system');
}

/** 计算当前生效的实际外观（处理 system 跟随系统） */
export function getEffectiveTheme(mode: ThemeMode = getThemeMode()): 'light' | 'dark' {
  if (mode === 'system') {
    if (!isBrowser()) return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return mode;
}

/** 应用到 <html> 上 */
export function applyTheme(mode: ThemeMode): void {
  if (!isBrowser()) return;
  const effective = getEffectiveTheme(mode);
  const root = document.documentElement;
  if (effective === 'dark') {
    root.classList.add(ROOT_CLASS_DARK);
  } else {
    root.classList.remove(ROOT_CLASS_DARK);
  }
  safeSet(STORAGE_KEYS.Theme, mode);
}

/** 监听系统外观变化（仅 system 模式下生效） */
export function watchSystemTheme(callback: (effective: 'light' | 'dark') => void): () => void {
  if (!isBrowser()) return () => {};
  const mql = window.matchMedia('(prefers-color-scheme: dark)');
  const handler = (e: MediaQueryListEvent): void => callback(e.matches ? 'dark' : 'light');
  mql.addEventListener('change', handler);
  return () => mql.removeEventListener('change', handler);
}

/** 引导：在 app 启动时调用以应用持久化主题 */
export function bootstrapTheme(): void {
  applyTheme(getThemeMode());
}
