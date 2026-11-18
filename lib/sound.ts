// Tiny UI sound kit made with the Web Audio API (no audio files). Off by default;
// the visitor turns it on with the speaker button. The choice is remembered.
type Sound = 'click' | 'hover' | 'whoosh' | 'success' | 'key' | 'open';

let ctx: AudioContext | null = null;
let enabled = false;
const listeners = new Set<(on: boolean) => void>();

if (typeof window !== 'undefined') {
  try { enabled = localStorage.getItem('sound') === 'on'; } catch {}
}

export const soundEnabled = () => enabled;
export function setSound(on: boolean) {
  enabled = on;
  try { localStorage.setItem('sound', on ? 'on' : 'off'); } catch {}
  listeners.forEach((l) => l(on));
  if (on) play('success');
}
export function onSoundChange(fn: (on: boolean) => void) {
  listeners.add(fn);
  return () => { listeners.delete(fn); };
}

function tone(freq: number, dur: number, type: OscillatorType, gain: number, delay = 0, slideTo?: number) {
  if (!ctx) return;
  const t = ctx.currentTime + delay;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(gain, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(ctx.destination);
  o.start(t);
  o.stop(t + dur + 0.02);
}

export function play(sound: Sound) {
  if (!enabled || typeof window === 'undefined') return;
  try {
    ctx ??= new AudioContext();
    if (ctx.state === 'suspended') void ctx.resume();
  } catch { return; }
  switch (sound) {
    case 'click': tone(660, 0.06, 'triangle', 0.05); break;
    case 'hover': tone(1200, 0.03, 'sine', 0.015); break;
    case 'key': tone(300 + Math.random() * 120, 0.04, 'square', 0.025); break;
    case 'open': tone(440, 0.12, 'sine', 0.04, 0, 880); break;
    case 'whoosh': tone(900, 0.5, 'sawtooth', 0.025, 0, 120); break;
    case 'success': tone(660, 0.12, 'sine', 0.05); tone(990, 0.18, 'sine', 0.05, 0.1); break;
  }
}
