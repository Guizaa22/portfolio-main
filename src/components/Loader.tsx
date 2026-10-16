"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const SESSION_KEY = "intro-seen";

/**
 * One-time intro: a counter runs to 100, then the curtain lifts.
 * Shown once per browser session. The layout's head script sets
 * data-seen on <html> for repeat visits so this never flashes.
 */
export function Loader() {
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      /* storage can be blocked; show the intro anyway */
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (seen || reduce) {
      setVisible(false);
      return;
    }

    const duration = 900;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // ease-out so the last digits slow down
      setCount(Math.round(100 * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        try {
          sessionStorage.setItem(SESSION_KEY, "1");
        } catch {
          /* ignore */
        }
        setTimeout(() => setVisible(false), 250);
      }
    };
    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="site-loader fixed inset-0 z-[100] flex flex-col justify-between bg-background p-6 text-foreground sm:p-10"
          initial={{ y: 0 }}
          exit={{ y: "-100%", transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] } }}
          role="status"
          aria-label="Loading"
        >
          <p className="font-medium text-muted-foreground">Mohamed Guizani</p>
          <div>
            <div className="display-condensed text-[28vw] leading-[0.8] sm:text-[18vw]">
              {String(count).padStart(3, "0")}
            </div>
            <div className="mt-6 h-[3px] w-full bg-border">
              <div className="h-full bg-primary" style={{ width: `${count}%` }} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
