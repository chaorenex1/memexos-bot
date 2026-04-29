import { AuthGuard as BaseAuthGuard } from '@repo/router';
import { useUserStore } from '@repo/store';

import type { ReactNode } from 'react';

interface AuthGuardProps {
  children: ReactNode;
  requireRoles?: string[];
  requirePermissions?: string[];
}

/** 业务侧 AuthGuard：从 store 注入登录态、角色和权限 */
export function AuthGuard({ children, requireRoles, requirePermissions }: AuthGuardProps) {
  const isAuthenticated = useUserStore((s) => s.isAuthenticated);
  const roles = useUserStore((s) => s.user?.roles ?? []);
  const permissions = useUserStore((s) => s.user?.permissions ?? []);

  return (
    <BaseAuthGuard
      isAuthenticated={isAuthenticated}
      roles={roles}
      permissions={permissions}
      requireRoles={requireRoles}
      requirePermissions={requirePermissions}
    >
      {children}
    </BaseAuthGuard>
  );
}
