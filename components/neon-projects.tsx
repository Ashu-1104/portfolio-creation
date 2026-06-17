'use client';

import { motion } from 'framer-motion';
import { FlipCard } from './flip-card';

const projects = [
  {
    title: 'Nexus Bank',
    description: 'A comprehensive banking system built with PHP backend and interactive frontend. Features include account management, transaction history, and real-time balance updates with secure authentication.',
    technologies: ['PHP', 'JavaScript', 'MySQL', 'HTML/CSS', 'Bootstrap'],
    link: 'https://github.com',
  },
  {
    title: 'TikTok Clone',
    description: 'Full-featured video sharing platform with React frontend and Node.js backend. Implements video upload, stream processing, user engagement metrics, and real-time notifications.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Firebase'],
    link: 'https://github.com',
  },
  {
    title: 'AI Chat Assistant',
    description: 'Intelligent chatbot powered by modern AI APIs. Features natural language processing, context awareness, and multi-turn conversations with real-time streaming responses.',
    technologies: ['Next.js', 'Python', 'OpenAI API', 'TypeScript', 'Supabase'],
    link: 'https://github.com',
  },
  {
    title: 'Task Management System',
    description: 'Collaborative task management tool with real-time synchronization. Supports team collaboration, deadline tracking, progress visualization, and automated notifications.',
    technologies: ['Next.js', 'PostgreSQL', 'Prisma', 'WebSocket', 'Tailwind CSS'],
    link: 'https://github.com',
  },
];

export function NeonProjects() {
  return (
    <section id="projects" className="relative min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="neon-glow-purple">Featured</span>{' '}
            <span className="bg-gradient-to-r from-purple-400 to-magenta-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            A selection of my most impactful work showcasing technical skills and creative problem-solving
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <FlipCard key={project.title} {...project} index={index} />
          ))}
        </div>

        {/* View More Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg neon-border font-semibold text-cyan-400 hover:text-cyan-300 transition-all"
          >
            View All Projects on GitHub →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
