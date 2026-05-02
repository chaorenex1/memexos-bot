import { useUserStore } from '@repo/store';
import { RegisterForm } from '@repo/ui';
import { Navigate, useNavigate, Link } from 'react-router-dom';

import type { auth } from '@repo/validators';

import { AuthLayout } from '@/layouts/auth-layout';
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
    <AuthLayout>
      <div className="rounded-lg border bg-background p-6 shadow-sm">
        <h1 className="mb-6 text-2xl font-semibold">注册</h1>
        <RegisterForm onSubmit={onSubmit} submitLabel="注册" />
        <p className="mt-4 text-sm text-muted-foreground">
          已有账号？{' '}
          <Link to="/login" className="text-foreground underline">
            去登录
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
