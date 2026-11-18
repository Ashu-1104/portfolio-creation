'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { RevealText } from './interactions';
import { Heading3D } from './heading-3d';
import { TiltCard } from './tilt-card';
import { Calendar, MapPin } from 'lucide-react';

const experiences = [
  {
    company: 'Softaculous Ltd.',
    position: 'PHP Developer',
    location: 'Mumbai',
    period: 'Jul 2025 – Present',
    points: [
      'Develop and manage SecLayer, the company\u2019s Perl-based firewall and intrusion-prevention product for Linux hosting servers (iptables/nftables), from its start: features, releases and production fixes.',
      'Built integrations with hosting control panels (Webuzo, DirectAdmin) and a Cloudflare proxy, plus file-integrity and setuid-binary monitoring with email alerts.',
      'Built web UI features in JavaScript: an interactive network connection map, redesigned admin pages, multi-language support and a 32-page documentation site with live demos.',
      'Build server-side features, APIs and database logic in PHP for Webuzo, the company\u2019s multi-user hosting control panel.',
    ],
    tech: ['Perl', 'PHP', 'JavaScript', 'iptables / nftables', 'MySQL', 'Linux'],
  },
  {
    company: 'Akobot.ai',
    position: 'Frontend Developer Intern (Part-time)',
    location: 'Remote',
    period: 'Jan 2026 – Jun 2026',
    points: [
      'Owned the complete frontend of the platform with Next.js 15, React, TypeScript and Tailwind CSS, building reusable, type-safe, responsive components.',
      'Integrated real-time AI interfaces with streaming LLM responses.',
    ],
    tech: ['Next.js 15', 'React', 'TypeScript', 'Tailwind CSS', 'LLM streaming'],
  },
  {
    company: 'Talakunchi Network Pvt. Ltd.',
    position: 'Linux System Administrator Intern',
    location: 'Dombivli',
    period: 'Feb 2024 – Jun 2024',
    points: [
      'Built and ran a CTF platform (cryptography and web security) for a 50+ participant district event; hardened Nginx/Apache servers on Debian.',
    ],
    tech: ['Linux', 'Nginx / Apache', 'CTF design', 'Server hardening'],
  },
];

type Experience = (typeof experiences)[number];

// one job: swings in like a door from its side of the timeline, tilts on hover
function ExperienceCard({ exp, index }: { exp: Experience; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reached = useInView(ref, { margin: '0px 0px -45% 0px' }); // lights its dot when the line gets here
  const reduce = useReducedMotion();
  const left = index % 2 === 0;
  const side = left ? -1 : 1;
  return (
    <div ref={ref} className={`relative grid lg:grid-cols-2 lg:gap-16 ${index > 0 ? 'lg:-mt-28' : ''}`}>
      {/* dot on the timeline */}
      <span className="absolute left-4 lg:left-1/2 top-8 -translate-x-1/2 z-10 flex items-center justify-center">
        <span className={`w-4 h-4 rounded-full border-4 border-[var(--page)] transition-colors duration-500 ${reached ? 'bg-emerald-500' : 'bg-zinc-700'}`} />
        {reached && !reduce && <span className="absolute w-4 h-4 rounded-full bg-emerald-500/60 animate-ping" />}
      </span>

      <motion.div
        className={`pl-12 lg:pl-0 ${left ? 'lg:col-start-1' : 'lg:col-start-2'}`}
        style={{ perspective: 1200 }}
        initial={reduce ? false : { opacity: 0, rotateY: side * 38, x: side * 50, z: -80 }}
        whileInView={{ opacity: 1, rotateY: 0, x: 0, z: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <TiltCard className="spotlight rounded-2xl border border-zinc-800 bg-[var(--panel)] p-6 md:p-7 shadow-2xl">
          <div className="flex items-start gap-4 mb-5">
            <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-700 text-white font-black text-lg flex items-center justify-center shadow-lg shadow-emerald-500/20 flex-shrink-0">
              {exp.company[0]}
            </span>
            <div className="min-w-0">
              <h4 className="text-lg md:text-xl font-bold text-zinc-100 leading-snug">{exp.position}</h4>
              <p className="text-emerald-500 font-mono text-sm">{exp.company}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-5 font-mono text-[11px] text-zinc-500">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-zinc-800 bg-zinc-900/60"><Calendar size={12} />{exp.period}</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-zinc-800 bg-zinc-900/60"><MapPin size={12} />{exp.location}</span>
          </div>
          <ul className="space-y-2 mb-5">
            {exp.points.map((point, i) => (
              <li key={i} className="flex gap-3 text-zinc-400 text-sm leading-relaxed">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-500/70 flex-shrink-0" />
                {point}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2">
            {exp.tech.map((t, i) => (
              <span key={i} className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded text-[10px] font-mono text-zinc-500 uppercase">
                {t}
              </span>
            ))}
          </div>
        </TiltCard>
      </motion.div>
    </div>
  );
}

export function DeveloperExperience() {
  const timeline = useRef<HTMLDivElement>(null);
  // the line fills as the timeline passes the middle of the screen
  const { scrollYProgress } = useScroll({ target: timeline, offset: ['start 0.6', 'end 0.6'] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-4 mb-16">
          <h2 className="font-mono text-emerald-500 text-sm tracking-widest uppercase">./experience</h2>
          <Heading3D className="text-4xl font-bold text-zinc-100"><RevealText text="Professional Journey" /></Heading3D>
        </div>

        <div ref={timeline} className="relative space-y-14 lg:space-y-6">
          {/* the line, and its glowing fill drawn by scrolling */}
          <span className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-zinc-800" />
          <motion.span
            className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 origin-top bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600 shadow-[0_0_12px_rgba(16,185,129,0.7)]"
            style={{ scaleY: fill }}
          />
          {experiences.map((exp, index) => (
            <ExperienceCard key={exp.company} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
