/** IPC 通道常量：main / preload / renderer 三方共享 */
export const IPC_CHANNELS = {
  // app
  APP_GET_VERSION: 'app:get-version',
  APP_GET_PLATFORM: 'app:get-platform',
  APP_QUIT: 'app:quit',
  APP_MINIMIZE: 'app:minimize',
  APP_TOGGLE_MAXIMIZE: 'app:toggle-maximize',

  // file
  FILE_PICK: 'file:pick',

  // system
  SYSTEM_OPEN_EXTERNAL: 'system:open-external',
  SYSTEM_COPY_TEXT: 'system:copy-text',
  SYSTEM_NOTIFY: 'system:notify',

  // storage
  STORAGE_GET: 'storage:get',
  STORAGE_SET: 'storage:set',
  STORAGE_REMOVE: 'storage:remove',
  STORAGE_CLEAR: 'storage:clear',
} as const;

export type IpcChannel = (typeof IPC_CHANNELS)[keyof typeof IPC_CHANNELS];
