/** 全局事件监听 */
import { useEffect, useRef } from 'react';

type EventTargetLike = Window | Document | HTMLElement | null;

export function useEventListener<K extends keyof WindowEventMap>(
  event: K,
  handler: (e: WindowEventMap[K]) => void,
  target?: EventTargetLike,
): void {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    const node = target ?? (typeof window === 'undefined' ? null : window);
    if (!node) return;

    const listener = (e: Event): void => handlerRef.current(e as WindowEventMap[K]);
    node.addEventListener(event, listener);
    return () => node.removeEventListener(event, listener);
  }, [event, target]);
}
