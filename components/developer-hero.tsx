'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Mail, Terminal, Cpu, Code2 } from 'lucide-react';

const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

export function DeveloperHero() {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center pt-20 pb-32 px-6 bg-[#09090b] relative overflow-hidden">
      {/* Coder-style grid background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3"
              >
                <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded text-[10px] font-mono text-emerald-500 uppercase tracking-widest">
                  v2.0.4_stable
                </div>
                <div className="h-[1px] w-12 bg-emerald-500/20" />
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-6xl md:text-8xl font-bold tracking-tighter text-zinc-100"
              >
                ASHUTOSH <br/>
                <span className="text-zinc-500 inline-block hover:text-emerald-500 transition-colors cursor-default">TIWARI.</span>
              </motion.h1>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-4"
              >
                <div className="h-8 w-[2px] bg-emerald-500" />
                <h2 className="text-xl md:text-3xl font-medium text-zinc-400 font-mono">
                  Full-Stack Engineer & Linux Specialist
                </h2>
              </motion.div>
            </div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-zinc-400 text-lg max-w-xl leading-relaxed font-sans"
            >
              I build robust, high-performance systems and scalable web applications. Currently focused on architecting secure interfaces and full-stack solutions. Previously <span className="text-emerald-500 font-mono italic">Frontend Engineering Intern</span> at Akobot.ai.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <a 
                href="#projects" 
                className="px-8 py-4 bg-emerald-500 text-zinc-950 font-bold rounded shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all flex items-center gap-2 group"
              >
                EXECUTE_PROJECTS()
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              
              <div className="flex gap-2">
                {[
                  { icon: <GithubIcon size={20} />, href: "https://github.com/Ashu-1104" },
                  { icon: <LinkedinIcon size={20} />, href: "https://www.linkedin.com/in/ashutosh-tiwari-397206237" },
                  { icon: <Mail size={20} />, href: "mailto:ashutoshtiwari110504@gmail.com" }
                ].map((social, i) => (
                  <a 
                    key={i} 
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center justify-center bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-emerald-500 hover:border-emerald-500/50 transition-all rounded"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative"
          >
            {/* Main Terminal Window */}
            <div className="w-full bg-[#0c0c0e] border border-zinc-800 rounded-lg overflow-hidden shadow-2xl relative z-10">
              <div className="h-10 bg-zinc-900/50 px-4 flex items-center justify-between border-b border-zinc-800">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-zinc-800" />
                  <div className="w-3 h-3 rounded-full bg-zinc-800" />
                  <div className="w-3 h-3 rounded-full bg-zinc-800" />
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500">
                  <Terminal size={12} />
                  <span>bash — 80x24</span>
                </div>
              </div>
              
              <div className="p-6 font-mono text-sm leading-relaxed">
                <div className="flex gap-3 mb-4">
                  <span className="text-emerald-500">➜</span>
                  <span className="text-zinc-300">neofetch</span>
                </div>
                
                <div className="grid grid-cols-[auto_1fr] gap-x-6 text-xs mb-6">
                  <div className="text-emerald-500/40 select-none leading-none font-black text-[8px]">
                    {` .--.
|o_o |
|:_/ |
//   \\ \\
(|     | )
/'\\_   _/ \`\\
\\___)=(___ /`}
                  </div>
                  <div className="space-y-1">
                    <p><span className="text-emerald-500">user:</span> <span className="text-zinc-300">ashutosh@mumbai</span></p>
                    <p><span className="text-emerald-500">os:</span> <span className="text-zinc-300">Debian 12 / RHEL 9</span></p>
                    <p><span className="text-emerald-500">shell:</span> <span className="text-zinc-300">zsh 5.9</span></p>
                    <p><span className="text-emerald-500">pkgs:</span> <span className="text-zinc-300">Next.js, PHP, Python</span></p>
                    <p><span className="text-emerald-500">uptime:</span> <span className="text-zinc-300">9.62 CGPA (Distinction)</span></p>
                  </div>
                </div>

                <div className="flex gap-3 mb-2">
                  <span className="text-emerald-500">➜</span>
                  <span className="text-zinc-300">cat goals.json</span>
                </div>
                <div className="pl-6 text-emerald-500/80 text-xs italic">
                  {`{
  "focus": "High_Performance_Systems",
  "status": "Available_for_Innovation",
  "location": "Mumbai_IN"
}`}
                </div>
                
                <div className="mt-6 flex gap-2 items-center">
                  <span className="text-emerald-500">➜</span>
                  <span className="w-2 h-4 bg-emerald-500 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Floating Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-emerald-500/10 blur-3xl -z-10" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-emerald-500/5 blur-[100px] -z-10" />
            
            {/* Background floating code snippet */}
            <div className="absolute -right-4 top-20 opacity-10 font-mono text-[10px] text-emerald-500 whitespace-nowrap pointer-events-none select-none">
              {`export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}`}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
