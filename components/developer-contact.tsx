'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageSquare, Terminal, ExternalLink } from 'lucide-react';

export function DeveloperContact() {
  const contactMethods = [
    { 
      icon: <Mail size={24} />, 
      label: 'Email', 
      value: 'ashutoshtiwari110504@gmail.com', 
      href: 'mailto:ashutoshtiwari110504@gmail.com',
      description: 'Send me an email for professional inquiries.',
      color: 'emerald'
    },
    { 
      icon: <MessageSquare size={24} />, 
      label: 'WhatsApp', 
      value: '+91 90964 52696', 
      href: "https://wa.me/919096452696?text=Hi%20Ashutosh,%20I'm%20interested%20in%20discussing%20a%20project%20with%20you.",
      description: 'Direct chat for quick collaboration and projects.',
      color: 'emerald'
    },
    { 
      icon: <MapPin size={24} />, 
      label: 'Location', 
      value: 'Mumbai, India', 
      href: '#',
      description: 'Based in Mumbai, Maharashtra.',
      color: 'zinc'
    }
  ];

  return (
    <section id="contact" className="py-24 px-6 bg-[#09090b] relative overflow-hidden">
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
          <h3 className="text-4xl md:text-5xl font-bold text-zinc-100 tracking-tight">Establish Connection</h3>
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
            className="group p-8 bg-zinc-900/30 border border-zinc-800 rounded-2xl hover:border-emerald-500/50 hover:bg-zinc-900/50 transition-all relative overflow-hidden"
          >
            <div className={`w-14 h-14 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 text-zinc-500 group-hover:text-emerald-500 group-hover:border-emerald-500/30 transition-all shadow-lg`}>
              {method.icon}
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">{method.label}</span>
                <ExternalLink size={10} className="text-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h4 className="text-zinc-100 font-bold group-hover:text-emerald-500 transition-colors break-words">
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

      {/* Terminal-style footer CTA */}
      <div className="max-w-xl mx-auto mt-20 p-6 bg-zinc-950 border border-zinc-900 rounded-xl flex items-center gap-4">
        <div className="w-10 h-10 rounded bg-emerald-500/10 flex items-center justify-center text-emerald-500 flex-shrink-0">
          <Terminal size={20} />
        </div>
        <div className="font-mono text-xs text-zinc-500 leading-relaxed">
          <span className="text-emerald-500 font-bold">➜</span> system_status: <span className="text-zinc-300">listening_for_new_connections...</span><br/>
          <span className="text-emerald-500 font-bold">➜</span> current_ping: <span className="text-zinc-300">instant_response_active</span>
        </div>
      </div>
    </section>
  );
}
