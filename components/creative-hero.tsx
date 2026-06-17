'use client';

import { ArrowRight, Terminal, Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const GithubIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const LinkedinIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

export function CreativeHero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="about" className="min-h-screen flex items-center justify-center relative overflow-hidden py-32 px-6 dot-grid bg-background">
      {/* Dynamic Background Noise/Texture could go here */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none -z-10" />
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-24 items-center relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center animate-pulse">
                <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_#14b8a6]" />
              </div>
              <h2 className="text-xs uppercase tracking-[0.5em] text-primary font-black">System Ready</h2>
            </div>
            
            <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter leading-[0.8] mix-blend-difference">
              ASHU <br/>
              <span className="text-outline">TIWARI.</span>
            </h1>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-8">
            <p className="text-2xl md:text-3xl text-foreground font-medium leading-tight max-w-xl">
              <span className="text-primary font-black">Linux Engineer</span> & <br/>
              Creative Full-Stack Architect.
            </p>
            
            <p className="text-muted-foreground text-lg max-w-lg leading-relaxed">
              I build high-performance systems where <span className="text-foreground font-bold italic">kernel stability</span> meets <span className="text-foreground font-bold underline decoration-secondary/50">cutting-edge UX</span>. Specialized in Next.js 15, Scalable Microservices, and secure Debian/RHEL environments.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 pt-4">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05, rotate: -1 }}
              whileTap={{ scale: 0.98 }}
              className="px-12 py-6 bg-primary text-primary-foreground rounded-2xl font-black flex items-center justify-center gap-4 shadow-[0_20px_50px_rgba(20,184,166,0.3)] group overflow-hidden relative"
            >
              <span className="relative z-10">INITIALIZE WORK</span>
              <ArrowRight size={22} className="relative z-10 group-hover:translate-x-2 transition-transform" />
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </motion.a>
            
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.98 }}
              className="px-12 py-6 border-2 border-border hover:border-primary/50 text-foreground rounded-2xl font-black flex items-center justify-center gap-4 transition-all"
            >
              ESTABLISH CONNECTION
            </motion.a>
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-10 items-center pt-12 border-t border-border/20 w-fit">
            {[
              { icon: GithubIcon, href: 'https://github.com/Ashu-1104' },
              { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/ashutosh-tiwari-397206237' },
              { icon: Mail, href: 'mailto:ashutoshtiwari110504@gmail.com' }
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -8, scale: 1.2 }}
                className="text-muted-foreground hover:text-primary transition-all"
              >
                <social.icon size={28} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Floating Creative Element: Linux Terminal */}
        <motion.div 
          initial={{ opacity: 0, x: 100, rotateY: 30 }}
          animate={{ opacity: 1, x: 0, rotateY: -15 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="relative perspective-[1500px] hidden lg:block group"
        >
          <div className="w-full aspect-[4/3] bg-[#0c0c0e]/90 backdrop-blur-3xl border border-white/5 rounded-3xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden transition-transform duration-700 group-hover:rotate-y-0 group-hover:scale-105">
            <div className="h-10 bg-zinc-900/80 px-6 flex items-center justify-between border-b border-white/5">
              <div className="flex gap-2.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">ashu@root: /expertise</span>
              <Terminal size={14} className="text-zinc-500" />
            </div>
            
            <div className="p-8 font-mono text-sm space-y-6">
              <div className="flex gap-3">
                <span className="text-primary font-bold">➜</span>
                <span className="text-zinc-400">~</span>
                <span className="text-white">whoami</span>
              </div>
              <div className="text-emerald-400 pl-7 font-bold">
                Ashutosh Tiwari: Creative Engineer & Systems Architect
              </div>

              <div className="flex gap-3">
                <span className="text-primary font-bold">➜</span>
                <span className="text-zinc-400">~</span>
                <span className="text-white">neofetch --expertise</span>
              </div>
              <div className="pl-7 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 text-xs">
                <span className="text-primary font-bold">OS:</span> <span className="text-zinc-300">Debian 12 / RHEL 9</span>
                <span className="text-primary font-bold">KERNEL:</span> <span className="text-zinc-300">Custom Tuned 6.x</span>
                <span className="text-primary font-bold">STACK:</span> <span className="text-zinc-300">Next.js 15, PHP, Python, AI</span>
                <span className="text-primary font-bold">PERF:</span> <span className="text-zinc-300">Optimized for 99.9% Uptime</span>
                <span className="text-primary font-bold">SECURITY:</span> <span className="text-zinc-300">Hardened Server Architecture</span>
              </div>

              <div className="flex gap-3 pt-4">
                <span className="text-primary font-bold">➜</span>
                <span className="text-zinc-400">~</span>
                <span className="text-white flex items-center">
                  status.sh
                  <span className="ml-2 w-2 h-5 bg-primary animate-pulse" />
                </span>
              </div>
            </div>
          </div>
          
          {/* Decorative Glows */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px] -z-10 group-hover:bg-primary/30 transition-colors" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-secondary/20 rounded-full blur-[100px] -z-10 group-hover:bg-secondary/30 transition-colors" />
        </motion.div>
      </div>
    </section>
  );
}
