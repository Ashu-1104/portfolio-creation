'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Magnetic, RevealText } from './interactions';
import { Heading3D } from './heading-3d';
import { TiltCard } from './tilt-card';
import { ArrowUpRight, BookOpen, Check, ExternalLink, X } from 'lucide-react';
import { play } from '@/lib/sound';
import { useOverlay } from '@/lib/overlay';

const slug = (title: string) => 'project-' + title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const projects = [
  {
    title: 'CareerPilot',
    tagline: 'Job portal for India',
    image: '/projects/careerpilot.webp',
    description: 'A full-stack job portal that pulls live jobs every day and tells you how well your resume fits each one.',
    features: [
      'Daily import of live jobs from company career pages (Greenhouse, Lever) and remote job boards',
      'Resume match score on every job, plus AI-written cover letters',
      'Application tracker (kanban), employer chat and interview scheduling',
      'Live notifications over Server-Sent Events; private, role-based resume access',
    ],
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Vercel'],
    link: 'https://careerpilot-blush-eight.vercel.app',
    github: 'https://github.com/Ashu-1104/CareerPilot',
    caseStudy: {
      problem: 'Job hunting in India means checking dozens of company career pages and guessing whether your resume is a good fit for each role.',
      flow: ['React + Vite UI', 'Express API on Vercel', 'MongoDB Atlas'],
      extras: ['Daily cron → Greenhouse & Lever job import', 'Server-Sent Events → live notifications', 'OpenAI-compatible API → cover letters'],
      challenges: [
        'Normalising jobs from different sources into one format and removing duplicates.',
        'Keeping uploaded resumes private on serverless hosting: files live in MongoDB and are served only through an authenticated route.',
        'Real-time notifications without WebSockets on serverless, using Server-Sent Events.',
      ],
      results: ['Live on Vercel with a daily job import', '65 end-to-end API checks covering every feature', 'Resume match score on every job listing'],
    },
  },
  {
    title: 'FocusHub',
    tagline: 'Productivity workspace',
    image: '/projects/focushub.webp',
    description: 'A productivity workspace for tasks, focus sessions and habits that stays in sync across all your devices.',
    features: [
      'Drag-and-drop task calendar, recurring tasks and in-app reminders',
      'Real-time sync across devices with Server-Sent Events',
      'Analytics dashboard with charts, streaks and insights',
      '39 automated tests (Vitest, Supertest) with GitHub Actions CI',
    ],
    tech: ['React', 'Redux Toolkit', 'Node.js', 'Express', 'MongoDB', 'Recharts'],
    link: 'https://focushub-tawny.vercel.app',
    github: 'https://github.com/Ashu-1104/focushub',
    caseStudy: {
      problem: 'Tasks, reminders and focus time were spread across different apps and devices, and changes on one device did not show up on another.',
      flow: ['React + Redux Toolkit', 'Express API (JWT)', 'MongoDB Atlas'],
      extras: ['Server-Sent Events → instant sync on every device', 'Recharts → analytics and streaks', 'GitHub Actions → tests on every push'],
      challenges: [
        'Syncing changes to every open device in real time while keeping Redux state consistent.',
        'Recurring tasks and reminders that behave correctly across days and time zones.',
        'A drag-and-drop calendar that stays fast with many tasks.',
      ],
      results: ['39 automated tests (Vitest, Supertest) in CI', 'Deployed on Vercel with MongoDB Atlas', 'Real-time sync across devices'],
    },
  },
  {
    title: 'CheckMate Arena',
    tagline: 'Real-time multiplayer chess',
    image: '/projects/checkmate.webp',
    description: 'Play chess with anyone through a link, or against the computer, with live clocks and ratings.',
    features: [
      'Server-synced chess clocks, Elo ratings and a leaderboard',
      'Stockfish (WebAssembly) computer opponent',
      'Real-time play over HTTP actions and Server-Sent Events, with row-locked game state in PostgreSQL',
      'Serverless hosting on Vercel; 25 tests with CI',
    ],
    tech: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Vercel'],
    link: 'https://checkmate-arena-bay.vercel.app',
    github: 'https://github.com/Ashu-1104/checkmate-arena',
    caseStudy: {
      problem: 'Playing chess with a friend should take one link, with fair clocks and ratings, and it has to run on serverless hosting.',
      flow: ['Next.js + TypeScript', 'HTTP move actions', 'PostgreSQL (row-locked games)'],
      extras: ['Server-Sent Events → both players see moves instantly', 'Stockfish WebAssembly worker → computer opponent', 'Elo engine → ratings and leaderboard'],
      challenges: [
        'Socket.IO does not work on serverless functions, so real-time play was re-architected to HTTP actions plus Server-Sent Events.',
        'Server-synced clocks, so neither player can gain time by lagging.',
        'Simultaneous moves handled safely with row locks in PostgreSQL.',
      ],
      results: ['25 tests with CI', 'Live multiplayer on Vercel', 'Elo ratings and a leaderboard'],
    },
  },
];

