/** 权限相关 Hooks */

import { useUserStore } from '@repo/store';
import { checkPermission } from '@repo/utils';
import { useMemo } from 'react';

import type { PermissionGuardConfig } from '@repo/types';

/**
 * 获取当前用户的权限列表
 */
export function usePermissions(): string[] {
  return useUserStore((s) => s.user?.permissions ?? []);
}

/**
 * 检查当前用户是否拥有指定权限
 * @example
 * const canDelete = usePermission({ require: 'user:delete' })
 * const canEdit = usePermission({ require: ['user:update', 'admin:*'] })
 * const isAdmin = usePermission({ requireAll: ['user:read', 'setting:update'] })
 */
export function usePermission(config?: PermissionGuardConfig): boolean {
  const permissions = usePermissions();
  return useMemo(() => {
    if (!config) return true;
    return checkPermission(permissions, config);
  }, [permissions, config]);
}

/**
 * 检查当前用户是否拥有指定角色
 * @example
 * const isAdmin = useHasRole('admin')
 * const isManager = useHasRole(['admin', 'manager'])
 */
export function useHasRole(role: string | string[]): boolean {
  const roles = useUserStore((s) => s.user?.roles ?? []);
  return useMemo(() => {
    const required = Array.isArray(role) ? role : [role];
    return required.some((r) => roles.includes(r));
  }, [roles, role]);
}
