'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Briefcase } from 'lucide-react';

export function CreativeExperience() {
  const experiences = [
    {
      company: 'Softaculous Ltd.',
      role: 'PHP Developer (Webuzo)',
      location: 'Mumbai',
      period: 'July 2026 – Present',
      highlights: [
        'Developing high-performance server-side logic for the Webuzo multi-user hosting panel',
        'Optimizing MySQL queries, reducing retrieval latency by 20% through advanced indexing strategies',
        'Developed and managed SecLayer, a cutting-edge firewall product',
      ],
    },
    {
      company: 'Akobot.ai',
      role: 'Frontend Developer (Intern)',
      location: 'Remote/Mumbai',
      period: 'Jan 2026 – Jun 2026',
      highlights: [
        'Architecting SEO-optimized structures using Next.js 15, improving speed by 35%',
        'Developed modular UI library with Tailwind CSS and TypeScript, increasing dev velocity by 30%',
        'Integrating real-time AI-driven interfaces and streaming LLM responses',
      ],
    },
    {
      company: 'Talakunchi Network Pvt. Ltd.',
      role: 'Linux System Administrator (Intern)',
      location: 'Dombivli',
      period: 'Feb 2024 – June 2024',
      highlights: [
        'Architected a CTF platform with specialized security challenges in cryptography and web security',
        'Ensured 99.9% uptime by configuring and monitoring Nginx/Apache servers on Debian',
        'Managed district-level CTF event for 50+ participants',
      ],
    },
  ];

  return (
    <section id="experience" className="py-32 px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="text-sm uppercase tracking-[0.3em] text-primary font-bold mb-4">Journey</h2>
          <h3 className="text-4xl md:text-6xl font-black tracking-tight">Professional <span className="text-muted-foreground">Path</span></h3>
        </motion.div>

        <div className="space-y-16">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-12 md:pl-0"
            >
              {/* Timeline Connector */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-[-64px] w-px bg-gradient-to-b from-primary/50 to-transparent md:-translate-x-1/2 hidden md:block" />
              
              <div className={`flex flex-col md:flex-row items-center justify-between gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                {/* Dot */}
                <div className="absolute left-0 md:left-1/2 top-0 w-4 h-4 rounded-full bg-primary shadow-[0_0_15px_rgba(20,184,166,0.5)] md:-translate-x-1/2 z-10 hidden md:block" />

                <div className="w-full md:w-[45%]">
                  <div className="p-8 bg-card/40 backdrop-blur-md border border-border/50 rounded-3xl hover:border-primary/30 transition-colors group">
                    <div className="flex flex-col gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
                          <Briefcase size={14} />
                          {exp.role}
                        </div>
                        <h4 className="text-2xl font-black">{exp.company}</h4>
                      </div>

                      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground font-medium">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={12} className="text-primary/70" />
                          {exp.period}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin size={12} className="text-primary/70" />
                          {exp.location}
                        </span>
                      </div>

                      <ul className="space-y-3 pt-4">
                        {exp.highlights.map((highlight, i) => (
                          <li key={i} className="text-sm text-foreground/70 leading-relaxed flex gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-2 shrink-0" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Spacer for MD screens */}
                <div className="hidden md:block w-[45%]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
