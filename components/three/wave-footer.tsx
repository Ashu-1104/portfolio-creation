'use client';

// Footer backdrop: a glowing wireframe grid that rolls like water and bulges
// up under the mouse.
import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

import { useInView, usePrefersReducedMotion, useActive3D } from './hooks';
import { useIsLight } from '../theme-toggle';

function Waves({ light, reduce, mouse }: { light: boolean; reduce: boolean; mouse: React.MutableRefObject<THREE.Vector2> }) {
  const mesh = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const geo = useMemo(() => new THREE.PlaneGeometry(40, 14, 120, 42), []);
  const base = useMemo(() => Float32Array.from(geo.attributes.position.array), [geo]);
  const m = useMemo(() => new THREE.Vector2(99, 99), []);
  useFrame(({ clock }) => {
    const t = reduce ? 0 : clock.elapsedTime;
    m.lerp(mouse.current, 0.1);
    const pos = geo.attributes.position.array as Float32Array;
    // mouse in plane coordinates (plane is rotated flat; its y axis runs into the screen)
    const mx = m.x * viewport.width * 0.9, my = -m.y * 5 - 2;
    for (let i = 0; i < pos.length; i += 3) {
      const x = base[i], y = base[i + 1];
      const d = Math.hypot(x - mx, y - my);
      pos[i + 2] = Math.sin(x * 0.45 + t * 1.2) * 0.35 + Math.cos(y * 0.6 + t * 0.9) * 0.3 + Math.max(0, 1.6 - d * 0.35) * 1.4;
    }
    geo.attributes.position.needsUpdate = true;
  });
  return (
    <mesh ref={mesh} geometry={geo} rotation={[-1.25, 0, 0]} position={[0, -1.4, -2]}>
      <meshBasicMaterial color={light ? '#047857' : '#10b981'} wireframe transparent opacity={light ? 0.28 : 0.35} />
    </mesh>
  );
}

export default function WaveFooter() {
  const box = useRef<HTMLDivElement>(null);
  const inView = useInView(box);
  // only keep a WebGL context while near the screen (unloaded when far away)
  const active = useActive3D(box);
  const reduce = usePrefersReducedMotion();
  const light = useIsLight();
  const mouse = useRef(new THREE.Vector2(99, 99));
  return (
    <div
      ref={box}
      className="absolute inset-0"
      aria-hidden="true"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mouse.current.set(((e.clientX - r.left) / r.width) * 2 - 1, ((e.clientY - r.top) / r.height) * 2 - 1);
      }}
      onPointerLeave={() => mouse.current.set(99, 99)}
    >
      {active && (
      <Canvas frameloop={inView ? 'always' : 'never'} dpr={[1, 1.5]} camera={{ position: [0, 1.2, 6], fov: 55 }} gl={{ alpha: true }}>
        <fog attach="fog" args={[light ? '#f5f7fa' : '#09090b', 5, 14]} />
        <Waves light={light} reduce={reduce} mouse={mouse} />
      </Canvas>
      )}
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[var(--page)] to-transparent pointer-events-none" />
    </div>
  );
}
