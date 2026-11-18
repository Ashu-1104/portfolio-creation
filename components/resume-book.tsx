'use client';

// My resume as a 3D booklet: pages turn like paper (click the right page or use
// the arrows / ← → keys). Click a resume page to zoom in.
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Download, X, ZoomIn } from 'lucide-react';
import { RevealText } from './interactions';
import { Heading3D } from './heading-3d';
import { play } from '@/lib/sound';
import { useOverlay } from '@/lib/overlay';

const PDF = '/Ashutosh_Tiwari_Resume.pdf';

function Paper({ children, side }: { children: ReactNode; side: 'left' | 'right' }) {
  return (
    <div className={`absolute inset-0 overflow-hidden bg-[#fbfaf7] text-slate-900 ${side === 'right' ? 'rounded-r-xl' : 'rounded-l-xl'}`}>
      {children}
      {/* shading toward the spine */}
      <span className={`absolute inset-y-0 w-10 pointer-events-none ${side === 'right' ? 'left-0 bg-gradient-to-r' : 'right-0 bg-gradient-to-l'} from-black/15 to-transparent`} />
    </div>
  );
}

export function ResumeBook() {
  const [flipped, setFlipped] = useState(0);
  const [zoom, setZoom] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const pages: ReactNode[] = [
    // 0 cover
    <div key="cover" className="h-full flex flex-col items-center justify-center text-center p-8 bg-[radial-gradient(circle_at_30%_20%,#134e4a,#09090b_70%)] text-white">
      <span className="w-20 h-20 rounded-full border-4 border-[#10b981] bg-[#09090b] flex items-center justify-center font-black text-3xl tracking-tighter text-white shadow-[0_0_40px_rgba(16,185,129,0.5)]"><span>A</span><span className="text-[#10b981]">T</span></span>
      <p className="mt-8 font-mono text-[10px] tracking-[0.4em] uppercase text-[#34d399]">Resume · 2026</p>
      <p className="mt-3 text-3xl font-black">Ashutosh Tiwari</p>
      <p className="mt-2 text-sm text-[#a1a1aa]">Full-Stack Developer</p>
      <p className="mt-10 font-mono text-[10px] text-[#71717a] animate-pulse">click to open →</p>
    </div>,
    // 1 inside cover
    <div key="inside" className="h-full flex flex-col justify-center p-8 sm:p-10">
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-emerald-700 mb-3">hello</p>
      <p className="text-xl font-bold mb-3">I build fast, secure web apps end to end.</p>
      <p className="text-sm text-slate-600 leading-relaxed mb-8">React, Next.js, TypeScript and Node.js developer from Mumbai. I build and manage SecLayer, a Linux server firewall, at Softaculous.</p>
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-400 mb-2">on the next page</p>
      <ul className="text-sm space-y-1.5 text-slate-700">
        <li>Experience · Projects · Skills · Education</li>
        <li className="text-slate-500">Click the page to zoom in →</li>
      </ul>
    </div>,
    // 2 the whole resume on one page
    <button key="full" onClick={(e) => { e.stopPropagation(); setZoom('/resume/full.webp'); }} className="group relative block w-full h-full cursor-zoom-in" aria-label="Zoom into the resume">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/resume/full.webp" alt="Ashutosh Tiwari resume" className="w-full h-full object-contain" loading="lazy" draggable={false} />
      <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-900/80 text-white text-[10px] opacity-0 group-hover:opacity-100 transition-opacity"><ZoomIn size={12} /> zoom</span>
    </button>,
    // back cover
    <div key="back" className="h-full flex flex-col items-center justify-center text-center p-8 bg-[radial-gradient(circle_at_70%_80%,#134e4a,#09090b_70%)] text-white">
      <p className="text-2xl font-bold mb-2">Thanks for reading!</p>
      <p className="text-sm text-[#a1a1aa] mb-8">Take a copy with you.</p>
      <a href={PDF} download onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-[#10b981] text-[#09090b] font-bold"><Download size={16} /> Download PDF</a>
      <p className="mt-6 font-mono text-[10px] text-[#71717a]">ashutoshtiwari110504@gmail.com</p>
    </div>,
  ];
  const sheets = Math.ceil(pages.length / 2);

  const turn = (dir: 1 | -1) => {
    const n = Math.max(0, Math.min(sheets, flipped + dir));
    if (n !== flipped) { play('whoosh'); setFlipped(n); }
  };
  // phones: one page at a time (a spread is too small to read)
  const [narrow, setNarrow] = useState(false);
  const [page, setPage] = useState(0);
  const [dir, setDir] = useState(1);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    const set = () => setNarrow(mq.matches);
    set();
    mq.addEventListener('change', set);
    return () => mq.removeEventListener('change', set);
  }, []);
  const turnPage = (d: 1 | -1) => {
    const n = Math.max(0, Math.min(pages.length - 1, page + d));
    if (n !== page) { play('whoosh'); setDir(d); setPage(n); }
  };
  const swipe = useRef<number | null>(null);
  const swiped = useRef(false); // a swipe also fires a click afterwards: ignore that one
  useOverlay('resume-zoom', !!zoom, () => setZoom(null));

  // closed front cover sits centred; open book is centred on its spine; closed back cover too
  const shift = flipped === 0 ? '-25%' : flipped === sheets ? '25%' : '0%';

  return (
    <section id="resume" className="py-24 px-6 overflow-x-clip">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-4 mb-12">
          <h2 className="font-mono text-emerald-500 text-sm tracking-widest uppercase">./resume</h2>
          <Heading3D className="text-4xl font-bold text-zinc-100"><RevealText text="Flip through my resume" /></Heading3D>
          <p className="text-zinc-400">Click the pages or use the arrows. Click the resume to zoom in.</p>
        </div>

        {narrow ? (
          <>
        <div
          className="relative mx-auto w-full max-w-[340px] aspect-[0.71] select-none touch-pan-y"
          style={{ perspective: 1600 }}
          aria-label="Resume booklet"
          onPointerDown={(e) => { swipe.current = e.clientX; }}
          onPointerUp={(e) => { const x = swipe.current; swipe.current = null; if (x !== null && Math.abs(e.clientX - x) > 40) { swiped.current = true; setTimeout(() => { swiped.current = false; }, 400); turnPage(e.clientX < x ? 1 : -1); } }}
          onDragStart={(e) => e.preventDefault()}
          onClickCapture={(e) => { if (swiped.current) { swiped.current = false; e.stopPropagation(); e.preventDefault(); } }}
        >
          <span className="absolute left-[8%] right-[8%] -bottom-5 h-8 rounded-[50%] bg-black/50 blur-2xl" aria-hidden="true" />
          <AnimatePresence initial={false} custom={dir} mode="popLayout">
            <motion.div
              key={page}
              custom={dir}
              className="absolute inset-0 shadow-xl rounded-xl"
              style={{ transformOrigin: 'left center' }}
              variants={{
                enter: (d: number) => ({ rotateY: d > 0 ? 70 : -70, opacity: 0 }),
                center: { rotateY: 0, opacity: 1 },
                exit: (d: number) => ({ rotateY: d > 0 ? -110 : 60, opacity: 0 }),
              }}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
              onClick={() => page !== 2 && turnPage(1)}
            >
              <Paper side="right">{pages[page]}</Paper>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          <button onClick={() => turnPage(-1)} disabled={page === 0} aria-label="Previous page" className="w-11 h-11 rounded-full border border-zinc-800 text-zinc-300 hover:border-emerald-500 hover:text-emerald-500 disabled:opacity-30 flex items-center justify-center transition-colors"><ChevronLeft size={18} /></button>
          <span className="font-mono text-xs text-zinc-500 w-20 text-center">page {page + 1} / {pages.length}</span>
          <button onClick={() => turnPage(1)} disabled={page === pages.length - 1} aria-label="Next page" className="w-11 h-11 rounded-full border border-zinc-800 text-zinc-300 hover:border-emerald-500 hover:text-emerald-500 disabled:opacity-30 flex items-center justify-center transition-colors"><ChevronRight size={18} /></button>
          <a href={PDF} download className="ml-1 inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-emerald-500 text-zinc-950 font-bold text-sm"><Download size={15} /> PDF</a>
        </div>
          </>
        ) : (
          <>
        <div
          className="relative mx-auto w-full max-w-[920px] aspect-[1.42] select-none"
          style={{ perspective: 2200 }}
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'ArrowRight') turn(1); if (e.key === 'ArrowLeft') turn(-1); }}
          aria-label="Resume booklet"
        >
          <motion.div className="absolute inset-0" animate={{ x: shift }} transition={{ type: 'spring', stiffness: 90, damping: 18 }} style={{ transformStyle: 'preserve-3d' }}>
            {/* soft shadow under the book */}
            <span className="absolute left-[8%] right-[8%] -bottom-6 h-10 rounded-[50%] bg-black/50 blur-2xl" aria-hidden="true" />
            {Array.from({ length: sheets }).map((_, i) => {
              const isFlipped = i < flipped;
              return (
                <motion.div
                  key={i}
                  className="absolute top-0 left-1/2 w-1/2 h-full cursor-pointer"
                  style={{ transformOrigin: 'left center', transformStyle: 'preserve-3d', zIndex: isFlipped ? i : sheets - i }}
                  animate={{ rotateY: isFlipped ? -180 : 0 }}
                  transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
                  onClick={() => turn(isFlipped ? -1 : 1)}
                >
                  <div className="absolute inset-0 shadow-xl rounded-r-xl" style={{ backfaceVisibility: 'hidden' }}>
                    <Paper side="right">{pages[i * 2]}</Paper>
                  </div>
                  <div className="absolute inset-0 shadow-xl rounded-l-xl" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                    <Paper side="left">{pages[i * 2 + 1] ?? null}</Paper>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <div className="mt-10 flex items-center justify-center gap-4">
          <button onClick={() => turn(-1)} disabled={flipped === 0} aria-label="Previous page" className="w-11 h-11 rounded-full border border-zinc-800 text-zinc-300 hover:border-emerald-500 hover:text-emerald-500 disabled:opacity-30 flex items-center justify-center transition-colors"><ChevronLeft size={18} /></button>
          <span className="font-mono text-xs text-zinc-500 w-24 text-center">{flipped === 0 ? 'cover' : flipped === sheets ? 'back' : `spread ${flipped} / ${sheets - 1}`}</span>
          <button onClick={() => turn(1)} disabled={flipped === sheets} aria-label="Next page" className="w-11 h-11 rounded-full border border-zinc-800 text-zinc-300 hover:border-emerald-500 hover:text-emerald-500 disabled:opacity-30 flex items-center justify-center transition-colors"><ChevronRight size={18} /></button>
          <a href={PDF} download className="ml-2 inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-emerald-500 text-zinc-950 font-bold text-sm"><Download size={15} /> PDF</a>
        </div>
          </>
        )}
      </div>

      {mounted && createPortal(
        <AnimatePresence>
          {zoom && (
            <motion.div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setZoom(null)} role="dialog" aria-label="Resume, zoomed">
              <motion.div data-lenis-prevent className="relative w-full max-w-5xl max-h-full overflow-auto overscroll-contain rounded-xl bg-white p-4" initial={{ scale: 0.85, rotateX: 20 }} animate={{ scale: 1, rotateX: 0 }} exit={{ scale: 0.9, opacity: 0 }} style={{ transformPerspective: 1200 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={zoom} alt="Resume page, zoomed" className="w-full h-auto" />
                <button onClick={() => setZoom(null)} aria-label="Close" className="absolute top-2 right-2 w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center"><X size={17} /></button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </section>
  );
}
