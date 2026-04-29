import { AppShell, Sidebar, StatusBar, WindowTitlebar } from '@repo/ui';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

export function DesktopLayout() {
  const [version, setVersion] = useState('-');
  const [maximized, setMaximized] = useState(false);

  useEffect(() => {
    void window.electron?.app?.getVersion().then(setVersion);
  }, []);

  return (
    <div className="flex h-screen flex-col">
      <WindowTitlebar
        title="RUE Desktop"
        isMaximized={maximized}
        onMinimize={() => window.electron?.app?.minimize()}
        onToggleMaximize={async () => {
          await window.electron?.app?.toggleMaximize();
          setMaximized((m) => !m);
        }}
        onClose={() => window.electron?.app?.quit()}
      />
      <AppShell
        className="flex-1"
        sidebar={
          <Sidebar>
            <nav className="flex flex-col gap-1 p-3 text-sm">
              <a href="#/" className="rounded px-2 py-1 hover:bg-accent">
                仪表盘
              </a>
              <a href="#/settings" className="rounded px-2 py-1 hover:bg-accent">
                设置
              </a>
            </nav>
          </Sidebar>
        }
        footer={<StatusBar left={<span>就绪</span>} right={<span>v{version}</span>} />}
      >
        <div className="p-6">
          <Outlet />
        </div>
      </AppShell>
    </div>
  );
}
