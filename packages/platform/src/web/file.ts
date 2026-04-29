/** Web 文件读写：基于浏览器 API */
import type { PickOptions, PickedFile, PlatformFile } from '../types';

export const file: PlatformFile = {
  async readText(path: string): Promise<string> {
    // path 在 web 下视为相对 URL
    const res = await fetch(path);
    if (!res.ok) throw new Error(`fetch ${path} failed: ${res.status}`);
    return await res.text();
  },

  async writeText(path: string, content: string): Promise<void> {
    // web 下"写入"等价于触发下载
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = path.split('/').pop() ?? 'download.txt';
    a.click();
    URL.revokeObjectURL(url);
  },

  async pick(options: PickOptions = {}): Promise<PickedFile[]> {
    const { multiple = false, accept } = options;
    return new Promise((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.multiple = multiple;
      if (accept) input.accept = accept;
      input.onchange = (): void => {
        const list = Array.from(input.files ?? []);
        resolve(
          list.map((f) => ({
            name: f.name,
            size: f.size,
            file: f,
          })),
        );
      };
      input.click();
    });
  },
};
