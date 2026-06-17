'use client';

import { useEffect, useRef } from 'react';

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particleSystem: Particle[] = [];

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      life: number;
      maxLife: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.radius = Math.random() * 2 + 1;
        const colors = ['#00d9ff', '#b100ff', '#ff006e', '#d946ef'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.life = 1;
        this.maxLife = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= 1 / (this.maxLife * 60);
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.life * 0.5;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    const createParticles = (x: number, y: number) => {
      for (let i = 0; i < 3; i++) {
        particleSystem.push(new Particle(x, y));
      }
    };

    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      createParticles(mouseX, mouseY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.fillStyle = '#0a0012';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(0, 217, 255, 0.03)');
      gradient.addColorStop(0.5, 'rgba(177, 0, 255, 0.02)');
      gradient.addColorStop(1, 'rgba(255, 0, 110, 0.03)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particleSystem = particleSystem.filter((p) => p.life > 0);
      particleSystem.forEach((particle) => {
        particle.update();
        particle.draw(ctx);
      });

      // Draw animated lines
      ctx.strokeStyle = 'rgba(0, 217, 255, 0.1)';
      ctx.lineWidth = 1;
      const time = Date.now() * 0.0001;

      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        const y = (canvas.height / 3) * (i + 1) + Math.sin(time + i) * 20;
        ctx.moveTo(0, y);
        for (let x = 0; x < canvas.width; x += 50) {
          ctx.lineTo(x, y + Math.cos(time + x * 0.005 + i) * 15);
        }
        ctx.stroke();
      }

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 bg-background"
      style={{ display: 'block' }}
    />
  );
}
