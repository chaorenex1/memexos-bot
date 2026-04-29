/**
 * @repo/utils 入口
 */
export * from './string';
export * from './number';
export * from './array';
export * from './date';
export * from './is';
export * from './storage';
export * from './delay';
export * from './uuid';
export * from './permission';

// 重导出 lodash-es 常用方法（按需使用，不污染全局）
export {
  cloneDeep,
  debounce,
  throttle,
  groupBy,
  keyBy,
  uniq,
  uniqBy,
  pick,
  omit,
  merge,
  isEmpty,
  isEqual,
} from 'lodash-es';
