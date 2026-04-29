import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/ui';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [version, setVersion] = useState('-');
  const [platform, setPlatform] = useState('-');

  useEffect(() => {
    void window.electron?.app?.getVersion().then(setVersion);
    void window.electron?.app?.getPlatform().then(setPlatform);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">桌面端首页</h1>
        <p className="text-sm text-muted-foreground">通过 preload IPC 已成功访问主进程</p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>App 版本</CardTitle>
            <CardDescription>来源：window.electron.app.getVersion()</CardDescription>
          </CardHeader>
          <CardContent className="text-base">{version}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>运行平台</CardTitle>
            <CardDescription>来源：window.electron.app.getPlatform()</CardDescription>
          </CardHeader>
          <CardContent className="text-base">{platform}</CardContent>
        </Card>
      </div>
    </div>
  );
}
