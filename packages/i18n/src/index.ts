/**
 * @repo/i18n 入口：i18next + react-i18next 封装
 */
import i18n, { type Resource, type i18n as I18nInstance } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next, useTranslation } from 'react-i18next';

import enUSCommon from './locales/en-US/common.json';
import zhCNCommon from './locales/zh-CN/common.json';

export type SupportedLocale = 'zh-CN' | 'en-US';

export interface InitI18nOptions {
  /** 默认语言 */
  defaultLocale?: SupportedLocale;
  /** 兜底语言 */
  fallbackLocale?: SupportedLocale;
  /** 是否在浏览器环境启用语言自动检测 */
  enableDetector?: boolean;
  /** 额外的 resources 合并（业务侧自定义命名空间） */
  resources?: Record<string, Record<string, Record<string, unknown>>>;
}

const baseResources = {
  'zh-CN': { common: zhCNCommon },
  'en-US': { common: enUSCommon },
};

/** 初始化 i18n 实例（重复调用安全） */
export function initI18n(options: InitI18nOptions = {}): I18nInstance {
  if (i18n.isInitialized) return i18n;

  const {
    defaultLocale = 'zh-CN',
    fallbackLocale = 'zh-CN',
    enableDetector = true,
    resources = {},
  } = options;

  const merged: Resource = { ...baseResources };
  for (const [locale, ns] of Object.entries(resources)) {
    merged[locale] = { ...(merged[locale] ?? {}), ...ns };
  }

  let chain: typeof i18n = i18n;
  if (enableDetector && typeof window !== 'undefined') {
    chain = chain.use(LanguageDetector);
  }
  chain
    .use(initReactI18next)
    .init({
      resources: merged,
      lng: defaultLocale,
      fallbackLng: fallbackLocale,
      defaultNS: 'common',
      interpolation: { escapeValue: false },
      returnNull: false,
    })
    .catch((err) => console.error('[i18n] init failed', err));

  return i18n;
}

export { i18n, useTranslation };
export { default as zhCNCommon } from './locales/zh-CN/common.json';
export { default as enUSCommon } from './locales/en-US/common.json';
