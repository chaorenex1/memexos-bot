import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/ui';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="mb-2 text-3xl font-semibold">React Universal Electron Starter</h1>
      <p className="mb-6 text-muted-foreground">SSR / SSG 入口（apps/web-ssr）</p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>共享 UI</CardTitle>
            <CardDescription>来自 @repo/ui，与 SPA / Desktop 同源</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard" className="text-primary underline-offset-4 hover:underline">
              进入仪表盘
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>API 路由</CardTitle>
            <CardDescription>Next.js Route Handler 示例</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/api/health" className="text-primary underline-offset-4 hover:underline">
              GET /api/health
            </Link>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
