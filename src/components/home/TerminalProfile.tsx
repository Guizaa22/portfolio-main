"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/portfolio";

const BIO =
  "5th-year IT Engineering student at Tek-Up University specializing in Network and Systems Security, passionate about DevSecOps, cybersecurity, automation, and building secure, scalable infrastructures.";

type Step = { cmd: string; out: string; tone?: "status" };

const steps: Step[] = [
  { cmd: "whoami", out: `${profile.name}. IT engineering student.` },
  { cmd: "cat /opt/profile/about.txt", out: BIO },
  { cmd: "./status.sh", out: "Looking for a summer internship in cybersecurity", tone: "status" },
];

const TYPE_MS = 38;
const PAUSE_MS = 420;

/**
 * Terminal-style "about me". The commands type out one after another the first
 * time the window scrolls into view. The complete text is always available to
 * screen readers, and people who prefer reduced motion see it all at once.
 */
export function TerminalProfile() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [started, setStarted] = useState(false);
  const [reduce, setReduce] = useState(false);
  const [step, setStep] = useState(0); // index of the command being typed
  const [typed, setTyped] = useState(0); // characters of that command typed so far
  const [showOut, setShowOut] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduce(prefersReduced);
    const node = ref.current;
    if (!node) return;
    if (prefersReduced) {
      setStarted(true);
      setStep(steps.length);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started || reduce || step >= steps.length) return;
    const cmd = steps[step].cmd;
    let timer: ReturnType<typeof setTimeout>;

    if (!showOut && typed < cmd.length) {
      timer = setTimeout(() => setTyped((n) => n + 1), TYPE_MS);
    } else if (!showOut) {
      timer = setTimeout(() => setShowOut(true), PAUSE_MS);
    } else {
      timer = setTimeout(() => {
        setStep((s) => s + 1);
        setTyped(0);
        setShowOut(false);
      }, PAUSE_MS * 1.5);
    }
    return () => clearTimeout(timer);
  }, [started, reduce, step, typed, showOut]);

  const done = step >= steps.length;

  return (
    <div ref={ref} className="mx-auto max-w-4xl">
      {/* Full text for screen readers; the animated copy below is hidden from them. */}
      <div className="sr-only">
        {steps.map((s) => (
          <p key={s.cmd}>{s.out}</p>
        ))}
      </div>

      <div
        aria-hidden
        className="overflow-hidden rounded-lg border border-white/10 bg-[#0b0d12] text-[#e8e6e1] shadow-2xl shadow-black/40"
      >
        <div className="flex items-center gap-2 border-b border-white/10 bg-[#141720] px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#e9352e]" />
          <span className="h-3 w-3 rounded-full bg-[#8e95a6]/70" />
          <span className="h-3 w-3 rounded-full bg-[#3ddc84]/80" />
          <span className="ml-3 font-mono text-xs text-[#8e95a6]">mohamed@portfolio:~</span>
        </div>

        <div className="min-h-[24rem] space-y-6 px-5 py-6 font-mono text-[0.8rem] leading-relaxed sm:px-8 sm:text-sm">
          {steps.map((s, i) => {
            if (i > step) return null;
            const isCurrent = i === step && !done;
            const cmdText = i < step || done ? s.cmd : s.cmd.slice(0, typed);
            const outVisible = i < step || done || (isCurrent && showOut);
            return (
              <div key={s.cmd}>
                <p>
                  <span className="mr-2 text-[#e9352e]">$</span>
                  {cmdText}
                  {isCurrent && !showOut && (
                    <span className="ml-0.5 inline-block h-[1.05em] w-[0.5ch] translate-y-[0.15em] animate-pulse bg-[#e8e6e1]" />
                  )}
                </p>
                {outVisible && (
                  <p
                    className={`mt-2 border-l pl-4 ${
                      s.tone === "status"
                        ? "border-[#3ddc84]/60 text-[#3ddc84]"
                        : "border-white/15 text-[#e8e6e1]/90"
                    } ${s.cmd.startsWith("cat") ? "max-w-[68ch]" : ""}`}
                  >
                    {s.out}
                  </p>
                )}
              </div>
            );
          })}
          {done && (
            <p>
              <span className="mr-2 text-[#e9352e]">$</span>
              <span className="inline-block h-[1.05em] w-[0.5ch] translate-y-[0.15em] animate-pulse bg-[#e8e6e1]" />
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
