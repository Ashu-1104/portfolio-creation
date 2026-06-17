'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

interface FlipCardProps {
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  link?: string;
  index: number;
}

export function FlipCard({ title, description, technologies, link, index }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="h-80 cursor-pointer perspective"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: 'preserve-3d' as const }}
      >
        {/* Front */}
        <div
          className="absolute w-full h-full glassmorphism rounded-lg p-6 flex flex-col justify-between border-2 border-cyan-500/30 hover:border-cyan-500/60 transition-all"
          style={{ backfaceVisibility: 'hidden' as const }}
        >
          <div>
            <h3 className="text-2xl font-bold neon-glow mb-2">{title}</h3>
            <p className="text-sm text-gray-300">{description.substring(0, 100)}...</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {technologies.slice(0, 3).map((tech) => (
              <span key={tech} className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs border border-cyan-500/30">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute w-full h-full glassmorphism rounded-lg p-6 flex flex-col justify-between border-2 border-purple-500/30 hover:border-purple-500/60 transition-all"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div>
            <h3 className="text-xl font-bold neon-glow-purple mb-3">{title}</h3>
            <p className="text-sm text-gray-300 mb-4">{description}</p>
            <div className="space-y-2">
              <p className="text-xs text-gray-400">
                <span className="text-purple-400 font-semibold">Technologies:</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <span key={tech} className="px-2 py-1 rounded text-xs bg-purple-500/20 text-purple-300 border border-purple-500/40">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold text-sm"
            >
              View Project <ExternalLink size={16} />
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
