import { CheckCircle2 } from 'lucide-react'

export function ProAbout() {
  const highlights = [
    'Full-Stack development with 3+ years experience',
    'Strong foundation in system design and security',
    'Expertise in database optimization and backend architecture',
    '9.62 CGPA - Consistently high academic performance',
    'Passionate about clean code and scalable solutions',
  ]

  return (
    <section id="about" className="py-20 border-t border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">About Me</h2>
          <div className="w-12 h-1 bg-primary rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg text-foreground/70 mb-6 leading-relaxed">
              I&apos;m a full-stack developer with a strong passion for building scalable, secure web applications. My journey in tech has equipped me with a diverse skill set spanning frontend, backend, and DevOps domains.
            </p>
            <p className="text-lg text-foreground/70 mb-6 leading-relaxed">
              I believe in writing clean, maintainable code and continuously learning new technologies. My experience ranges from building responsive user interfaces to architecting robust backend systems with proper security measures.
            </p>
            <p className="text-lg text-foreground/70 leading-relaxed">
              When I&apos;m not coding, I enjoy exploring new technologies, contributing to open source, and staying updated with the latest industry trends.
            </p>
          </div>

          <div className="space-y-4">
            {highlights.map((highlight, index) => (
              <div key={index} className="flex gap-3 items-start">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <span className="text-foreground/80">{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">3+</div>
            <p className="text-sm text-foreground/60">Years Experience</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">20+</div>
            <p className="text-sm text-foreground/60">Projects Completed</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">15+</div>
            <p className="text-sm text-foreground/60">Technologies</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">9.62</div>
            <p className="text-sm text-foreground/60">CGPA</p>
          </div>
        </div>
      </div>
    </section>
  )
}
