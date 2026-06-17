export function ProFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-card/30 py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">Ashutosh Tiwari</h3>
            <p className="text-foreground/60">Full-Stack Developer | Building scalable web solutions</p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-foreground/60 hover:text-foreground transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#experience" className="text-foreground/60 hover:text-foreground transition-colors">
                  Experience
                </a>
              </li>
              <li>
                <a href="#projects" className="text-foreground/60 hover:text-foreground transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#skills" className="text-foreground/60 hover:text-foreground transition-colors">
                  Skills
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Connect</h4>
            <ul className="space-y-2">
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-foreground transition-colors">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-foreground transition-colors">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-foreground transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="mailto:ashutoshtiwari26@gmail.com" className="text-foreground/60 hover:text-foreground transition-colors">
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-foreground/60 text-sm">
            © {currentYear} Ashutosh Tiwari. All rights reserved.
          </p>
          <p className="text-foreground/60 text-sm">
            Built with <span className="text-red-500">❤</span> using Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}
