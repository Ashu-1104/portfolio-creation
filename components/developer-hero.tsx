'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Mail, Terminal } from 'lucide-react';

const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

export function DeveloperHero() {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center pt-20 pb-32 px-6 bg-[#09090b]">
      <div className="max-w-5xl mx-auto w-full">
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-mono text-emerald-500 text-sm tracking-widest"
              >
                system.init();
              </motion.p>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-100"
              >
                Ashutosh <span className="text-zinc-500">Tiwari.</span>
              </motion.h1>

              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl md:text-4xl font-semibold text-zinc-400"
              >
                Full-Stack Engineer & Linux Specialist.
              </motion.h2>
            </div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-zinc-400 text-lg max-w-xl leading-relaxed"
            >
              I specialize in engineering robust, high-performance systems and architecting scalable web applications. My approach focuses on building secure, efficient interfaces and developing end-to-end full-stack solutions with a commitment to technical excellence and reliability.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
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

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative hidden lg:block"
          >
            <div className="w-full aspect-square max-w-[400px] bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
              <div className="h-10 bg-zinc-950 px-4 flex items-center justify-between border-b border-zinc-800">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                </div>
                <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">profile.sh</span>
                <Terminal size={12} className="text-zinc-600" />
              </div>
              <div className="p-6 font-mono text-sm space-y-4">
                <div className="flex gap-2">
                  <span className="text-emerald-500">➜</span>
                  <span className="text-zinc-300">whoami</span>
                </div>
                <div className="text-zinc-500 pl-4">
                  Ashutosh Tiwari<br/>
                  Mumbai, India
                </div>
                <div className="flex gap-2">
                  <span className="text-emerald-500">➜</span>
                  <span className="text-zinc-300">ls expertise/</span>
                </div>
                <div className="grid grid-cols-2 gap-2 pl-4 text-xs text-zinc-400">
                  <span>• Next.js 15</span>
                  <span>• PHP / MySQL</span>
                  <span>• Linux / Bash</span>
                  <span>• TypeScript</span>
                  <span>• Git / GitHub</span>
                  <span>• REST APIs</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-emerald-500">➜</span>
                  <span className="text-zinc-300">uptime</span>
                </div>
                <div className="text-emerald-500/80 pl-4 text-xs">
                  9.62 CGPA (Mumbai Univ)<br/>
                  99.9% Project Reliability
                </div>
                <div className="pt-2 flex gap-1 items-center">
                  <span className="w-2 h-4 bg-emerald-500 animate-pulse" />
                </div>
              </div>
            </div>
            <div className="absolute -inset-4 bg-emerald-500/5 blur-3xl rounded-full -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
