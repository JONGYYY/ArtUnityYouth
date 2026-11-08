'use client';

import { useEffect, useRef, useState } from 'react';

const COLORS = ['#D94F2B', '#0FA89A', '#D4890A', '#9136C8'];
const FADE_MS = 1000;
const NEW_STROKE_GAP_MS = 120;
const COLOR_HOLD_MS = 2500;
const TIP_X = 1;
const TIP_Y = 33;
const NATIVE_CURSOR_SELECTOR =
  'input:not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="checkbox"]):not([type="radio"]):not([type="range"]):not([type="color"]):not([type="file"]), textarea, select, [contenteditable=""], [contenteditable="true"]';
const CLICKABLE_SELECTOR = 'a, button, [role="button"], label, summary, [tabindex]:not([tabindex="-1"])';

type Point = {
  x: number;
  y: number;
  t: number;
  width: number;
  color: string;
  newStroke: boolean;
  // Fixed per point so the pencil grain doesn't shimmer between frames.
  grain: { dx: number; dy: number; r: number; a: number }[];
};

function makeGrain(width: number) {
  return Array.from({ length: 3 }, () => ({
    dx: (Math.random() - 0.5) * width * 1.6,
    dy: (Math.random() - 0.5) * width * 1.6,
    r: 0.35 + Math.random() * 0.55,
    a: 0.25 + Math.random() * 0.45,
  }));
}

/**
 * Desktop-only "colored pencil" cursor: an SVG pencil follows the pointer and
 * leaves a grainy pencil stroke that fades out after about a second.
 * Disabled on touch / coarse pointers and when the user prefers reduced motion.
 */
