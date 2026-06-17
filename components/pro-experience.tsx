export function ProExperience() {
  const experiences = [
    {
      title: 'Full Stack Developer',
      company: 'Freelance',
      period: 'Aug 2023 - Present',
      description: 'Developing and maintaining multiple full-stack web applications. Building responsive UIs with React and Next.js, implementing backend systems with Node.js, and managing databases with PostgreSQL and MongoDB.',
      achievements: [
        'Built 15+ production-ready web applications',
        'Implemented secure authentication systems',
        'Optimized database queries reducing load times by 40%',
        'Integrated AI models for enhanced functionality',
      ],
    },
    {
      title: 'Backend Developer Intern',
      company: 'Tech Startup',
      period: 'Mar 2023 - Jul 2023',
      description: 'Focused on backend development and system optimization. Worked with REST APIs, database design, and performance tuning.',
      achievements: [
        'Designed and implemented microservices architecture',
        'Improved API response time by 35%',
        'Implemented comprehensive error handling and logging',
        'Created automated testing suite for backend services',
      ],
    },
    {
      title: 'Frontend Developer Intern',
      company: 'Web Design Agency',
      period: 'Jan 2023 - Feb 2023',
      description: 'Developed responsive web interfaces and worked on UI/UX implementation. Collaborated with design and backend teams.',
      achievements: [
        'Built responsive components using React',
        'Improved Lighthouse performance score to 95+',
        'Implemented real-time features with WebSocket',
        'Mentored 2 junior developers',
      ],
    },
  ]

  return (
    <section id="experience" className="py-20 border-t border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Experience</h2>
          <div className="w-12 h-1 bg-primary rounded-full"></div>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div key={index} className="timeline-item bg-card rounded-lg border border-border p-8 hover:border-primary/30 transition-colors">
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-foreground">{exp.title}</h3>
                <p className="text-lg text-primary font-medium">{exp.company}</p>
                <p className="text-sm text-foreground/60">{exp.period}</p>
              </div>

              <p className="text-foreground/70 mb-6 leading-relaxed">{exp.description}</p>

              <div>
                <h4 className="text-sm font-semibold text-foreground mb-3">Key Achievements:</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="flex gap-2 text-sm text-foreground/70">
                      <span className="text-primary font-bold">•</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
