import { Button } from '@repo/ui';
import { ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ForbiddenPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <ShieldAlert className="mb-4 h-16 w-16 text-muted-foreground" />
      <h1 className="mb-2 text-3xl font-semibold">403</h1>
      <p className="mb-6 text-muted-foreground">抱歉，您没有权限访问该页面</p>
      <div className="flex gap-3">
        <Button variant="outline" onClick={() => navigate(-1)}>
          返回上一页
        </Button>
        <Button onClick={() => navigate('/')}>返回首页</Button>
      </div>
    </div>
  );
}
