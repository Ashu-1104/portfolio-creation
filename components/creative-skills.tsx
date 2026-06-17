'use client';

import { motion } from 'framer-motion';
import { Terminal, Shield, Cpu, Zap, Globe, Database, Award, Activity, Search, Code, Server, Lock } from 'lucide-react';

export function CreativeSkills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  return (
    <section id="skills" className="py-32 px-6 bg-[#050505] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-xs uppercase tracking-[0.5em] text-primary font-bold">Capabilities</h2>
            <h3 className="text-5xl md:text-7xl font-black tracking-tighter">
              SYSTEM <span className="text-outline">MANIFESTO.</span>
            </h3>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-muted-foreground max-w-sm text-sm font-medium leading-relaxed"
          >
            A technical arsenal built on performance, security, and unconventional engineering logic.
          </motion.p>
        </div>

        {/* Bento Grid Layout */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          {/* Main Linux & Infrastructure Block (Large) */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-4 lg:col-span-3 lg:row-span-2 p-10 bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] relative overflow-hidden group"
          >
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center mb-8 text-primary group-hover:scale-110 transition-transform duration-500">
                  <Terminal size={32} />
                </div>
                <h4 className="text-3xl font-black mb-4">Linux Systems & <br/>Core Infrastructure</h4>
                <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-xs">
                  Expert-level management of Debian, RHEL, and Ubuntu environments. Specialized in kernel optimization and server-side automation.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Kernel Tuning', 'Bash Scripting', 'Nginx/Apache', 'SSH Hardening', 'Process Mgmt'].map(s => (
                    <span key={s} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-zinc-400">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-12 flex items-center gap-4 text-xs font-black text-primary uppercase tracking-[0.2em]">
                <Activity size={16} />
                99.9% SYSTEM UPTIME LOGIC
              </div>
            </div>
            {/* Decorative Grid or Graph */}
            <div className="absolute top-1/2 -right-10 -translate-y-1/2 opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none">
              <Server size={300} strokeWidth={0.5} />
            </div>
          </motion.div>

          {/* Full-Stack Architecture (Medium) */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-2 lg:col-span-3 p-10 bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] group"
          >
            <div className="flex items-start justify-between mb-8">
              <div className="w-12 h-12 rounded-xl bg-secondary/20 border border-secondary/30 flex items-center justify-center text-secondary group-hover:rotate-12 transition-transform">
                <Globe size={24} />
              </div>
              <div className="text-right">
                <span className="text-[10px] font-black text-zinc-500 tracking-widest uppercase">Front-to-Back</span>
              </div>
            </div>
            <h4 className="text-2xl font-bold mb-4">Full-Stack Architecture</h4>
            <p className="text-muted-foreground text-sm mb-6">
              Engineering modular UIs with Next.js 15 and robust backends in PHP/Python. Focused on type-safety and AI-driven features.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Next.js 15', 'React', 'PHP', 'Python', 'AI Integration'].map(s => (
                <span key={s} className="px-3 py-1 bg-secondary/10 text-secondary border border-secondary/20 rounded-full text-[10px] font-bold">
                  {s}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Security (Small/Square) */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-2 lg:col-span-2 p-8 bg-[#0a0a0c] border border-white/5 rounded-[2.5rem] group relative overflow-hidden"
          >
            <div className="relative z-10">
              <Lock size={20} className="text-emerald-400 mb-6 group-hover:scale-125 transition-transform" />
              <h4 className="text-xl font-bold mb-2">Hardened Security</h4>
              <p className="text-zinc-500 text-xs leading-relaxed">
                Implementation of SecLayer firewalls and encrypted data layers.
              </p>
            </div>
            <div className="absolute -bottom-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Shield size={100} />
            </div>
          </motion.div>

          {/* Academic Distinction (Landscape) */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="md:col-span-2 lg:col-span-1 p-8 bg-primary text-primary-foreground rounded-[2.5rem] flex flex-col justify-between"
          >
            <Award size={32} className="opacity-50" />
            <div>
              <div className="text-3xl font-black">9.62</div>
              <div className="text-[10px] font-black uppercase tracking-tighter opacity-80 leading-tight">CGPA Distinction</div>
            </div>
          </motion.div>

          {/* Database (Landscape) */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-2 lg:col-span-3 p-10 bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] flex items-center gap-8 group"
          >
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-zinc-700 flex items-center justify-center group-hover:border-primary/50 transition-colors">
              <Database size={24} className="text-zinc-500 group-hover:text-primary" />
            </div>
            <div>
              <h4 className="text-lg font-bold mb-1">Database Mastery</h4>
              <div className="flex gap-4 text-xs font-black text-zinc-500 uppercase tracking-widest">
                <span>PostgreSQL</span>
                <span>MySQL</span>
                <span>Redis</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
