/** User 模块：API（占位） */
import axios from 'axios';

import type { ApiResponse, UserInfo } from '@repo/types';

const client = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api' });

export async function getUser(id: string): Promise<UserInfo> {
  const { data } = await client.get<ApiResponse<UserInfo>>(`/users/${id}`);
  if (!data.success || !data.data) {
    throw new Error(data.error?.message ?? '获取用户失败');
  }
  return data.data;
}
