'use client';

// "For recruiters": a floating button that opens a 20-second summary panel.
import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Briefcase, CalendarClock, Check, ClipboardCopy, Download, GraduationCap, IdCard, Mail, MapPin, MessageSquare, Plus, X } from 'lucide-react';
import { play } from '@/lib/sound';
import { useOverlay } from '@/lib/overlay';

export const openRecruiterView = () => window.dispatchEvent(new Event('open-recruiter'));

const SKILLS = ['React', 'Next.js', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Tailwind CSS', 'PHP', 'Linux'];

// where each skill was actually used (from the resume and projects)
const USED: Record<string, string> = {
  'React': 'Akobot.ai, CareerPilot, FocusHub',
  'Next.js': 'Akobot.ai (Next.js 15), CheckMate Arena, this portfolio',
  'TypeScript': 'Akobot.ai, CheckMate Arena, this portfolio',
  'JavaScript': 'SecLayer UI at Softaculous, all projects',
  'Node.js': 'CareerPilot, FocusHub, CheckMate Arena',
  'Express': 'CareerPilot, FocusHub',
  'Redux Toolkit': 'FocusHub',
  'Tailwind CSS': 'Akobot.ai, CareerPilot, this portfolio',
  'MongoDB': 'CareerPilot, FocusHub',
  'PostgreSQL': 'CheckMate Arena',
  'MySQL': 'Webuzo at Softaculous',
  'PHP': 'Webuzo at Softaculous',
  'Perl': 'SecLayer at Softaculous',
  'Python': 'Coursework and certificates (TuteDude, GeeksforGeeks)',
  'Linux': 'SecLayer (Softaculous), Talakunchi internship',
  'REST APIs': 'CareerPilot, FocusHub, Webuzo',
  'Server-Sent Events': 'CareerPilot, FocusHub, CheckMate Arena',
  'JWT Auth': 'FocusHub, CareerPilot',
  'Git & CI': 'GitHub Actions in FocusHub and CheckMate Arena',
  'Testing (Vitest)': 'FocusHub (39 tests), CheckMate Arena (25 tests)',
  'Docker': 'Listed on my resume (tools)',
  'Nginx / Apache': 'Talakunchi internship (server hardening)',
  'Three.js': 'This portfolio',
  'Security': 'SecLayer firewall, CTF platform at Talakunchi',
};
const FIT_CHIPS = ['React', 'Next.js', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'MySQL', 'Tailwind CSS', 'Redux Toolkit', 'PHP', 'Linux', 'REST APIs', 'Testing (Vitest)', 'Docker', 'Security'];
const norm = (x: string) => x.toLowerCase().replace(/[^a-z0-9+#]/g, '');
const lookup = (skill: string) => Object.entries(USED).find(([k]) => norm(k) === norm(skill) || norm(k).startsWith(norm(skill)) && norm(skill).length > 2);

const SUMMARY = `Ashutosh Tiwari: Full-Stack Developer, Mumbai, India
Looking for: Full-Stack Developer, Frontend Developer, React Developer
Work setup: Remote, Hybrid (Mumbai), On-site (Mumbai)
Experience (1.5+ years):
- Softaculous Ltd.: PHP Developer (SecLayer, Webuzo), Jul 2025 - Present
- Akobot.ai: Frontend Developer Intern (Part-time), Jan - Jun 2026
- Talakunchi Network: Linux System Administrator Intern, Feb - Jun 2024
Top skills: React, Next.js, TypeScript, Node.js, Express, MongoDB, PostgreSQL, Tailwind CSS, PHP, Linux
Education: B.Sc. Information Technology, Mumbai University (2022 - 2025)
Email: ashutoshtiwari110504@gmail.com | Phone: +91 9096452696
LinkedIn: https://www.linkedin.com/in/ashutosh-tiwari-397206237
GitHub: https://github.com/Ashu-1104
Portfolio: https://v0-ashutoshtiwari.vercel.app`;

const CALL_MAIL = 'mailto:ashutoshtiwari110504@gmail.com?subject=' + encodeURIComponent('Interview call: [Role] at [Company]') + '&body=' + encodeURIComponent(
  'Hi Ashutosh,\n\nI came across your portfolio and would like to schedule a call about the [Role] position at [Company].\n\nSuggested times (IST):\n- [Day, time]\n- [Day, time]\n\nMeeting link / phone: [link]\n\nBest regards,\n[Name]\n[Company]');

export function RecruiterView() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const show = () => { setOpen(true); play('open'); };
    window.addEventListener('open-recruiter', show);
    return () => window.removeEventListener('open-recruiter', show);
  }, []);
  useOverlay('recruiter', open, () => setOpen(false));
  if (!mounted) return null;
  return createPortal(
    <>
      {/* floating button */}
      <motion.button
        onClick={openRecruiterView}
        className="fixed left-4 bottom-4 z-40 inline-flex items-center gap-2 p-1.5 sm:pl-3 sm:pr-4 sm:py-2.5 rounded-full bg-[var(--panel)] border border-emerald-500/40 text-sm text-zinc-100 shadow-xl hover:border-emerald-500 transition-colors"
        initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 2.6, type: 'spring', stiffness: 200, damping: 20 }}
        aria-label="Recruiter quick view"
      >
        <span className="w-7 h-7 rounded-full bg-emerald-500 text-zinc-950 flex items-center justify-center"><Briefcase size={14} /></span>
        <span className="hidden sm:inline">Recruiter? 20-sec summary</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex justify-end" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}>
            <motion.aside
              className="h-full w-full max-w-md bg-[var(--panel)] border-l border-zinc-800 shadow-2xl overflow-y-auto overscroll-contain"
              initial={{ x: '100%', rotateY: -25 }} animate={{ x: 0, rotateY: 0 }} exit={{ x: '100%', rotateY: -15 }}
              transition={{ type: 'spring', stiffness: 200, damping: 26 }} style={{ transformPerspective: 1400, transformOrigin: 'right center' }}
              onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Recruiter summary" data-lenis-prevent
            >
              <div className="p-6 md:p-8">
                {/* header: photo, name, availability */}
                <div className="relative flex items-start gap-4 mb-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/profile.webp" alt="" className="w-16 h-16 rounded-2xl object-cover object-top border border-emerald-500/40" />
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-[10px] text-emerald-500 uppercase tracking-widest">recruiter quick view</p>
                    <h3 className="text-xl font-bold text-zinc-100 leading-tight">Ashutosh Tiwari</h3>
                    <p className="text-sm text-zinc-400">Full-Stack Developer · Mumbai</p>
                    <span className="mt-2 inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-[11px] text-emerald-400">
                      <span className="relative flex w-2 h-2"><span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-70" /><span className="relative w-2 h-2 rounded-full bg-emerald-500" /></span>
                      Open to opportunities
                    </span>
                  </div>
                  <button onClick={() => setOpen(false)} aria-label="Close" className="w-9 h-9 rounded-full border border-zinc-800 text-zinc-400 hover:text-emerald-500 flex items-center justify-center flex-shrink-0"><X size={16} /></button>
                </div>

                {/* key numbers */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                  {[['1.5+', 'years'], ['3', 'companies'], ['20+', 'technologies']].map(([n, l]) => (
                    <div key={l} className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-3 text-center">
                      <p className="text-2xl font-black text-zinc-100">{n}</p>
                      <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">{l}</p>
                    </div>
                  ))}
                </div>

                <Block title="Looking for">
                  <Chips items={['Full-Stack Developer', 'Frontend Developer', 'React Developer']} strong />
                </Block>
                <Block title="Work setup">
                  <Chips items={['Remote', 'Hybrid (Mumbai)', 'On-site (Mumbai)']} />
                </Block>

                <Block title="Experience timeline">
                  <Timeline />
                  <ul className="space-y-3 mt-4">
                    <Row icon={<Briefcase size={14} />} title="Softaculous Ltd." sub="PHP Developer (SecLayer, Webuzo) · Jul 2025 – Present" />
                    <Row icon={<Briefcase size={14} />} title="Akobot.ai" sub="Frontend Developer Intern (Part-time) · Jan – Jun 2026" />
                    <Row icon={<Briefcase size={14} />} title="Talakunchi Network" sub="Linux System Administrator Intern · Feb – Jun 2024" />
                  </ul>
                </Block>

                <Block title="Skill-fit checker">
                  <SkillFit />
                </Block>

                <Block title="Highlights">
                  <ul className="space-y-2 text-sm text-zinc-300">
                    <li className="flex gap-2"><span className="text-emerald-500">▸</span>Develops and manages SecLayer, Softaculous&apos;s Linux server firewall product, end to end.</li>
                    <li className="flex gap-2"><span className="text-emerald-500">▸</span>Owned the complete frontend of an AI startup&apos;s platform (Next.js 15, TypeScript).</li>
                    <li className="flex gap-2"><span className="text-emerald-500">▸</span>Personal projects: CareerPilot, FocusHub and CheckMate Arena.</li>
                  </ul>
                </Block>
                <Block title="Top skills">
                  <Chips items={SKILLS} />
                </Block>
                <Block title="Education">
                  <Row icon={<GraduationCap size={14} />} title="B.Sc. Information Technology" sub="Mumbai University · 2022 – 2025" />
                </Block>
                <Block title="Location">
                  <Row icon={<MapPin size={14} />} title="Mumbai, India" sub="" />
                </Block>

                <div className="grid grid-cols-2 gap-2 mt-8">
                  <a href="/Ashutosh_Tiwari_Resume.pdf" download className="col-span-2 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-md bg-emerald-500 text-zinc-950 font-bold text-sm"><Download size={16} /> Download resume</a>
                  <a href={CALL_MAIL} className="col-span-2 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-md border border-emerald-500/60 text-emerald-400 font-bold text-sm hover:bg-emerald-500/10"><CalendarClock size={16} /> Book a call</a>
                  <CopySummary />
                  <a href="mailto:ashutoshtiwari110504@gmail.com" className="inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-md border border-zinc-700 text-zinc-200 text-sm hover:border-emerald-500"><Mail size={15} /> Email</a>
                  <a href="https://wa.me/919096452696" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-md border border-zinc-700 text-zinc-200 text-sm hover:border-emerald-500"><MessageSquare size={15} /> WhatsApp</a>
                  <a href="https://www.linkedin.com/in/ashutosh-tiwari-397206237" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-md border border-zinc-700 text-zinc-200 text-sm hover:border-emerald-500">LinkedIn</a>
                  <button onClick={() => { setOpen(false); setTimeout(() => window.dispatchEvent(new Event('open-card')), 250); }} className="col-span-2 inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-md border border-zinc-700 text-zinc-200 text-sm hover:border-emerald-500"><IdCard size={15} /> Business card (QR)</button>
                </div>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>,
    document.body,
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-6">
      <h4 className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 mb-2">{title}</h4>
      {children}
    </section>
  );
}
function Chips({ items, strong = false }: { items: string[]; strong?: boolean }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((t) => (
        <span key={t} className={`px-2.5 py-1 rounded-md text-xs ${strong ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/40 font-bold' : 'bg-zinc-900 border border-zinc-800 text-zinc-300'}`}>{t}</span>
      ))}
    </div>
  );
}
function Row({ icon, title, sub }: { icon: React.ReactNode; title: string; sub: string }) {
  return (
    <li className="flex gap-3 list-none">
      <span className="mt-0.5 w-7 h-7 rounded-md bg-emerald-500/10 text-emerald-500 flex items-center justify-center flex-shrink-0">{icon}</span>
      <span>
        <span className="block text-sm text-zinc-100 font-medium">{title}</span>
        {sub && <span className="block text-xs text-zinc-500">{sub}</span>}
      </span>
    </li>
  );
}

