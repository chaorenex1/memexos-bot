/** 本地存储 key */

export const STORAGE_KEYS = {
  AccessToken: 'app:access_token',
  RefreshToken: 'app:refresh_token',
  UserInfo: 'app:user_info',
  Locale: 'app:locale',
  Theme: 'app:theme',
  AppState: 'app:state',
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
