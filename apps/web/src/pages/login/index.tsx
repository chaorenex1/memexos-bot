import { Button, Form, FormField, FormItem, FormLabel, FormMessage, Input } from '@repo/ui';
import { type auth as authValidators } from '@repo/validators';
import { useForm } from 'react-hook-form';

import { AuthLayout } from '../../layouts/auth-layout';

type LoginInput = authValidators.LoginInput;

export default function Login() {
  const form = useForm<LoginInput>({
    defaultValues: { username: '', password: '', remember: false },
  });

  const onSubmit = (values: LoginInput): void => {
    console.info('[login] submit', values);
  };

  return (
    <AuthLayout>
      <div className="rounded-lg border bg-background p-6 shadow-sm">
        <h1 className="mb-6 text-2xl font-semibold">登录</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>用户名</FormLabel>
                  <Input placeholder="请输入用户名" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>密码</FormLabel>
                  <Input type="password" placeholder="请输入密码" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              登录
            </Button>
          </form>
        </Form>
      </div>
    </AuthLayout>
  );
}
