import { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  life: number;
  maxLife: number;
};

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Add a small randomized offset for a more organic trail look if desired, 
      // but keeping it simple and strictly behind the cursor for now.
        const maxLife = 30 + Math.random() * 15; // 30-45 frames (~0.5 - 0.75 seconds at 60fps)
      particles.push({
        x: e.clientX,
        y: e.clientY,
        life: maxLife,
        maxLife: maxLife
      });
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Calculate progress (1 to 0)
        const progress = p.life / p.maxLife;
        
        // Radius between 4px and 6px, shrinking to 0
        const radius = Math.max(0.1, (4 + Math.random() * 2) * progress); 
        
        // Starts at 0.9 opacity and fades
        const opacity = progress * 0.9;

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        
        // Add subtle glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(255, 122, 0, ${opacity})`;
        
        ctx.fillStyle = `rgba(255, 122, 0, ${opacity})`;
        ctx.fill();

        // reset shadow for next draws if necessary, but here it's fine as it's the same color
        ctx.shadowBlur = 0;

        // decrease life
        p.life -= 1;
      }

      // remove dead particles
      particles = particles.filter(p => p.life > 0);

      animationFrameId = requestAnimationFrame(render);
    };

    // Initialization
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    // Start loop
    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ width: '100%', height: '100%' }}
    />
  );
}
