'use client';

// Career time machine: scroll to fly through a 3D tunnel of years. The section
// pins while you scroll; each milestone is a portal, and when you arrive its
// story and skills appear. Click a year on the rail to jump there.
import { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { RevealText } from './interactions';
import { Heading3D } from './heading-3d';
import { play } from '@/lib/sound';

const TimeTunnel = dynamic(() => import('./three/time-tunnel'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 skeleton-shimmer" />,
});

const STOPS = [
  {
    year: '2022', title: 'Started B.Sc. IT', place: 'Mumbai University',
    text: 'Began my Bachelor of Science in Information Technology: programming, networking, databases and Linux.',
    skills: ['Python', 'C++', 'HTML & CSS', 'JavaScript', 'SQL'],
  },
  {
    year: '2024', title: 'Linux System Administrator Intern', place: 'Talakunchi Network',
    text: 'Built and ran a CTF platform (cryptography and web security) for a 50+ participant district event, and hardened Nginx/Apache servers on Debian.',
    skills: ['Linux', 'Nginx', 'Apache', 'Security', 'CTF design'],
  },
  {
    year: '2025', title: 'Graduated & joined Softaculous', place: 'Softaculous Ltd.',
    text: 'Finished my B.Sc. IT and joined Softaculous as a PHP Developer, building SecLayer (the company\u2019s firewall and intrusion-prevention product for Linux hosting servers) and Webuzo features.',
    skills: ['PHP', 'Perl', 'iptables / nftables', 'MySQL', 'JavaScript'],
  },
  {
    year: '2026', title: 'Full-stack, end to end', place: 'Akobot.ai · Softaculous · my projects',
    text: 'Owned the frontend of an AI startup’s platform (Next.js 15), kept shipping SecLayer features, and built CareerPilot, FocusHub and CheckMate Arena.',
    skills: ['Next.js', 'React', 'TypeScript', 'Node.js', 'MongoDB', 'PostgreSQL'],
  },
];


// built once (a new array every render would rebuild the tunnel's year textures)
const YEARS = STOPS.map((s) => s.year);

// scroll layout: each year has a "hold" stretch (the card stays up to be read) and
// a "travel" stretch to the next portal; the last year holds too before the page moves on
const HOLD = 0.9;
const TRAVEL = 1;
const UNITS = STOPS.length * HOLD + (STOPS.length - 1) * TRAVEL;
const VH_PER_UNIT = 75;
function scrollToPos(p: number) {
  const x = Math.min(1, Math.max(0, p)) * UNITS;
  for (let k = 0; k < STOPS.length; k++) {
    const start = k * (HOLD + TRAVEL);
    if (x <= start + HOLD) return k;
    if (x < start + HOLD + TRAVEL) return k + (x - start - HOLD) / TRAVEL;
  }
  return STOPS.length - 1;
}

export function TimeMachine() {
  const section = useRef<HTMLElement>(null);
  // 0 when the section's top reaches the top of the screen, 1 when its end does
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] });
  // tunnel position 0..1 with a pause on every year
  const flight = useTransform(scrollYProgress, (p) => scrollToPos(p) / (STOPS.length - 1));
  const [pos, setPos] = useState(0);
  const [moving, setMoving] = useState(false);
  const lastIndex = useRef(0);
  // layout follows the panel's shape (same rule as the 3D framing): wide -> card on the left
  const panel = useRef<HTMLDivElement>(null);
  const [wide, setWide] = useState(true);
  useEffect(() => {
    const el = panel.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setWide(e.contentRect.width / Math.max(1, e.contentRect.height) >= 1.1));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const onPos = useCallback((p: number, m: boolean) => {
    setPos(p);
    setMoving(m);
    const idx = Math.round(p);
    if (!m && idx !== lastIndex.current) { lastIndex.current = idx; play('whoosh'); }
  }, []);
  const i = Math.max(0, Math.min(STOPS.length - 1, Math.round(pos)));
  const stop = STOPS[i];

  // jump: scroll the page to the point where that year's portal is reached
  const jump = (k: number) => {
    const el = section.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + (travel * (k * (HOLD + TRAVEL) + HOLD / 2)) / UNITS, behavior: 'smooth' });
  };

  return (
    <section ref={section} id="journey" className="relative" style={{ height: `${UNITS * VH_PER_UNIT + 100}vh` }}>
      <div className="sticky top-0 h-[100svh] flex flex-col px-4 sm:px-6 pt-20 pb-5">
        <div className="max-w-6xl w-full mx-auto flex flex-col flex-1 min-h-0">
          <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2 mb-4">
            <div>
              <h2 className="font-mono text-emerald-500 text-sm tracking-widest uppercase">./journey</h2>
              <Heading3D className="text-3xl md:text-4xl font-bold text-zinc-100"><RevealText text="Career time machine" /></Heading3D>
            </div>
            <p className="text-zinc-400 text-sm">Keep scrolling to fly through the years ↓</p>
          </div>

          <div ref={panel} className="relative flex-1 min-h-0 rounded-3xl overflow-hidden border border-emerald-500/20 bg-[#050507]" aria-label="Career time machine">
            <TimeTunnel years={YEARS} progress={flight} onPos={onPos} />

            {/* year rail with progress */}
            <div className={`absolute top-4 ${wide ? 'left-1/2 right-6' : 'left-6 right-6'}`}>
              <div className="relative h-1 rounded-full bg-white/10">
                <div className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#10b981] to-[#34d399] shadow-[0_0_10px_rgba(16,185,129,0.7)]" style={{ width: `${(pos / (STOPS.length - 1)) * 100}%` }} />
                {STOPS.map((s, k) => (
                  <button key={s.year} onClick={() => jump(k)} aria-label={`Jump to ${s.year}`}
                    className="absolute -top-1.5 -translate-x-1/2 flex flex-col items-center gap-1.5 group" style={{ left: `${(k / (STOPS.length - 1)) * 100}%` }}>
                    <span className={`w-4 h-4 rounded-full border-2 transition-colors ${k <= pos + 0.01 ? 'bg-[#10b981] border-[#34d399]' : 'bg-[#050507] border-white/30 group-hover:border-[#34d399]'}`} />
                    <span className={`font-mono text-[11px] ${k === i ? 'text-[#34d399] font-bold' : 'text-[#94a3b8]'}`}>{s.year}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* warp indicator */}
            <AnimatePresence>
              {moving && (
                <motion.p className="absolute top-14 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#10b981]/15 border border-[#10b981]/40 font-mono text-[11px] tracking-[0.3em] uppercase text-[#6ee7b7] whitespace-nowrap"
                  initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  time travelling…
                </motion.p>
              )}
            </AnimatePresence>

            {/* milestone card: left on wide screens, bottom on phones */}
            <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                  key={stop.year}
                  className={`absolute rounded-2xl border border-[#10b981]/30 bg-[#09090b]/80 backdrop-blur-md shadow-2xl ${wide ? 'top-1/2 -translate-y-1/2 left-[4%] w-[min(40%,440px)] p-6' : 'left-3 right-3 bottom-3 sm:left-5 sm:right-5 sm:bottom-5 p-4 sm:p-5'}`}
                  initial={{ opacity: 0, y: 30, rotateX: -20, scale: 0.96 }}
                  animate={moving ? { opacity: 0, y: 24, rotateX: -12, scale: 0.97 } : { opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 180, damping: 20 }}
                  style={{ transformPerspective: 1000 }}
                >
                  <div className="flex items-center gap-3 mb-2 md:mb-3">
                    <span className="font-black text-2xl md:text-3xl tracking-tight text-white">{stop.year}</span>
                    <span className="h-px flex-1 bg-gradient-to-r from-[#10b981]/60 to-transparent" />
                    <span className="font-mono text-[10px] text-[#64748b]">{i + 1} / {STOPS.length}</span>
                  </div>
                  <p className="font-mono text-[10px] md:text-[11px] text-[#34d399] uppercase tracking-widest mb-1">{stop.place}</p>
                  <h4 className="text-lg md:text-xl font-bold text-white mb-1.5 md:mb-2">{stop.title}</h4>
                  <p className="text-[13px] md:text-sm text-[#cbd5e1] leading-relaxed mb-3 md:mb-4">{stop.text}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {stop.skills.map((s, k) => (
                      <motion.span key={s}
                        className="px-2 py-0.5 md:px-2.5 md:py-1 rounded-md border border-[#10b981]/40 bg-[#10b981]/10 font-mono text-[10px] md:text-[11px] text-[#6ee7b7]"
                        initial={{ opacity: 0, y: 12, rotateX: -60 }} animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        transition={{ delay: 0.2 + k * 0.06, type: 'spring', stiffness: 260, damping: 18 }}>
                        {s}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
