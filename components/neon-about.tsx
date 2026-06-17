'use client';

import { motion } from 'framer-motion';

export function NeonAbout() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="about" className="relative min-h-screen py-20 px-6 flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Left Content */}
          <div>
            <motion.h2 variants={itemVariants} className="text-5xl md:text-6xl font-bold mb-6">
              <span className="neon-glow-magenta">About</span>{' '}
              <span className="bg-gradient-to-r from-magenta-400 to-cyan-400 bg-clip-text text-transparent">
                Me
              </span>
            </motion.h2>

            <motion.p variants={itemVariants} className="text-gray-300 text-lg mb-6 leading-relaxed">
              I&apos;m a passionate Full-Stack Developer with a strong foundation in both frontend and backend technologies. With a focus on clean code and user-centric design, I build scalable, performant web applications that solve real-world problems.
            </motion.p>

            <motion.p variants={itemVariants} className="text-gray-300 text-lg mb-8 leading-relaxed">
              Currently pursuing my BTech in CSE with a 9.62 CGPA, I&apos;m committed to continuous learning and staying updated with the latest technologies. I thrive in collaborative environments and love tackling complex challenges.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="space-y-3"
            >
              {[
                'Full-Stack Web Development',
                'Modern Frontend Frameworks (React, Next.js)',
                'Backend Architecture & Database Design',
                'AI Integration & APIs',
                'Security & Performance Optimization',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400" />
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Content - Experience Timeline */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="neon-border rounded-lg p-6">
              <h3 className="text-2xl font-bold text-cyan-400 mb-2">Experience</h3>
              <div className="space-y-4">
                <div className="border-l-2 border-cyan-500 pl-4 py-2">
                  <p className="text-purple-400 font-semibold">Full-Stack Developer</p>
                  <p className="text-gray-400 text-sm">Current | Building innovative web solutions</p>
                </div>
                <div className="border-l-2 border-purple-500 pl-4 py-2">
                  <p className="text-magenta-400 font-semibold">Web Development Intern</p>
                  <p className="text-gray-400 text-sm">Previous | Learned best practices & technologies</p>
                </div>
              </div>
            </div>

            <div className="neon-border-magenta rounded-lg p-6">
              <h3 className="text-2xl font-bold text-magenta-400 mb-2">Education</h3>
              <p className="text-gray-300 font-semibold mb-1">BTech in Computer Science Engineering</p>
              <p className="text-gray-400 text-sm mb-3">Current | CGPA: 9.62</p>
              <p className="text-purple-400 font-semibold">Specialized in:</p>
              <p className="text-gray-300 text-sm">Full-Stack Development, Web Security, AI Integration</p>
            </div>

            <div className="neon-border-purple rounded-lg p-6">
              <h3 className="text-2xl font-bold text-purple-400 mb-3">Certifications</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>✓ Advanced Web Development</li>
                <li>✓ React & Next.js Mastery</li>
                <li>✓ Full-Stack JavaScript</li>
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
