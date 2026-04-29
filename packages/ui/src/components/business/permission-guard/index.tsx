/** 权限守卫组件：根据用户权限条件渲染子元素 */
import { usePermission } from '@repo/hooks';

import type { PermissionGuardConfig } from '@repo/types';
import type { ReactNode } from 'react';

export interface PermissionGuardProps extends PermissionGuardConfig {
  /** 无权限时的回退内容（默认不渲染） */
  fallback?: ReactNode;
  children: ReactNode;
}

/**
 * 权限守卫组件
 * @example
 * <PermissionGuard require="user:delete">
 *   <Button variant="destructive">删除用户</Button>
 * </PermissionGuard>
 *
 * @example
 * <PermissionGuard requireAll={['user:read','user:update']} fallback={<span>只读</span>}>
 *   <Button>编辑</Button>
 * </PermissionGuard>
 */
export function PermissionGuard({ require, requireAll, fallback, children }: PermissionGuardProps) {
  const hasAccess = usePermission({ require, requireAll });

  if (!hasAccess) {
    return fallback ? <>{fallback}</> : null;
  }

  return <>{children}</>;
}
