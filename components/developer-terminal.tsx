'use client';

// A working terminal: visitors type commands (help, projects, skills...) and get
// answers. Supports history (up/down arrows) and Tab completion.
import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { RevealText } from './interactions';
import { play } from '@/lib/sound';

import { Heading3D } from './heading-3d';

type Line = { kind: 'in' | 'out'; content: ReactNode };

const link = (href: string, text: string) => (
  <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="text-emerald-400 underline underline-offset-2 hover:text-emerald-300">
    {text}
  </a>
);

const COMMANDS: Record<string, { help: string; run: () => ReactNode }> = {
  help: {
    help: 'list all commands',
    run: () => (
      <div className="grid grid-cols-[110px_1fr] gap-x-4">
        {Object.entries(COMMANDS).map(([name, c]) => (
          <div key={name} className="contents">
            <span className="text-emerald-400">{name}</span>
            <span className="text-zinc-500">{c.help}</span>
          </div>
        ))}
      </div>
    ),
  },
  whoami: { help: 'who I am', run: () => 'Ashutosh Tiwari: Full-Stack Developer in Mumbai. React, Next.js, TypeScript, Node.js. I build and manage SecLayer, a Linux server firewall, at Softaculous.' },
  experience: {
    help: 'where I have worked',
    run: () => (
      <ul className="space-y-1">
        <li><span className="text-emerald-400">2025 – now </span> Softaculous · PHP Developer (SecLayer, Webuzo)</li>
        <li><span className="text-emerald-400">2026       </span> Akobot.ai · Frontend Developer Intern</li>
        <li><span className="text-emerald-400">2024       </span> Talakunchi Network · Linux SysAdmin Intern</li>
      </ul>
    ),
  },
  projects: {
    help: 'things I have built',
    run: () => (
      <ul className="space-y-1">
        <li>{link('https://careerpilot-blush-eight.vercel.app', 'careerpilot')} · job portal with resume matching and live jobs</li>
        <li>{link('https://focushub-tawny.vercel.app', 'focushub')} · productivity workspace with real-time sync</li>
        <li>{link('https://checkmate-arena-bay.vercel.app', 'checkmate-arena')} · real-time multiplayer chess</li>
      </ul>
    ),
  },
  skills: { help: 'my tech stack', run: () => 'React · Next.js · TypeScript · Node.js · Express · MongoDB · PostgreSQL · MySQL · PHP · Perl · Python · Linux · Docker · Nginx · Three.js' },
  contact: {
    help: 'how to reach me',
    run: () => (
      <div className="space-y-1">
        <div>email    {link('mailto:ashutoshtiwari110504@gmail.com', 'ashutoshtiwari110504@gmail.com')}</div>
        <div>linkedin {link('https://www.linkedin.com/in/ashutosh-tiwari-397206237', 'ashutosh-tiwari')}</div>
        <div>github   {link('https://github.com/Ashu-1104', 'Ashu-1104')}</div>
      </div>
    ),
  },
  resume: {
    help: 'download my resume',
    run: () => {
      window.open('/Ashutosh_Tiwari_Resume.pdf', '_blank');
      return <>Opening resume... {link('/Ashutosh_Tiwari_Resume.pdf', 'Ashutosh_Tiwari_Resume.pdf')}</>;
    },
  },
  theme: {
    help: 'switch light / dark',
    run: () => {
      const light = document.documentElement.classList.toggle('light');
      try { localStorage.setItem('theme', light ? 'light' : 'dark'); } catch {}
      return `Theme set to ${light ? 'light' : 'dark'}.`;
    },
  },
  date: { help: 'current date and time', run: () => new Date().toString() },
  sudo: { help: 'try it', run: () => 'Nice try. This incident will be reported. 🙂' },
  chess: { help: 'play a game vs Stockfish', run: () => { window.dispatchEvent(new Event('open-chess')); return 'Opening the board... good luck!'; } },
  matrix: { help: '???', run: () => { window.dispatchEvent(new Event('matrix-mode')); return 'Entering the Matrix...'; } },
  clear: { help: 'clear the screen', run: () => null },
};

const WELCOME: Line[] = [{ kind: 'out', content: <>Welcome! Type <span className="text-emerald-400">help</span> to see what I can do.</> }];

