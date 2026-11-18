'use client';

// "Share" business card: a 3D card that tilts with the mouse and flips over on
// click. Front: name, title, contacts. Back: QR code to the portfolio, "Save
// contact" (vCard) and "Copy link".
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { Check, Copy, Globe, Mail, MapPin, Phone, RotateCw, UserPlus, X } from 'lucide-react';
import { play } from '@/lib/sound';
import { useOverlay } from '@/lib/overlay';

const SITE = 'https://v0-ashutoshtiwari.vercel.app';

export const openBusinessCard = () => window.dispatchEvent(new Event('open-card'));

export function BusinessCard() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const show = () => { setOpen(true); play('open'); };
    window.addEventListener('open-card', show);
    return () => window.removeEventListener('open-card', show);
  }, []);
  useOverlay('card', open, () => setOpen(false));
  if (!mounted) return null;
  return createPortal(<AnimatePresence>{open && <Card onClose={() => setOpen(false)} />}</AnimatePresence>, document.body);
}

function Card({ onClose }: { onClose: () => void }) {
  const [flipped, setFlipped] = useState(false);
  const [copied, setCopied] = useState(false);
  const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 });
  const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 });
  const flip = () => { setFlipped((f) => !f); play('whoosh'); };
  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center gap-6 p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
      onPointerMove={(e) => { ry.set(((e.clientX / window.innerWidth) * 2 - 1) * 14); rx.set(-((e.clientY / window.innerHeight) * 2 - 1) * 10); }}
    >
      <motion.div
        className="relative w-[min(80vw,320px)] aspect-[0.62] sm:w-[min(92vw,460px)] sm:aspect-[1.75] cursor-pointer"
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200, transformStyle: 'preserve-3d' }}
        initial={{ y: 80, rotateZ: -12, scale: 0.6 }} animate={{ y: 0, rotateZ: 0, scale: 1 }} exit={{ y: 60, scale: 0.7, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 160, damping: 16 }}
        onClick={(e) => { e.stopPropagation(); flip(); }}
        role="dialog" aria-label="Business card, click to flip"
      >
        {/* the card always uses its own dark colours, in light and dark mode; on phones it's a vertical card */}
        <motion.div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }} animate={{ rotateY: flipped ? 180 : 0 }} transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}>
          {/* front */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden p-6 text-white bg-[radial-gradient(circle_at_85%_15%,#065f46,#09090b_65%)] border border-[#10b981]/40 shadow-[0_30px_80px_-10px_rgba(16,185,129,0.35)] flex flex-col" style={{ backfaceVisibility: 'hidden' }}>
            <span className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full border border-[#10b981]/20" />
            <span className="absolute -right-4 -bottom-4 w-28 h-28 rounded-full border border-[#10b981]/20" />
            <div className="flex items-center justify-between">
              <span className="w-12 h-12 rounded-full bg-[#09090b] border-[3px] border-[#10b981] flex items-center justify-center font-black tracking-tighter"><span>A</span><span className="text-[#10b981]">T</span></span>
              <span className="font-mono text-[10px] text-[#34d399]/80 tracking-[0.3em] uppercase">ashu.dev</span>
            </div>
            <div className="mt-auto sm:mt-5">
              <p className="text-3xl font-black leading-none">Ashutosh Tiwari</p>
              <p className="mt-1.5 text-sm text-[#6ee7b7]">Full-Stack Developer</p>
            </div>
            <div className="mt-6 sm:mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 sm:gap-y-1 text-[12px] sm:text-[11px] text-[#d4d4d8] font-mono">
              <span className="flex items-center gap-1.5 min-w-0"><Mail size={12} className="text-[#34d399] flex-shrink-0" /><span className="truncate">ashutoshtiwari110504@gmail.com</span></span>
              <span className="flex items-center gap-1.5"><Phone size={12} className="text-[#34d399] flex-shrink-0" />+91 90964 52696</span>
              <span className="flex items-center gap-1.5"><MapPin size={12} className="text-[#34d399] flex-shrink-0" />Mumbai, India</span>
              <span className="flex items-center gap-1.5 min-w-0"><Globe size={12} className="text-[#34d399] flex-shrink-0" /><span className="truncate">v0-ashutoshtiwari.vercel.app</span></span>
            </div>
          </div>
          {/* back */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden p-6 sm:p-5 bg-[#09090b] border border-[#10b981]/40 flex flex-col sm:flex-row items-center justify-center gap-5 text-white" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/qr.svg" alt="QR code to Ashutosh Tiwari's portfolio" className="w-[70%] sm:w-auto sm:h-full aspect-square rounded-lg bg-white p-1.5 flex-shrink-0" />
            <div className="w-full sm:flex-1 min-w-0 text-center sm:text-left">
              <p className="font-mono text-[10px] text-[#34d399] uppercase tracking-widest mb-1">scan me</p>
              <p className="text-sm text-[#d4d4d8] mb-4">Point a phone camera here to open my portfolio.</p>
              <div className="flex flex-col gap-2">
                <a href="/ashutosh-tiwari.vcf" download onClick={(e) => e.stopPropagation()} className="inline-flex items-center justify-center sm:justify-start gap-2 px-3 py-2 rounded-md bg-[#10b981] text-[#09090b] font-bold text-xs whitespace-nowrap"><UserPlus size={14} /> Save contact</a>
                <button
                  onClick={(e) => { e.stopPropagation(); void navigator.clipboard?.writeText(SITE); setCopied(true); play('success'); setTimeout(() => setCopied(false), 1500); }}
                  className="inline-flex items-center justify-center sm:justify-start gap-2 px-3 py-2 rounded-md border border-white/20 text-[#e4e4e7] text-xs whitespace-nowrap"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Link copied' : 'Copy link'}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
      <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
        <button onClick={flip} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-black/40 text-[#e4e4e7] text-sm hover:border-[#10b981]"><RotateCw size={14} /> Flip</button>
        <button onClick={onClose} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-black/40 text-[#e4e4e7] text-sm hover:border-[#10b981]"><X size={14} /> Close</button>
      </div>
    </motion.div>
  );
}
