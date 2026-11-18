// Intro shown while the page loads: the AT badge assembles in 3D (ring swings in,
// letters fly in), spins once and flies off toward the header. Pure CSS: it
// always fades away on its own, even without JavaScript.
export function IntroLoader() {
  return (
    <div className="intro-loader fixed inset-0 z-[100] bg-[var(--page)] flex items-center justify-center pointer-events-none" aria-hidden="true">
      <div className="intro-stage flex flex-col items-center gap-6">
        <div className="intro-badge relative w-32 h-32">
          <span className="intro-ring absolute inset-0 rounded-full border-[5px] border-emerald-500 bg-zinc-950" />
          <span className="absolute inset-0 flex items-center justify-center font-black text-5xl tracking-tighter">
            <span className="intro-a text-zinc-100">A</span>
            <span className="intro-t text-emerald-500">T</span>
          </span>
        </div>
        <p className="intro-caption font-mono text-xs tracking-[0.4em] text-zinc-500 uppercase">ashutosh.dev</p>
      </div>
    </div>
  );
}
