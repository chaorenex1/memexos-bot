# Electron 规范

## 主进程

- 单例锁 `app.requestSingleInstanceLock()` 必须开启
- BrowserWindow 默认 `show: false`，监听 `ready-to-show` 后再显示
- 退出策略：
  - macOS：`window-all-closed` 时**不**退出
  - Windows / Linux：所有窗口关闭即退出

## 预加载

- `electron/preload/index.ts` 是唯一允许使用 `contextBridge` 的入口
- 暴露的 API 必须是**纯函数 + Promise** 形式，避免暴露 EventEmitter / Buffer 等 Node 类型
- API 划分按业务域组织：`window.electron.app/file/system/storage/terminal`

## IPC

- 所有 channel 名以 `<domain>:<action>` 命名（如 `file:read-text`）
- 入参 / 出参均为 JSON 可序列化
- handler 内部可以抛错；preload 返回的 Promise 会 reject，业务侧用 try/catch 处理

## 自动更新

- 使用 `electron-updater`
- 仅在 `app.isPackaged` 为 true 时启用
- 更新源在 `electron-builder.yml` 的 `publish` 字段配置

## 资源与打包

- 图标：`resources/icons/{tray.png, icon.icns, icon.ico, icon.png}`
- 安装包：`electron-builder.yml` 控制 NSIS / DMG 行为
- macOS 公证：`build/notarize.cjs` 配合 GitHub Actions

## 调试

- 主进程：`electron-vite dev` 自动启用 inspector，VSCode 附加 9229 端口
- 渲染进程：`Cmd/Ctrl+Shift+I` 打开 DevTools；React DevTools 已内置在 dev 模式
