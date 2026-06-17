'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Terminal, ChevronRight, HardDrive, Cpu, Layers } from 'lucide-react';

const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

export function CreativeProjects() {
  const projects = [
    {
      id: '01',
      title: 'Nexus Bank',
      category: 'FINSEC / SYSTEMS',
      description: 'Encrypted core banking portal with real-time ledger consistency and ACID compliance.',
      tech: ['Next.js', 'PostgreSQL', 'PHP-Sec'],
      icon: <HardDrive className="text-primary" size={24} />,
    },
    {
      id: '02',
      title: 'Streamify Engine',
      category: 'PERFORMANCE / MEDIA',
      description: 'High-concurrency video delivery pipeline with automated lazy-loading and edge caching.',
      tech: ['React.js', 'Redis', 'AWS'],
      icon: <Cpu className="text-secondary" size={24} />,
    },
    {
      id: '03',
      title: 'Smart Rail Engine',
      category: 'LOGISTICS / AUTOMATION',
      description: 'Intelligent resource allocation system for high-load ticket reservation networks.',
      tech: ['PHP', 'MySQL', 'System-V'],
      icon: <Layers className="text-accent" size={24} />,
    },
  ];

  return (
    <section id="projects" className="py-32 px-6 bg-background relative dot-grid">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-xs uppercase tracking-[0.5em] text-primary font-bold mb-4">Repository</h2>
          <h3 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.8]">
            DEPLOYED <span className="text-outline">SYSTEMS.</span>
          </h3>
        </div>

        <div className="grid lg:grid-cols-3 gap-0 border-l border-t border-white/10">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-10 border-r border-b border-white/10 hover:bg-zinc-900/50 transition-colors relative overflow-hidden"
            >
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-12">
                  <span className="text-4xl font-black text-white/10 group-hover:text-primary/20 transition-colors">{project.id}</span>
                  <div className="p-3 bg-zinc-950 border border-white/5 rounded-xl">
                    {project.icon}
                  </div>
                </div>

                <div className="space-y-2 mb-8">
                  <span className="text-[10px] font-black tracking-[0.2em] text-primary">{project.category}</span>
                  <h4 className="text-3xl font-black tracking-tight">{project.title}</h4>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed mb-12 flex-grow">
                  {project.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex gap-2">
                    {project.tech.map(t => (
                      <span key={t} className="text-[9px] font-black uppercase text-zinc-500">{t}</span>
                    ))}
                  </div>
                  <motion.a 
                    whileHover={{ x: 5 }}
                    href="#" 
                    className="text-white hover:text-primary transition-colors"
                  >
                    <ChevronRight size={24} />
                  </motion.a>
                </div>
              </div>
              
              {/* Subtle background text */}
              <div className="absolute -bottom-4 -right-4 text-[8rem] font-black text-white/[0.02] pointer-events-none select-none">
                {project.id}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
