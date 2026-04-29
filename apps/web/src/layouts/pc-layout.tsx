import { AppShell, Header, Sidebar } from '@repo/ui';
import { Outlet } from 'react-router-dom';

export function PcLayout() {
  return (
    <AppShell
      header={
        <Header
          left={<span className="font-semibold">RUE Starter</span>}
          right={<span className="text-sm text-muted-foreground">v0.1.0</span>}
        />
      }
      sidebar={
        <Sidebar>
          <nav className="flex flex-col gap-1 p-3 text-sm">
            <a href="/" className="rounded px-2 py-1 hover:bg-accent">
              仪表盘
            </a>
            <a href="/settings" className="rounded px-2 py-1 hover:bg-accent">
              设置
            </a>
          </nav>
        </Sidebar>
      }
    >
      <div className="p-6">
        <Outlet />
      </div>
    </AppShell>
  );
}
