'use client';

import { Code2, ExternalLink } from 'lucide-react';

export function CreativeProjects() {
  const projects = [
    {
      title: 'Nexus Bank',
      description: 'Secure full-stack banking portal with encrypted sessions and real-time ledger tracking',
      features: [
        'Encrypted sessions & security',
        'RESTful API in PHP',
        'ACID-compliant transactions',
        'Responsive dashboard',
      ],
      tech: ['React.js', 'PHP', 'Bootstrap', 'MySQL'],
      color: 'from-primary to-secondary',
    },
    {
      title: 'TikTok Clone',
      description: 'Responsive streaming feed with lazy-loading and infinite scroll for mobile-first experience',
      features: [
        'Lazy-loading & infinite scroll',
        'Video processing backend',
        'User authentication',
        'Follower-feeds system',
      ],
      tech: ['Django', 'Python', 'Tailwind CSS', 'Alpine.js'],
      color: 'from-secondary to-accent',
    },
    {
      title: 'Railway Ticket Reservation',
      description: 'Intelligent reservation engine with automated coach allocation and dynamic UI updates',
      features: [
        'Automated coach allocation',
        'AJAX-based real-time updates',
        'Data sanitization & security',
        'Prepared statements',
      ],
      tech: ['PHP', 'MySQL', 'JavaScript'],
      color: 'from-accent to-primary',
    },
  ];

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-16">
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Featured Projects
          </span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative h-full bg-gradient-to-br from-card to-card/50 border border-border rounded-xl overflow-hidden hover:border-primary transition-all duration-300 hover:shadow-xl hover:shadow-primary/20"
            >
              {/* Gradient accent on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 -z-10`}></div>

              <div className="p-6 space-y-4 h-full flex flex-col">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-primary group-hover:text-secondary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-foreground/70">{project.description}</p>
                </div>

                <div className="space-y-3 flex-grow">
                  <div>
                    <p className="text-sm font-semibold text-foreground/60 mb-2">Key Features</p>
                    <ul className="space-y-1">
                      {project.features.map((feature, i) => (
                        <li key={i} className="text-sm text-foreground/70 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-border space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors text-sm font-medium">
                      <Code2 size={16} />
                      Code
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-secondary/20 text-secondary rounded-lg hover:bg-secondary/30 transition-colors text-sm font-medium">
                      <ExternalLink size={16} />
                      Demo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
