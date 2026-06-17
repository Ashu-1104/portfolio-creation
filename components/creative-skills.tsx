'use client';

import { motion } from 'framer-motion';
import { Award, CheckCircle2, Cpu, Globe, Database, Shield } from 'lucide-react';

export function CreativeSkills() {
  const skillCategories = [
    {
      title: 'Frontend',
      icon: <Globe size={20} />,
      color: 'text-primary',
      skills: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Alpine.js', 'HTML5', 'CSS3'],
    },
    {
      title: 'Backend',
      icon: <Cpu size={20} />,
      color: 'text-secondary',
      skills: ['PHP', 'Python', 'Node.js', 'C++', 'REST APIs', 'Bash Scripting'],
    },
    {
      title: 'Infrastructure',
      icon: <Database size={20} />,
      color: 'text-accent',
      skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Linux (Debian/RHEL)'],
    },
    {
      title: 'Security & DevOps',
      icon: <Shield size={20} />,
      color: 'text-emerald-400',
      skills: ['Web Security', 'Git', 'CI/CD', 'Query Optimization', 'Server Mgmt'],
    },
  ];

  const certifications = [
    { name: 'React.js Mastery', issuer: 'Scalar', url: '#' },
    { name: 'Advanced Python Architecture', issuer: 'TuteDude', url: '#' },
    { name: 'Core Computing Principles', issuer: 'GeeksforGeeks', url: '#' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <section id="skills" className="py-32 px-6 bg-background relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="text-sm uppercase tracking-[0.3em] text-primary font-bold mb-4">Abilities</h2>
          <h3 className="text-4xl md:text-6xl font-black tracking-tight">Technical <span className="text-muted-foreground">Expertise</span></h3>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {skillCategories.map((category, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="p-8 bg-card/40 backdrop-blur-md border border-border/50 rounded-3xl hover:border-primary/30 transition-all group"
            >
              <div className={`mb-6 p-3 w-fit rounded-2xl bg-card border border-border/50 ${category.color} group-hover:scale-110 transition-transform`}>
                {category.icon}
              </div>
              <h3 className="text-xl font-bold mb-6">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-xl bg-background/50 border border-border/50 text-[11px] font-bold uppercase tracking-wider text-foreground/70"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Certifications & Academic Excellence */}
        <div className="grid lg:grid-cols-3 gap-8 pt-20 border-t border-border/30">
          <div className="lg:col-span-1">
            <h3 className="text-3xl font-black tracking-tight mb-4">Credentials & <br/><span className="text-primary">Recognition</span></h3>
            <p className="text-muted-foreground">Validating expertise through rigorous certification and academic performance.</p>
          </div>
          
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-6 bg-primary/5 border border-primary/20 rounded-3xl flex items-center gap-6"
            >
              <div className="p-4 rounded-2xl bg-primary/10 text-primary">
                <Award size={32} />
              </div>
              <div>
                <p className="text-2xl font-black text-foreground">9.62 CGPA</p>
                <p className="text-sm text-muted-foreground">Academic Distinction</p>
              </div>
            </motion.div>

            {certifications.map((cert, index) => (
              <motion.a
                key={index}
                href={cert.url}
                whileHover={{ y: -5 }}
                className="p-6 bg-card/40 backdrop-blur-md border border-border/50 rounded-3xl flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-secondary/10 text-secondary">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-foreground group-hover:text-primary transition-colors">{cert.name}</p>
                    <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                  </div>
                </div>
                <ArrowUpRight className="text-muted-foreground group-hover:text-primary transition-colors" size={20} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ArrowUpRight({ className, size }: { className?: string, size?: number }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size || 24} 
      height={size || 24} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M7 7h10v10"/><path d="M7 17 17 7"/>
    </svg>
  );
}
