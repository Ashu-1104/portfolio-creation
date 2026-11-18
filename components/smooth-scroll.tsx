'use client';

// Smooth, eased page scrolling (Lenis). In-page links (#projects, ...) glide
// to their section. Off for people who prefer reduced motion.
import { useEffect } from 'react';
import Lenis from 'lenis';

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    let frame = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest('a[href^="#"]');
      const hash = link?.getAttribute('href');
      if (!hash || hash === '#') return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -64 });
      history.replaceState(null, '', hash);
    };
    document.addEventListener('click', onClick);
    // pages with a dialog open pause smooth scrolling of the page behind
    const stop = () => lenis.stop();
    const start = () => lenis.start();
    window.addEventListener('lenis-stop', stop);
    window.addEventListener('lenis-start', start);
    return () => {
      window.removeEventListener('lenis-stop', stop);
      window.removeEventListener('lenis-start', start);
      cancelAnimationFrame(frame);
      document.removeEventListener('click', onClick);
      lenis.destroy();
    };
  }, []);
  return null;
}
