/** 拦截器：请求/响应/错误 */
import { handleApiError } from './error-handler';

import type { AxiosError, AxiosInstance } from 'axios';

export function applyRequestInterceptor(
  instance: AxiosInstance,
  getToken?: () => string | null,
): void {
  instance.interceptors.request.use((config) => {
    const token = getToken?.();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
}

export function applyResponseInterceptor(instance: AxiosInstance): void {
  instance.interceptors.response.use(
    (response) => {
      // 这里可以根据后端约定做统一拆包，例如 response.data.data
      return response;
    },
    (error: AxiosError) => Promise.reject(error),
  );
}

export function applyErrorInterceptor(instance: AxiosInstance, onUnauthorized?: () => void): void {
  instance.interceptors.response.use(
    (r) => r,
    (error: AxiosError) => {
      const status = error.response?.status;
      if (status === 401) {
        onUnauthorized?.();
      }
      return Promise.reject(handleApiError(error));
    },
  );
}
