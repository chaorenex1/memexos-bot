/** 用户与权限相关类型 */

export type AuthSessionStatus = 'anonymous' | 'authenticating' | 'authenticated' | 'refreshing';

export interface UserAccess {
  grants: string[];
  capabilities?: string[];
}

export interface UserInfo {
  id: string;
  username: string;
  nickname?: string;
  avatar?: string;
  email?: string;
  phone?: string;
  userType: 'user' | 'admin' | string;
  access: UserAccess;
  status?: 'active' | 'disabled';
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string | null;
  expiresIn?: number;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  password: string;
  email?: string;
}

export interface RegisterResult {
  userId: string;
  username: string;
  userType: 'user' | 'admin' | string;
  email?: string;
  status?: 'active' | 'disabled';
}
