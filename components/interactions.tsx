'use client';

// Small interaction layer used across the page:
//  - CursorRing: a ring that trails the mouse and grows over links and buttons
//  - Magnetic: wraps a button so it pulls slightly toward the mouse
//  - SpotlightTracker: feeds the mouse position to `.spotlight` cards (CSS glow)
//  - RevealText: headings that rise in word by word when scrolled into view
// All of them stay off on touch screens and for people who prefer reduced motion.
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { usePrefersReducedMotion } from './three/hooks';

function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => setFine(window.matchMedia('(pointer: fine)').matches), []);
  return fine;
}

export function CursorRing() {
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 350, damping: 28, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 350, damping: 28, mass: 0.5 });
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);

  useEffect(() => {
    if (!fine || reduce) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHover(!!(e.target as HTMLElement).closest('a, button, input, textarea, [data-cursor]'));
    };
    const press = () => setDown(true);
    const release = () => setDown(false);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerdown', press);
    window.addEventListener('pointerup', release);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', press);
      window.removeEventListener('pointerup', release);
    };
  }, [fine, reduce, x, y]);

  if (!fine || reduce) return null;
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[90] rounded-full border border-emerald-500/70"
      style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
      animate={{
        width: hover ? 54 : 30,
        height: hover ? 54 : 30,
        backgroundColor: hover ? 'rgba(16,185,129,0.12)' : 'rgba(16,185,129,0)',
        scale: down ? 0.8 : 1,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
    />
  );
}

export function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const x = useSpring(0, { stiffness: 220, damping: 15 });
  const y = useSpring(0, { stiffness: 220, damping: 15 });
  const on = fine && !reduce;
  return (
    <motion.span
      ref={ref}
      className="inline-flex"
      style={on ? { x, y } : undefined}
      onPointerMove={(e) => {
        if (!on || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}

export function SpotlightTracker() {
  useEffect(() => {
    const move = (e: PointerEvent) => {
      const card = (e.target as HTMLElement).closest<HTMLElement>('.spotlight');
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, []);
  return null;
}

export function RevealText({ text, className = '' }: { text: string; className?: string }) {
  const reduce = usePrefersReducedMotion(); // read after mount: server + first render match
  // the visible wrapper watches the viewport; the words (hidden below a clip) follow it
  return (
    <motion.span
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      transition={{ staggerChildren: 0.08 }}
    >
      {text.split(' ').map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.08em]" aria-hidden="true">
          <motion.span
            className="inline-block"
            variants={{ hidden: { y: reduce ? 0 : '110%' }, show: { y: 0 } }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
            {'\u00a0'}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

// Sections tilt up out of 3D perspective (like a page turning toward you) while
// they scroll into view.
export function Section3D({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion(); // read after mount: server + first render match
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.45'] });
  // always the same element (server and browser render identical markup); with reduced
  // motion the values simply stay at "fully visible, no tilt"
  const rotateX = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [16, 0]);
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [90, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.93, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.3, 1]);
  return (
    <motion.div ref={ref} style={{ rotateX, y, scale, opacity, transformPerspective: 1400, transformOrigin: 'center top' }}>
      {children}
    </motion.div>
  );
}