// horizontal bar from 2022 to now, with a segment per role
function Timeline() {
  const start = 2022, end = 2026.92;
  const pct = (y: number) => `${((y - start) / (end - start)) * 100}%`;
  const roles = [
    { from: 2022.6, to: 2025.5, label: 'B.Sc. IT', cls: 'bg-zinc-600' },
    { from: 2024.08, to: 2024.5, label: 'Talakunchi', cls: 'bg-sky-500' },
    { from: 2025.5, to: end, label: 'Softaculous', cls: 'bg-emerald-500' },
    { from: 2026.0, to: 2026.5, label: 'Akobot.ai', cls: 'bg-violet-500' },
  ];
  return (
    <div>
      <div className="relative h-14">
        {roles.map((r, i) => (
          <motion.div
            key={r.label}
            className={`absolute h-2.5 rounded-full ${r.cls}`}
            style={{ left: pct(r.from), width: `calc(${pct(r.to)} - ${pct(r.from)})`, top: `${(i % 2) * 22 + 6}px`, originX: 0 }}
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
            title={r.label}
          >
            <span className="absolute -top-4 left-0 font-mono text-[9px] text-zinc-400 whitespace-nowrap">{r.label}</span>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-between font-mono text-[9px] text-zinc-600 border-t border-zinc-800 pt-1">
        {[2022, 2023, 2024, 2025, 2026].map((y) => <span key={y}>{y}</span>)}
      </div>
    </div>
  );
}

// recruiter ticks the skills a role needs -> match % and where each was used
function SkillFit() {
  const [picked, setPicked] = useState<string[]>([]);
  const [custom, setCustom] = useState('');
  const toggle = (k: string) => setPicked((p) => (p.includes(k) ? p.filter((x) => x !== k) : [...p, k]));
  const results = useMemo(() => picked.map((k) => ({ k, hit: lookup(k) })), [picked]);
  const have = results.filter((r) => r.hit).length;
  const pct = picked.length ? Math.round((have / picked.length) * 100) : 0;
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
      <p className="text-xs text-zinc-400 mb-3">Tick what your role needs, or add your own:</p>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {FIT_CHIPS.map((k) => (
          <button key={k} onClick={() => toggle(k)} className={`px-2.5 py-1 rounded-md text-xs border transition-colors ${picked.includes(k) ? 'bg-emerald-500 text-zinc-950 border-emerald-500 font-bold' : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-emerald-500/50'}`}>{k}</button>
        ))}
      </div>
      <form className="flex gap-2 mb-3" onSubmit={(e) => { e.preventDefault(); const v = custom.trim(); if (v && !picked.includes(v)) setPicked((p) => [...p, v]); setCustom(''); }}>
        <input value={custom} onChange={(e) => setCustom(e.target.value)} placeholder="e.g. GraphQL, AWS" aria-label="Add a skill" className="flex-1 min-w-0 bg-zinc-950 border border-zinc-800 rounded-md px-3 py-1.5 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none focus:border-emerald-500/60" />
        <button type="submit" aria-label="Add skill" className="px-3 rounded-md border border-zinc-700 text-zinc-300 hover:border-emerald-500"><Plus size={15} /></button>
      </form>
      {picked.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex-1 h-2 rounded-full bg-zinc-800 overflow-hidden">
              <motion.div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600" animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 120, damping: 20 }} />
            </div>
            <span className="font-mono text-sm font-bold text-emerald-400 w-12 text-right">{pct}%</span>
          </div>
          <ul className="space-y-1.5">
            {results.map(({ k, hit }) => (
              <li key={k} className="flex gap-2 text-xs">
                {hit ? <Check size={14} className="text-emerald-500 flex-shrink-0 mt-0.5" /> : <X size={14} className="text-zinc-500 flex-shrink-0 mt-0.5" />}
                <span><span className={hit ? 'text-zinc-100 font-medium' : 'text-zinc-400'}>{k}</span> <span className="text-zinc-500">· {hit ? hit[1] : 'not on my resume yet, happy to learn'}</span></span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function CopySummary() {
  const [done, setDone] = useState(false);
  return (
    <button
      onClick={() => { void navigator.clipboard?.writeText(SUMMARY); setDone(true); play('success'); setTimeout(() => setDone(false), 1800); }}
      className="col-span-2 inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-md border border-zinc-700 text-zinc-200 text-sm hover:border-emerald-500"
    >
      {done ? <Check size={15} /> : <ClipboardCopy size={15} />} {done ? 'Summary copied' : 'Copy summary (for ATS / notes)'}
    </button>
  );
}
