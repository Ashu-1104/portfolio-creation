'use client';

// Spotlight-style command palette: Ctrl+K / ⌘K (or the search button in the
// header). Type to filter; arrows + Enter to run.
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Code2, Copy, Download, ExternalLink, Gamepad2, Moon, Search, Sparkles, Terminal, Volume2 } from 'lucide-react';
import { play, setSound, soundEnabled } from '@/lib/sound';
import { anyOverlayOpen, useOverlay } from '@/lib/overlay';

type Action = { id: string; label: string; group: string; icon: ReactNode; keywords?: string; run: () => void };

const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
const open = (url: string) => window.open(url, '_blank', 'noopener');

export function openPalette() {
  window.dispatchEvent(new Event('open-palette'));
}

export function CommandPalette() {
  const [show, setShow] = useState(false);
  const [q, setQ] = useState('');
  const [i, setI] = useState(0);
  const [toast, setToast] = useState('');
  const input = useRef<HTMLInputElement>(null);

  const actions: Action[] = useMemo(() => [
    ...[['about-me', 'About'], ['services', 'Services'], ['experience', 'Experience'], ['projects', 'Projects'], ['skills', 'Skills'], ['terminal', 'Terminal'], ['contact', 'Contact']].map(
      ([id, label]) => ({ id: `go-${id}`, label: `Go to ${label}`, group: 'Navigate', icon: <ArrowRight size={15} />, run: () => go(id) })),
    { id: 'cp', label: 'Open CareerPilot (live)', group: 'Projects', icon: <ExternalLink size={15} />, keywords: 'job portal', run: () => open('https://careerpilot-blush-eight.vercel.app') },
    { id: 'fh', label: 'Open FocusHub (live)', group: 'Projects', icon: <ExternalLink size={15} />, keywords: 'productivity tasks', run: () => open('https://focushub-tawny.vercel.app') },
    { id: 'cm', label: 'Open CheckMate Arena (live)', group: 'Projects', icon: <ExternalLink size={15} />, keywords: 'chess', run: () => open('https://checkmate-arena-bay.vercel.app') },
    { id: 'gh', label: 'GitHub profile', group: 'Projects', icon: <Code2 size={15} />, run: () => open('https://github.com/Ashu-1104') },
    { id: 'recruiter', label: 'Recruiter quick view (20-sec summary)', group: 'Actions', icon: <Sparkles size={15} />, keywords: 'hire hr summary', run: () => window.dispatchEvent(new Event('open-recruiter')) },
    { id: 'card', label: 'Show my business card (QR)', group: 'Actions', icon: <Sparkles size={15} />, keywords: 'share contact vcard qr', run: () => window.dispatchEvent(new Event('open-card')) },
    { id: 'cv', label: 'Download resume (PDF)', group: 'Actions', icon: <Download size={15} />, keywords: 'cv', run: () => open('/Ashutosh_Tiwari_Resume.pdf') },
    { id: 'mail', label: 'Copy email address', group: 'Actions', icon: <Copy size={15} />, run: () => { void navigator.clipboard?.writeText('ashutoshtiwari110504@gmail.com'); setToast('Email copied'); } },
    { id: 'theme', label: 'Toggle light / dark theme', group: 'Actions', icon: <Moon size={15} />, run: () => { const l = document.documentElement.classList.toggle('light'); try { localStorage.setItem('theme', l ? 'light' : 'dark'); } catch {} } },
    { id: 'sound', label: 'Toggle sounds', group: 'Actions', icon: <Volume2 size={15} />, run: () => setSound(!soundEnabled()) },
    { id: 'term', label: 'Open the terminal', group: 'Fun', icon: <Terminal size={15} />, run: () => { go('terminal'); setTimeout(() => document.querySelector<HTMLInputElement>('#terminal input')?.focus(), 700); } },
    { id: 'chess', label: 'Play chess vs Stockfish', group: 'Fun', icon: <Gamepad2 size={15} />, keywords: 'game easter egg', run: () => window.dispatchEvent(new Event('open-chess')) },
    { id: 'matrix', label: 'Matrix mode', group: 'Fun', icon: <Sparkles size={15} />, keywords: 'easter egg code rain', run: () => window.dispatchEvent(new Event('matrix-mode')) },
  ], []);

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return actions;
    // label matches first, then group/keyword matches
    const hit = actions.filter((a) => `${a.label} ${a.group} ${a.keywords ?? ''}`.toLowerCase().includes(s));
    return [...hit.filter((a) => a.label.toLowerCase().includes(s)), ...hit.filter((a) => !a.label.toLowerCase().includes(s))];
  }, [q, actions]);

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        // don't open underneath another popup (chess, matrix, card...)
        setShow((v) => (v ? false : !anyOverlayOpen()));
      }
    };
    const openIt = () => { if (!anyOverlayOpen()) setShow(true); };
    window.addEventListener('keydown', key);
    window.addEventListener('open-palette', openIt);
    return () => { window.removeEventListener('keydown', key); window.removeEventListener('open-palette', openIt); };
  }, []);

  useEffect(() => {
    if (show) { setQ(''); setI(0); play('open'); setTimeout(() => input.current?.focus(), 30); }
  }, [show]);
  useEffect(() => { if (toast) { const t = setTimeout(() => setToast(''), 1600); return () => clearTimeout(t); } }, [toast]);

  useOverlay('palette', show, () => setShow(false));

  const run = (a?: Action) => { if (!a) return; setShow(false); setTimeout(a.run, 120); };

  let lastGroup = '';
  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.div className="fixed inset-0 z-[105] bg-black/50 backdrop-blur-sm flex items-start justify-center pt-[12vh] px-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShow(false)}>
            <motion.div
              className="w-full max-w-xl rounded-2xl border border-zinc-800 bg-[var(--panel)] shadow-2xl overflow-hidden"
              initial={{ rotateX: -28, y: -30, scale: 0.94, opacity: 0 }} animate={{ rotateX: 0, y: 0, scale: 1, opacity: 1 }} exit={{ rotateX: 18, y: -16, scale: 0.97, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }} style={{ transformPerspective: 900, transformOrigin: 'top center' }}
              onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Command palette"
            >
              <div className="flex items-center gap-3 px-4 border-b border-zinc-800">
                <Search size={17} className="text-zinc-500" />
                <input
                  ref={input} value={q} placeholder="Type a command or search…" aria-label="Search commands"
                  onChange={(e) => { setQ(e.target.value); setI(0); }}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowDown') { e.preventDefault(); setI((v) => Math.min(list.length - 1, v + 1)); }
                    else if (e.key === 'ArrowUp') { e.preventDefault(); setI((v) => Math.max(0, v - 1)); }
                    else if (e.key === 'Enter') run(list[i]);
                  }}
                  className="flex-1 bg-transparent py-4 outline-none text-zinc-100 placeholder:text-zinc-500"
                />
                <kbd className="font-mono text-[10px] text-zinc-500 border border-zinc-800 rounded px-1.5 py-0.5">ESC</kbd>
              </div>
              <ul className="max-h-[52vh] overflow-y-auto overscroll-contain p-2" data-lenis-prevent>
                {list.length === 0 && <li className="px-3 py-6 text-center text-sm text-zinc-500">No results.</li>}
                {list.map((a, n) => {
                  const header = a.group !== lastGroup ? (lastGroup = a.group) : null;
                  return (
                    <li key={a.id}>
                      {header && <p className="px-3 pt-3 pb-1 font-mono text-[10px] uppercase tracking-widest text-zinc-500">{header}</p>}
                      <button
                        onMouseEnter={() => setI(n)} onClick={() => run(a)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm transition-colors ${n === i ? 'bg-emerald-500/10 text-emerald-500' : 'text-zinc-300'}`}
                      >
                        <span className={n === i ? 'text-emerald-500' : 'text-zinc-500'}>{a.icon}</span>
                        {a.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {toast && (
          <motion.p className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[106] px-4 py-2 rounded-full bg-emerald-500 text-zinc-950 text-sm font-bold"
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}>{toast}</motion.p>
        )}
      </AnimatePresence>
    </>
  );
}
