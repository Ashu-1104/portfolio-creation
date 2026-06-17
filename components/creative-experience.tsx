'use client';

export function CreativeExperience() {
  const experiences = [
    {
      company: 'Softaculous Ltd.',
      role: 'PHP Developer (Webuzo)',
      location: 'Mumbai',
      period: 'July 2026 – Present',
      highlights: [
        'Developing high-performance server-side logic for the Webuzo multi-user hosting panel',
        'Optimizing MySQL queries, reducing retrieval latency by 20% through advanced indexing strategies',
        'Developed and managed SecLayer, a cutting-edge firewall product',
      ],
    },
    {
      company: 'Akobot.ai',
      role: 'Frontend Developer (Intern)',
      location: 'Remote/Mumbai',
      period: 'Jan 2026 – Jun 2026',
      highlights: [
        'Architecting SEO-optimized structures using Next.js 15, improving speed by 35%',
        'Developed modular UI library with Tailwind CSS and TypeScript, increasing dev velocity by 30%',
        'Integrating real-time AI-driven interfaces and streaming LLM responses',
      ],
    },
    {
      company: 'Talakunchi Network Pvt. Ltd.',
      role: 'Linux System Administrator (Intern)',
      location: 'Dombivli',
      period: 'Feb 2024 – June 2024',
      highlights: [
        'Architected a CTF platform with specialized security challenges in cryptography and web security',
        'Ensured 99.9% uptime by configuring and monitoring Nginx/Apache servers on Debian',
        'Managed district-level CTF event for 50+ participants',
      ],
    },
  ];

  return (
    <section id="experience" className="py-20 px-6 bg-card/30">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold mb-16">
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Professional Experience
          </span>
        </h2>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="relative pl-8 border-l-2 border-primary pb-8 hover:border-secondary transition-colors duration-300"
            >
              {/* Timeline dot */}
              <div className="absolute left-0 top-0 w-4 h-4 bg-primary rounded-full -translate-x-2.5 hover:bg-secondary transition-colors"></div>

              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-bold text-primary">{exp.role}</h3>
                    <p className="text-foreground/70">{exp.company}</p>
                  </div>
                  <div className="text-sm text-foreground/60 whitespace-nowrap">{exp.period}</div>
                </div>

                <p className="text-sm text-foreground/50">{exp.location}</p>

                <ul className="space-y-2 mt-4">
                  {exp.highlights.map((highlight, i) => (
                    <li key={i} className="text-foreground/70 flex gap-3">
                      <span className="text-secondary mt-1">▸</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
