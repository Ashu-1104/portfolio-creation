'use client';

// Quick numbers under the hero; each one counts up when it scrolls into view.
import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView } from 'framer-motion';

const stats = [
  { value: 1.5, decimals: 1, suffix: '+', label: 'Years building for production' },
  { value: 3, decimals: 0, suffix: '', label: 'Companies worked with' },
  { value: 20, decimals: 0, suffix: '+', label: 'Technologies in daily use' },
];

function Counter({ value, decimals, suffix }: { value: number; decimals: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, { duration: 1.6, ease: [0.16, 1, 0.3, 1], onUpdate: setShown });
    return () => controls.stop();
  }, [inView, value]);
  return (
    <span ref={ref}>
      {shown.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export function DeveloperStats() {
  return (
    <section aria-label="At a glance" className="px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-px bg-zinc-800 border border-zinc-800 rounded-2xl overflow-hidden">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="spotlight p-6 md:p-8 bg-[var(--panel)]"
          >
            <p className="text-4xl md:text-5xl font-black text-zinc-100 tracking-tight">
              <Counter value={s.value} decimals={s.decimals} suffix={s.suffix} />
            </p>
            <p className="mt-2 font-mono text-[11px] text-zinc-500 uppercase tracking-wider">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
