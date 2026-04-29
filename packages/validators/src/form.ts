/** 表单通用 Zod schema 工厂 */
import { z } from 'zod';

/** 必填字段（支持自定义提示） */
export function required(label = '此项'): z.ZodString {
  return z.string().min(1, { message: `${label}不能为空` });
}

/** 字符长度区间 */
export function rangeText(min: number, max: number): z.ZodString {
  return z.string().min(min, `至少 ${min} 个字符`).max(max, `最多 ${max} 个字符`);
}

/** 数字范围 */
export function rangeNumber(min: number, max: number): z.ZodNumber {
  return z.number().min(min, `不能小于 ${min}`).max(max, `不能大于 ${max}`);
}
