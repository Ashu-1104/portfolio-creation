const skillCategories = [
  {
    category: 'Frontend',
    skills: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Alpine.js', 'HTML5', 'CSS3', 'Bootstrap'],
    icon: '🎨',
  },
  {
    category: 'Backend',
    skills: ['PHP', 'Python (Django)', 'Node.js', 'C++', 'REST APIs', 'Shell Scripting (Bash)'],
    icon: '⚙️',
  },
  {
    category: 'Database & Infrastructure',
    skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'Git', 'Linux (SysAdmin)', 'Docker'],
    icon: '🗄️',
  },
  {
    category: 'AI & Modern Tech',
    skills: ['AI Integration', 'LLM Streaming', 'SSR/ISR', 'Performance Optimization', 'SEO'],
    icon: '🤖',
  },
]

export default function Skills() {
  return (
    <section id="skills" className="border-t border-border px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Skills & Expertise</h2>
          <div className="mt-2 h-1 w-20 rounded-full bg-gradient-to-r from-primary to-accent"></div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {skillCategories.map((category, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-border bg-card/50 p-6 transition-all hover:border-primary/50 hover:bg-card/80"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="text-2xl">{category.icon}</span>
                <h3 className="text-lg font-bold text-foreground">{category.category}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 px-3 py-1 text-sm font-medium text-foreground hover:border-primary/50 hover:from-primary/20 hover:to-accent/20 transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="mt-12 rounded-lg border border-accent/20 bg-accent/5 p-8">
          <h3 className="mb-6 text-lg font-bold text-foreground">Certifications & Achievements</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="font-medium text-accent">🏆 Academic Excellence</p>
              <p className="mt-1 text-sm text-muted-foreground">Graduated with 9.62 CGPA, top-ranked in the department at Mumbai University</p>
            </div>
            <div>
              <p className="font-medium text-accent">📜 Certifications</p>
              <p className="mt-1 text-sm text-muted-foreground">React.js (Scalar), Advanced Python (TuteDude), Core Python (GeeksforGeeks)</p>
            </div>
            <div>
              <p className="font-medium text-accent">👥 Leadership</p>
              <p className="mt-1 text-sm text-muted-foreground">Managed district-level CTF event for 50+ participants during internship</p>
            </div>
            <div>
              <p className="font-medium text-accent">💡 Performance</p>
              <p className="mt-1 text-sm text-muted-foreground">Achieved 20% query optimization and 35% speed improvement through advanced indexing</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
