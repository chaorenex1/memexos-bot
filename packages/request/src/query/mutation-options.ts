/** 默认 mutation 配置工厂 */
import type { UseMutationOptions } from '@tanstack/react-query';

export function defaultMutationOptions<TData, TError, TVariables, TContext>(
  options: UseMutationOptions<TData, TError, TVariables, TContext> = {},
): UseMutationOptions<TData, TError, TVariables, TContext> {
  return {
    retry: 0,
    ...options,
  };
}
