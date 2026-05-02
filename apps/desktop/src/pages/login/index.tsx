import { useUserStore } from '@repo/store';
import { Button, Card, CardContent, CardHeader, CardTitle, Input } from '@repo/ui';
import { auth } from '@repo/validators';
import { useState, type FormEvent } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import type { auth as AuthValidators } from '@repo/validators';

import { useLoginMutation } from '@/modules/auth/hooks';

type LoginInput = AuthValidators.LoginInput;

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const mutation = useLoginMutation();
  const hydrated = useUserStore((s) => s.hydrated);
  const status = useUserStore((s) => s.status);

  const [form, setForm] = useState<LoginInput>({
    username: '',
    password: '',
    remember: false,
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (hydrated && status === 'authenticated') {
    const from = (location.state as { from?: string } | null)?.from ?? '/';
    return <Navigate to={from} replace />;
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const parsed = auth.loginSchema.safeParse(form);
    if (!parsed.success) {
      setErrorMessage(parsed.error.issues[0]?.message ?? '表单校验失败');
      return;
    }

    setErrorMessage(null);
    try {
      await mutation.mutateAsync(parsed.data);
      const from = (location.state as { from?: string } | null)?.from ?? '/';
      navigate(from, { replace: true });
    } catch (error) {
      setErrorMessage(
        error && typeof error === 'object' && 'message' in error
          ? String(error.message)
          : '登录失败',
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>登录桌面端</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">用户名</label>
              <Input
                placeholder="请输入用户名"
                value={form.username}
                onChange={(event) =>
                  setForm((current) => ({ ...current, username: event.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">密码</label>
              <Input
                type="password"
                placeholder="请输入密码"
                value={form.password}
                onChange={(event) =>
                  setForm((current) => ({ ...current, password: event.target.value }))
                }
              />
            </div>
            {errorMessage ? <p className="text-sm text-destructive">{errorMessage}</p> : null}
            <Button type="submit" className="w-full" disabled={mutation.isPending}>
              {mutation.isPending ? '登录中...' : '登录'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
