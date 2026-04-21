/* =====================================================
   ParticleBackground — Smooth 60fps canvas animation
   
   Performance fixes:
   ✓ NO shadowBlur (most expensive canvas op) — layered
     concentric circles used for glow instead
   ✓ clearRect() every frame — no ghosting
   ✓ Pre-stored [r,g,b] arrays — no hex parsing per frame
   ✓ Single strokeStyle per line — no gradient objects
   ✓ Delta-time movement — consistent speed any FPS
   ✓ Velocity clamping — no runaway particles
   ✓ Edge-wrap instead of bounce — seamless feel
   ✓ position:fixed canvas — covers entire page
   ===================================================== */
import { useEffect, useRef } from 'react';

const PARTICLE_COUNT = 65;
const MAX_CONNECT_DIST = 130;  // px — max distance to draw a line
const MOUSE_RADIUS = 120;       // px — mouse repulse zone
const BASE_SPEED = 0.4;

// Pre-defined color palette as [r, g, b] — no hex parsing at runtime
const COLORS = [
  [168, 85,  247],  // neon purple
  [34,  211, 238],  // neon cyan
  [99,  102, 241],  // indigo
  [129, 140, 248],  // light indigo
  [56,  189, 248],  // sky blue
];

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);

  // All mutable state lives in a single ref — zero re-renders
  const stateRef = useRef({
    particles: [],
    mouse: { x: -9999, y: -9999 },
    w: 0,
    h: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // alpha:true so the canvas is transparent — page bg shows through
    const ctx = canvas.getContext('2d', { alpha: true });
    const state = stateRef.current;

    /* ── Factory: one particle ── */
    const makeParticle = (w, h) => {
      const col = COLORS[Math.floor(Math.random() * COLORS.length)];
      const angle = Math.random() * Math.PI * 2;
      const speed = BASE_SPEED * (0.5 + Math.random());
      return {
        x:     Math.random() * w,
        y:     Math.random() * h,
        vx:    Math.cos(angle) * speed,
        vy:    Math.sin(angle) * speed,
        r:     Math.random() * 1.4 + 0.7,   // radius 0.7–2.1 px
        col,                                  // [r, g, b]
        phase: Math.random() * Math.PI * 2,  // pulse phase offset
      };
    };

    /* ── Resize: set canvas size + re-seed particles ── */
    const resize = () => {
      state.w = canvas.width  = window.innerWidth;
      state.h = canvas.height = window.innerHeight;
      state.particles = Array.from(
        { length: PARTICLE_COUNT },
        () => makeParticle(state.w, state.h)
      );
    };
    resize();

    /* ── Mouse tracking — no throttle needed (just writes to ref) ── */
    const onMouseMove  = (e) => { state.mouse.x = e.clientX; state.mouse.y = e.clientY; };
    const onMouseLeave = ()  => { state.mouse.x = -9999;     state.mouse.y = -9999; };

    window.addEventListener('resize',   resize,       { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    /* ── Animation loop ── */
    let lastTime = performance.now();

    const loop = (time) => {
      rafRef.current = requestAnimationFrame(loop);

      // Delta time in "frames" at 60fps — keeps speed consistent at any refresh rate
      // Capped at 3 to avoid big jump after tab re-focus
      const delta = Math.min((time - lastTime) / 16.667, 3);
      lastTime = time;

      const now = time * 0.001; // seconds (for pulse math)
      const { w, h, particles, mouse } = state;
      const MAX_DIST_SQ = MAX_CONNECT_DIST * MAX_CONNECT_DIST;
      const MOUSE_R_SQ  = MOUSE_RADIUS * MOUSE_RADIUS;

      /* ── Clear frame ── */
      ctx.clearRect(0, 0, w, h);

      /* ── Update physics ── */
      for (const p of particles) {
        // Mouse repulsion
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const md2 = mdx * mdx + mdy * mdy;
        if (md2 < MOUSE_R_SQ && md2 > 0.01) {
          const md   = Math.sqrt(md2);
          const push = ((MOUSE_RADIUS - md) / MOUSE_RADIUS) * 0.55;
          p.vx += (mdx / md) * push * delta;
          p.vy += (mdy / md) * push * delta;
        }

        // Velocity damping — smooth exponential decay
        p.vx *= 0.965;
        p.vy *= 0.965;

        // Clamp max speed (stops particles from flying after strong repulsion)
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd > 2.2) {
          const inv = 2.2 / spd;
          p.vx *= inv;
          p.vy *= inv;
        }
        // Re-energize if almost stopped
        if (spd < 0.08) {
          const nudge = Math.random() * Math.PI * 2;
          p.vx += Math.cos(nudge) * 0.15;
          p.vy += Math.sin(nudge) * 0.15;
        }

        // Move
        p.x += p.vx * delta;
        p.y += p.vy * delta;

        // Wrap edges (seamless — nicer than bouncing for ambient bg)
        if (p.x < -8)     p.x = w + 8;
        if (p.x > w + 8)  p.x = -8;
        if (p.y < -8)     p.y = h + 8;
        if (p.y > h + 8)  p.y = -8;
      }

      /* ── Draw connection lines (rendered BELOW particles) ── */
      ctx.lineWidth = 0.75;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const [pr, pg, pb] = p.col;

        for (let j = i + 1; j < particles.length; j++) {
          const q   = particles[j];
          const dx  = p.x - q.x;
          const dy  = p.y - q.y;
          const d2  = dx * dx + dy * dy;

          if (d2 < MAX_DIST_SQ) {
            // Alpha fades with distance — max 0.18
            const alpha = (1 - Math.sqrt(d2) / MAX_CONNECT_DIST) * 0.18;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${pr},${pg},${pb},${alpha.toFixed(3)})`;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }

      /* ── Draw particles with layered glow (no shadowBlur!) ── */
      for (const p of particles) {
        const pulse = 0.6 + 0.4 * Math.sin(now * 1.3 + p.phase); // 0.6–1.0
        const [r, g, b] = p.col;

        // Layer 1 — large soft halo (very transparent)
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${(0.030 * pulse).toFixed(3)})`;
        ctx.fill();

        // Layer 2 — medium glow ring
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${(0.10 * pulse).toFixed(3)})`;
        ctx.fill();

        // Layer 3 — bright core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${(0.88 * pulse).toFixed(3)})`;
        ctx.fill();
      }
    };

    rafRef.current = requestAnimationFrame(loop);

    /* ── Cleanup on unmount ── */
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize',    resize);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []); // runs once — all state in refs, no deps needed

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',   // covers entire viewport always (not just hero)
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block',
      }}
      aria-hidden="true"
    />
  );
};

export default ParticleBackground;
