'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Terminal } from 'lucide-react';

export function DeveloperHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-emerald-500 flex items-center justify-center rounded-md group-hover:rotate-6 transition-transform">
            <Terminal size={18} className="text-zinc-950" />
          </div>
          <span className="font-mono font-bold text-xl tracking-tight text-zinc-100">
            ashu<span className="text-emerald-500">.</span>dev
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link 
              key={item.label} 
              href={item.href}
              className="text-sm font-medium text-zinc-400 hover:text-emerald-500 transition-colors font-mono"
            >
              <span className="text-emerald-500/50 mr-1">0{navItems.indexOf(item) + 1}.</span>
              {item.label}
            </Link>
          ))}
          <Link 
            href="#contact" 
            className="px-5 py-2 bg-zinc-100 text-zinc-950 rounded-md text-sm font-bold hover:bg-emerald-500 transition-colors"
          >
            Connect
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-zinc-100"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-zinc-900 border-b border-zinc-800 p-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4">
          {navItems.map((item) => (
            <Link 
              key={item.label} 
              href={item.href}
              className="text-lg font-mono text-zinc-300"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-emerald-500/50 mr-2">0{navItems.indexOf(item) + 1}.</span>
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
