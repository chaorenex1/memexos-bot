/** 路由守卫：登录态/角色 */
import { Navigate, useLocation } from 'react-router-dom';

import type { ReactNode } from 'react';

export interface AuthGuardProps {
  /** 当前是否已登录（业务侧从 store 获取） */
  isAuthenticated: boolean;
  /** 当前用户角色（可选，用于 RBAC） */
  roles?: string[];
  /** 进入页面所需角色（满足任一即可） */
  requireRoles?: string[];
  /** 未登录跳转地址 */
  loginPath?: string;
  /** 无权限跳转地址 */
  forbiddenPath?: string;
  children: ReactNode;
}

/** 简单的 RBAC 守卫，业务侧包在受保护路由外 */
export function AuthGuard(props: AuthGuardProps) {
  const {
    isAuthenticated,
    roles = [],
    requireRoles,
    loginPath = '/login',
    forbiddenPath = '/403',
    children,
  } = props;
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={loginPath} state={{ from: location.pathname }} replace />;
  }

  if (requireRoles && requireRoles.length > 0) {
    const ok = requireRoles.some((r) => roles.includes(r));
    if (!ok) return <Navigate to={forbiddenPath} replace />;
  }

  return <>{children}</>;
}
