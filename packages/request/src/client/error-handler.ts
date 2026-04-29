/** 统一错误处理 */
import type { ApiError } from '@repo/types';
import type { AxiosError } from 'axios';

export function handleApiError(error: AxiosError): ApiError {
  if (!error.response) {
    return {
      code: -1,
      message: error.message || '网络异常',
      raw: error,
    };
  }

  const data = error.response.data as { code?: number; message?: string } | undefined;
  return {
    code: data?.code ?? error.response.status,
    message: data?.message ?? error.response.statusText,
    status: error.response.status,
    raw: data,
  };
}
