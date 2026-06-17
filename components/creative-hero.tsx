'use client';

import { ArrowRight, Code2, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const GithubIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const LinkedinIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

export function CreativeHero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section id="about" className="min-h-[90vh] flex items-center justify-center relative overflow-hidden py-20 px-6">
      {/* Refined Background Blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[10%] left-[15%] w-[30rem] h-[30rem] bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[15%] w-[25rem] h-[25rem] bg-secondary/10 rounded-full blur-[100px] animate-pulse delay-700"></div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto text-center space-y-10"
      >
        <motion.div variants={itemVariants} className="space-y-4">
          <h2 className="text-sm uppercase tracking-[0.3em] text-primary font-bold">Available for Work</h2>
          <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[1.1]">
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient">
              Full-Stack Developer
            </span>
          </h1>
          <p className="text-xl text-muted-foreground font-medium">Based in Mumbai • Specializing in High-Performance Web Apps</p>
        </motion.div>

        <motion.p variants={itemVariants} className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
          I bridge the gap between <span className="text-primary font-semibold">elegant design</span> and <span className="text-secondary font-semibold">robust engineering</span>. 
          Expertise in Next.js, React.js, and secure backend systems powered by AI integration.
        </motion.p>

        {/* Stats with smoother design */}
        <motion.div variants={itemVariants} className="grid grid-cols-3 gap-8 py-10 border-y border-border/50">
          <div className="space-y-1">
            <div className="text-4xl font-black text-foreground">9.62</div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground font-bold">CGPA</div>
          </div>
          <div className="space-y-1">
            <div className="text-4xl font-black text-foreground">15+</div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Projects</div>
          </div>
          <div className="space-y-1">
            <div className="text-4xl font-black text-foreground">2.5+</div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Years Exp.</div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="px-10 py-4 bg-primary text-primary-foreground rounded-full font-bold shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2 group"
          >
            Explore Projects
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="px-10 py-4 border-2 border-border hover:border-primary/50 text-foreground rounded-full font-bold transition-all"
          >
            Get in Touch
          </motion.a>
        </motion.div>

        {/* Professional Social Links */}
        <motion.div variants={itemVariants} className="flex gap-6 justify-center pt-8">
          {[
            { icon: GithubIcon, href: 'https://github.com/Ashu-1104', label: 'GitHub' },
            { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/ashutosh-tiwari-397206237', label: 'LinkedIn' },
            { icon: Mail, href: 'mailto:ashutoshtiwari110504@gmail.com', label: 'Email' }
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              title={social.label}
              whileHover={{ y: -5, color: 'var(--primary)' }}
              className="p-3 rounded-full bg-card border border-border text-muted-foreground hover:border-primary/50 transition-all shadow-sm"
            >
              <social.icon size={22} />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
