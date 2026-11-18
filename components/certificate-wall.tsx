'use client';

// Certificates hanging on a wall. Moving the mouse past a card gives it a push
// and it swings on its pin like a pendulum; click to see it up close.
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion, useSpring } from 'framer-motion';
import { Award, X } from 'lucide-react';
import { play } from '@/lib/sound';
import { useOverlay } from '@/lib/overlay';

const CERTS = [
  { name: 'React.js', provider: 'Scaler', color: 'from-sky-500 to-indigo-600' },
  { name: 'Advanced Python', provider: 'TuteDude', color: 'from-amber-400 to-orange-600' },
  { name: 'Core Python', provider: 'GeeksforGeeks', color: 'from-emerald-400 to-emerald-700' },
];
type Cert = (typeof CERTS)[number];

function Face({ cert, big = false }: { cert: Cert; big?: boolean }) {
  return (
    <div className={`relative w-full h-full rounded-xl bg-[var(--panel)] border border-zinc-800 shadow-2xl overflow-hidden ${big ? 'p-10' : 'p-4'}`}>
      <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${cert.color}`} />
      <div className="absolute inset-2 rounded-lg border border-dashed border-zinc-700/60 pointer-events-none" />
      <div className="relative h-full flex flex-col items-center justify-center text-center">
        {big && <p className="font-mono uppercase tracking-[0.3em] text-zinc-500 text-xs mb-4">Certificate of completion</p>}
        <p className={`font-bold text-zinc-100 leading-tight ${big ? 'text-4xl mb-2' : 'text-sm mb-2'}`}>{cert.name}</p>
        {big && <p className="text-zinc-500 text-sm mb-6">awarded to <span className="text-zinc-300">Ashutosh Tiwari</span></p>}
        <span className={`rounded-full bg-gradient-to-br ${cert.color} flex items-center justify-center text-white shadow-lg ${big ? 'w-16 h-16' : 'w-8 h-8'}`}>
          <Award size={big ? 30 : 15} />
        </span>
        <p className={`font-mono uppercase tracking-widest text-emerald-500 ${big ? 'text-sm mt-5' : 'text-[8px] mt-2'}`}>{cert.provider}</p>
      </div>
    </div>
  );
}

function Hanging({ cert, i, onOpen }: { cert: Cert; i: number; onOpen: () => void }) {
  const reduce = useReducedMotion();
  const swing = useSpring(0, { stiffness: 40, damping: 3.2, mass: 1 }); // springy pendulum
  const ref = useRef<HTMLDivElement>(null);
  const last = useRef({ x: 0, t: 0 });
  return (
    <div className="flex flex-col items-center" style={{ perspective: 800 }}>
      {/* pin */}
      <span className="relative z-10 w-3 h-3 rounded-full bg-zinc-400 shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
      <motion.div
        ref={ref}
        className="relative -mt-1.5 origin-top cursor-pointer"
        style={{ rotateZ: reduce ? 0 : swing, rotateX: 6 }}
        initial={{ rotateZ: (i - 1) * 14 }}
        animate={{ rotateZ: 0 }}
        onPointerMove={(e) => {
          if (reduce) return;
          const now = performance.now();
          const v = (e.clientX - last.current.x) / Math.max(1, now - last.current.t);
          last.current = { x: e.clientX, t: now };
          if (Math.abs(v) > 0.3) swing.set(Math.max(-22, Math.min(22, v * 8)));
          setTimeout(() => swing.set(0), 60);
        }}
        onClick={onOpen}
        whileHover={{ y: -4 }}
        role="button" aria-label={`${cert.name} certificate, ${cert.provider}`} tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(); } }}
      >
        {/* strings from the pin to the card corners */}
        <svg className="absolute left-0 top-0 w-full h-14 overflow-visible pointer-events-none" viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden="true">
          <path d="M50 0 L8 20 M50 0 L92 20" stroke="currentColor" className="text-zinc-500" strokeWidth="0.8" fill="none" vectorEffect="non-scaling-stroke" />
        </svg>
        <div className="w-[118px] h-[118px] sm:w-[128px] sm:h-[128px] mt-14">
          <Face cert={cert} />
        </div>
      </motion.div>
    </div>
  );
}

export function CertificateWall() {
  const [open, setOpen] = useState<Cert | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  useOverlay('certificate', !!open, () => setOpen(null));
  return (
    <div className="h-full p-1 bg-gradient-to-bl from-zinc-800 to-zinc-950 rounded-[2rem]">
      <div className="h-full rounded-[1.8rem] bg-[var(--panel)] p-8 md:p-10 flex flex-col">
        <p className="font-mono text-[10px] text-emerald-500 uppercase tracking-widest mb-2">certificates</p>
        <h5 className="text-2xl font-bold text-zinc-100 mb-1">Certificate wall</h5>
        <p className="text-sm text-zinc-500 mb-6">Swipe the mouse across them, or click one to look closer.</p>
        {/* the rail the certificates hang from */}
        <div className="relative flex-1 mt-4">
          <span className="absolute left-0 right-0 top-[6px] h-[3px] rounded-full bg-gradient-to-r from-zinc-700 via-zinc-500 to-zinc-700" />
          <div className="relative flex flex-wrap justify-around gap-x-2 gap-y-8">
            {CERTS.map((c, i) => <Hanging key={c.name} cert={c} i={i} onOpen={() => { setOpen(c); play('open'); }} />)}
          </div>
        </div>
      </div>
      {mounted && createPortal(
        <AnimatePresence>
          {open && (
            <motion.div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}>
              <motion.div
                className="relative w-full max-w-xl aspect-[1.414]"
                initial={{ rotateY: -70, rotateX: 15, scale: 0.6 }} animate={{ rotateY: 0, rotateX: 0, scale: 1 }} exit={{ rotateY: 60, scale: 0.7, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 160, damping: 18 }} style={{ transformPerspective: 1200 }}
                onClick={(e) => e.stopPropagation()} role="dialog" aria-label={`${open.name} certificate`}
              >
                <Face cert={open} big />
                <button onClick={() => setOpen(null)} aria-label="Close" className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-emerald-500 text-zinc-950 flex items-center justify-center"><X size={17} /></button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </div>
  );
}
