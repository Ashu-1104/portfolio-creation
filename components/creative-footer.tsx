'use client';

import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';

export function CreativeFooter() {
  const socialLinks = [
    { icon: <Github size={18} />, href: 'https://github.com/Ashu-1104', label: 'GitHub' },
    { icon: <Linkedin size={18} />, href: 'https://www.linkedin.com/in/ashutosh-tiwari-397206237', label: 'LinkedIn' },
    { icon: <Mail size={18} />, href: 'mailto:ashutoshtiwari110504@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="py-12 px-6 border-t border-border/30 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="text-xl font-black tracking-tighter bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Ashutosh Tiwari
          </div>
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-[0.2em]">
            Full-Stack Developer & Engineer
          </p>
        </div>

        <nav>
          <ul className="flex flex-wrap justify-center gap-8 text-sm font-bold text-foreground/60">
            {['About', 'Experience', 'Projects', 'Skills', 'Contact'].map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`} className="hover:text-primary transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex gap-4">
          {socialLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3, color: 'var(--primary)' }}
              className="w-10 h-10 rounded-xl bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:border-primary/30 transition-all"
              aria-label={link.label}
            >
              {link.icon}
            </motion.a>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-border/10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-black">
            © {new Date().getFullYear()} ALL RIGHTS RESERVED
          </p>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-black flex items-center gap-2">
            Built with <span className="text-primary">Next.js</span> & <span className="text-secondary">Framer Motion</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
