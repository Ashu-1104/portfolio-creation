'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useReducedMotion,
} from 'framer-motion';
import {
  ArrowDown,
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  Database,
  Github,
  Linkedin,
  Mail,
  Moon,
  ServerCog,
  ShieldCheck,
  Sparkles,
  Sun,
  Terminal,
  Zap,
} from 'lucide-react';

const projects = [
  {
    index: '01',
    title: 'Nexus Bank',
    type: 'Secure FinTech System',
    description:
      'A full-stack banking portal focused on encrypted sessions, ACID-compliant transactions, real-time ledger visibility, and resilient data flows.',
    stack: ['Next.js', 'PHP', 'PostgreSQL', 'REST'],
  },
  {
    index: '02',
    title: 'TikTok Clone',
    type: 'Streaming Platform',
    description:
      'A responsive short-video experience with lazy loading, infinite feeds, follower-aware content delivery, and Django-backed media workflows.',
    stack: ['Django', 'Python', 'PostgreSQL', 'Tailwind'],
  },
  {
    index: '03',
    title: 'Railway Reservation',
    type: 'Reservation Engine',
    description:
      'A complete ticket reservation engine with automated coach allocation, dynamic AJAX interactions, and defensive server-side data handling.',
    stack: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
  },
];

const experience = [
  {
    period: '2025 — NOW',
    company: 'Softaculous Ltd.',
    role: 'PHP Developer · Webuzo',
    copy: 'Leading SecLayer Firewall engineering while building server-side systems for hosting infrastructure and optimizing MySQL retrieval performance.',
  },
  {
    period: '2026',
    company: 'Akobot.ai',
    role: 'Frontend Developer · Intern',
    copy: 'Built modular Next.js and TypeScript interfaces, scalable component systems, and real-time product experiences with a strong focus on performance.',
  },
  {
    period: '2024',
    company: 'Talakunchi Network Pvt. Ltd.',
    role: 'Linux System Administrator · Intern',
    copy: 'Deployed and hardened Linux infrastructure, maintained Nginx/Apache services, and designed CTF challenges across web security and cryptography.',
  },
];

const skills = [
  ['Frontend', 'Next.js · React · TypeScript · Tailwind'],
  ['Backend', 'PHP · Python · Django · Node.js · C++'],
  ['Infra', 'Linux · Nginx · Apache · Shell · Git'],
  ['Data', 'MySQL · PostgreSQL · MongoDB'],
  ['Security', 'System Hardening · CTF · Network Security'],
  ['Architecture', 'REST APIs · Scalable UI · Full-stack systems'],
];

function ThemeToggle({ theme, setTheme }: { theme: 'dark' | 'light'; setTheme: (theme: 'dark' | 'light') => void }) {
  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="theme-toggle"
      aria-label="Toggle color theme"
    >
      <motion.span animate={{ rotate: theme === 'dark' ? 0 : 180 }} transition={{ type: 'spring', stiffness: 220, damping: 18 }}>
        {theme === 'dark' ? <Moon size={17} /> : <Sun size={17} />}
      </motion.span>
      <span>{theme === 'dark' ? 'Dark' : 'Light'}</span>
    </button>
  );
}

function MagneticLink({ href, children }: { href: string; children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 280, damping: 18 });
  const sy = useSpring(y, { stiffness: 280, damping: 18 });

  return (
    <motion.a
      href={href}
      style={{ x: sx, y: sy }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left - rect.width / 2) * 0.18);
        y.set((event.clientY - rect.top - rect.height / 2) * 0.18);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="magnetic-link"
    >
      {children}
    </motion.a>
  );
}

