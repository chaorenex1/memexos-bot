import { useUserStore } from '@repo/store';
import { Card, CardContent, CardHeader, CardTitle, LoginForm } from '@repo/ui';
import { Navigate, useLocation, useNavigate, Link } from 'react-router-dom';

import { useLoginMutation } from '@/modules/auth/hooks';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const mutation = useLoginMutation();
  const hydrated = useUserStore((s) => s.hydrated);
  const status = useUserStore((s) => s.status);

  if (hydrated && status === 'authenticated') {
    const from = (location.state as { from?: string } | null)?.from ?? '/';
    return <Navigate to={from} replace />;
  }

  const onSubmit = async (values: { username: string; password: string }): Promise<void> => {
    await mutation.mutateAsync(values);
    const from = (location.state as { from?: string } | null)?.from ?? '/';
    navigate(from, { replace: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>登录桌面端</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm onSubmit={onSubmit} submitLabel="登录" />
          <p className="mt-4 text-sm text-muted-foreground">
            还没有账号？{' '}
            <Link to="/register" className="text-foreground underline">
              去注册
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
