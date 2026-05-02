import { AuthGuard as BaseAuthGuard } from '@repo/router';
import { useUserStore } from '@repo/store';

import type { ReactNode } from 'react';

interface AuthGuardProps {
  children: ReactNode;
  requireRoles?: string[];
  requirePermissions?: string[];
}

export function AuthGuard({ children, requireRoles, requirePermissions }: AuthGuardProps) {
  const hydrated = useUserStore((s) => s.hydrated);
  const status = useUserStore((s) => s.status);
  const isAuthenticated = useUserStore((s) => s.isAuthenticated);
  const roles = useUserStore((s) => s.user?.roles ?? []);
  const permissions = useUserStore((s) => s.user?.permissions ?? []);

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
