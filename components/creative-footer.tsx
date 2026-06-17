'use client';

import { Code2, Mail } from 'lucide-react';

export function CreativeFooter() {
  const socialLinks = [
    { icon: Code2, href: 'https://github.com', label: 'GitHub' },
    { icon: Mail, href: 'mailto:ashutoshtiwari110504@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="border-t border-border py-12 px-6 bg-card/30">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-primary">Ashutosh Tiwari</h3>
            <p className="text-foreground/70 text-sm">
              Full-Stack Developer focused on building scalable web applications with modern technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="text-foreground/70 hover:text-primary transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#experience" className="text-foreground/70 hover:text-primary transition-colors">
                  Experience
                </a>
              </li>
              <li>
                <a href="#projects" className="text-foreground/70 hover:text-primary transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#skills" className="text-foreground/70 hover:text-primary transition-colors">
                  Skills
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Connect</h3>
            <div className="flex gap-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-background border border-border hover:border-primary hover:text-primary transition-all flex items-center justify-center"
                    aria-label={link.label}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <p className="text-center text-foreground/60 text-sm">
            © {new Date().getFullYear()} Ashutosh Tiwari. Built with Next.js and Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}
