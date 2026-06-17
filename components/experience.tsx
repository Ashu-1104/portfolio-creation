import { Calendar, MapPin, Briefcase } from 'lucide-react'

const experiences = [
  {
    company: 'Softaculous Ltd.',
    position: 'PHP Developer (Webuzo)',
    location: 'Mumbai',
    period: 'July 2025 – Present',
    description: 'Developing high-performance server-side logic for multi-user hosting panels. Optimized MySQL queries reducing retrieval latency by 20% through advanced indexing strategies. Developed and managed SecLayer firewall product.',
    highlights: ['PHP', 'MySQL', 'Hosting Panels', 'Firewall Development', 'Performance Optimization'],
  },
  {
    company: 'Akobot.ai',
    position: 'Frontend Developer (Intern)',
    location: 'Remote/Mumbai',
    period: 'Jan 2026 – Jun 2026',
    description: 'Architected SEO-optimized structures using Next.js 15, leveraging SSR/ISR to improve speed by 35%. Developed modular UI library with Tailwind CSS and TypeScript, increasing dev velocity by 30%. Integrated real-time AI-driven interfaces and streaming LLM responses.',
    highlights: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'AI Integration', 'SSR/ISR'],
  },
  {
    company: 'Talakunchi Network Pvt. Ltd.',
    position: 'Linux System Administrator (Intern)',
    location: 'Dombivli',
    period: 'Feb 2024 – June 2024',
    description: 'Architected CTF platform with specialized security challenges in cryptography and web security. Ensured 99.9% uptime by configuring and monitoring Nginx/Apache servers on Debian-based systems.',
    highlights: ['Linux', 'Nginx/Apache', 'CTF Platform', 'Security', 'System Administration'],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="border-t border-border px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Experience</h2>
          <div className="mt-2 h-1 w-20 rounded-full bg-gradient-to-r from-primary to-accent"></div>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className="group rounded-lg border border-border bg-card/50 p-6 transition-all hover:border-primary/50 hover:bg-card/80"
            >
              {/* Header */}
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-3 w-3 rounded-full bg-gradient-to-br from-primary to-accent"></div>
                    <h3 className="text-xl font-bold text-foreground">{exp.position}</h3>
                  </div>
                  <p className="text-lg text-primary font-medium">{exp.company}</p>
                </div>
              </div>

              {/* Details */}
              <div className="mb-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-accent" />
                  {exp.period}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-primary" />
                  {exp.location}
                </div>
              </div>

              {/* Description */}
              <p className="mb-4 leading-relaxed text-muted-foreground">
                {exp.description}
              </p>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {exp.highlights.map((skill, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary border border-primary/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
