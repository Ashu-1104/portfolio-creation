'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { RevealText } from './interactions';
import { CertificateWall } from './certificate-wall';
import { Heading3D } from './heading-3d';
import { Globe, Database, Terminal, Box, Award, CheckCircle2 } from 'lucide-react';

const TechSphere = dynamic(() => import('./three/tech-sphere'), {
  ssr: false,
  loading: () => <div className="w-full h-full rounded-3xl skeleton-shimmer" />,
});

const skillCategories = [
  {
    title: 'Frontend Development',
    icon: <Globe size={20} className="text-emerald-500" />,
    skills: ['React', 'Next.js', 'TypeScript', 'Redux Toolkit', 'Tailwind CSS', 'Framer Motion', 'Three.js'],
    snippet: 'const ui = createComponent({ stack: "modern" });',
    usedIn: ['Akobot.ai platform frontend (Next.js 15)', 'CareerPilot, FocusHub, CheckMate Arena', 'SecLayer admin UI and docs site', 'This portfolio (Three.js, Framer Motion)'],
  },
  {
    title: 'Backend & Systems',
    icon: <Terminal size={20} className="text-emerald-500" />,
    skills: ['Node.js', 'Express', 'PHP', 'Perl', 'Python', 'REST APIs', 'Server-Sent Events', 'JWT Auth'],
    snippet: 'while(active) { handleRequest(new Logic()); }',
    usedIn: ['SecLayer firewall engine (Perl)', 'Webuzo hosting panel (PHP)', 'CareerPilot & FocusHub APIs (Node, Express)', 'Real-time updates with Server-Sent Events'],
  },
  {
    title: 'Data & Infrastructure',
    icon: <Database size={20} className="text-emerald-500" />,
    skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'Linux', 'Docker', 'Nginx / Apache', 'Vercel', 'GitHub Actions'],
    snippet: 'db.query("SELECT * FROM infrastructure;");',
    usedIn: ['MongoDB for CareerPilot and FocusHub', 'PostgreSQL for CheckMate Arena', 'MySQL in the Webuzo panel', 'Linux servers, Docker, Vercel deploys'],
  },
  {
    title: 'Specialized Expertise',
    icon: <Box size={20} className="text-emerald-500" />,
    skills: ['Firewalls (iptables / nftables)', 'Server Hardening', 'Intrusion Prevention', 'LLM Integration', 'Testing (Vitest)'],
    snippet: 'security.harden(system).ensure(ACID_COMPLIANCE);',
    usedIn: ['SecLayer firewall (iptables / nftables)', 'CTF platform at Talakunchi', 'AI cover letters in CareerPilot', '39 automated tests in FocusHub'],
  },
];

export function DeveloperSkills() {
  return (
    <section id="skills" className="py-24 px-6 relative overflow-hidden">
      {/* Decorative background grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="space-y-4">
            <h2 className="font-mono text-emerald-500 text-sm tracking-widest uppercase flex items-center gap-3">
              <span className="w-8 h-[1px] bg-emerald-500" />
              ./capabilities
            </h2>
            <Heading3D className="text-4xl font-bold text-zinc-100">
              <RevealText text="Technical Arsenal" />
            </Heading3D>
          </div>
        </div>

        {/* the whole stack on a 3D sphere */}
        <div className="relative mb-20 rounded-3xl border border-zinc-800 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.08),transparent_65%)] overflow-hidden">
          <div className="h-[380px] md:h-[460px]">
            <TechSphere />
          </div>
          <p className="absolute top-4 right-5 font-mono text-[10px] tracking-[0.3em] text-zinc-500 uppercase pointer-events-none pointer-coarse:hidden">
            drag to spin
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-32">
          {skillCategories.map((cat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flip-card group min-h-[300px]"
              tabIndex={0}
              onClick={(e) => e.currentTarget.classList.toggle('flipped')}
            >
              <div className="flip-inner relative h-full min-h-[300px]">
                {/* front: the skills */}
                <div className="flip-face spotlight absolute inset-0 p-8 bg-[var(--panel)] border border-zinc-800 rounded-2xl overflow-hidden">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl">
                      {cat.icon}
                    </div>
                    <h4 className="text-xl font-bold text-zinc-100">{cat.title}</h4>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8 relative z-10">
                    {cat.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-lg text-xs font-mono text-zinc-400"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="absolute bottom-6 left-8 right-8 pt-4 border-t border-zinc-800/50 flex justify-between items-center">
                    <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">{cat.skills.length} technologies</span>
                    <span className="font-mono text-[10px] text-emerald-500 uppercase tracking-widest flex-shrink-0 ml-3">where I&apos;ve used it ↻</span>
                  </div>
                </div>
                {/* back: where I have used them */}
                <div className="flip-face flip-back absolute inset-0 p-8 rounded-2xl border border-emerald-500/40 bg-[var(--panel)] overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.15),transparent_60%)]" />
                  <p className="relative font-mono text-[10px] text-emerald-500 uppercase tracking-widest mb-2">where I&apos;ve used it</p>
                  <h4 className="relative text-xl font-bold text-zinc-100 mb-6">{cat.title}</h4>
                  <ul className="relative space-y-3">
                    {cat.usedIn.map((item) => (
                      <li key={item} className="flex gap-3 text-sm text-zinc-300">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Credentials Section - Redesigned for High Fidelity */}
        <div className="relative pt-20">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
          
          <div className="mb-12">
            <h4 className="text-3xl font-bold text-zinc-100 mb-2">Education & Certificates</h4>
            <p className="text-zinc-500 text-sm">My degree and the courses I&apos;ve completed.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Academic Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-1 bg-gradient-to-br from-zinc-800 to-zinc-950 rounded-[2rem] overflow-hidden"
            >
              <div className="bg-[var(--page)] p-10 rounded-[1.8rem] h-full relative overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-12">
                    <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-500">
                      <Award size={32} />
                    </div>
                    <div className="px-4 py-1.5 bg-emerald-500 text-zinc-950 font-mono text-[10px] font-bold rounded-full tracking-widest">
                      2022 – 2025
                    </div>
                  </div>
                  
                  <h5 className="text-2xl font-bold text-zinc-100 mb-2">Mumbai University</h5>
                  <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest mb-6">Department of Information Technology</p>
                  
                  <div className="flex items-baseline gap-4 mb-6">
                    <span className="text-5xl font-black text-emerald-500 tracking-tighter">B.Sc. IT</span>
                  </div>
                  
                  <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
                    Bachelor of Science in Information Technology, with a focus on web development, networking and Linux systems.
                  </p>
                </div>

                <div className="mt-12 flex items-center gap-4 pt-8 border-t border-zinc-800/50">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-[var(--page)] bg-zinc-900 flex items-center justify-center">
                        <CheckCircle2 size={14} className="text-emerald-500" />
                      </div>
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Mumbai, India</span>
                </div>
              </div>
            </motion.div>

            {/* Certificates hanging on a wall */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="min-h-[360px]"
            >
              <CertificateWall />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
