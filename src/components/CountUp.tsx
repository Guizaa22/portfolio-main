"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  /** Final number. Non-numeric values (e.g. "~3 min") are shown as-is. */
  value: string;
  className?: string;
}

/** Counts up to the number inside `value` once it scrolls into view. */
export function CountUp({ value, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const match = value.match(/^(\D*)(\d+)(.*)$/);
  const target = match ? parseInt(match[2], 10) : null;
  const [current, setCurrent] = useState(target ?? 0);

  useEffect(() => {
    const node = ref.current;
    if (!node || target === null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setCurrent(0);
    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const duration = 900;
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          setCurrent(Math.round(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target]);

  if (!match || target === null) return <span className={className}>{value}</span>;

  return (
    <span ref={ref} className={className}>
      {match[1]}
      {current}
      {match[3]}
    </span>
  );
}
