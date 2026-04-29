import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/** 全局异常边界 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('[ErrorBoundary]', error, info);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex min-h-screen items-center justify-center p-6 text-center">
            <div>
              <h1 className="mb-2 text-2xl font-semibold">页面出错了</h1>
              <p className="text-muted-foreground">{this.state.error?.message ?? '未知错误'}</p>
            </div>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
