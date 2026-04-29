/** 认证相关 Zod schema */
import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(2, { message: '用户名至少 2 个字符' }).max(50),
  password: z.string().min(6, { message: '密码至少 6 位' }).max(100),
  remember: z.boolean().optional().default(false),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    username: z.string().min(2).max(50),
    password: z.string().min(8, { message: '密码至少 8 位' }),
    confirmPassword: z.string(),
    email: z.string().email().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: '两次输入的密码不一致',
  });

export type RegisterInput = z.infer<typeof registerSchema>;
