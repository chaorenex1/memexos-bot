import type { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

/** 登录/注册页布局 */
export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
