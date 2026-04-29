/** Auth 模块：API */
import axios from 'axios';

import type { ApiResponse, AuthTokens, LoginPayload, UserInfo } from '@repo/types';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
});

export async function login(
  payload: LoginPayload,
): Promise<{ user: UserInfo; tokens: AuthTokens }> {
  const { data } = await client.post<ApiResponse<{ user: UserInfo; tokens: AuthTokens }>>(
    '/auth/login',
    payload,
  );
  return data.data;
}

export async function logout(): Promise<void> {
  await client.post('/auth/logout');
}

export async function me(): Promise<UserInfo> {
  const { data } = await client.get<ApiResponse<UserInfo>>('/auth/me');
  return data.data;
}
