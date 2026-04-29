import { applyTheme, getThemeMode } from '@repo/theme';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/ui';
import { useState } from 'react';

import type { ThemeMode } from '@repo/types';

export default function Settings() {
  const [mode, setMode] = useState<ThemeMode>(() => getThemeMode());
  const update = (next: ThemeMode): void => {
    setMode(next);
    applyTheme(next);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">设置</h1>
        <p className="text-sm text-muted-foreground">桌面端偏好</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>外观</CardTitle>
          <CardDescription>切换浅色 / 深色 / 跟随系统</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-2">
          {(['light', 'dark', 'system'] as ThemeMode[]).map((m) => (
            <Button key={m} variant={mode === m ? 'default' : 'outline'} onClick={() => update(m)}>
              {m === 'light' ? '浅色' : m === 'dark' ? '深色' : '跟随系统'}
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
