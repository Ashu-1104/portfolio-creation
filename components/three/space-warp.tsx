'use client';

// Page background: a 3D starfield flying toward the viewer. Scrolling speeds it up
// and the stars stretch into light streaks (a "hyperspace jump"); the view leans
// toward the mouse. One fixed canvas behind the whole page.
import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { usePrefersReducedMotion, useWindowPointer } from './hooks';
import { useIsLight } from '../theme-toggle';

const COUNT = 650;
const DEPTH = 220;

function Stars({ light, reduce }: { light: boolean; reduce: boolean }) {
  const lines = useRef<THREE.LineSegments>(null);
  const pointer = useWindowPointer();
  const lastScroll = useRef(0);
  const speed = useRef(0.4);
  const palette = useMemo(() => ({ baseLight: new THREE.Color('#334155'), baseDark: new THREE.Color('#e2e8f0'), tintLight: new THREE.Color('#047857'), tintDark: new THREE.Color('#34d399') }), []);

  const { stars, positions, colors } = useMemo(() => {
    const stars = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      // keep a clear tunnel in the middle so stars pass around the content
      const a = Math.random() * Math.PI * 2, r = 6 + Math.random() * 60;
      stars[i * 3] = Math.cos(a) * r;
      stars[i * 3 + 1] = Math.sin(a) * r * 0.6;
      stars[i * 3 + 2] = -Math.random() * DEPTH;
    }
    return { stars, positions: new Float32Array(COUNT * 6), colors: new Float32Array(COUNT * 6) };
  }, []);

  useFrame(({ camera }, delta) => {
    const l = lines.current;
    if (!l) return;
    const dt = Math.min(delta, 0.05) * 60;
    // scroll velocity -> warp speed (eases back to cruising)
    const y = window.scrollY;
    const v = Math.abs(y - lastScroll.current);
    lastScroll.current = y;
    // gentle: a little faster while scrolling, never a full hyperspace jump
    const target = reduce ? 0 : 0.25 + Math.min(v * 0.03, 2.2);
    speed.current += (target - speed.current) * (target > speed.current ? 0.25 : 0.04);
    const s = speed.current;
    const streak = 0.12 + s * 0.9;
    const base = light ? palette.baseLight : palette.baseDark;
    const tint = light ? palette.tintLight : palette.tintDark;
    for (let i = 0; i < COUNT; i++) {
      const j = i * 3;
      stars[j + 2] += s * dt;
      if (stars[j + 2] > 5) stars[j + 2] = -DEPTH;
      const z = stars[j + 2];
      const k = i * 6;
      positions[k] = stars[j]; positions[k + 1] = stars[j + 1]; positions[k + 2] = z;
      positions[k + 3] = stars[j]; positions[k + 4] = stars[j + 1]; positions[k + 5] = z - streak;
      // nearer stars are brighter; every 5th star is emerald
      const fade = Math.max(0, 1 + z / DEPTH) * (light ? 0.35 : 0.5);
      const c = i % 5 === 0 ? tint : base;
      colors[k] = c.r * fade; colors[k + 1] = c.g * fade; colors[k + 2] = c.b * fade;
      colors[k + 3] = c.r * fade * 0.2; colors[k + 4] = c.g * fade * 0.2; colors[k + 5] = c.b * fade * 0.2;
    }
    l.geometry.attributes.position.needsUpdate = true;
    l.geometry.attributes.color.needsUpdate = true;
    if (!reduce) {
      camera.position.x += (pointer.current.x * 1.5 - camera.position.x) * 0.03;
      camera.position.y += (pointer.current.y * 1.0 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, -50);
    }
  });

  return (
    <lineSegments ref={lines}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <lineBasicMaterial vertexColors transparent opacity={light ? 0.5 : 0.6} blending={light ? THREE.NormalBlending : THREE.AdditiveBlending} depthWrite={false} />
    </lineSegments>
  );
}

export default function SpaceWarp() {
  const reduce = usePrefersReducedMotion();
  const light = useIsLight();
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5], fov: 70, far: 400 }} gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}>
        <Stars light={light} reduce={reduce} />
      </Canvas>
    </div>
  );
}
