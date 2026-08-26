import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
}

interface Trace {
  x: number;
  y: number;
  length: number;
  vertical: boolean;
  speed: number;
  offset: number;
  color: string;
}

export const BackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Initialize subtle floating node particles
    const particleCount = Math.min(Math.floor((width * height) / 25000), 50);
    const particles: Particle[] = [];
    const colors = ['#00F0FF', '#10B981', '#38BDF8'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.4 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    // Initialize subtle orthogonal PCB circuit traces
    const traces: Trace[] = [];
    const traceCount = 18;
    for (let i = 0; i < traceCount; i++) {
      traces.push({
        x: Math.floor(Math.random() * (width / 40)) * 40,
        y: Math.floor(Math.random() * (height / 40)) * 40,
        length: Math.random() * 180 + 80,
        vertical: Math.random() > 0.5,
        speed: Math.random() * 0.8 + 0.2,
        offset: Math.random() * 200,
        color: Math.random() > 0.5 ? 'rgba(0, 240, 255, 0.25)' : 'rgba(16, 185, 129, 0.25)',
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle grid points
      const gridSize = 60;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
      for (let x = 0; x < width; x += gridSize) {
        for (let y = 0; y < height; y += gridSize) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw and update PCB traces
      traces.forEach((trace) => {
        ctx.strokeStyle = trace.color;
        ctx.lineWidth = 1;
        ctx.beginPath();

        if (trace.vertical) {
          const currentY = (trace.y + trace.offset) % height;
          ctx.moveTo(trace.x, currentY);
          ctx.lineTo(trace.x, currentY + trace.length);
        } else {
          const currentX = (trace.x + trace.offset) % width;
          ctx.moveTo(currentX, trace.y);
          ctx.lineTo(currentX + trace.length, trace.y);
        }
        ctx.stroke();

        trace.offset += trace.speed;
      });

      // Update and draw particles with connection lines
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby nodes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - dist / 120) * 0.12;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
    />
  );
};
