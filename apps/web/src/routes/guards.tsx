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
  const hydrated = useUserStore((s) => s.hydrated);
  const status = useUserStore((s) => s.status);
  const isAuthenticated = useUserStore((s) => s.isAuthenticated);
  const roles = useUserStore((s) => (s.user?.userType ? [s.user.userType] : []));
  const permissions = useUserStore((s) => s.user?.access.grants ?? []);

  if (!hydrated || status === 'refreshing' || status === 'authenticating') {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
        认证中...
      </div>
    );
  }

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
