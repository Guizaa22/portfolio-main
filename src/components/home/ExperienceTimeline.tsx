"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MapPin } from "lucide-react";
import { experience } from "@/data/portfolio";

/**
 * Chronological list on the left (newest first); pick a role and its
 * details replace the panel on the right.
 */
export function ExperienceTimeline() {
  const [activeId, setActiveId] = useState(experience[0].id);
  const active = experience.find((e) => e.id === activeId) ?? experience[0];

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
      <div role="tablist" aria-label="Roles" aria-orientation="vertical" className="relative lg:col-span-4">
        <span aria-hidden className="absolute bottom-3 left-[0.6rem] top-3 w-px bg-border" />
        <ul className="space-y-2">
          {experience.map((e) => {
            const selected = e.id === activeId;
            return (
              <li key={e.id}>
                <button
                  type="button"
                  role="tab"
                  id={`tab-${e.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${e.id}`}
                  onClick={() => setActiveId(e.id)}
                  className="group relative flex w-full items-start gap-5 rounded-md py-3 pl-0 pr-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <span
                    aria-hidden
                    className={`relative z-10 mt-1.5 h-[1.3rem] w-[1.3rem] shrink-0 rounded-full border-2 transition-colors ${
                      selected ? "border-primary bg-primary" : "border-border bg-background group-hover:border-primary/70"
                    }`}
                  />
                  <span>
                    <span className={`block font-display text-3xl font-bold leading-none transition-colors ${selected ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}>
                      {e.start}
                    </span>
                    <span className={`mt-1 block text-sm ${selected ? "text-primary" : "text-muted-foreground"}`}>
                      {e.company}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="lg:col-span-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            role="tabpanel"
            id={`panel-${active.id}`}
            aria-labelledby={`tab-${active.id}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="rounded-lg border border-border bg-card p-6 sm:p-9"
          >
            <p className="text-sm text-muted-foreground">{active.period}</p>
            <h3 className="mt-2 font-display text-3xl font-bold leading-tight sm:text-4xl">{active.role}</h3>
            <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-primary">
              <span className="font-medium">{active.company}</span>
              <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                {active.location}
              </span>
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{active.field}</p>

            <ul className="mt-6 space-y-4 font-serif text-lg leading-relaxed text-foreground/90">
              {active.bullets.map((b) => (
                <li key={b} className="flex gap-3">
                  <span aria-hidden className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap gap-2">
              {active.skills.map((s) => (
                <span key={s} className="rounded border border-border px-2.5 py-1 text-xs text-foreground/80">
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
