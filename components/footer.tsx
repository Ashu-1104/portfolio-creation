import { Code2, Share2, Mail, MessageCircle } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Code2,
      href: 'https://github.com',
      label: 'GitHub Profile',
    },
    {
      name: 'LinkedIn',
      icon: Share2,
      href: 'https://linkedin.com',
      label: 'LinkedIn Profile',
    },
    {
      name: 'Twitter',
      icon: MessageCircle,
      href: 'https://twitter.com',
      label: 'Twitter Profile',
    },
    {
      name: 'Email',
      icon: Mail,
      href: 'mailto:ashutoshtiwari110504@gmail.com',
      label: 'Send an email',
    },
  ]

  return (
    <footer className="border-t border-border bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-8 md:grid-cols-3 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-foreground mb-2">Ashutosh Tiwari</h3>
            <p className="text-sm text-muted-foreground">
              Full-Stack Developer crafting scalable web applications with modern technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Quick Links</h3>
            <div className="space-y-2 text-sm">
              <a href="#about" className="block text-muted-foreground hover:text-primary transition-colors">
                About
              </a>
              <a href="#projects" className="block text-muted-foreground hover:text-primary transition-colors">
                Projects
              </a>
              <a href="#contact" className="block text-muted-foreground hover:text-primary transition-colors">
                Contact
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Connect</h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="rounded-lg bg-card border border-border p-2 text-muted-foreground hover:border-primary/50 hover:bg-primary/10 hover:text-primary transition-all"
                  >
                    <Icon size={18} />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {currentYear} Ashutosh Tiwari. All rights reserved. • Built with Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}
