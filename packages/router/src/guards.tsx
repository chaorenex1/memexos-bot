/** 路由守卫：登录态 / 角色 / 权限 */
import { hasAnyPermission } from '@repo/utils';
import { Navigate, useLocation } from 'react-router-dom';

import type { ReactNode } from 'react';

export interface AuthGuardProps {
  /** 当前是否已登录（业务侧从 store 获取） */
  isAuthenticated: boolean;
  /** 当前用户角色（可选，用于 RBAC） */
  roles?: string[];
  /** 当前用户权限列表（可选，用于细粒度控制） */
  permissions?: string[];
  /** 进入页面所需角色（满足任一即可） */
  requireRoles?: string[];
  /** 进入页面所需权限（满足任一即可，支持通配符如 admin:*） */
  requirePermissions?: string[];
  /** 未登录跳转地址 */
  loginPath?: string;
  /** 无权限跳转地址 */
  forbiddenPath?: string;
  children: ReactNode;
}

/** RBAC 路由守卫，业务侧包在受保护路由外 */
export function AuthGuard(props: AuthGuardProps) {
  const {
    isAuthenticated,
    roles = [],
    permissions = [],
    requireRoles,
    requirePermissions,
    loginPath = '/login',
    forbiddenPath = '/403',
    children,
  } = props;
  const location = useLocation();

  // 1. 未登录 → 跳转登录页
  if (!isAuthenticated) {
    return <Navigate to={loginPath} state={{ from: location.pathname }} replace />;
  }

  // 2. 角色检查
  if (requireRoles && requireRoles.length > 0) {
    const hasRole = requireRoles.some((r) => roles.includes(r));
    if (!hasRole) return <Navigate to={forbiddenPath} replace />;
  }

  // 3. 权限检查（支持通配符，如 admin:*）
  if (requirePermissions && requirePermissions.length > 0) {
    const hasPerm = hasAnyPermission(permissions, requirePermissions);
    if (!hasPerm) return <Navigate to={forbiddenPath} replace />;
  }

  return <>{children}</>;
}
