"use client";

import { useEffect, useRef } from "react";

interface MatrixRainProps {
  /** Glyph colour for the falling trail. */
  color?: string;
  /** Brighter colour for the leading glyph. */
  head?: string;
  /** Character set to rain down. */
  glyphs?: string;
}

const DEFAULT_GLYPHS =
  "アカサタナハマヤラワ0123456789ABCDEFｱｲｳｴｵﾗﾘﾙﾚﾛ<>[]{}/*-+#@$%&";

/**
 * Falling "digital rain" rendered on a canvas. Columns of glyphs fall at
 * varying speeds for a 3D depth feel. Sits behind page content (.fx-canvas).
 * Defaults to the classic green matrix; pass `color`/`glyphs` for other themes
 * (e.g. an indigo "code rain" for the developer theme).
 */
export function MatrixRain({
  color = "#00ff99",
  head = "#d6ffe6",
  glyphs = DEFAULT_GLYPHS,
}: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const fontSize = 16;
    let columns = 0;
    let drops: number[] = [];
    let speeds: number[] = [];

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      columns = Math.floor(window.innerWidth / fontSize);
      drops = Array.from({ length: columns }, () =>
        Math.floor((Math.random() * window.innerHeight) / fontSize)
      );
      speeds = Array.from({ length: columns }, () => 0.5 + Math.random() * 1.1);
    };

    const draw = () => {
      ctx.fillStyle = "rgba(2, 6, 10, 0.08)";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < columns; i++) {
        const char = glyphs.charAt(Math.floor(Math.random() * glyphs.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        const lead = Math.random() > 0.975;
        ctx.fillStyle = lead ? head : color;
        ctx.shadowColor = color;
        ctx.shadowBlur = lead ? 12 : 0;
        ctx.fillText(char, x, y);
        ctx.shadowBlur = 0;

        if (y > window.innerHeight && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += speeds[i];
      }
    };

    let raf = 0;
    let last = 0;
    const targetInterval = 1000 / 24;
    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (t - last < targetInterval) return;
      last = t;
      draw();
    };

    setup();

    if (prefersReduced) {
      ctx.fillStyle = "rgba(2, 6, 10, 1)";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      draw();
    } else {
      raf = requestAnimationFrame(loop);
    }

    const handleResize = () => setup();
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
    };
  }, [color, head, glyphs]);

  return <canvas ref={canvasRef} className="fx-canvas" aria-hidden="true" />;
}
