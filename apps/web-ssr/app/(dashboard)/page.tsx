import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/ui';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">仪表盘（SSR）</h1>
        <p className="text-sm text-muted-foreground">该页面在服务器端渲染</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>渲染时间</CardTitle>
          <CardDescription>每次刷新都会变化（说明确实是 SSR）</CardDescription>
        </CardHeader>
        <CardContent>{new Date().toLocaleString('zh-CN')}</CardContent>
      </Card>
    </div>
  );
}