export function DeveloperTerminal() {
  const [lines, setLines] = useState<Line[]>(WELCOME);
  const [value, setValue] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const input = useRef<HTMLInputElement>(null);
  const screen = useRef<HTMLDivElement>(null);
  const section = useRef<HTMLElement>(null);
  const touched = useRef(false);

  // idle demo: once the terminal is on screen, it types `help` by itself
  useEffect(() => {
    const el = section.current;
    if (!el) return;
    let timers: ReturnType<typeof setTimeout>[] = [];
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || touched.current) return;
      io.disconnect();
      const word = 'help';
      timers.push(setTimeout(() => {
        if (touched.current) return;
        [...word].forEach((ch, i) => timers.push(setTimeout(() => { if (touched.current) return; setValue(word.slice(0, i + 1)); }, i * 180)));
        timers.push(setTimeout(() => { if (touched.current) return; setValue(''); runRef.current?.(word); }, word.length * 180 + 250));
      }, 900));
    }, { threshold: 0.5 });
    io.observe(el);
    return () => { io.disconnect(); timers.forEach(clearTimeout); timers = []; };
  }, []);
  const runRef = useRef<((raw: string) => void) | null>(null);

  useEffect(() => {
    screen.current?.scrollTo({ top: screen.current.scrollHeight, behavior: 'smooth' });
  }, [lines]);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    setHistory((h) => [...h, cmd]);
    setCursor(-1);
    if (cmd === 'clear') return setLines([]);
    const found = COMMANDS[cmd];
    setLines((l) => [
      ...l,
      { kind: 'in', content: cmd },
      { kind: 'out', content: found ? found.run() : <>command not found: {cmd}. Type <span className="text-emerald-400">help</span>.</> },
    ]);
  };

  runRef.current = run;

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    play('key');
    touched.current = true;
    if (e.key === 'Enter') { run(value); setValue(''); }
    else if (e.key === 'ArrowUp' && history.length) {
      e.preventDefault();
      const next = cursor === -1 ? history.length - 1 : Math.max(0, cursor - 1);
      setCursor(next); setValue(history[next]);
    } else if (e.key === 'ArrowDown' && cursor !== -1) {
      e.preventDefault();
      const next = cursor + 1;
      if (next >= history.length) { setCursor(-1); setValue(''); } else { setCursor(next); setValue(history[next]); }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const match = Object.keys(COMMANDS).find((c) => value && c.startsWith(value.toLowerCase()));
      if (match) setValue(match);
    }
  };

  return (
    <section ref={section} id="terminal" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-4 mb-10">
          <h2 className="font-mono text-emerald-500 text-sm tracking-widest uppercase">./terminal</h2>
          <Heading3D className="text-4xl font-bold text-zinc-100"><RevealText text="Ask my terminal" /></Heading3D>
          <p className="text-zinc-400">Type a command and press Enter. Try <span className="font-mono text-emerald-500">help</span>, <span className="font-mono text-emerald-500">projects</span> or <span className="font-mono text-emerald-500">sudo</span>.</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onClick={() => input.current?.focus()}
          className="rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden font-mono text-sm cursor-text"
        >
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-zinc-800 bg-zinc-900/60">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="ml-3 text-[11px] text-zinc-500">ashutosh@portfolio: ~</span>
          </div>
          <div ref={screen} className="h-[340px] overflow-y-auto p-5 space-y-2 text-zinc-300" data-lenis-prevent>
            {lines.map((line, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }}>
                {line.kind === 'in' ? (
                  <span><span className="text-emerald-400">➜</span> <span className="text-sky-400">~</span> {line.content}</span>
                ) : (
                  <div className="text-zinc-400 leading-relaxed">{line.content}</div>
                )}
              </motion.div>
            ))}
            <label className="flex items-center gap-2">
              <span className="text-emerald-400">➜</span> <span className="text-sky-400">~</span>
              <input
                ref={input}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onKey}
                spellCheck={false}
                autoComplete="off"
                aria-label="Terminal command"
                className="flex-1 bg-transparent outline-none text-zinc-100 caret-emerald-400"
              />
            </label>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
