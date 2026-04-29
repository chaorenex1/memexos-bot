/** 延迟与可取消等待 */

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export interface CancellableDelay {
  promise: Promise<void>;
  cancel: () => void;
}

export function cancellableDelay(ms: number): CancellableDelay {
  let timer: ReturnType<typeof setTimeout> | undefined;
  let canceled = false;

  const promise = new Promise<void>((resolve, reject) => {
    timer = setTimeout(() => {
      if (canceled) return;
      resolve();
    }, ms);
    void reject;
  });

  return {
    promise,
    cancel() {
      canceled = true;
      if (timer) clearTimeout(timer);
    },
  };
}
