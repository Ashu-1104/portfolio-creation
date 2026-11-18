'use client';

// Thin bar at the very top during the first load: it creeps forward while the
// page loads and completes when everything (images, 3D code) has arrived.
import { useEffect, useState } from 'react';

export function LoadProgress() {
  const [p, setP] = useState(0.08);
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (document.readyState === 'complete') { setP(1); setTimeout(() => setDone(true), 400); return; }
    const id = setInterval(() => setP((v) => Math.min(0.9, v + (0.9 - v) * 0.08)), 120);
    const finish = () => { clearInterval(id); setP(1); setTimeout(() => setDone(true), 500); };
    window.addEventListener('load', finish);
    return () => { clearInterval(id); window.removeEventListener('load', finish); };
  }, []);
  if (done) return null;
  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[110] pointer-events-none" aria-hidden="true">
      <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 shadow-[0_0_10px_rgba(16,185,129,0.8)] transition-[width,opacity] duration-300" style={{ width: `${p * 100}%`, opacity: p >= 1 ? 0 : 1 }} />
    </div>
  );
}
