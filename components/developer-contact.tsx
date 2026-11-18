'use client';

import { motion } from 'framer-motion';
import { ContactForm } from './contact-form';
import { Icon3D } from './icon-3d';
import { RevealText } from './interactions';
import { Heading3D } from './heading-3d';
import dynamic from 'next/dynamic';

const FloatingShapes = dynamic(() => import('./three/floating-shapes'), { ssr: false });
import { Mail, MapPin, MessageSquare, ExternalLink } from 'lucide-react';

export function DeveloperContact() {
  const contactMethods = [
    { 
      icon: <Mail size={44} strokeWidth={1.8} />, 
      label: 'Email', 
      value: 'ashutoshtiwari110504@gmail.com', 
      href: 'mailto:ashutoshtiwari110504@gmail.com',
      description: 'Send me an email for professional inquiries.',
      color: 'emerald'
    },
    { 
      icon: <MessageSquare size={44} strokeWidth={1.8} />, 
      label: 'WhatsApp', 
      value: '+91 90964 52696', 
      href: "https://wa.me/919096452696?text=Hi%20Ashutosh,%20I'm%20interested%20in%20discussing%20a%20project%20with%20you.",
      description: 'Direct chat for quick collaboration and projects.',
      color: 'emerald'
    },
    { 
      icon: <MapPin size={44} strokeWidth={1.8} />, 
      label: 'Location', 
      value: 'Mumbai, India', 
      href: 'https://maps.google.com/?q=Mumbai,+India',
      description: 'Based in Mumbai, Maharashtra.',
      color: 'zinc'
    }
  ];

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      {/* drifting 3D wireframe shapes, behind the content */}
      <div className="absolute inset-0 -z-10"><FloatingShapes /></div>
      {/* Coder-style background pattern */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
      
      <div className="max-w-4xl mx-auto text-center mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h2 className="font-mono text-emerald-500 text-sm tracking-widest uppercase flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] bg-emerald-500/30" />
            ./contact
            <span className="w-8 h-[1px] bg-emerald-500/30" />
          </h2>
          <Heading3D className="text-4xl md:text-5xl font-bold text-zinc-100 tracking-tight"><RevealText text="Establish Connection" /></Heading3D>
          <p className="text-zinc-400 max-w-xl mx-auto leading-relaxed">
            I&apos;m currently open to new opportunities and collaborations. Reach out through any of the channels below for a direct line of communication.
          </p>
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contactMethods.map((method, i) => (
          <motion.a
            key={i}
            href={method.href}
            target={method.href.startsWith('http') ? "_blank" : "_self"}
            rel={method.href.startsWith('http') ? "noopener noreferrer" : ""}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="spotlight group p-8 bg-zinc-900/30 border border-zinc-800 rounded-2xl hover:border-emerald-500/50 hover:bg-zinc-900/50 transition-all relative overflow-hidden"
          >
            {/* solid 3D icon that spins toward you on hover */}
            <div className="mb-6">
              <Icon3D size={60}>{method.icon}</Icon3D>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">{method.label}</span>
                <ExternalLink size={10} className="text-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h4 className="text-zinc-100 font-bold group-hover:text-emerald-500 transition-colors truncate text-sm sm:text-base">
                {method.value}
              </h4>
              <p className="text-zinc-500 text-xs leading-relaxed">
                {method.description}
              </p>
            </div>

            {/* Subtle background text */}
            <div className="absolute -right-4 -bottom-4 text-[4rem] font-black text-white/[0.01] pointer-events-none select-none group-hover:text-emerald-500/[0.02] transition-colors">
              {method.label[0]}
            </div>
          </motion.a>
        ))}
      </div>

      {/* message form */}
      <div className="max-w-3xl mx-auto mt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 bg-zinc-900/30 border border-zinc-800 rounded-2xl"
        >
          <h4 className="text-zinc-100 font-bold text-xl mb-1">Send a message</h4>
          <p className="text-zinc-500 text-sm mb-6">It goes straight to my inbox.</p>
          <ContactForm />
        </motion.div>
      </div>

    </section>
  );
}
