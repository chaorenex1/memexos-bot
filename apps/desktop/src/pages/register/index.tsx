import { useUserStore } from '@repo/store';
import { Card, CardContent, CardHeader, CardTitle, RegisterForm } from '@repo/ui';
import { Navigate, useNavigate, Link } from 'react-router-dom';

import type { auth } from '@repo/validators';

import { useRegisterMutation } from '@/modules/auth/hooks';

type RegisterInput = auth.RegisterInput;

export default function Register() {
  const navigate = useNavigate();
  const mutation = useRegisterMutation();
  const hydrated = useUserStore((s) => s.hydrated);
  const status = useUserStore((s) => s.status);

  if (hydrated && status === 'authenticated') {
    return <Navigate to="/" replace />;
  }

  const onSubmit = async (values: RegisterInput): Promise<void> => {
    await mutation.mutateAsync({
      username: values.username,
      password: values.password,
      email: values.email || undefined,
    });
    navigate('/login', { replace: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>注册桌面端</CardTitle>
        </CardHeader>
        <CardContent>
          <RegisterForm onSubmit={onSubmit} submitLabel="注册" />
          <p className="mt-4 text-sm text-muted-foreground">
            已有账号？{' '}
            <Link to="/login" className="text-foreground underline">
              去登录
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
