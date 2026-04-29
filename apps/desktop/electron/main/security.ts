/** 全局安全策略：CSP、disallow-navigation、Permission Handler 等 */
import { app, session } from 'electron';

export function applySecurityPolicy(): void {
  app.on('web-contents-created', (_e, contents) => {
    contents.on('will-attach-webview', (e) => e.preventDefault());

    contents.on('will-navigate', (event, url) => {
      // 仅允许同源 / 开发服务器导航
      const allowed =
        url.startsWith('http://localhost') || url.startsWith('file://') || url.startsWith('app://');
      if (!allowed) {
        event.preventDefault();
      }
    });

    contents.setWindowOpenHandler(() => ({ action: 'deny' }));
  });

  // 默认拒绝敏感权限请求
  session.defaultSession.setPermissionRequestHandler((_wc, _perm, callback) => callback(false));
}
