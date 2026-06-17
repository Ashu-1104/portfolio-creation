'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

export function DeveloperContact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-24 px-6 bg-[#09090b]">
      <div className="max-w-5xl mx-auto">
        <div className="space-y-4 mb-16">
          <h2 className="font-mono text-emerald-500 text-sm tracking-widest uppercase">./contact</h2>
          <h3 className="text-4xl font-bold text-zinc-100">Establish Connection</h3>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16">
          <div className="space-y-12">
            <p className="text-zinc-400 leading-relaxed">
              I&apos;m currently looking for new opportunities and collaborations. Whether you have a question or just want to say hi, my inbox is always open.
            </p>

            <div className="space-y-6">
              {[
                { icon: <Mail size={20} />, label: 'Email', value: 'ashutoshtiwari110504@gmail.com', href: 'mailto:ashutoshtiwari110504@gmail.com' },
                { icon: <Phone size={20} />, label: 'Phone', value: '+91 90964 52696', href: 'tel:+919096452696' },
                { icon: <MapPin size={20} />, label: 'Location', value: 'Mumbai, India', href: '#' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 bg-zinc-900 border border-zinc-800 flex items-center justify-center rounded-lg text-emerald-500 group-hover:border-emerald-500/50 transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">{item.label}</p>
                    <a href={item.href} className="text-zinc-300 hover:text-emerald-500 transition-colors font-medium">
                      {item.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 bg-zinc-900/20 border border-zinc-800/50 p-8 rounded-2xl relative overflow-hidden">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:border-emerald-500/50 transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">Email</label>
                <input 
                  type="email" 
                  required
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:border-emerald-500/50 transition-colors"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">Message</label>
              <textarea 
                required
                rows={4}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:border-emerald-500/50 transition-colors resize-none"
                placeholder="How can I help you?"
              />
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-emerald-500 text-zinc-950 font-bold rounded-lg hover:bg-emerald-400 transition-colors flex items-center justify-center gap-2"
            >
              SEND_MESSAGE
              <Send size={18} />
            </button>

            {submitted && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute inset-0 bg-zinc-950 flex flex-col items-center justify-center text-center p-8 z-10"
              >
                <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mb-4">
                  <MessageSquare size={32} />
                </div>
                <h4 className="text-xl font-bold text-zinc-100 mb-2">Message Transmitted</h4>
                <p className="text-zinc-500 text-sm">I'll get back to you as soon as possible.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-emerald-500 font-mono text-xs uppercase tracking-widest hover:underline"
                >
                  Send another?
                </button>
              </motion.div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
