'use client';

// About section: a short intro next to a 3D desk scene.
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, MapPin, Sparkles } from 'lucide-react';
import { RevealText } from './interactions';
import { Heading3D } from './heading-3d';

const DevDesk = dynamic(() => import('./three/dev-desk'), {
  ssr: false,
  loading: () => <div className="w-full h-full rounded-3xl skeleton-shimmer" />,
});

const facts = [
  { icon: <Briefcase size={16} />, label: 'Now', value: 'Softaculous · SecLayer & Webuzo' },
  { icon: <MapPin size={16} />, label: 'Based in', value: 'Mumbai, India' },
  { icon: <GraduationCap size={16} />, label: 'Studied', value: 'B.Sc. IT, Mumbai University' },
  { icon: <Sparkles size={16} />, label: 'Open to', value: 'Full-stack roles & projects' },
];

export function DeveloperAbout() {
  return (
    <section id="about-me" className="py-24 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="h-[340px] md:h-[440px] rounded-3xl border border-zinc-800 overflow-hidden bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.08),transparent_70%)]">
          <DevDesk />
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-6">
          <h2 className="font-mono text-emerald-500 text-sm tracking-widest uppercase">./about</h2>
          <Heading3D className="text-4xl font-bold text-zinc-100"><RevealText text="Behind the code" /></Heading3D>
          <p className="text-zinc-400 leading-relaxed">
            I&apos;m a full-stack developer with 1.5+ years of experience building web applications with React, Next.js,
            TypeScript and Node.js. At Softaculous I develop and manage SecLayer, a firewall and intrusion-prevention
            product for Linux hosting servers, and I owned the complete frontend of an AI startup&apos;s platform.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            I like products that are fast, secure and pleasant to use, and I enjoy owning them end to end: from the
            database and server to the last animation on the screen.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 pt-2">
            {facts.map((f) => (
              <div key={f.label} className="spotlight flex items-center gap-3 p-4 rounded-xl border border-zinc-800 bg-[var(--panel)]">
                <span className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center flex-shrink-0">{f.icon}</span>
                <span>
                  <span className="block font-mono text-[10px] text-zinc-500 uppercase tracking-widest">{f.label}</span>
                  <span className="block text-sm text-zinc-200">{f.value}</span>
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
