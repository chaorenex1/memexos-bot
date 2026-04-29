/** 通用 Zod schema */
import { z } from 'zod';

/** 邮箱 */
export const emailSchema = z.string().email({ message: '请输入有效的邮箱地址' });

/** 中国大陆手机号 */
export const phoneCnSchema = z.string().regex(/^1[3-9]\d{9}$/, { message: '请输入有效的手机号' });

/** URL */
export const urlSchema = z.string().url({ message: '请输入有效的链接' });

/** 非空字符串 */
export const nonEmptyString = z.string().min(1, { message: '不能为空' });

/** 分页 */
export const paginationSchema = z.object({
  page: z.number().int().min(1).default(1),
  pageSize: z.number().int().min(1).max(200).default(20),
});

export type Pagination = z.infer<typeof paginationSchema>;
