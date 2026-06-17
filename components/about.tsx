export default function About() {
  return (
    <section id="about" className="border-t border-border bg-card/30 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">About Me</h2>
          <div className="mt-2 h-1 w-20 rounded-full bg-gradient-to-r from-primary to-accent"></div>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Text Content */}
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-muted-foreground">
              I&apos;m a results-driven Full-Stack Developer with a passion for building scalable, performant web applications that solve real problems. With expertise spanning modern JavaScript frameworks and backend technologies, I thrive at the intersection of design and engineering.
            </p>

            <p className="text-lg leading-relaxed text-muted-foreground">
              Currently, I&apos;m working as a Frontend Developer at Akobot.ai, where I architect SEO-optimized structures using Next.js 15 and develop modular UI libraries with Tailwind CSS and TypeScript. My background includes optimizing hosting panels at Softaculous and designing security-focused systems.
            </p>

            <p className="text-lg leading-relaxed text-muted-foreground">
              What drives me is the challenge of creating elegant solutions to complex problems—whether that&apos;s optimizing database queries for a 20% performance boost or integrating real-time AI-driven interfaces that enhance user engagement.
            </p>

            <div className="pt-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 text-primary font-medium hover:text-accent transition-colors"
              >
                View my work
                <span>→</span>
              </a>
            </div>
          </div>

          {/* Stats & Highlights */}
          <div className="space-y-6">
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-primary mb-4">
                Technical Foundation
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-accent flex-shrink-0"></span>
                  <span className="text-muted-foreground">Full-stack development with Next.js & React</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-accent flex-shrink-0"></span>
                  <span className="text-muted-foreground">Backend expertise in PHP, Python & Node.js</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-accent flex-shrink-0"></span>
                  <span className="text-muted-foreground">Database optimization & Linux administration</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-accent flex-shrink-0"></span>
                  <span className="text-muted-foreground">Security-first approach & ACID compliance</span>
                </li>
              </ul>
            </div>

            <div className="rounded-lg border border-accent/20 bg-accent/5 p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-accent mb-4">
                Education
              </h3>
              <div>
                <p className="font-medium text-foreground">B.S. in Information Technology</p>
                <p className="text-sm text-muted-foreground">Mumbai University, 2025</p>
                <p className="mt-2 text-sm text-primary font-medium">9.62 CGPA • Top-ranked in department</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
