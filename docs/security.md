# 安全规范

## 1. Electron 渲染进程

- `contextIsolation: true` —— 强制开启
- `nodeIntegration: false` —— 禁止在渲染层使用 Node API
- `sandbox: true` —— 默认沙箱
- 通过 `contextBridge.exposeInMainWorld('electron', api)` 暴露**最小化 API**
- `window.open` / 外部链接走 `shell.openExternal`，本窗口仅允许同源/dev 服务器导航
- 严格的 CSP（参考 `apps/desktop/index.html`）：
  - `default-src 'self' 'unsafe-inline'`
  - `script-src 'self'`
  - `connect-src 'self' http://localhost:* ws://localhost:* https:`

## 2. IPC 边界

- 所有 IPC 入参在 `electron/ipc/*.ipc.ts` 用 **Zod schema** 校验
- IPC handler 只接收 `unknown`，不直接解构对象
- 通道名集中在 `electron/shared/channels.ts`，禁止散落字符串

## 3. 凭证与存储

- access token / refresh token：
  - Web：localStorage（生产环境建议改 httpOnly cookie）
  - Desktop：electron-store（系统级目录，OS 用户隔离）
- 切勿把 token 提交到日志或 stack trace
- 业务侧通过 `@repo/request/auth/token` 读写，禁止直接访问 storage key

## 4. 网络请求

- 所有请求统一走 `@repo/request`
- 401 由 `applyErrorInterceptor` 触发 `onUnauthorized`
- 启用 `withRefreshToken(client, { refresh })` 后，401 自动刷新
- 默认禁用 `Refer/Cookie` 跨域携带，按需在拦截器中放行

## 5. 第三方依赖

- 升级前在 staging 跑 e2e
- 锁定 `pnpm-lock.yaml`
- CI 使用 `pnpm install --frozen-lockfile`
- 定期 `pnpm audit`、`pnpm dlx better-npm-audit`

## 6. 代码风险

- 禁用 `eval`、`new Function`
- 不信任用户输入：渲染 HTML 必须经 `DOMPurify` 类似工具处理
- 文件路径在 IPC 层由 main 进程做 absolute / 白名单校验
