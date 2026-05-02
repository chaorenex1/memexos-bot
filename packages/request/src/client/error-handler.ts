/** 统一错误处理 */
import type { ApiError } from '@repo/types';
import type { AxiosError } from 'axios';

export function handleApiError(error: AxiosError): ApiError {
  if (!error.response) {
    return {
      code: 'network_error',
      message: error.message || '网络异常',
      raw: error,
    };
  }

  const data = error.response.data as
    | {
        request_id?: string | null;
        error?: { code?: string; message?: string };
      }
    | undefined;
  return {
    code: data?.error?.code ?? `http_${error.response.status}`,
    message: data?.error?.message ?? error.response.statusText,
    status: error.response.status,
    requestId: data?.request_id,
    raw: data,
  };
}
