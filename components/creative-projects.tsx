'use client';

import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const GithubIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

export function CreativeProjects() {
  const projects = [
    {
      title: 'Nexus Bank',
      description: 'A robust banking portal with military-grade encryption and real-time ledger tracking.',
      features: [
        'Secure Session Management',
        'RESTful Architecture',
        'ACID-compliant DB',
        'Responsive UI/UX',
      ],
      tech: ['Next.js', 'PostgreSQL', 'Tailwind', 'PHP'],
      color: 'from-primary/20 to-secondary/20',
    },
    {
      title: 'Streamify Clone',
      description: 'High-performance video streaming platform with infinite scroll and dynamic content delivery.',
      features: [
        'Lazy-loading engine',
        'Optimized Video Pipeline',
        'Auth & Social Integration',
        'Mobile-First Design',
      ],
      tech: ['React.js', 'Django', 'Redis', 'AWS'],
      color: 'from-secondary/20 to-accent/20',
    },
    {
      title: 'Smart Rail Engine',
      description: 'Intelligent reservation system with automated allocation and real-time seat tracking.',
      features: [
        'Auto-Allocation Logic',
        'Live AJAX Updates',
        'Sanitized Data Layer',
        'High Concurrency Ready',
      ],
      tech: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
      color: 'from-accent/20 to-primary/20',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section id="projects" className="py-32 px-6 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <h2 className="text-sm uppercase tracking-[0.3em] text-primary font-bold mb-4">Portfolio</h2>
          <h3 className="text-4xl md:text-6xl font-black tracking-tight">
            Featured <span className="text-muted-foreground">Projects</span>
          </h3>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="group relative flex flex-col h-full bg-card/40 backdrop-blur-md border border-border/50 rounded-3xl overflow-hidden hover:border-primary/50 transition-colors duration-500"
            >
              {/* Background Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}></div>

              <div className="p-8 space-y-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start">
                  <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                    <GithubIcon size={24} />
                  </div>
                  <motion.a 
                    whileHover={{ scale: 1.1, rotate: 45 }}
                    href="#" 
                    className="p-3 rounded-full bg-border/50 text-foreground/70 hover:text-primary transition-colors"
                  >
                    <ArrowUpRight size={20} />
                  </motion.a>
                </div>

                <div className="space-y-3">
                  <h4 className="text-2xl font-bold tracking-tight">{project.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                </div>

                <div className="flex-grow">
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tech.map((t) => (
                      <span key={t} className="text-[10px] uppercase tracking-widest px-3 py-1 bg-border/40 text-foreground/60 rounded-full font-bold">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-border/30">
                  <ul className="space-y-2">
                    {project.features.map((feature, i) => (
                      <li key={i} className="text-sm text-foreground/70 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary/60 rounded-full"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