export default function PencilCursor() {
  const [enabled, setEnabled] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pencilRef = useRef<HTMLDivElement>(null);
  const [color, setColor] = useState(COLORS[0]);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setEnabled(fine.matches && !reduced.matches);
    update();
    fine.addEventListener('change', update);
    reduced.addEventListener('change', update);
    return () => {
      fine.removeEventListener('change', update);
      reduced.removeEventListener('change', update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    const pencil = pencilRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !pencil || !ctx) return;

    const root = document.documentElement;
    root.classList.add('pencil-cursor');

    let points: Point[] = [];
    let frame = 0;
    let colorIndex = 0;
    let colorSince = performance.now();
    let lastMove = 0;
    let last: { x: number; y: number; t: number } | null = null;
    let visible = false;
    let pressed = false;
    let lifted = false;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const setVisible = (v: boolean) => {
      if (visible === v) return;
      visible = v;
      pencil.style.opacity = v ? '1' : '0';
    };

    const placePencil = (x: number, y: number) => {
      const scale = pressed ? 0.92 : lifted ? 1.12 : 1;
      pencil.style.transform = `translate3d(${x - TIP_X}px, ${y - TIP_Y}px, 0) scale(${scale})`;
    };

    const draw = () => {
      const now = performance.now();
      points = points.filter((p) => now - p.t < FADE_MS);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      for (let i = 1; i < points.length; i++) {
        const a = points[i - 1];
        const b = points[i];
        if (b.newStroke) continue;
        const life = 1 - (now - b.t) / FADE_MS;
        if (life <= 0) continue;
        const alpha = Math.pow(life, 1.3);

        ctx.globalAlpha = alpha * 0.9;
        ctx.strokeStyle = b.color;
        ctx.lineWidth = (a.width + b.width) / 2;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();

        // A thinner offset pass gives the line a slightly uneven, hand-drawn edge.
        ctx.globalAlpha = alpha * 0.35;
        ctx.lineWidth = Math.max(0.6, b.width * 0.45);
        ctx.beginPath();
        ctx.moveTo(a.x + 0.6, a.y - 0.5);
        ctx.lineTo(b.x + 0.6, b.y - 0.5);
        ctx.stroke();

        ctx.fillStyle = b.color;
        for (const g of b.grain) {
          ctx.globalAlpha = alpha * g.a;
          ctx.beginPath();
          ctx.arc(b.x + g.dx, b.y + g.dy, g.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      frame = points.length ? requestAnimationFrame(draw) : 0;
    };

    const addPoint = (x: number, y: number, t: number) => {
      const newStroke = !last || t - last.t > NEW_STROKE_GAP_MS;
      if (newStroke && t - lastMove > 400) {
        colorIndex = (colorIndex + 1) % COLORS.length;
        colorSince = t;
        setColor(COLORS[colorIndex]);
      } else if (t - colorSince > COLOR_HOLD_MS) {
        colorIndex = (colorIndex + 1) % COLORS.length;
        colorSince = t;
        setColor(COLORS[colorIndex]);
      }
      const dist = last ? Math.hypot(x - last.x, y - last.y) : 0;
      const dt = last ? Math.max(1, t - last.t) : 16;
      const speed = dist / dt;
      const width = Math.max(1.6, Math.min(4.2, 4.2 - speed * 0.8)) * (0.85 + Math.random() * 0.3);
      if (!newStroke && dist < 1.5) return;
      points.push({ x, y, t, width, color: COLORS[colorIndex], newStroke, grain: makeGrain(width) });
      last = { x, y, t };
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
      const target = e.target as Element | null;
      const overField = !!target?.closest?.(NATIVE_CURSOR_SELECTOR);
      lifted = !overField && !!target?.closest?.(CLICKABLE_SELECTOR);
      placePencil(e.clientX, e.clientY);
      setVisible(!overField);
      if (overField) {
        last = null;
        return;
      }
      const events = typeof e.getCoalescedEvents === 'function' ? e.getCoalescedEvents() : [];
      const samples = events.length ? events : [e];
      const now = performance.now();
      for (const s of samples) addPoint(s.clientX, s.clientY, now);
      lastMove = now;
      if (!frame) frame = requestAnimationFrame(draw);
    };

    const onDown = (e: PointerEvent) => {
      pressed = true;
      placePencil(e.clientX, e.clientY);
    };
    const onUp = (e: PointerEvent) => {
      pressed = false;
      placePencil(e.clientX, e.clientY);
    };
    const onOut = (e: PointerEvent) => {
      if (!e.relatedTarget) {
        setVisible(false);
        last = null;
      }
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    document.addEventListener('pointerout', onOut);
    window.addEventListener('resize', resize);
    const onBlur = () => setVisible(false);
    window.addEventListener('blur', onBlur);

    return () => {
      cancelAnimationFrame(frame);
      root.classList.remove('pencil-cursor');
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.removeEventListener('pointerout', onOut);
      window.removeEventListener('resize', resize);
      window.removeEventListener('blur', onBlur);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[9998] h-screen w-screen"
      />
      <div
        ref={pencilRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] opacity-0 transition-opacity duration-150 will-change-transform"
        style={{ transformOrigin: `${TIP_X}px ${TIP_Y}px` }}
      >
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" style={{ overflow: 'visible' }}>
          <g transform={`translate(${TIP_X} ${TIP_Y}) rotate(-45)`} style={{ filter: 'drop-shadow(0 1px 1px rgba(26,17,8,0.35))' }}>
            {/* sharpened wood with colored lead at the very tip (0,0) */}
            <path d="M0 0 L10 -4.5 L10 4.5 Z" fill="#F3D9AE" />
            <path d="M0 0 L3.6 -1.6 L3.6 1.6 Z" fill={color} />
            {/* painted body */}
            <rect x="10" y="-4.5" width="24" height="9" fill={color} />
            <rect x="10" y="-4.5" width="24" height="3" fill="#ffffff" opacity="0.22" />
            {/* ferrule + eraser */}
            <rect x="34" y="-4.5" width="4" height="9" fill="#B9B2A6" />
            <rect x="38" y="-4.5" width="5" height="9" rx="1.5" fill="#F29BA8" />
            <path d="M0 0 L10 -4.5 L34 -4.5 M10 4.5 L34 4.5" stroke="#1A1108" strokeOpacity="0.35" strokeWidth="0.6" />
          </g>
        </svg>
      </div>
    </>
  );
}
