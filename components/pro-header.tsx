import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export function ProHeader() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <nav className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <a href="#home" className="text-2xl font-bold text-primary">
            AT
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-muted rounded-lg"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-4 pb-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </nav>
    </header>
  )
}
