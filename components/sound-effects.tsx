'use client';

// Speaker button (header) + a global listener that plays a soft click for any
// button or link while sounds are on.
import { useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { onSoundChange, play, setSound, soundEnabled } from '@/lib/sound';

export function useSoundOn() {
  const [on, setOn] = useState(false);
  useEffect(() => { setOn(soundEnabled()); return onSoundChange(setOn); }, []);
  return on;
}

export function SoundToggle() {
  const on = useSoundOn();
  return (
    <button
      type="button"
      onClick={() => setSound(!on)}
      aria-label={on ? 'Turn sounds off' : 'Turn sounds on'}
      title={on ? 'Sounds on' : 'Sounds off'}
      className="w-9 h-9 flex items-center justify-center rounded-md border border-zinc-800 text-zinc-400 hover:text-emerald-500 hover:border-emerald-500/40 transition-colors"
    >
      {on ? <Volume2 size={16} /> : <VolumeX size={16} />}
    </button>
  );
}

export function SoundEffects() {
  useEffect(() => {
    const click = (e: MouseEvent) => { if ((e.target as HTMLElement).closest('a, button')) play('click'); };
    let last: Element | null = null;
    const over = (e: PointerEvent) => {
      const el = (e.target as HTMLElement).closest('nav a, [data-sound-hover]');
      if (el && el !== last) play('hover');
      last = el;
    };
    window.addEventListener('click', click);
    window.addEventListener('pointerover', over);
    return () => { window.removeEventListener('click', click); window.removeEventListener('pointerover', over); };
  }, []);
  return null;
}
