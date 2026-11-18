'use client';

// Section title with depth: an extruded shadow stack, and a gentle tilt toward
// the mouse while it's on screen.
import { useEffect, useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

export function Heading3D({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduce = useReducedMotion();
  const rx = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });
  useEffect(() => {
    if (reduce) return;
    const move = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      const dx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
      const dy = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
      ry.set(dx * 14);
      rx.set(-dy * 10);
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, [reduce, rx, ry]);
  return (
    <motion.h3 ref={ref} className={`heading-3d ${className}`} style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformPerspective: 900 }}>
      {children}
    </motion.h3>
  );
}
