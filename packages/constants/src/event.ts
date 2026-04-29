/** 全局事件 key（EventBus / 自定义事件） */

export const APP_EVENT = {
  Unauthorized: 'app:unauthorized',
  TokenRefreshed: 'app:token-refreshed',
  ThemeChanged: 'app:theme-changed',
  LocaleChanged: 'app:locale-changed',
  Logout: 'app:logout',
} as const;

export type AppEventKey = (typeof APP_EVENT)[keyof typeof APP_EVENT];
