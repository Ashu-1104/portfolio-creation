import { ArrowRight, Mail, ExternalLink } from 'lucide-react'

export function ProHero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          <div className="mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20">
              Welcome to my portfolio
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Ashutosh Tiwari
          </h1>

          <p className="text-xl md:text-2xl text-foreground/60 mb-4 font-medium">
            Full-Stack Developer
          </p>

          <p className="text-lg text-foreground/70 mb-8 max-w-2xl leading-relaxed">
            I build scalable web applications with modern technologies. Specializing in Next.js, React, Node.js, and backend security. Currently focused on creating robust solutions with AI integration and database optimization.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Get in Touch
              <ArrowRight size={20} />
            </a>
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border rounded-lg font-medium text-foreground hover:bg-muted transition-colors"
            >
              View My Work
            </a>
          </div>

          <div className="flex gap-6">
            <a
              href="mailto:ashutoshtiwari26@gmail.com"
              className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors"
            >
              <Mail size={18} />
              ashutoshtiwari26@gmail.com
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors"
            >
              GitHub <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-foreground/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}
