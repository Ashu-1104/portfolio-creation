'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useMotionTemplate, useSpring } from 'framer-motion';

/**
 * A single, quiet, site-wide light source that follows the pointer.
 * This is the one signature motion effect for the whole portfolio —
 * everything else stays disciplined so this reads as intentional
 * rather than scattered decoration.
 */
export function CursorGlow() {
  const mouseX = useMotionValue(-600);
  const mouseY = useMotionValue(-600);
  const x = useSpring(mouseX, { stiffness: 55, damping: 20, mass: 0.6 });
  const y = useSpring(mouseY, { stiffness: 55, damping: 20, mass: 0.6 });
  const background = useMotionTemplate`radial-gradient(600px circle at ${x}px ${y}px, rgba(16,185,129,0.07), transparent 70%)`;
  const ready = useRef(false);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!ready.current) {
        mouseX.jump(e.clientX);
        mouseY.jump(e.clientY);
        ready.current = true;
      } else {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] hidden md:block motion-reduce:hidden"
      style={{ background }}
    />
  );
}
