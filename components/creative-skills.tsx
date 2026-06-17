'use client';

export function CreativeSkills() {
  const skillCategories = [
    {
      title: 'Frontend',
      color: 'bg-primary/10 text-primary border-primary/30',
      skills: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Alpine.js', 'HTML5', 'CSS3', 'Bootstrap'],
    },
    {
      title: 'Backend',
      color: 'bg-secondary/10 text-secondary border-secondary/30',
      skills: ['PHP', 'Python (Django)', 'Node.js', 'C++', 'REST APIs', 'Shell Scripting (Bash)'],
    },
    {
      title: 'Database & Infrastructure',
      color: 'bg-accent/10 text-accent border-accent/30',
      skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'Git', 'Linux (SysAdmin)', 'Docker'],
    },
    {
      title: 'Expertise',
      color: 'bg-green-500/10 text-green-400 border-green-500/30',
      skills: ['Web Security', 'Query Optimization', 'API Development', 'CTF Challenges', 'Cloud Hosting'],
    },
  ];

  const certifications = [
    'React.js (Scalar)',
    'Advanced Python (TuteDude)',
    'Core Python (GeeksforGeeks)',
  ];

  return (
    <section id="skills" className="py-20 px-6 bg-card/30">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold mb-16">
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Technical Skills & Expertise
          </span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {skillCategories.map((category, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-xl font-bold">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`px-3 py-2 rounded-lg border ${category.color} text-sm font-medium hover:scale-105 transition-transform`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="border-t border-border pt-12">
          <h3 className="text-2xl font-bold mb-6">Certifications & Achievements</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {certifications.map((cert) => (
              <div key={cert} className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-foreground/80">{cert}</span>
              </div>
            ))}
            <div className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg">
              <div className="w-2 h-2 bg-secondary rounded-full"></div>
              <span className="text-foreground/80">9.62 CGPA - Top Ranked</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
