import { Code2, ExternalLink } from 'lucide-react'

export function ProProjects() {
  const projects = [
    {
      title: 'Nexus Bank - Digital Banking Platform',
      description: 'A comprehensive digital banking platform with account management, fund transfers, and financial analytics.',
      technologies: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'TypeScript', 'Tailwind CSS'],
      features: [
        'Real-time fund transfers with webhook notifications',
        'Advanced analytics dashboard with charts and reports',
        'Secure authentication with JWT and 2FA',
        'Transaction history with filtering and export',
      ],
      links: {
        github: 'https://github.com',
        demo: 'https://demo.example.com',
      },
    },
    {
      title: 'TikTok Clone - Short Video Platform',
      description: 'A short-form video social media platform with video upload, feed algorithm, and social features.',
      technologies: ['React', 'Firebase', 'Node.js', 'MongoDB', 'FFmpeg', 'Redux'],
      features: [
        'Video upload with automatic transcoding',
        'Infinite scroll feed with smart recommendations',
        'Like, comment, and share functionality',
        'User profiles with follow system',
      ],
      links: {
        github: 'https://github.com',
        demo: 'https://demo.example.com',
      },
    },
    {
      title: 'AI Chat Assistant',
      description: 'An intelligent chatbot powered by advanced language models with context awareness and knowledge base integration.',
      technologies: ['Next.js', 'OpenAI API', 'Python', 'PostgreSQL', 'Redis', 'Pinecone'],
      features: [
        'Natural language understanding with context',
        'Knowledge base search with vector embeddings',
        'Multi-turn conversations with history',
        'Rate limiting and abuse prevention',
      ],
      links: {
        github: 'https://github.com',
        demo: 'https://demo.example.com',
      },
    },
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with product catalog, shopping cart, payments, and admin dashboard.',
      technologies: ['Next.js', 'Stripe', 'MongoDB', 'AWS S3', 'Tailwind CSS', 'TypeScript'],
      features: [
        'Product search with filters and sorting',
        'Secure payment processing with Stripe',
        'Admin panel for inventory management',
        'Order tracking and notifications',
      ],
      links: {
        github: 'https://github.com',
        demo: 'https://demo.example.com',
      },
    },
  ]

  return (
    <section id="projects" className="py-20 border-t border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Featured Projects</h2>
          <div className="w-12 h-1 bg-primary rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="group border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-colors">
              <div className="p-8 bg-card h-full flex flex-col">
                <h3 className="text-2xl font-bold text-foreground mb-2">{project.title}</h3>
                <p className="text-foreground/70 mb-4 flex-grow">{project.description}</p>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-foreground mb-3">Features:</h4>
                  <ul className="space-y-2">
                    {project.features.map((feature, i) => (
                      <li key={i} className="text-sm text-foreground/70 flex gap-2">
                        <span className="text-primary">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-foreground mb-3">Tech Stack:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground border border-border rounded-lg hover:border-primary/50 transition-colors"
                  >
                    <Code2 size={18} />
                    Code
                  </a>
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary border border-primary/20 rounded-lg hover:bg-primary/5 transition-colors"
                  >
                    <ExternalLink size={18} />
                    Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
