'use client';

// One place that manages popups (dialogs/overlays):
//  - page scroll is locked while any popup is open (counted, so nested popups work)
//  - a stack of open popups: Escape closes only the top one
//  - others can ask whether a popup is open (e.g. Ctrl+K won't open under one)
import { useEffect, useRef } from 'react';

const stack: string[] = [];
let locks = 0;

function lock() {
  if (locks++ === 0) {
    document.documentElement.style.overflow = 'hidden';
    window.dispatchEvent(new Event('lenis-stop'));
  }
}
function unlock() {
  if (--locks <= 0) {
    locks = 0;
    document.documentElement.style.overflow = '';
    window.dispatchEvent(new Event('lenis-start'));
  }
}

export const anyOverlayOpen = () => stack.length > 0;

/** Register a popup while `open`: locks scroll, joins the stack, Escape closes it when it's on top. */
export function useOverlay(id: string, open: boolean, onClose: () => void) {
  const close = useRef(onClose);
  close.current = onClose;
  useEffect(() => {
    if (!open) return;
    stack.push(id);
    lock();
    const onKey = (e: KeyboardEvent) => {
      const ev = e as KeyboardEvent & { __overlayHandled?: boolean };
      if (e.key !== 'Escape' || ev.__overlayHandled || stack[stack.length - 1] !== id) return;
      ev.__overlayHandled = true;
      close.current();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      const i = stack.lastIndexOf(id);
      if (i >= 0) stack.splice(i, 1);
      unlock();
    };
  }, [id, open]);
}
