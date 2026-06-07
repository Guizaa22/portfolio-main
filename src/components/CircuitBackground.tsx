"use client";

import { useEffect, useRef } from "react";

type Trace = {
  points: { x: number; y: number }[];
  length: number;
  pulse: number; // 0..1 position along the trace
  speed: number;
  green: boolean;
};

/**
 * Animated PCB / circuit-board background for the "embedded electronics" theme.
 * Draws right-angle copper traces with solder pads and glowing pulses travelling
 * along them. Sits behind page content (.fx-canvas).
 */
export function CircuitBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const AMBER = "#ffb020";
    const GREEN = "#39ff5e";
    let traces: Trace[] = [];

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const polylineLength = (pts: { x: number; y: number }[]) => {
      let len = 0;
      for (let i = 1; i < pts.length; i++) {
        len += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
      }
      return len;
    };

    const pointAt = (t: Trace, dist: number) => {
      let remaining = dist;
      for (let i = 1; i < t.points.length; i++) {
        const seg = Math.hypot(
          t.points[i].x - t.points[i - 1].x,
          t.points[i].y - t.points[i - 1].y
        );
        if (remaining <= seg) {
          const r = seg === 0 ? 0 : remaining / seg;
          return {
            x: t.points[i - 1].x + (t.points[i].x - t.points[i - 1].x) * r,
            y: t.points[i - 1].y + (t.points[i].y - t.points[i - 1].y) * r,
          };
        }
        remaining -= seg;
      }
      return t.points[t.points.length - 1];
    };

    const buildTrace = (): Trace => {
      const grid = 28;
      const W = window.innerWidth;
      const H = window.innerHeight;
      let x = Math.round((Math.random() * W) / grid) * grid;
      let y = Math.round((Math.random() * H) / grid) * grid;
      const points = [{ x, y }];
      const segs = 3 + Math.floor(Math.random() * 4);
      let horizontal = Math.random() > 0.5;
      for (let i = 0; i < segs; i++) {
        const step = (2 + Math.floor(Math.random() * 5)) * grid;
        if (horizontal) x += Math.random() > 0.5 ? step : -step;
        else y += Math.random() > 0.5 ? step : -step;
        points.push({ x, y });
        horizontal = !horizontal;
      }
      const length = polylineLength(points);
      return {
        points,
        length,
        pulse: Math.random(),
        speed: 0.0008 + Math.random() * 0.0016,
        green: Math.random() > 0.7,
      };
    };

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.max(14, Math.floor(window.innerWidth / 70));
      traces = Array.from({ length: count }, buildTrace);
    };

    const drawStatic = () => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      ctx.clearRect(0, 0, W, H);

      for (const t of traces) {
        // copper trace
        ctx.beginPath();
        ctx.moveTo(t.points[0].x, t.points[0].y);
        for (let i = 1; i < t.points.length; i++) {
          ctx.lineTo(t.points[i].x, t.points[i].y);
        }
        ctx.strokeStyle = "rgba(255, 176, 32, 0.28)";
        ctx.lineWidth = 1.4;
        ctx.stroke();

        // solder pads
        for (const p of t.points) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2.4, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255, 176, 32, 0.5)";
          ctx.fill();
        }
      }
    };

    const draw = () => {
      drawStatic();

      for (const t of traces) {
        t.pulse += t.speed * 16;
        if (t.pulse > 1) t.pulse -= 1;
        const pos = pointAt(t, t.pulse * t.length);
        const c = t.green ? GREEN : AMBER;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = c;
        ctx.shadowColor = c;
        ctx.shadowBlur = 14;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    let raf = 0;
    let last = 0;
    const targetInterval = 1000 / 30;
    const loop = (time: number) => {
      raf = requestAnimationFrame(loop);
      if (time - last < targetInterval) return;
      last = time;
      draw();
    };

    setup();

    if (prefersReduced) {
      drawStatic();
    } else {
      raf = requestAnimationFrame(loop);
    }

    const handleResize = () => setup();
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fx-canvas" aria-hidden="true" />;
}
