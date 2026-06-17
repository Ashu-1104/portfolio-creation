'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Briefcase } from 'lucide-react';

const experiences = [
  {
    company: 'Softaculous Ltd.',
    position: 'PHP Developer (Webuzo)',
    location: 'Mumbai',
    period: 'July 2025 – Present',
    description: 'Lead developer and manager of the SecLayer Firewall product, overseeing its full lifecycle from initial architecture to ongoing maintenance. Engineered high-performance server-side logic for multi-user hosting panels and optimized MySQL infrastructure, reducing retrieval latency by 20% through advanced indexing strategies.',
    tech: ['SecLayer Firewall', 'PHP', 'MySQL Optimization', 'Server Security'],
  },
  {
    company: 'Akobot.ai',
    position: 'Frontend Developer (Intern)',
    location: 'Remote/Mumbai',
    period: 'Jan 2026 – Jun 2026',
    description: 'Engineered modular UI architectures and secure, responsive interfaces using Next.js 15 and TypeScript. Built scalable component libraries and integrated real-time data features, prioritizing type-safety and UX performance for high-traffic applications.',
    tech: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'UI Architecture'],
  },
  {
    company: 'Talakunchi Network Pvt. Ltd.',
    position: 'Linux System Administrator (Intern)',
    location: 'Dombivli',
    period: 'Feb 2024 – June 2024',
    description: 'Architected and deployed a specialized CTF platform, designing security challenges across cryptography and web vulnerabilities. Maintained 99.9% system uptime by configuring and hardening Nginx/Apache servers on Debian-based systems.',
    tech: ['Linux Administration', 'Nginx/Apache', 'CTF Design', 'Security Hardening'],
  },
];

export function DeveloperExperience() {
  return (
    <section id="experience" className="py-24 px-6 bg-[#09090b]">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-4 mb-16">
          <h2 className="font-mono text-emerald-500 text-sm tracking-widest uppercase">./experience</h2>
          <h3 className="text-4xl font-bold text-zinc-100">Professional Journey</h3>
        </div>

        <div className="relative border-l border-zinc-800 ml-4 md:ml-0 space-y-12">
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-8 md:pl-12"
            >
              <div className="absolute left-0 top-0 w-4 h-4 bg-emerald-500 rounded-full -translate-x-[9px] border-4 border-[#09090b]" />
              
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                <div>
                  <h4 className="text-xl font-bold text-zinc-100">{exp.position}</h4>
                  <p className="text-emerald-500 font-mono text-sm">{exp.company}</p>
                </div>
                <div className="flex items-center gap-2 text-zinc-500 text-xs font-mono">
                  <Calendar size={14} />
                  {exp.period}
                </div>
              </div>

              <p className="text-zinc-400 text-sm leading-relaxed mb-6 max-w-2xl">
                {exp.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {exp.tech.map((t, i) => (
                  <span key={i} className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded text-[10px] font-mono text-zinc-500 uppercase">
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
