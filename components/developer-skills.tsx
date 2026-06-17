'use client';

import { motion } from 'framer-motion';
import { Cpu, Globe, Database, Terminal, Shield, Box, Award, CheckCircle2, Code2, Layers, Cpu as CpuIcon } from 'lucide-react';

const skillCategories = [
  {
    title: 'Frontend Development',
    icon: <Globe size={20} className="text-emerald-500" />,
    skills: ['Next.js 15', 'React', 'TypeScript', 'Tailwind CSS', 'Alpine.js'],
    snippet: 'const ui = createComponent({ stack: "modern" });'
  },
  {
    title: 'Backend & Systems',
    icon: <Terminal size={20} className="text-emerald-500" />,
    skills: ['PHP', 'Python (Django)', 'Node.js', 'C++', 'Shell Scripting'],
    snippet: 'while(active) { handleRequest(new Logic()); }'
  },
  {
    title: 'Data & Infrastructure',
    icon: <Database size={20} className="text-emerald-500" />,
    skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'Linux (Debian/RHEL)', 'Git'],
    snippet: 'db.query("SELECT * FROM infrastructure;");'
  },
  {
    title: 'Specialized Expertise',
    icon: <Box size={20} className="text-emerald-500" />,
    skills: ['System Hardening', 'API Architecture', 'Network Security', 'CTF Design'],
    snippet: 'security.harden(system).ensure(ACID_COMPLIANCE);'
  },
];

export function DeveloperSkills() {
  return (
    <section id="skills" className="py-24 px-6 bg-[#09090b] relative overflow-hidden">
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
            <h3 className="text-5xl md:text-6xl font-black text-zinc-100 tracking-tighter">
              TECHNICAL <span className="text-zinc-500">ARSENAL.</span>
            </h3>
          </div>
          <div className="hidden md:block text-right">
            <p className="font-mono text-[10px] text-zinc-600 uppercase tracking-[0.4em] mb-1">System Capacity</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <div key={i} className={`h-1 w-4 ${i < 8 ? 'bg-emerald-500' : 'bg-zinc-800'}`} />
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-32">
          {skillCategories.map((cat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 bg-[#0c0c0e] border border-zinc-800 rounded-2xl hover:border-emerald-500/30 transition-all relative overflow-hidden"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20 transition-all">
                  {cat.icon}
                </div>
                <h4 className="text-xl font-bold text-zinc-100 group-hover:text-emerald-500 transition-colors">{cat.title}</h4>
              </div>

              <div className="flex flex-wrap gap-2 mb-8 relative z-10">
                {cat.skills.map((skill, i) => (
                  <span 
                    key={i} 
                    className="px-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-lg text-xs font-mono text-zinc-400 group-hover:text-zinc-200 group-hover:border-zinc-700 transition-all"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="pt-4 border-t border-zinc-800/50">
                <p className="font-mono text-[10px] text-zinc-600 italic">
                  <span className="text-emerald-500/50 mr-2">➜</span>
                  {cat.snippet}
                </p>
              </div>

              {/* Subtle visual accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/[0.02] blur-3xl rounded-full -z-10 group-hover:bg-emerald-500/[0.05] transition-all" />
            </motion.div>
          ))}
        </div>

        {/* Credentials Section - Redesigned for High Fidelity */}
        <div className="relative pt-20">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
          
          <div className="grid lg:grid-cols-[1fr_auto_1fr] items-center gap-12 mb-12 text-center md:text-left">
            <div>
              <h4 className="text-3xl font-bold text-zinc-100 mb-2">Verified Credentials</h4>
              <p className="text-zinc-500 text-sm font-mono tracking-tight uppercase">Security_Tokens // Academic_Logs</p>
            </div>
            <div className="hidden lg:block h-12 w-[1px] bg-zinc-800" />
            <div className="text-zinc-500 text-xs leading-relaxed font-mono">
              ALL_RECORDS_VERIFIED_BY_CENTRAL_AUTHORITY<br/>
              LAST_UPDATED: 2026.06.17_12:45:00
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Academic Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-1 bg-gradient-to-br from-zinc-800 to-zinc-950 rounded-[2rem] overflow-hidden"
            >
              <div className="bg-[#09090b] p-10 rounded-[1.8rem] h-full relative overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-12">
                    <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-500">
                      <Award size={32} />
                    </div>
                    <div className="px-4 py-1.5 bg-emerald-500 text-zinc-950 font-mono text-[10px] font-bold rounded-full tracking-widest">
                      DISTINCTION
                    </div>
                  </div>
                  
                  <h5 className="text-2xl font-bold text-zinc-100 mb-2">Mumbai University</h5>
                  <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest mb-6">Department of Information Technology</p>
                  
                  <div className="flex items-baseline gap-4 mb-6">
                    <span className="text-6xl font-black text-emerald-500 tracking-tighter">9.62</span>
                    <span className="text-zinc-600 font-mono text-xl">CGPA</span>
                  </div>
                  
                  <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
                    Secured the <span className="text-zinc-100 font-bold underline decoration-emerald-500/50 underline-offset-4">top-rank</span> in the department, demonstrating exceptional mastery over core engineering principles and systems architecture.
                  </p>
                </div>

                <div className="mt-12 flex items-center gap-4 pt-8 border-t border-zinc-800/50">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-[#09090b] bg-zinc-900 flex items-center justify-center">
                        <CheckCircle2 size={14} className="text-emerald-500" />
                      </div>
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Validated_By_University_Council</span>
                </div>
              </div>
            </motion.div>

            {/* Certification Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-1 bg-gradient-to-bl from-zinc-800 to-zinc-950 rounded-[2rem] overflow-hidden"
            >
              <div className="bg-[#09090b] p-10 rounded-[1.8rem] h-full flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-12">
                    <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center text-zinc-500">
                      <Shield size={32} />
                    </div>
                    <span className="font-mono text-[10px] text-zinc-700 uppercase tracking-[0.3em]">Cert_Log: 4421</span>
                  </div>

                  <h5 className="text-2xl font-bold text-zinc-100 mb-8">Technical Proficiencies</h5>
                  
                  <div className="space-y-6">
                    {[
                      { name: 'React.js Architecture', provider: 'Scalar', icon: <Layers size={14} /> },
                      { name: 'Advanced Python Logic', provider: 'TuteDude', icon: <CpuIcon size={14} /> },
                      { name: 'Core Python Systems', provider: 'GeeksforGeeks', icon: <Code2 size={14} /> }
                    ].map((cert, i) => (
                      <div key={i} className="flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-lg bg-zinc-900/50 border border-zinc-800 flex items-center justify-center text-zinc-600 group-hover:text-emerald-500 group-hover:border-emerald-500/30 transition-all">
                            {cert.icon}
                          </div>
                          <div>
                            <p className="text-zinc-200 text-sm font-medium group-hover:text-emerald-500 transition-colors">{cert.name}</p>
                            <p className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">{cert.provider}</p>
                          </div>
                        </div>
                        <div className="h-[1px] flex-grow mx-4 bg-zinc-800 group-hover:bg-emerald-500/20 transition-colors" />
                        <CheckCircle2 size={16} className="text-emerald-500/40 group-hover:text-emerald-500 transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-12 p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
                  <p className="text-[10px] font-mono text-emerald-500/60 leading-relaxed uppercase tracking-widest">
                    Continuous learning status: <span className="text-emerald-500 font-bold">Active</span><br/>
                    Currently exploring: <span className="text-zinc-300">Advanced_Distributed_Systems</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
