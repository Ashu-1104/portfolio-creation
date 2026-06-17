'use client';

import { motion } from 'framer-motion';
import { Cpu, Globe, Database, Terminal, Shield, Box, Award, CheckCircle2 } from 'lucide-react';

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
    skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'Linux (Debian/RHEL)', 'Git'],
  },
  {
    title: 'Specialized Expertise',
    icon: <Box size={20} className="text-emerald-500" />,
    skills: ['System Hardening', 'API Architecture', 'Network Security', 'CTF Design'],
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

        <div className="grid md:grid-cols-2 gap-8 mb-20">
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

        {/* Certifications & Achievements Section */}
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <h3 className="text-2xl font-bold text-zinc-100">Credentials & Recognitions</h3>
            <div className="h-[1px] flex-grow bg-zinc-800"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Academic Excellence */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group p-8 bg-zinc-900/20 border border-zinc-800 rounded-2xl hover:border-emerald-500/30 transition-all relative overflow-hidden"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500">
                  <Award size={24} />
                </div>
                <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.2em]">Achievement_01</span>
              </div>
              
              <h4 className="text-lg font-bold text-zinc-100 mb-2">Academic Excellence</h4>
              <p className="text-emerald-500 font-mono text-2xl font-black mb-4">9.62 CGPA</p>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Graduated with distinction, securing the <span className="text-zinc-100 font-medium">top-rank</span> in the department at Mumbai University. Recognized for consistent technical proficiency and academic leadership.
              </p>
              
              <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                <Award size={160} />
              </div>
            </motion.div>

            {/* Certifications */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group p-8 bg-zinc-900/20 border border-zinc-800 rounded-2xl hover:border-emerald-500/30 transition-all relative overflow-hidden"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500">
                  <CheckCircle2 size={24} />
                </div>
                <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.2em]">Validation_02</span>
              </div>
              
              <h4 className="text-lg font-bold text-zinc-100 mb-4">Professional Certifications</h4>
              <div className="space-y-4">
                {[
                  { name: 'React.js', provider: 'Scalar' },
                  { name: 'Advanced Python', provider: 'TuteDude' },
                  { name: 'Core Python', provider: 'GeeksforGeeks' }
                ].map((cert, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-zinc-800/50 pb-2">
                    <span className="text-zinc-300 text-sm font-medium">{cert.name}</span>
                    <span className="text-zinc-500 font-mono text-[10px] uppercase">{cert.provider}</span>
                  </div>
                ))}
              </div>

              <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                <Shield size={160} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
