import type { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-5xl px-6 py-8">{children}</div>;
}
