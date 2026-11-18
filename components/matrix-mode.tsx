'use client';

// Easter egg: the Konami code (↑ ↑ ↓ ↓ ← → ← → B A), or `matrix` in the
// terminal, fills the screen with falling green code. Esc or click to exit.
import { useEffect, useRef, useState } from 'react';
import { play } from '@/lib/sound';
import { useOverlay } from '@/lib/overlay';

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

export function MatrixMode() {
  const [on, setOn] = useState(false);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let i = 0;
    const key = (e: KeyboardEvent) => {
      // ignore keys typed into inputs (terminal, contact form, palette...)
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) { i = 0; return; }
      i = e.key.toLowerCase() === KONAMI[i].toLowerCase() ? i + 1 : e.key === KONAMI[0] ? 1 : 0;
      if (i === KONAMI.length) { i = 0; setOn(true); }
    };
    const open = () => setOn(true);
    window.addEventListener('keydown', key);
    window.addEventListener('matrix-mode', open);
    return () => { window.removeEventListener('keydown', key); window.removeEventListener('matrix-mode', open); };
  }, []);
  useOverlay('matrix', on, () => setOn(false));

  useEffect(() => {
    if (!on || !canvas.current) return;
    play('whoosh');
    const c = canvas.current, g = c.getContext('2d')!;
    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    const size = 16, chars = 'アイウエオカキクケコサシスセソ0123456789<>/{}=;ASHUTOSH';
    let drops = Array.from({ length: Math.ceil(c.width / size) }, () => Math.random() * -50);
    let raf = 0, last = 0;
    const frame = (t: number) => {
      raf = requestAnimationFrame(frame);
      if (t - last < 45) return;
      last = t;
      if (drops.length < Math.ceil(c.width / size)) drops = drops.concat(Array.from({ length: Math.ceil(c.width / size) - drops.length }, () => 0));
      g.fillStyle = 'rgba(0, 0, 0, 0.08)';
      g.fillRect(0, 0, c.width, c.height);
      g.font = `${size}px monospace`;
      drops.forEach((y, x) => {
        g.fillStyle = Math.random() > 0.96 ? '#d1fae5' : '#10b981';
        g.fillText(chars[Math.floor(Math.random() * chars.length)], x * size, y * size);
        drops[x] = y * size > c.height && Math.random() > 0.975 ? 0 : y + 1;
      });
    };
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, [on]);

  if (!on) return null;
  return (
    <div className="fixed inset-0 z-[120] bg-black cursor-pointer" onClick={() => setOn(false)} role="dialog" aria-label="Matrix mode, press Escape to exit">
      <canvas ref={canvas} className="absolute inset-0" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none">
        <p className="font-mono text-emerald-400 text-2xl md:text-4xl font-bold tracking-widest bg-black/70 px-6 py-3 rounded">SYSTEM OVERRIDE</p>
        <p className="font-mono text-emerald-300/80 text-sm bg-black/70 px-3 py-1 rounded">You found the easter egg. Press Esc or click to return.</p>
      </div>
    </div>
  );
}
