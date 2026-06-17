'use client';

import { motion } from 'framer-motion';

export function NeonFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-cyan-500/20 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold mb-4">
            <span className="neon-glow">Ashutosh Tiwari</span>
          </h3>

          <p className="text-gray-400 mb-6">
            Building the future, one line of code at a time
          </p>

          <div className="flex justify-center gap-6 mb-8">
            {[
              { name: 'GitHub', href: 'https://github.com' },
              { name: 'LinkedIn', href: 'https://linkedin.com' },
              { name: 'Twitter', href: 'https://twitter.com' },
              { name: 'Email', href: 'mailto:contact@example.com' },
            ].map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, color: '#00d9ff' }}
                className="text-gray-400 hover:text-cyan-400 transition-colors text-sm font-medium"
              >
                {link.name}
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block p-4 rounded-lg neon-border mb-6"
          >
            <p className="text-sm text-cyan-400 font-mono">
              &lt;/portfolio&gt;
            </p>
          </motion.div>

          <p className="text-gray-500 text-sm">
            © {currentYear} Ashutosh Tiwari. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
