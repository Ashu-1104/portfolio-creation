export function ProSkills() {
  const skillCategories = [
    {
      category: 'Frontend',
      skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'JavaScript', 'HTML/CSS', 'Redux', 'Framer Motion'],
    },
    {
      category: 'Backend',
      skills: ['Node.js', 'Express', 'Python', 'PHP', 'REST APIs', 'GraphQL', 'WebSockets', 'JWT Auth'],
    },
    {
      category: 'Database',
      skills: ['PostgreSQL', 'MongoDB', 'MySQL', 'Firebase', 'Redis', 'Prisma ORM', 'Mongoose', 'SQL Optimization'],
    },
    {
      category: 'DevOps & Tools',
      skills: ['Docker', 'Git', 'AWS', 'Linux', 'CI/CD', 'GitHub Actions', 'Vercel', 'Nginx'],
    },
    {
      category: 'AI & Modern Tech',
      skills: ['OpenAI API', 'LLM Integration', 'Vector Databases', 'Prompt Engineering', 'Machine Learning Basics', 'NLP'],
    },
    {
      category: 'Security',
      skills: ['Authentication', 'Authorization', 'Encryption', 'OWASP', 'SQL Injection Prevention', 'XSS Protection', 'Rate Limiting'],
    },
  ]

  return (
    <section id="skills" className="py-20 border-t border-border bg-card/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Skills & Expertise</h2>
          <div className="w-12 h-1 bg-primary rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((skillGroup, index) => (
            <div key={index} className="border border-border rounded-lg p-6 hover:border-primary/30 transition-colors">
              <h3 className="text-xl font-bold text-foreground mb-4">{skillGroup.category}</h3>
              <div className="flex flex-wrap gap-2">
                {skillGroup.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 text-sm font-medium bg-primary/10 text-primary rounded-lg border border-primary/20 hover:border-primary/50 hover:bg-primary/15 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-foreground mb-6">Certifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-border rounded-lg p-6 bg-card">
              <h4 className="font-semibold text-foreground mb-2">Full Stack Development</h4>
              <p className="text-sm text-foreground/60">Comprehensive certification covering frontend, backend, and DevOps</p>
            </div>
            <div className="border border-border rounded-lg p-6 bg-card">
              <h4 className="font-semibold text-foreground mb-2">Advanced JavaScript</h4>
              <p className="text-sm text-foreground/60">Deep dive into JavaScript, async programming, and ES6+ features</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
