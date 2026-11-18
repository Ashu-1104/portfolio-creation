'use client';

// A "solid" 3D icon made from the same icon stacked in depth (an extrusion),
// floating gently; it spins toward you when its card is hovered (.group:hover).
import type { ReactNode } from 'react';

export function Icon3D({ children, size = 56 }: { children: ReactNode; size?: number }) {
  const layers = 7;
  return (
    <span className="icon3d-wrap inline-block" style={{ width: size, height: size, perspective: 400 }} aria-hidden="true">
      <span className="icon3d relative block w-full h-full">
        {Array.from({ length: layers }).map((_, i) => (
          <span
            key={i}
            className="absolute inset-0 flex items-center justify-center"
            style={{
              transform: `translateZ(${-i * 1.6}px)`,
              color: i === 0 ? 'var(--icon3d-front)' : `color-mix(in srgb, var(--icon3d-side) ${100 - i * 8}%, transparent)`,
            }}
          >
            {children}
          </span>
        ))}
      </span>
    </span>
  );
}
