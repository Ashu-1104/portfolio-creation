'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useSpring } from 'framer-motion';
import { IdCard, Menu, Search, X } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { Magnetic } from './interactions';
import { SoundToggle } from './sound-effects';
import { openPalette } from './command-palette';
import { openBusinessCard } from './business-card';

export function DeveloperHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'About', href: '#about-me' },
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
      {/* reading-progress line: doubles as the "how far down the page" indicator */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-500 origin-left"
        style={{ scaleX: progress }}
      />

      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group">
          {/* AT badge logo (same as the tab icon), spins once on hover */}
          <span className="w-9 h-9 rounded-full bg-zinc-950 border-2 border-emerald-500 flex items-center justify-center font-black text-sm tracking-tighter group-hover:[transform:rotateY(360deg)] transition-transform duration-700">
            <span className="text-zinc-100">A</span><span className="text-emerald-500">T</span>
          </span>
          <span className="font-mono font-bold text-xl tracking-tight text-zinc-100">
            ashu<span className="text-emerald-500">.</span>dev
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
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
          <button
            type="button"
            onClick={openPalette}
            className="flex items-center gap-2 h-9 px-3 rounded-md border border-zinc-800 text-zinc-500 hover:text-emerald-500 hover:border-emerald-500/40 transition-colors text-xs"
            aria-label="Open command palette"
          >
            <Search size={14} /> <kbd className="font-mono">Ctrl K</kbd>
          </button>
          <button type="button" onClick={openBusinessCard} aria-label="Share my business card" title="My business card" className="w-9 h-9 flex items-center justify-center rounded-md border border-zinc-800 text-zinc-400 hover:text-emerald-500 hover:border-emerald-500/40 transition-colors"><IdCard size={16} /></button>
          <SoundToggle />
          <ThemeToggle />
<Magnetic>
          <Link
            href="#contact"
            className="px-5 py-2 bg-zinc-100 text-zinc-950 rounded-md text-sm font-bold hover:bg-emerald-500 transition-colors"
          >
            Connect
          </Link>
          </Magnetic>
        </nav>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-3">
          <button type="button" onClick={openPalette} aria-label="Open command palette" className="w-9 h-9 flex items-center justify-center rounded-md border border-zinc-800 text-zinc-400"><Search size={16} /></button>
          <button type="button" onClick={openBusinessCard} aria-label="Share my business card" title="My business card" className="w-9 h-9 flex items-center justify-center rounded-md border border-zinc-800 text-zinc-400 hover:text-emerald-500 hover:border-emerald-500/40 transition-colors"><IdCard size={16} /></button>
          <SoundToggle />
          <ThemeToggle />
          <button
            className="text-zinc-100"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-zinc-900 border-b border-zinc-800 p-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4">
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
