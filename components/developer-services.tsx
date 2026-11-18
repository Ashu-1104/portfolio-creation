'use client';

// "What I can do": four services with solid 3D icons that spin on hover.
import { motion } from 'framer-motion';
import { Layers, Monitor, ShieldCheck, Zap } from 'lucide-react';
import { RevealText } from './interactions';
import { Heading3D } from './heading-3d';
import { Icon3D } from './icon-3d';
import { TiltCard } from './tilt-card';

const services = [
  {
    icon: <Layers size={46} strokeWidth={1.7} />,
    title: 'Full-stack web apps',
    text: 'From database to deployment: React or Next.js frontends with Node.js APIs, MongoDB or PostgreSQL, shipped on Vercel with tests and CI.',
    tags: ['React / Next.js', 'Node.js', 'MongoDB', 'PostgreSQL'],
  },
  {
    icon: <Monitor size={46} strokeWidth={1.7} />,
    title: 'Frontend & UI',
    text: 'Fast, responsive, accessible interfaces in TypeScript and Tailwind, with motion and 3D where it helps, like this site.',
    tags: ['TypeScript', 'Tailwind', 'Framer Motion', 'Three.js'],
  },
  {
    icon: <ShieldCheck size={46} strokeWidth={1.7} />,
    title: 'Linux & server security',
    text: 'Firewalls, intrusion prevention, hardening and monitoring for Linux hosting servers, from building SecLayer.',
    tags: ['iptables / nftables', 'Perl', 'Hardening', 'Monitoring'],
  },
  {
    icon: <Zap size={46} strokeWidth={1.7} />,
    title: 'APIs & real-time',
    text: 'REST APIs, auth, live updates with Server-Sent Events, background jobs and integrations with third-party and AI APIs.',
    tags: ['REST', 'JWT', 'Server-Sent Events', 'LLM APIs'],
  },
];

export function DeveloperServices() {
  return (
    <section id="services" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-4 mb-14">
          <h2 className="font-mono text-emerald-500 text-sm tracking-widest uppercase">./services</h2>
          <Heading3D className="text-4xl font-bold text-zinc-100"><RevealText text="What I can do for you" /></Heading3D>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 40, rotateX: -25 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformPerspective: 1000 }}
            >
              <TiltCard className="group spotlight h-full p-6 rounded-2xl border border-zinc-800 bg-[var(--panel)] hover:border-emerald-500/40 transition-colors">
                <div className="mb-6"><Icon3D size={64}>{s.icon}</Icon3D></div>
                <h4 className="text-lg font-bold text-zinc-100 mb-2">{s.title}</h4>
                <p className="text-sm text-zinc-400 leading-relaxed mb-5">{s.text}</p>
                <div className="flex flex-wrap gap-1.5">
                  {s.tags.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 font-mono text-[10px] text-zinc-500 uppercase">{t}</span>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
