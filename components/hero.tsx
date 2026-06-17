import { ArrowRight, Code2, Share2, Mail } from 'lucide-react'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-background to-card/30 px-4 py-20 sm:px-6 lg:px-8">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute -left-40 -bottom-40 h-96 w-96 rounded-full bg-accent/10 blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-4xl">
        <div className="text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-sm font-medium text-primary">Available for work</span>
          </div>

          {/* Main Heading */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Full-Stack Developer &{' '}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Problem Solver
            </span>
          </h1>

          {/* Subheading */}
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Building scalable web applications with Next.js, React, and PHP. Specialized in creating performant interfaces and robust backend systems. Currently crafting AI-integrated solutions at Akobot.ai.
          </p>

          {/* CTA Buttons */}
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-4">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-all hover:opacity-90 hover:scale-105"
            >
              Start a Project
              <ArrowRight size={18} />
            </a>
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary/30 bg-primary/5 px-6 py-3 font-medium text-primary transition-all hover:bg-primary/10"
            >
              View My Work
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-card border border-border hover:border-primary/50 hover:bg-primary/10 transition-all"
              aria-label="GitHub"
            >
              <Code2 size={20} className="text-accent" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-card border border-border hover:border-primary/50 hover:bg-primary/10 transition-all"
              aria-label="LinkedIn"
            >
              <Share2 size={20} className="text-primary" />
            </a>
            <a
              href="mailto:ashutoshtiwari110504@gmail.com"
              className="p-3 rounded-lg bg-card border border-border hover:border-primary/50 hover:bg-primary/10 transition-all"
              aria-label="Email"
            >
              <Mail size={20} className="text-accent" />
            </a>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-4 border-t border-border pt-12 sm:gap-8">
            <div>
              <div className="text-3xl font-bold text-primary">9.62</div>
              <p className="mt-1 text-sm text-muted-foreground">CGPA</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent">3+</div>
              <p className="mt-1 text-sm text-muted-foreground">Years Experience</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">15+</div>
              <p className="mt-1 text-sm text-muted-foreground">Projects Built</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
