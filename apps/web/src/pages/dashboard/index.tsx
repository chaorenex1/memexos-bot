import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/ui';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">仪表盘</h1>
        <p className="text-sm text-muted-foreground">欢迎使用 React Universal Electron Starter</p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>三端复用</CardTitle>
            <CardDescription>PC Web / Mobile Web / Electron Desktop</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            一套 React 业务代码同时驱动浏览器与桌面应用。
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>四层复用</CardTitle>
            <CardDescription>UI / Store / Request / Platform</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            通过 packages 沉淀通用能力，apps 只关心业务编排。
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>工程规范</CardTitle>
            <CardDescription>ESLint / Prettier / Husky / commitlint</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            统一的工程化基线让协作可预测、可维护。
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
