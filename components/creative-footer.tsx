'use client';

import { Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const LinkedinIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

const XIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg>
);

export function CreativeFooter() {
  const socialLinks = [
    { icon: <GithubIcon size={18} />, href: 'https://github.com/Ashu-1104', label: 'GitHub' },
    { icon: <LinkedinIcon size={18} />, href: 'https://www.linkedin.com/in/ashutosh-tiwari-397206237', label: 'LinkedIn' },
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
