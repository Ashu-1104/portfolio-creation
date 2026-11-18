'use client';

import dynamic from 'next/dynamic';
import { Mail } from 'lucide-react';

const WaveFooter = dynamic(() => import('./three/wave-footer'), { ssr: false });

const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

export function DeveloperFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative h-[340px] md:h-[380px] overflow-hidden border-t border-zinc-900">
      {/* glowing 3D wave grid that ripples under the mouse */}
      <WaveFooter />
      <div className="relative z-10 h-full max-w-5xl mx-auto px-6 flex flex-col items-center justify-center gap-6 pointer-events-none">
        {/* floating AT badge */}
        <span className="footer-badge w-16 h-16 rounded-full bg-zinc-950 border-[3px] border-emerald-500 shadow-[0_0_40px_rgba(16,185,129,0.45)] flex items-center justify-center font-black text-2xl tracking-tighter">
          <span className="text-zinc-100">A</span><span className="text-emerald-500">T</span>
        </span>
        <p className="text-zinc-400 text-sm text-center">Thanks for scrolling all the way down. Let&apos;s build something together.</p>
        <div className="flex gap-6 pointer-events-auto">
          <a href="https://github.com/Ashu-1104" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-zinc-500 hover:text-emerald-500 transition-colors">
            <GithubIcon size={20} />
          </a>
          <a href="https://www.linkedin.com/in/ashutosh-tiwari-397206237" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-zinc-500 hover:text-emerald-500 transition-colors">
            <LinkedinIcon size={20} />
          </a>
          <a href="mailto:ashutoshtiwari110504@gmail.com" aria-label="Email" className="text-zinc-500 hover:text-emerald-500 transition-colors">
            <Mail size={20} />
          </a>
        </div>
        <p className="text-zinc-600 text-xs font-mono uppercase tracking-widest text-center">
          &copy; {currentYear} · Designed and coded by Ashutosh Tiwari
        </p>
      </div>
    </footer>
  );
}
