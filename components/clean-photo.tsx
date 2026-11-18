'use client';

// My natural photo in a clean frame that tilts gently toward the mouse, with a
// soft light that follows the cursor across it.
import { TiltCard } from './tilt-card';

export function CleanPhoto() {
  return (
    <div className="relative w-full h-full">
      {/* soft glow behind the frame */}
      <span className="absolute inset-x-8 top-10 bottom-10 rounded-full bg-emerald-500/15 blur-3xl" aria-hidden="true" />
      <TiltCard className="h-full rounded-3xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/profile.webp"
          alt="Ashutosh Tiwari"
          width={720}
          height={900}
          fetchPriority="high"
          className="w-full h-full object-cover object-top rounded-3xl border border-zinc-800 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]"
        />
      </TiltCard>
      {/* corner brackets */}
      {[
        'top-0 left-0 border-t-2 border-l-2 rounded-tl-lg',
        'top-0 right-0 border-t-2 border-r-2 rounded-tr-lg',
        'bottom-0 left-0 border-b-2 border-l-2 rounded-bl-lg',
        'bottom-0 right-0 border-b-2 border-r-2 rounded-br-lg',
      ].map((pos, i) => (
        <span key={i} className={`absolute w-6 h-6 border-emerald-500/70 ${pos} -m-2 pointer-events-none`} aria-hidden="true" />
      ))}
    </div>
  );
}
