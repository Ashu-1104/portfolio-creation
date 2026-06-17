'use client';

import { motion } from 'framer-motion';
import { Terminal, Cpu, Shield, Globe, Calendar, Briefcase, Activity } from 'lucide-react';

export function CreativeExperience() {
  const experiences = [
    {
      company: 'Softaculous Ltd.',
      role: 'PHP Developer (Webuzo)',
      period: 'JULY 2026 – PRESENT',
      type: 'SYSTEMS',
      desc: 'Developing high-performance server-side logic for the Webuzo hosting panel. Query optimization and firewall management.',
    },
    {
      company: 'Akobot.ai',
      role: 'Frontend Developer (Intern)',
      period: 'JAN 2026 – JUN 2026',
      type: 'ARCH',
      desc: 'Architecting SEO-optimized structures with Next.js 15. Integrating real-time AI-driven interfaces.',
    },
    {
      company: 'Talakunchi Network',
      role: 'Linux Admin (Intern)',
      period: 'FEB 2024 – JUNE 2024',
      type: 'INFRA',
      desc: 'Managing Debian servers and architecting CTF security challenges. 99.9% uptime enforcement.',
    },
  ];

  return (
    <section id="experience" className="py-32 px-6 bg-[#050505] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xs uppercase tracking-[0.5em] text-primary font-bold mb-4">Timeline</h2>
            <h3 className="text-5xl md:text-[8rem] font-black tracking-tighter leading-[0.8] uppercase">
              OPS <span className="text-outline">HISTORY.</span>
            </h3>
          </motion.div>
          
          <div className="flex items-center gap-4 text-xs font-black tracking-widest text-zinc-500 uppercase">
             <Activity size={16} className="text-primary animate-pulse" />
             LIVE SYSTEM LOG
          </div>
        </div>

        <div className="space-y-4">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group grid md:grid-cols-[1fr_2.5fr_0.5fr] gap-8 p-8 md:p-12 bg-zinc-900/20 border border-white/5 hover:border-primary/30 transition-all rounded-[2rem] relative overflow-hidden"
            >
              <div className="space-y-2 relative z-10">
                <div className="text-primary font-black text-xs tracking-widest uppercase">{exp.period}</div>
                <div className="text-3xl font-black text-white">{exp.company}</div>
              </div>

              <div className="space-y-4 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-black text-zinc-400 uppercase tracking-widest">
                    {exp.type}
                  </div>
                  <h4 className="text-xl font-bold text-zinc-300">{exp.role}</h4>
                </div>
                <p className="text-muted-foreground text-sm max-w-xl leading-relaxed">
                  {exp.desc}
                </p>
              </div>

              <div className="hidden md:flex flex-col items-end justify-center relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-zinc-950 border border-white/5 flex items-center justify-center text-zinc-600 group-hover:text-primary transition-colors">
                  <ChevronRight size={24} />
                </div>
              </div>

              {/* Decorative side number */}
              <div className="absolute right-10 top-1/2 -translate-y-1/2 text-[6rem] font-black text-white/[0.01] pointer-events-none group-hover:text-primary/[0.02] transition-colors">
                0{index + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ChevronRight({ size, className }: { size?: number, className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size || 24} 
      height={size || 24} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}
