'use client';

import { motion } from 'framer-motion';
import { Cpu, Globe, Database, Terminal, Shield, Zap } from 'lucide-react';

const skillCategories = [
  {
    title: 'Frontend Development',
    icon: <Globe size={20} className="text-emerald-500" />,
    skills: ['Next.js 15', 'React', 'TypeScript', 'Tailwind CSS', 'Alpine.js'],
  },
  {
    title: 'Backend & Systems',
    icon: <Terminal size={20} className="text-emerald-500" />,
    skills: ['PHP', 'Python (Django)', 'Node.js', 'C++', 'Shell Scripting'],
  },
  {
    title: 'Data & Infrastructure',
    icon: <Database size={20} className="text-emerald-500" />,
    skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'Linux (Debian/RHEL)', 'Docker'],
  },
  {
    title: 'Modern Architecture',
    icon: <Zap size={20} className="text-emerald-500" />,
    skills: ['AI Integration', 'LLM Streaming', 'SSR/ISR', 'Perf Optimization'],
  },
];

export function DeveloperSkills() {
  return (
    <section id="skills" className="py-24 px-6 bg-[#09090b]">
      <div className="max-w-5xl mx-auto">
        <div className="space-y-4 mb-16">
          <h2 className="font-mono text-emerald-500 text-sm tracking-widest uppercase">./skills</h2>
          <h3 className="text-4xl font-bold text-zinc-100">Technical Arsenal</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((cat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-8 bg-zinc-900/30 border border-zinc-800 rounded-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                {cat.icon}
                <h4 className="font-bold text-zinc-100">{cat.title}</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1.5 bg-zinc-950 border border-zinc-800 rounded-md text-xs font-mono text-zinc-400 hover:border-emerald-500/50 hover:text-emerald-500 transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certs & Achievement: Minimal Terminal Block */}
        <div className="mt-12 p-8 bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden relative">
          <div className="flex items-center gap-2 mb-6 font-mono text-xs text-zinc-600">
            <Shield size={14} />
            <span>CERTIFICATIONS_AND_ACHIEVEMENTS</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-8 font-mono text-xs">
            <div className="space-y-2">
              <p className="text-emerald-500 font-bold tracking-tight">🏆 Academic Excellence</p>
              <p className="text-zinc-500 leading-relaxed">Graduated with 9.62 CGPA, top-ranked in the department at Mumbai University</p>
            </div>
            <div className="space-y-2">
              <p className="text-emerald-500 font-bold tracking-tight">📜 Certifications</p>
              <p className="text-zinc-500 leading-relaxed">React.js (Scalar), Advanced Python (TuteDude), Core Python (GFG)</p>
            </div>
          </div>
          <div className="absolute right-0 bottom-0 p-4 opacity-5 pointer-events-none">
            <Cpu size={120} />
          </div>
        </div>
      </div>
    </section>
  );
}
