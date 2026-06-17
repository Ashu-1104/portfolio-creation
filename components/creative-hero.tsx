'use client';

import { ArrowRight, Code2, Mail } from 'lucide-react';

export function CreativeHero() {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center relative overflow-hidden py-20 px-6">
      {/* Animated background gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-6xl md:text-7xl font-bold">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Full-Stack Developer
            </span>
          </h1>
          <p className="text-2xl text-foreground/80">Ashutosh Tiwari</p>
        </div>

        <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
          Results-driven developer with expertise in <span className="text-primary font-semibold">Next.js, React.js, and PHP</span>. 
          Building scalable web applications with a strong foundation in <span className="text-secondary font-semibold">backend security</span> and <span className="text-accent font-semibold">AI integration</span>.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 py-8 border-y border-border">
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">9.62</div>
            <div className="text-sm text-foreground/60">CGPA</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-secondary">20+</div>
            <div className="text-sm text-foreground/60">Projects</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-accent">3+</div>
            <div className="text-sm text-foreground/60">Years Experience</div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <a
            href="#projects"
            className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all flex items-center justify-center gap-2"
          >
            View My Work
            <ArrowRight size={20} />
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-all"
          >
            Get in Touch
          </a>
        </div>

        {/* Social Links */}
        <div className="flex gap-6 justify-center pt-8">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-lg bg-card border border-border hover:border-primary hover:text-primary transition-all flex items-center justify-center"
          >
            <Code2 size={24} />
          </a>
          <a
            href="mailto:ashutoshtiwari110504@gmail.com"
            className="w-12 h-12 rounded-lg bg-card border border-border hover:border-accent hover:text-accent transition-all flex items-center justify-center"
          >
            <Mail size={24} />
          </a>
        </div>
      </div>
    </section>
  );
}
