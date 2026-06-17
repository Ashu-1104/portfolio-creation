import { ArrowUpRight } from 'lucide-react'

const projects = [
  {
    title: 'Nexus Bank',
    description: 'A secure full-stack banking portal with encrypted sessions and real-time ledger tracking. Features a custom RESTful API for fund transfers with ACID-compliant transactions and responsive dashboard for monitoring account activity.',
    tech: ['React.js', 'PHP', 'MySQL', 'Bootstrap', 'REST API'],
    highlights: ['Encrypted Sessions', 'ACID Compliance', 'Real-time Tracking', 'Transaction History'],
    featured: true,
  },
  {
    title: 'TikTok Clone',
    description: 'Built a responsive streaming feed with lazy-loading and infinite scroll for a mobile-first user experience. Implemented backend logic for video processing, user authentication, and follower-feeds using Django ORM.',
    tech: ['Django', 'Python', 'Tailwind CSS', 'Alpine.js', 'PostgreSQL'],
    highlights: ['Lazy Loading', 'Video Processing', 'Social Features', 'Responsive Design'],
    featured: true,
  },
  {
    title: 'Railway Ticket Reservation',
    description: 'Developed a comprehensive reservation engine with automated coach allocation and dynamic AJAX-based UI. Implemented data sanitization and prepared statements to prevent injection attacks.',
    tech: ['PHP', 'MySQL', 'JavaScript', 'jQuery', 'Bootstrap'],
    highlights: ['Automated Allocation', 'AJAX UI', 'Security Focus', 'Dynamic Updates'],
    featured: false,
  },
]

export default function Projects() {
  return (
    <section id="projects" className="border-t border-border bg-card/30 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Featured Projects</h2>
          <div className="mt-2 h-1 w-20 rounded-full bg-gradient-to-r from-primary to-accent"></div>
        </div>

        {/* Featured Projects */}
        <div className="mb-16 space-y-8">
          {projects.filter(p => p.featured).map((project, idx) => (
            <div
              key={idx}
              className="group overflow-hidden rounded-lg border border-border bg-background transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="grid gap-6 p-6 lg:grid-cols-2">
                {/* Content */}
                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="mb-3 text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="mb-4 leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div className="mb-6 flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <button className="inline-flex items-center gap-2 text-primary font-medium hover:text-accent transition-colors group-hover:gap-3">
                    View Project
                    <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </button>
                </div>

                {/* Highlights */}
                <div className="rounded-lg bg-card border border-border p-6">
                  <h4 className="mb-4 font-semibold text-foreground text-sm uppercase tracking-wide">
                    Key Features
                  </h4>
                  <ul className="space-y-3">
                    {project.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0"></span>
                        <span className="text-sm text-muted-foreground">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* All Projects */}
        <div>
          <h3 className="mb-6 text-lg font-bold text-foreground">Other Projects</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {projects.filter(p => !p.featured).map((project, idx) => (
              <div
                key={idx}
                className="group rounded-lg border border-border bg-card/50 p-6 transition-all hover:border-primary/50 hover:bg-card/80"
              >
                <h4 className="mb-2 font-bold text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h4>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.slice(0, 3).map((tech, i) => (
                    <span key={i} className="text-xs text-primary">
                      {tech}
                      {i < project.tech.length - 1 && ', '}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
