'use client';

// Slim rail of dots on the right edge, one per section. The current section's
// dot glows; hover shows its name; click jumps there. Desktop only.
import { useEffect, useState } from 'react';

const SECTIONS = [
  ['about', 'Home'], ['about-me', 'About'], ['services', 'Services'], ['experience', 'Experience'], ['journey', 'Journey'],
  ['projects', 'Projects'], ['skills', 'Skills'], ['terminal', 'Terminal'], ['resume', 'Resume'], ['contact', 'Contact'],
] as const;

export function SectionDots() {
  const [active, setActive] = useState('about');
  useEffect(() => {
    const update = () => {
      const line = window.innerHeight * 0.4;
      let current: string = SECTIONS[0][0];
      for (const [id] of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return (
    <nav className="hidden xl:flex fixed right-5 top-1/2 -translate-y-1/2 z-40 flex-col gap-3" aria-label="Sections">
      {SECTIONS.map(([id, label]) => {
        const on = id === active;
        return (
          <a key={id} href={`#${id}`} className="group relative flex items-center justify-end" aria-label={label} aria-current={on ? 'true' : undefined}>
            <span className="absolute right-6 whitespace-nowrap px-2 py-1 rounded-md bg-zinc-950/90 border border-zinc-800 font-mono text-[10px] text-zinc-300 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all pointer-events-none">
              {label}
            </span>
            <span className={`block rounded-full transition-all duration-300 ${on ? 'w-3 h-3 bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.9)]' : 'w-2 h-2 bg-zinc-600 group-hover:bg-emerald-400'}`} />
          </a>
        );
      })}
    </nav>
  );
}