function AvatarStage() {
  const reduceMotion = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 110, damping: 18 });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [9, -9]), { stiffness: 110, damping: 18 });
  const glowX = useTransform(mx, [-0.5, 0.5], ['20%', '80%']);
  const glowY = useTransform(my, [-0.5, 0.5], ['20%', '80%']);

  return (
    <div
      className="avatar-shell"
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mx.set((event.clientX - rect.left) / rect.width - 0.5);
        my.set((event.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      <motion.div
        className="avatar-stage"
        style={reduceMotion ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
      >
        <motion.div className="avatar-glow" style={{ left: glowX, top: glowY }} />
        <div className="avatar-grid" />
        <div className="avatar-ring ring-one" />
        <div className="avatar-ring ring-two" />

        <div className="avatar-photo-wrap">
          <Image src="/profile.jpg" alt="Ashutosh Tiwari" fill priority className="avatar-photo" sizes="(max-width: 900px) 78vw, 380px" />
          <div className="avatar-shade" />
          <div className="avatar-scan" />
        </div>

        {['LINUX', 'NEXT.JS', 'SECURITY', 'SYSTEMS'].map((tag, i) => (
          <motion.div
            key={tag}
            className={`orbit-tag orbit-${i + 1}`}
            animate={reduceMotion ? undefined : { y: [0, -8, 0], rotate: [0, i % 2 ? -2 : 2, 0] }}
            transition={{ duration: 3.8 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
          >
            <span /> {tag}
          </motion.div>
        ))}

        <div className="avatar-console">
          <span className="console-dot" />
          <span>identity.resolve()</span>
          <strong>Ashutosh Tiwari</strong>
        </div>
      </motion.div>
    </div>
  );
}

export function CinematicPortfolio() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const heroY = useTransform(scrollYProgress, [0, 0.22], [0, 140]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0.2]);

  useEffect(() => {
    const saved = window.localStorage.getItem('portfolio-theme');
    const initial = saved === 'light' || saved === 'dark' ? saved : 'dark';
    setTheme(initial);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const nav = useMemo(() => ['Work', 'Experience', 'Stack', 'Contact'], []);

  return (
    <div className="portfolio-root">
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <div className="noise-layer" />
      <div className="ambient ambient-a" />
      <div className="ambient ambient-b" />

      <header className="site-header">
        <a href="#top" className="brand" aria-label="Ashutosh Tiwari home">
          <span className="brand-mark">AT</span>
          <span className="brand-copy"><strong>Ashutosh</strong><small>Software Engineer</small></span>
        </a>
        <nav className="desktop-nav">
          {nav.map((item) => <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>)}
        </nav>
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </header>

      <main id="top">
        <section className="hero-section">
          <motion.div className="hero-copy" style={{ y: heroY, opacity: heroOpacity }}>
            <motion.div
              className="availability-pill"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="pulse-dot" />
              Building secure products & internet-scale experiences
            </motion.div>

            <h1 className="hero-title">
              <span className="eyebrow">FULL-STACK · SYSTEMS · SECURITY</span>
              <motion.span
                className="title-line"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              >
                I engineer digital
              </motion.span>
              <motion.span
                className="title-line accent-line"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                systems with impact.
              </motion.span>
            </h1>

            <p className="hero-description">
              I’m Ashutosh Tiwari — a full-stack engineer and Linux specialist who enjoys the point where product design,
              backend architecture, infrastructure, and security all meet.
            </p>

            <div className="hero-actions">
              <MagneticLink href="#work">Explore my work <ArrowUpRight size={18} /></MagneticLink>
              <a href="mailto:ashutoshtiwari110504@gmail.com" className="text-link">Start a conversation <Mail size={16} /></a>
            </div>

            <div className="hero-meta">
              <span><strong>9.62</strong> CGPA · Mumbai University</span>
              <span><strong>20%</strong> lower retrieval latency via MySQL optimization</span>
              <span><strong>99.9%</strong> infrastructure uptime during Linux internship</span>
            </div>
          </motion.div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <AvatarStage />
          </motion.div>

          <a className="scroll-indicator" href="#work"><span>SCROLL TO EXPLORE</span><ArrowDown size={16} /></a>
        </section>

        <section className="marquee-band" aria-hidden="true">
          <div className="marquee-track">
            {[0, 1].map((copy) => (
              <div className="marquee-content" key={copy}>
                <span>FULL-STACK ENGINEERING</span><i>✦</i><span>LINUX SYSTEMS</span><i>✦</i><span>SECURITY</span><i>✦</i><span>PERFORMANCE</span><i>✦</i><span>AI-READY PRODUCTS</span><i>✦</i>
              </div>
            ))}
          </div>
        </section>

        <section id="work" className="section-shell work-section">
          <div className="section-heading">
            <div><span className="section-index">01 / SELECTED WORK</span><h2>Projects that think<br />like products.</h2></div>
            <p>Not just UI demos — systems shaped around data, performance, reliability, and real user flows.</p>
          </div>

          <div className="project-list">
            {projects.map((project, index) => (
              <motion.article
                key={project.title}
                className="project-card"
                initial={{ opacity: 0, y: 70 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.7, delay: index * 0.08 }}
                whileHover={{ y: -8 }}
              >
                <div className="project-topline"><span>{project.index}</span><span>{project.type}</span><ArrowUpRight size={22} /></div>
                <div className="project-visual">
                  <div className="project-orb" />
                  <div className="code-window">
                    <div className="code-head"><span /><span /><span /></div>
                    <code><em>const</em> build = {'{'}<br />&nbsp;&nbsp;security: <b>true</b>,<br />&nbsp;&nbsp;performance: <b>'measured'</b>,<br />&nbsp;&nbsp;scale: <b>'ready'</b><br />{'}'};</code>
                  </div>
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="stack-row">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
              </motion.article>
            ))}
          </div>
          <a href="https://github.com/Ashu-1104" target="_blank" rel="noreferrer" className="github-cta"><Github size={18} /> Explore GitHub <ArrowUpRight size={16} /></a>
        </section>

        <section id="experience" className="section-shell experience-section">
          <div className="section-heading compact">
            <div><span className="section-index">02 / EXPERIENCE</span><h2>Shipping across<br />the stack.</h2></div>
          </div>
          <div className="experience-list">
            {experience.map((item, i) => (
              <motion.article
                key={item.company}
                className="experience-row"
                initial={{ opacity: 0, x: i % 2 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="experience-period">{item.period}</span>
                <div><h3>{item.company}</h3><h4>{item.role}</h4></div>
                <p>{item.copy}</p>
                <BriefcaseBusiness size={20} />
              </motion.article>
            ))}
          </div>
        </section>

        <section id="stack" className="section-shell stack-section">
          <div className="section-heading">
            <div><span className="section-index">03 / CAPABILITIES</span><h2>Engineer first.<br />Tooling second.</h2></div>
            <p>My stack changes with the problem. The constant is how I think: secure defaults, measurable performance, maintainable architecture.</p>
          </div>
          <div className="capability-grid">
            {skills.map(([title, copy], i) => {
              const icons = [<Code2 key="c" />, <ServerCog key="s" />, <Terminal key="t" />, <Database key="d" />, <ShieldCheck key="sh" />, <Zap key="z" />];
              return (
                <motion.div key={title} className="capability-card" whileHover={{ scale: 1.025 }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                  <span className="cap-icon">{icons[i]}</span><small>0{i + 1}</small><h3>{title}</h3><p>{copy}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section className="credential-section">
          <motion.div className="credential-card" initial={{ scale: 0.95, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }}>
            <Sparkles size={28} />
            <span>ACADEMIC SIGNAL</span>
            <strong>9.62</strong>
            <h3>CGPA · Top of department</h3>
            <p>Mumbai University · Information Technology</p>
          </motion.div>
          <div className="credential-copy"><span className="section-index">BUILT ON CURIOSITY</span><h2>I like learning the layer beneath the layer.</h2><p>From UI architecture to Linux internals and security hardening, I build breadth without losing engineering depth.</p></div>
        </section>

        <section id="contact" className="contact-section">
          <span className="section-index">04 / LET'S BUILD</span>
          <motion.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            Have a hard problem?<br /><span>That’s the interesting part.</span>
          </motion.h2>
          <p>I’m open to software engineering, full-stack, systems, platform, and security-focused opportunities.</p>
          <div className="contact-actions">
            <MagneticLink href="mailto:ashutoshtiwari110504@gmail.com">ashutoshtiwari110504@gmail.com <ArrowUpRight size={18} /></MagneticLink>
            <div className="socials">
              <a href="https://github.com/Ashu-1104" target="_blank" rel="noreferrer"><Github /></a>
              <a href="https://www.linkedin.com/in/ashutosh-tiwari-397206237" target="_blank" rel="noreferrer"><Linkedin /></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer"><span>© 2026 Ashutosh Tiwari</span><span>Designed in code · Built for motion</span><a href="#top">Back to top ↑</a></footer>
    </div>
  );
}
