'use client';

import { motion } from 'framer-motion';
import { Cpu, Globe, Database, Terminal, Shield, Zap, Box } from 'lucide-react';

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
    skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'Linux (Debian/RHEL)'],
  },
  {
    title: 'Specialized Expertise',
    icon: <Box size={20} className="text-emerald-500" />,
    skills: ['System Hardening', 'API Architecture', 'Network Security', 'CTF Design'],
  },
];

export function DeveloperSkills() {
  return (
    <section id="skills" className="py-24 px-6 bg-[#09090b] relative">
       {/* Decorative horizontal lines */}
       <div className="absolute left-0 right-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
       
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <h2 className="font-mono text-emerald-500 text-sm tracking-widest uppercase flex items-center gap-2">
              <span className="w-8 h-[1px] bg-emerald-500" />
              ./skills
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-zinc-100 tracking-tight">Technical Arsenal</h3>
          </div>
          <p className="text-zinc-500 font-mono text-xs max-w-xs md:text-right leading-relaxed">
            SYSTEM_CAPABILITIES_MANIFEST v2.0 // OPTIMIZED_FOR_RELIABILITY
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((cat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 bg-[#0c0c0e] border border-zinc-800 rounded-lg group hover:border-emerald-500/30 transition-all relative overflow-hidden"
            >
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="p-2 bg-zinc-900 border border-zinc-800 rounded group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20 transition-colors">
                  {cat.icon}
                </div>
                <h4 className="font-bold text-zinc-100 group-hover:text-emerald-500 transition-colors">{cat.title}</h4>
              </div>
              <div className="flex flex-wrap gap-2 relative z-10">
                {cat.skills.map((skill, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1.5 bg-zinc-900/50 border border-zinc-800 rounded text-[11px] font-mono text-zinc-400 group-hover:text-zinc-200 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>

        {/* Certs & Achievement: Coder Minimalist Block */}
        <div className="mt-12 p-8 bg-[#0c0c0e] border border-zinc-800 rounded-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
          
          <div className="flex items-center gap-2 mb-8 font-mono text-[10px] text-zinc-500 uppercase tracking-[0.3em]">
            <Shield size={14} className="text-emerald-500" />
            <span>VERIFIED_CREDENTIALS</span>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-12 font-mono">
            <div className="space-y-3">
              <p className="text-emerald-500 font-bold text-xs">01 // ACADEMIC_EXCELLENCE</p>
              <div className="pl-4 border-l border-zinc-800">
                <p className="text-zinc-100 text-sm font-bold">9.62 CGPA Distinction</p>
                <p className="text-zinc-500 text-[11px] leading-relaxed mt-1">Top-ranked in department @ Mumbai University</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <p className="text-emerald-500 font-bold text-xs">02 // CERTIFICATIONS</p>
              <div className="pl-4 border-l border-zinc-800">
                <p className="text-zinc-100 text-sm font-bold">React.js, Advanced Python</p>
                <p className="text-zinc-500 text-[11px] leading-relaxed mt-1">Verified by Scalar, TuteDude, and GeeksforGeeks</p>
              </div>
            </div>
          </div>

          <div className="absolute -right-12 -bottom-12 opacity-[0.02] pointer-events-none">
            <Cpu size={200} />
          </div>
        </div>
      </div>
    </section>
  );
}