// screenshot that drifts slightly inside its frame while the page scrolls
// swings the showcase in 3D while it scrolls past: angled as it enters,
// straight in the middle of the screen, easing the other way as it leaves
function ScrollSwing({ dir, children }: { dir: number; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], reduce ? [0, 0, 0] : [dir * 24, 0, -dir * 10]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], reduce ? [0, 0, 0] : [12, 0, -6]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], reduce ? [1, 1, 1] : [0.9, 1, 0.96]);
  return (
    <motion.div ref={ref} style={{ rotateY, rotateX, scale, transformPerspective: 1600, transformStyle: 'preserve-3d' }}>
      {children}
    </motion.div>
  );
}

function ParallaxShot({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-4%', '4%']);
  return (
    <div ref={ref} className="overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        width={1280}
        height={800}
        style={{ y, scale: 1.1 }}
        className="w-full h-auto"
      />
    </div>
  );
}

export function DeveloperProjects() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="projects" className="py-24 px-6 overflow-x-clip">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-20">
          <div className="space-y-4">
            <h2 className="font-mono text-emerald-500 text-sm tracking-widest uppercase">./projects</h2>
            <Heading3D className="text-4xl font-bold text-zinc-100"><RevealText text="Featured Systems" /></Heading3D>
          </div>
          <div className="hidden md:block h-[1px] flex-grow mx-8 bg-zinc-800 mb-2"></div>
          <a href="https://github.com/Ashu-1104" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-zinc-500 hover:text-emerald-500 transition-colors mb-2">
            VIEW_ALL_REPOS
          </a>
        </div>

        <div className="space-y-28">
          {projects.map((project, index) => {
            const flip = index % 2 === 1;
            return (
              <motion.article
                key={project.title}
                id={slug(project.title)}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="grid lg:grid-cols-12 gap-10 items-center"
              >
                {/* screenshot in a browser frame */}
                <button
                  type="button"
                  onClick={() => { setOpen(index); play('open'); }}
                  className={`block w-full text-left lg:col-span-7 ${flip ? 'lg:order-2' : ''}`}
                  aria-label={`Open ${project.title} case study`}
                  data-cursor
                >
                  <ScrollSwing dir={flip ? -1 : 1}>
                    <TiltCard className="group">
                      {/* glow plate behind the window */}
                      <span
                        className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.28),transparent_70%)] blur-2xl opacity-60 group-hover:opacity-100 transition-opacity"
                        style={{ transform: 'translateZ(-60px)' }}
                      />
                      {/* the browser window */}
                      <motion.div
                        layoutId={`shot-${slug(project.title)}`}
                        style={{ opacity: open === index ? 0 : 1 }}
                        className="relative rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden shadow-2xl group-hover:border-emerald-500/40 transition-colors"
                      >
                        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-zinc-800 bg-zinc-950">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                          <span className="ml-3 flex-1 truncate rounded-md bg-zinc-900 px-3 py-1 font-mono text-[10px] text-zinc-500">{project.link.replace('https://', '')}</span>
                        </div>
                        <ParallaxShot src={project.image} alt={`${project.title} screenshot`} />
                        <span className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-colors">
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500 text-zinc-950 font-bold text-sm"><BookOpen size={15} /> Read case study</span>
                        </span>
                      </motion.div>
                      {/* floating layers at different depths: they separate when the card tilts */}
                      <span
                        className={`absolute -top-5 ${flip ? 'right-2 lg:-right-3' : 'left-2 lg:-left-3'} font-black text-6xl md:text-7xl text-transparent [-webkit-text-stroke:1.5px_rgb(16_185_129/0.7)] select-none pointer-events-none`}
                        style={{ transform: 'translateZ(90px)' }}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={`absolute top-14 ${flip ? 'left-2 lg:-left-4' : 'right-2 lg:-right-4'} inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--panel)] border border-emerald-500/40 shadow-xl font-mono text-[11px] text-zinc-200`}
                        style={{ transform: 'translateZ(70px)' }}
                      >
                        <span className="relative flex w-2 h-2"><span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-70" /><span className="relative w-2 h-2 rounded-full bg-emerald-500" /></span>
                        Live
                      </span>
                      <span
                        className={`absolute -bottom-5 ${flip ? 'left-8' : 'right-8'} hidden sm:inline-flex gap-1.5 px-3 py-2 rounded-xl bg-[var(--panel)] border border-zinc-800 shadow-xl`}
                        style={{ transform: 'translateZ(110px)' }}
                      >
                        {project.tech.slice(0, 3).map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-mono text-[10px] uppercase">{t}</span>
                        ))}
                      </span>
                    </TiltCard>
                  </ScrollSwing>
                </button>

                <div className={`lg:col-span-5 ${flip ? 'lg:order-1' : ''}`}>
                  <p className="font-mono text-emerald-500 text-xs tracking-widest uppercase mb-3">
                    {String(index + 1).padStart(2, '0')} · {project.tagline}
                  </p>
                  <h4 className="text-3xl font-bold text-zinc-100 mb-4">{project.title}</h4>
                  <p className="text-zinc-400 leading-relaxed mb-6">{project.description}</p>

                  <ul className="space-y-2.5 mb-6">
                    {project.features.map((feature) => (
                      <li key={feature} className="flex gap-3 text-sm text-zinc-400 leading-relaxed">
                        <Check size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map((t) => (
                      <span key={t} className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded text-[10px] font-mono text-zinc-500 uppercase">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Magnetic>
                    <button
                      type="button"
                      onClick={() => { setOpen(index); play('open'); }}
                      className="px-5 py-2.5 border border-emerald-500/50 text-emerald-500 font-bold rounded-md hover:bg-emerald-500/10 transition-colors flex items-center gap-2 text-sm"
                    >
                      <BookOpen size={15} /> Case study
                    </button>
                    </Magnetic>
                    <Magnetic>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 bg-emerald-500 text-zinc-950 font-bold rounded-md hover:bg-emerald-400 transition-colors flex items-center gap-2 text-sm"
                    >
                      Live demo <ExternalLink size={15} />
                    </a>
                    </Magnetic>
                    <Magnetic>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 border border-zinc-700 text-zinc-200 font-bold rounded-md hover:border-emerald-500 hover:text-emerald-400 transition-colors flex items-center gap-2 text-sm"
                    >
                      <GithubIcon size={15} /> Source <ArrowUpRight size={14} />
                    </a>
                    </Magnetic>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
      <CaseStudy project={open === null ? null : projects[open]} onClose={() => setOpen(null)} />
    </section>
  );
}

type Project = (typeof projects)[number];

// full-screen case study; its screenshot morphs out of the project card
function CaseStudy({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  useOverlay('case-study', !!project, onClose);
  if (!mounted) return null;
  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          key="case" className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md overflow-y-auto overscroll-contain" data-lenis-prevent
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
        >
          <div className="min-h-full flex items-start justify-center p-4 md:p-10">
            <div className="relative w-full max-w-4xl rounded-2xl border border-zinc-800 bg-[var(--panel)] shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()} role="dialog" aria-label={`${project.title} case study`}>
              <button onClick={onClose} aria-label="Close case study" className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-emerald-500 hover:text-zinc-950 transition-colors"><X size={17} /></button>
              <motion.div layoutId={`shot-${slug(project.title)}`} className="relative overflow-hidden border-b border-zinc-800" transition={{ type: 'spring', stiffness: 160, damping: 24 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={project.image} alt={`${project.title} screenshot`} className="w-full h-auto" />
                <span className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--panel)] to-transparent" />
              </motion.div>
              <motion.div className="p-6 md:p-10 -mt-14 relative" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.25 } }} exit={{ opacity: 0 }}>
                <p className="font-mono text-emerald-500 text-xs tracking-widest uppercase mb-2">case study · {project.tagline}</p>
                <h3 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-6">{project.title}</h3>

                <h4 className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-2">The problem</h4>
                <p className="text-zinc-300 leading-relaxed mb-8">{project.caseStudy.problem}</p>

                <h4 className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-3">What I built</h4>
                <ul className="grid md:grid-cols-2 gap-2.5 mb-8">
                  {project.features.map((f) => (
                    <li key={f} className="flex gap-3 text-sm text-zinc-400"><Check size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />{f}</li>
                  ))}
                </ul>

                <h4 className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-3">Architecture</h4>
                <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-5 mb-8">
                  <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
                    {project.caseStudy.flow.map((node, n) => (
                      <div key={node} className="contents">
                        <motion.div
                          className="flex-1 text-center px-4 py-3 rounded-lg border border-emerald-500/40 bg-emerald-500/5 font-mono text-xs text-zinc-200"
                          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.4 + n * 0.15 } }}
                        >
                          {node}
                        </motion.div>
                        {n < project.caseStudy.flow.length - 1 && (
                          <span className="case-arrow self-center text-emerald-500 font-mono" aria-hidden="true">→</span>
                        )}
                      </div>
                    ))}
                  </div>
                  <ul className="mt-4 grid md:grid-cols-3 gap-2">
                    {project.caseStudy.extras.map((x) => (
                      <li key={x} className="px-3 py-2 rounded-lg border border-zinc-800 font-mono text-[11px] text-zinc-400">{x}</li>
                    ))}
                  </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-3">Challenges</h4>
                    <ul className="space-y-2.5">
                      {project.caseStudy.challenges.map((c) => (
                        <li key={c} className="flex gap-3 text-sm text-zinc-400"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />{c}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-3">Results</h4>
                    <ul className="space-y-2.5">
                      {project.caseStudy.results.map((r) => (
                        <li key={r} className="flex gap-3 text-sm text-zinc-300"><Check size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />{r}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((t) => (
                    <span key={t} className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded text-[10px] font-mono text-zinc-500 uppercase">{t}</span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-emerald-500 text-zinc-950 font-bold rounded-md hover:bg-emerald-400 transition-colors flex items-center gap-2 text-sm">Live demo <ExternalLink size={15} /></a>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 border border-zinc-700 text-zinc-200 font-bold rounded-md hover:border-emerald-500 hover:text-emerald-400 transition-colors flex items-center gap-2 text-sm"><GithubIcon size={15} /> Source <ArrowUpRight size={14} /></a>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
