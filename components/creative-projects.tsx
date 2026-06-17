'use client';

import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

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
                    <Github size={24} />
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
