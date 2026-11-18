'use client';

// 404: lost in space. The AT badge drifts in the space-warp; one button home.
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

const SpaceWarp = dynamic(() => import('@/components/three/space-warp'), { ssr: false });

export default function NotFound() {
  return (
    <main className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      <SpaceWarp />
      <div className="relative text-center">
        <motion.div
          className="mx-auto mb-10 w-28 h-28 rounded-full bg-zinc-950 border-4 border-emerald-500 shadow-[0_0_60px_rgba(16,185,129,0.5)] flex items-center justify-center font-black text-4xl tracking-tighter"
          animate={{ y: [0, -18, 0], rotate: [0, 8, -6, 0], rotateY: [0, 180, 360] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformPerspective: 600 }}
          aria-hidden="true"
        >
          <span className="text-zinc-100">A</span><span className="text-emerald-500">T</span>
        </motion.div>
        <p className="font-mono text-emerald-500 text-sm tracking-[0.4em] uppercase mb-3">error 404</p>
        <h1 className="text-5xl md:text-7xl font-black text-zinc-100 mb-4">Lost in space</h1>
        <p className="text-zinc-400 max-w-md mx-auto mb-10">This page drifted out of orbit. Let&apos;s get you back to base.</p>
        <a href="/" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md bg-emerald-500 text-zinc-950 font-bold hover:bg-emerald-400 transition-colors">
          <Home size={18} /> Beam me home
        </a>
      </div>
    </main>
  );
}
