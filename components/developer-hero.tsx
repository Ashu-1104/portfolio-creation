'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Mail, Terminal } from 'lucide-react';

const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

const headline = 'Ashutosh Tiwari.';

export function DeveloperHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="about" className="relative min-h-screen flex items-center justify-center pt-24 pb-32 px-6 bg-[#09090b] overflow-hidden">
      {/* faint schematic grid, anchors the "systems" feel without competing for attention */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="max-w-5xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-16 lg:gap-10 items-center">
          <div className="space-y-8">
            <div className="space-y-5">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="font-mono text-emerald-500 text-sm tracking-widest flex items-center gap-2"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                system.init() — available for new builds
              </motion.p>

              {/* Headline reveals through a wipe rather than a fade+slide — the one
                  orchestrated moment this page opens with. */}
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-100 overflow-hidden">
                <motion.span
                  className="block"
                  initial={reduceMotion ? false : { clipPath: 'inset(0 100% 0 0)' }}
                  animate={{ clipPath: 'inset(0 0% 0 0)' }}
                  transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1], delay: 0.15 }}
                >
                  {headline}
                </motion.span>
              </h1>

              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                className="text-2xl md:text-4xl font-semibold text-zinc-400"
              >
                Full-Stack Engineer & Linux Specialist.
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.85 }}
              className="text-zinc-400 text-lg max-w-xl leading-relaxed"
            >
              I specialize in engineering robust, high-performance systems and architecting scalable web applications. My approach focuses on building secure, efficient interfaces and developing end-to-end full-stack solutions with a commitment to technical excellence and reliability.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 1 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <a
                href="#projects"
                className="px-8 py-4 bg-emerald-500 text-zinc-950 font-bold rounded-md hover:bg-emerald-400 transition-colors flex items-center gap-2 group"
              >
                View Projects
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <div className="flex gap-4 items-center px-4">
                <a href="https://github.com/Ashu-1104" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-emerald-500 transition-colors">
                  <GithubIcon size={20} />
                </a>
                <a href="https://www.linkedin.com/in/ashutosh-tiwari-397206237" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-emerald-500 transition-colors">
                  <LinkedinIcon size={20} />
                </a>
                <a href="mailto:ashutoshtiwari110504@gmail.com" className="text-zinc-500 hover:text-emerald-500 transition-colors">
                  <Mail size={20} />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Portrait, framed like a system under active scan rather than a generic
              rounded-card headshot — ties back to his security/CTF background. */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:flex justify-center"
          >
            <div className="relative w-full max-w-[340px] -rotate-2">
              {/* rotating conic border, the single continuous-motion accent on the page */}
              <div className="absolute -inset-[3px] rounded-[28px] overflow-hidden">
                <div className="absolute inset-[-50%] animate-[spin_9s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,#10b981_25deg,transparent_70deg,transparent_360deg)]" />
              </div>

              <div
                className="relative bg-zinc-950 rounded-3xl overflow-hidden border border-zinc-900"
                style={{ clipPath: 'polygon(0 0, calc(100% - 28px) 0, 100% 28px, 100% 100%, 0 100%)' }}
              >
                <div className="relative aspect-[3/4]">
                  <Image
                    src="/profile.jpg"
                    alt="Ashutosh Tiwari"
                    fill
                    priority
                    className="object-cover grayscale-[15%] contrast-[1.05]"
                    sizes="340px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-zinc-950/20" />
                  {/* slow scanning sweep — reads as a system scan, not a hover gimmick */}
                  <div className="absolute inset-x-0 h-1/3 bg-gradient-to-b from-transparent via-emerald-400/10 to-transparent animate-[scan_6s_ease-in-out_infinite]" />
                </div>
              </div>

              {/* corner reticle brackets */}
              {[
                'top-0 left-0 border-t-2 border-l-2 rounded-tl-lg',
                'top-0 right-0 border-t-2 border-r-2 rounded-tr-lg',
                'bottom-0 left-0 border-b-2 border-l-2 rounded-bl-lg',
                'bottom-0 right-0 border-b-2 border-r-2 rounded-br-lg',
              ].map((pos, i) => (
                <span key={i} className={`absolute w-6 h-6 border-emerald-500/70 ${pos} -m-1.5`} />
              ))}
            </div>

            {/* floating terminal chip */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="absolute -bottom-6 -left-4 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 shadow-2xl font-mono text-xs w-[210px]"
              style={{ animation: 'float 4.5s ease-in-out infinite' }}
            >
              <div className="flex items-center gap-1.5 mb-2">
                <Terminal size={12} className="text-emerald-500" />
                <span className="text-zinc-600 text-[10px] tracking-widest uppercase">whoami</span>
              </div>
              <p className="text-zinc-300">Ashutosh Tiwari</p>
              <p className="text-zinc-600">Mumbai, India</p>
              <p className="text-emerald-500/80 mt-1">9.62 CGPA · top of dept.</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-600">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase">scroll</span>
        <span className="w-px h-8 bg-gradient-to-b from-emerald-500/70 to-transparent" style={{ animation: 'scroll-cue 2s ease-in-out infinite' }} />
      </div>
    </section>
  );
}
