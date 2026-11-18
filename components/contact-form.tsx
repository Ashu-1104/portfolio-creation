'use client';

// Contact form: messages are delivered to my inbox through FormSubmit
// (formsubmit.co), so the site needs no server of its own.
import { useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { play } from '@/lib/sound';
import { CheckCircle2, Loader2, Send } from 'lucide-react';

const ENDPOINT = 'https://formsubmit.co/ajax/ashutoshtiwari110504@gmail.com';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'flying' | 'sent' | 'error'>('idle');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    if (data._honey) return; // bots fill the hidden field
    setStatus('sending');
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...data, _subject: `Portfolio message from ${data.name}`, _template: 'table', _captcha: 'false' }),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      // fold the form into a paper plane and send it flying, then show the thanks
      setStatus('flying');
      play('whoosh');
      setTimeout(() => { setStatus('sent'); play('success'); }, 1500);
    } catch {
      setStatus('error');
    }
  }

  const input = 'w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/60 transition-colors';

  if (status === 'sent') {
    return (
      <div className="flex flex-col items-center justify-center text-center gap-3 py-16">
        <CheckCircle2 size={40} className="text-emerald-500" />
        <p className="text-zinc-100 font-bold text-lg">Message sent</p>
        <p className="text-zinc-500 text-sm">Thanks! I&apos;ll reply to your email soon.</p>
        <button onClick={() => setStatus('idle')} className="mt-2 font-mono text-xs text-emerald-500 hover:underline">
          send another
        </button>
      </div>
    );
  }

  return (
    <div className="relative" style={{ perspective: 900 }}>
    <AnimatePresence>
      {status === 'flying' && (
        <motion.svg
          key="plane" viewBox="0 0 24 24" width="56" height="56" aria-hidden="true"
          className="absolute left-1/2 top-1/2 z-10 text-emerald-500 drop-shadow-[0_0_12px_rgba(16,185,129,0.8)]"
          initial={{ x: -28, y: -28, scale: 0.3, rotate: 0, opacity: 0 }}
          animate={{ x: [-28, -40, 120, 520], y: [-28, -20, -140, -520], scale: [0.3, 1.2, 1, 0.6], rotate: [0, -10, -25, -35], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.4, times: [0, 0.25, 0.6, 1], ease: 'easeIn' }}
        >
          <path fill="currentColor" d="M2.5 11.2 21 3.3c.6-.3 1.2.3.9.9l-7.9 18.5c-.3.6-1.2.6-1.4-.1l-2.2-6.6-6.6-2.2c-.7-.2-.7-1.1-.1-1.4Zm8.4 4.3 1.5 4.5 5.9-13.9-7.4 9.4Zm-1.2-1.2 9.4-7.4-13.9 5.9 4.5 1.5Z" />
        </motion.svg>
      )}
    </AnimatePresence>
    <motion.form
      onSubmit={onSubmit}
      className="space-y-4 origin-top"
      animate={status === 'flying' ? { rotateX: 75, scaleY: 0.2, opacity: 0 } : { rotateX: 0, scaleY: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.7, 0, 0.84, 0] }}
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="space-y-2 block">
          <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">Name</span>
          <input name="name" required maxLength={100} className={input} placeholder="Your name" />
        </label>
        <label className="space-y-2 block">
          <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">Email</span>
          <input name="email" type="email" required maxLength={150} className={input} placeholder="you@example.com" />
        </label>
      </div>
      <label className="space-y-2 block">
        <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">Message</span>
        <textarea name="message" required rows={5} maxLength={3000} className={`${input} resize-none`} placeholder="Tell me about the role or project..." />
      </label>
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="px-6 py-3 bg-emerald-500 text-zinc-950 font-bold rounded-md hover:bg-emerald-400 disabled:opacity-60 transition-colors flex items-center gap-2"
        >
          {status === 'sending' ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          {status === 'sending' ? 'Sending...' : 'Send message'}
        </button>
        {status === 'error' && (
          <p className="text-sm text-red-400">
            Couldn&apos;t send right now. Please email me at{' '}
            <a href="mailto:ashutoshtiwari110504@gmail.com" className="underline">ashutoshtiwari110504@gmail.com</a>.
          </p>
        )}
      </div>
    </motion.form>
    </div>
  );
}
