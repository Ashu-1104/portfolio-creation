'use client';

import { motion } from 'framer-motion';
import { Code2, Share2, Mail, ArrowDown } from 'lucide-react';

export function NeonHero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  const codeString = ['const', 'developer', '=', '{', 'passionate: true,', 'creative: true', '}'];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-6 pt-20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto text-center z-10"
      >
        {/* Animated Code Block */}
        <motion.div
          variants={itemVariants}
          className="mb-8 inline-block"
        >
          <div className="neon-border rounded-lg p-6 font-mono text-sm md:text-base overflow-x-auto">
            <div className="text-cyan-400">{'> const developer = {'}</div>
            {codeString.slice(1, -1).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="text-gray-300 ml-4"
              >
                <span className="text-purple-400">{line}</span>
              </motion.div>
            ))}
            <div className="text-cyan-400">{'}'}</div>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.div variants={itemVariants} className="mb-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="neon-glow">Ashutosh</span>{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-magenta-400 bg-clip-text text-transparent">
              Tiwari
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-cyan-400 font-semibold">Full-Stack Developer</p>
        </motion.div>

        {/* Subheading */}
        <motion.p
          variants={itemVariants}
          className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-8"
        >
          Building innovative digital experiences with{' '}
          <span className="text-purple-400 font-semibold">React</span>,{' '}
          <span className="text-cyan-400 font-semibold">Next.js</span>, and cutting-edge web technologies
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 217, 255, 0.6)' }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-lg neon-border font-semibold text-cyan-400 hover:text-cyan-300 transition-all"
          >
            View My Work
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(177, 0, 255, 0.6)' }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-lg border-2 border-purple-500 font-semibold text-purple-400 hover:text-purple-300 transition-all"
          >
            Get In Touch
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={itemVariants}
          className="flex gap-6 justify-center mb-12"
        >
          {[
            { icon: Code2, href: 'https://github.com', label: 'GitHub' },
            { icon: Share2, href: 'https://linkedin.com', label: 'LinkedIn' },
            { icon: Mail, href: 'mailto:contact@example.com', label: 'Email' },
          ].map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -5 }}
              className="p-4 rounded-lg glassmorphism border border-cyan-500/30 text-cyan-400 hover:border-cyan-400 hover:text-cyan-300 transition-all"
              aria-label={social.label}
            >
              <social.icon size={24} />
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex justify-center"
        >
          <ArrowDown className="text-cyan-400" size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
}
