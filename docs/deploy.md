# 部署发布

## Web SPA（apps/web）

```bash
pnpm build:web
# 产物：apps/web/dist/
```

部署到任意静态托管（Vercel / Netlify / S3 + CloudFront / 自建 Nginx）。
SPA 路由需要 fallback 到 `index.html`：

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

## Web SSR（apps/web-ssr）

```bash
pnpm build:ssr
# 在生产服务器
pnpm --filter @app/web-ssr start
```

Vercel 一键部署：将 root 指向 `apps/web-ssr`，构建命令 `pnpm build`。

## Desktop（apps/desktop）

```bash
# 仅 Windows
pnpm --filter @app/desktop build:win

# 仅 macOS（需在 Mac 机器上执行；x64 + arm64）
pnpm --filter @app/desktop build:mac

# 仅 Linux
pnpm --filter @app/desktop build:linux

# 全平台（需要 CI）
pnpm build:desktop
```

产物：`apps/desktop/release/`。

### macOS 公证

需要环境变量：

- `APPLE_ID`：Apple 开发者邮箱
- `APPLE_APP_SPECIFIC_PASSWORD`：应用专用密码
- `APPLE_TEAM_ID`：Team ID

`apps/desktop/build/notarize.cjs` 会读取这些变量。

### 自动更新

`electron-builder.yml` 的 `publish.provider: github` 已配置好。
打 tag 后 GitHub Actions 上传安装包到 Release，客户端 `electron-updater` 自动检测。

## 版本号管理

```bash
pnpm changeset            # 交互式描述本次变更
pnpm changeset:version    # 根据 changeset 计算新版本号
pnpm changeset:publish    # 真实发布（如果有 npm）
```

`@app/*` 已在 `.changeset/config.json` 的 `ignore` 列表中，不参与 publish，但 version 会随之 bump。

## CI 工作流

- `web-ci.yml`：lint + typecheck + build:web
- `desktop-build.yml`：windows-latest + macos-latest + ubuntu-latest 矩阵打包
- `release.yml`：tag 触发，上传 release 资产
