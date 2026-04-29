import { AuthGuard as BaseAuthGuard } from '@repo/router';
import { useUserStore } from '@repo/store';

import type { ReactNode } from 'react';

/** 业务侧 AuthGuard：从 store 注入登录态 */
export function AuthGuard({ children }: { children: ReactNode }) {
  const isAuthenticated = useUserStore((s) => s.isAuthenticated);
  const roles = useUserStore((s) => s.user?.roles ?? []);
  return (
    <BaseAuthGuard isAuthenticated={isAuthenticated} roles={roles}>
      {children}
    </BaseAuthGuard>
  );
}
