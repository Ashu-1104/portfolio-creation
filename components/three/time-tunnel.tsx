'use client';

// The 3D tunnel behind the career time machine: glowing rings, star streaks
// and one portal per milestone year. The camera flies to the current portal;
// streaks stretch while it travels.
import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { MotionValue } from 'framer-motion';

import { useInView, usePrefersReducedMotion, useWindowPointer, useActive3D } from './hooks';

const GAP = 30; // distance between portals
const portalZ = (k: number) => -20 - k * GAP;

function yearTexture(year: string) {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 256;
  const g = c.getContext('2d')!;
  g.font = '900 170px Arial, Helvetica, sans-serif';
  g.textAlign = 'center'; g.textBaseline = 'middle';
  g.shadowColor = '#10b981'; g.shadowBlur = 30;
  g.fillStyle = '#ecfdf5';
  g.fillText(year, 256, 136);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function Tunnel({ years, progress, reduce, onPos }: { years: string[]; progress: MotionValue<number>; reduce: boolean; onPos: (p: number, moving: boolean) => void }) {
  const pointer = useWindowPointer();
  const pos = useRef(0); // continuous progress 0..years-1
  const rings = useRef<THREE.Group>(null);
  const streaks = useRef<THREE.LineSegments>(null);
  const moving = useRef(false);
  const span = (years.length - 1) * GAP + 60;
  const ringList = useMemo(() => Array.from({ length: Math.ceil(span / 3.2) }, (_, i) => ({ z: 6 - i * 3.2, tilt: (Math.random() - 0.5) * 0.15, hue: i % 3 })), [span]);
  const key = years.join('|');
  const textures = useMemo(() => years.map(yearTexture), [key]); // eslint-disable-line react-hooks/exhaustive-deps
  // free the GPU textures when they're replaced or the tunnel unmounts
  useEffect(() => () => textures.forEach((t) => t.dispose()), [textures]);

  const STREAKS = 420;
  const { seeds, positions } = useMemo(() => {
    const seeds = new Float32Array(STREAKS * 3);
    for (let i = 0; i < STREAKS; i++) {
      const a = Math.random() * Math.PI * 2, r = 2.2 + Math.random() * 2.2;
      seeds[i * 3] = Math.cos(a) * r; seeds[i * 3 + 1] = Math.sin(a) * r; seeds[i * 3 + 2] = 10 - Math.random() * span;
    }
    return { seeds, positions: new Float32Array(STREAKS * 6) };
  }, [span]);

  const lastReport = useRef(-1);
  useFrame(({ camera, clock, size }, delta) => {
    const dt = Math.min(delta, 0.05);
    const before = pos.current;
    // the page scroll drives the flight (smoothed a little)
    const target = progress.get() * (years.length - 1);
    // first frame after (re)mounting: start at the right year instead of flying from 2022
    if (lastReport.current === -1) pos.current = target;
    pos.current += (target - pos.current) * (reduce ? 1 : Math.min(1, dt * 6));
    const speed = Math.abs(pos.current - before) / Math.max(dt, 0.001); // portals per second
    const isMoving = Math.abs(pos.current - Math.round(pos.current)) > 0.16;
    if (isMoving !== moving.current || Math.abs(pos.current - lastReport.current) > 0.01) { moving.current = isMoving; lastReport.current = pos.current; onPos(pos.current, isMoving); }

    // camera: in front of the current portal, swaying gently and leaning to the mouse
    const t = clock.elapsedTime;
    const aspectNow = size.width / Math.max(1, size.height);
    // phones: step back so the whole portal fits the narrow view
    const dist = aspectNow < 0.75 ? 13 : 9;
    camera.position.z = portalZ(pos.current) + dist;
    // framing adapts to the panel's shape: on wide panels the portal sits at ~66% of the width
    // (the card is on the left); on tall (phone) panels it sits in the upper part (card below)
    const aspect = size.width / Math.max(1, size.height);
    const halfH = dist * Math.tan((31 * Math.PI) / 180);
    const wide = aspect >= 1.1;
    const shiftX = wide ? -0.34 * halfH * aspect : 0;
    const shiftY = wide ? 0 : -(aspect < 0.75 ? 0.42 : 0.32) * halfH;
    const sway = reduce ? 0 : 1;
    camera.position.x += ((pointer.current.x * 0.6 + Math.sin(t * 0.4) * 0.25) * sway + shiftX - camera.position.x) * 0.06;
    camera.position.y += ((pointer.current.y * 0.4 + Math.cos(t * 0.3) * 0.15) * sway + shiftY - camera.position.y) * 0.06;
    camera.lookAt(shiftX, shiftY, camera.position.z - 20);
    camera.rotation.z = reduce ? 0 : Math.sin(t * 0.2) * 0.03 + speed * 0.02;

    // rings slowly turn
    if (rings.current && !reduce) rings.current.children.forEach((r, i) => { r.rotation.z += (i % 2 ? 0.002 : -0.002); });

    // streaks: drift, and stretch into long lines while travelling
    const s = streaks.current;
    if (s) {
      const len = 0.3 + Math.min(speed, 3) * 6;
      for (let i = 0; i < STREAKS; i++) {
        const j = i * 3, k = i * 6;
        if (!reduce) seeds[j + 2] += dt * (2 + speed * 25);
        if (seeds[j + 2] > camera.position.z + 2) seeds[j + 2] -= span;
        positions[k] = seeds[j]; positions[k + 1] = seeds[j + 1]; positions[k + 2] = seeds[j + 2];
        positions[k + 3] = seeds[j]; positions[k + 4] = seeds[j + 1]; positions[k + 5] = seeds[j + 2] - len;
      }
      s.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      <fog attach="fog" args={['#050507', 8, 70]} />
      {/* tunnel rings */}
      <group ref={rings}>
        {ringList.map((r, i) => (
          <mesh key={i} position={[0, 0, r.z]} rotation={[r.tilt, r.tilt, 0]}>
            <torusGeometry args={[4.6, 0.025, 6, 64]} />
            <meshBasicMaterial color={r.hue === 0 ? '#10b981' : r.hue === 1 ? '#14b8a6' : '#6366f1'} transparent opacity={0.55} toneMapped={false} />
          </mesh>
        ))}
      </group>
      {/* star streaks */}
      <lineSegments ref={streaks}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#a7f3d0" transparent opacity={0.7} blending={THREE.AdditiveBlending} depthWrite={false} />
      </lineSegments>
      {/* one portal per milestone, with its year floating inside */}
      {years.map((y, k) => (
        <group key={y} position={[0, 0, portalZ(k)]}>
          <mesh>
            <torusGeometry args={[3.3, 0.12, 16, 96]} />
            <meshBasicMaterial color="#34d399" toneMapped={false} />
          </mesh>
          <mesh>
            <torusGeometry args={[3.3, 0.45, 16, 96]} />
            <meshBasicMaterial color="#10b981" transparent opacity={0.12} depthWrite={false} />
          </mesh>
          <mesh position={[0, 0, -0.05]}>
            <circleGeometry args={[3.2, 64]} />
            <meshBasicMaterial color="#10b981" transparent opacity={0.06} depthWrite={false} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0, 0.2, 0]}>
            <planeGeometry args={[4.2, 2.1]} />
            <meshBasicMaterial map={textures[k]} transparent depthWrite={false} toneMapped={false} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default function TimeTunnel({ years, progress, onPos }: { years: string[]; progress: MotionValue<number>; onPos: (p: number, moving: boolean) => void }) {
  const box = useRef<HTMLDivElement>(null);
  const inView = useInView(box);
  // only keep a WebGL context while near the screen (unloaded when far away)
  const active = useActive3D(box);
  const reduce = usePrefersReducedMotion();
  return (
    <div ref={box} className="absolute inset-0" aria-hidden="true">
      {active && (
      <Canvas frameloop={inView ? 'always' : 'never'} dpr={[1, 1.75]} camera={{ position: [0, 0, 0], fov: 62, far: 200 }} gl={{ antialias: true }}>
        <color attach="background" args={['#050507']} />
        <Tunnel years={years} progress={progress} reduce={reduce} onPos={onPos} />
      </Canvas>
      )}
    </div>
  );
}
