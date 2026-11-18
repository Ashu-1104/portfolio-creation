'use client';

// Light / dark switch. The choice is saved in this browser; without a saved
// choice the site is dark (see the script in app/layout.tsx).
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export function useIsLight() {
  const [light, setLight] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    const read = () => setLight(root.classList.contains('light'));
    read();
    const observer = new MutationObserver(read);
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);
  return light;
}

export function ThemeToggle({ className = '' }: { className?: string }) {
  const light = useIsLight();
  const toggle = () => {
    const next = !light;
    document.documentElement.classList.toggle('light', next);
    try {
      localStorage.setItem('theme', next ? 'light' : 'dark');
    } catch {}
  };
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={light ? 'Switch to dark theme' : 'Switch to light theme'}
      title={light ? 'Dark theme' : 'Light theme'}
      className={`w-9 h-9 flex items-center justify-center rounded-md border border-zinc-800 text-zinc-400 hover:text-emerald-500 hover:border-emerald-500/40 transition-colors ${className}`}
    >
      {light ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  );
}
