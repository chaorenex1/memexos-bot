/** IPC 入参 Zod schema：所有跨进程参数都必须先校验 */
import { z } from 'zod';

export const filePickSchema = z.object({
  multiple: z.boolean().optional(),
  accept: z.string().optional(),
  defaultPath: z.string().optional(),
});
export type FilePickInput = z.infer<typeof filePickSchema>;

export const storageGetSchema = z.object({ key: z.string().min(1) });
export const storageSetSchema = z.object({ key: z.string().min(1), value: z.unknown() });
export const storageRemoveSchema = z.object({ key: z.string().min(1) });

export const systemOpenExternalSchema = z.object({
  url: z
    .string()
    .url()
    .refine((value) => {
      const protocol = new URL(value).protocol;
      return protocol === 'http:' || protocol === 'https:';
    }, '仅允许 http/https 外链'),
});
export const systemCopyTextSchema = z.object({ text: z.string() });
export const systemNotifySchema = z.object({
  title: z.string().min(1),
  body: z.string().optional(),
});
