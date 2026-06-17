'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Terminal, Folder, ArrowUpRight } from 'lucide-react';

const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const projects = [
  {
    title: 'Nexus Bank',
    description: 'A secure full-stack banking portal with encrypted sessions and real-time ledger tracking. Features ACID-compliant transactions and a responsive dashboard.',
    tech: ['Next.js', 'PHP', 'PostgreSQL', 'REST API'],
    link: '#',
    github: 'https://github.com/Ashu-1104',
  },
  {
    title: 'TikTok Clone',
    description: 'Built a responsive streaming feed with lazy-loading and infinite scroll. Implemented video processing and follower-feeds using Django ORM.',
    tech: ['Django', 'Python', 'Tailwind CSS', 'PostgreSQL'],
    link: '#',
    github: 'https://github.com/Ashu-1104',
  },
  {
    title: 'Railway Ticket Reservation',
    description: 'Comprehensive reservation engine with automated coach allocation and dynamic AJAX UI. Focused on security with sanitized data layers.',
    tech: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
    link: '#',
    github: 'https://github.com/Ashu-1104',
  },
];

export function DeveloperProjects() {
  return (
    <section id="projects" className="py-24 px-6 bg-[#09090b]">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-end justify-between mb-16">
          <div className="space-y-4">
            <h2 className="font-mono text-emerald-500 text-sm tracking-widest uppercase">./projects</h2>
            <h3 className="text-4xl font-bold text-zinc-100">Featured Systems</h3>
          </div>
          <div className="hidden md:block h-[1px] flex-grow mx-8 bg-zinc-800 mb-2"></div>
          <a href="https://github.com/Ashu-1104" target="_blank" className="font-mono text-xs text-zinc-500 hover:text-emerald-500 transition-colors mb-2">
            VIEW_ALL_REPOS
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-zinc-900/50 border border-zinc-800 p-8 rounded-xl hover:bg-zinc-900 hover:border-emerald-500/30 transition-all"
            >
              <div className="flex justify-between items-start mb-8">
                <Folder className="text-emerald-500" size={40} strokeWidth={1.5} />
                <div className="flex gap-4 text-zinc-500">
                  <a href={project.github} target="_blank" className="hover:text-emerald-500 transition-colors">
                    <GithubIcon size={20} />
                  </a>
                  <a href={project.link} target="_blank" className="hover:text-emerald-500 transition-colors">
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>

              <h4 className="text-xl font-bold text-zinc-100 mb-3 group-hover:text-emerald-500 transition-colors">
                {project.title}
              </h4>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                {project.description}
              </p>

              <div className="mt-auto flex flex-wrap gap-x-4 gap-y-2">
                {project.tech.map((t, i) => (
                  <span key={i} className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
