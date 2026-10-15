"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { CountUp } from "@/components/CountUp";
import { projectsData, type PortfolioItem } from "@/data/projects";
import { carouselProjectIds } from "@/data/portfolio";

const items: PortfolioItem[] = carouselProjectIds
  .map((id) => projectsData.find((p) => p.id === id))
  .filter((p): p is PortfolioItem => Boolean(p));

/**
 * Horizontal project strip. Scroll sideways with the wheel/trackpad, drag with
 * the mouse, swipe on touch, or use the arrows. Cards snap into place.
 */
export function ProjectCarousel() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const drag = useRef({ down: false, startX: 0, startLeft: 0, moved: false });

  const cardStep = () => {
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>("[data-card]");
    if (!track || !card) return 0;
    return card.offsetWidth + 24;
  };

  const updateActive = useCallback(() => {
    const track = trackRef.current;
    const step = cardStep();
    if (!track || !step) return;
    setActive(Math.min(items.length - 1, Math.round(track.scrollLeft / step)));
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener("scroll", updateActive, { passive: true });
    return () => track.removeEventListener("scroll", updateActive);
  }, [updateActive]);

  const go = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * cardStep(), behavior: "smooth" });
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return; // touch scrolls natively
    const track = trackRef.current;
    if (!track) return;
    drag.current = { down: true, startX: e.clientX, startLeft: track.scrollLeft, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    const track = trackRef.current;
    if (!d.down || !track) return;
    const dx = e.clientX - d.startX;
    if (Math.abs(dx) > 4) d.moved = true;
    track.scrollLeft = d.startLeft - dx;
  };
  const endDrag = () => {
    drag.current.down = false;
  };

  return (
    <div>
      <div
        ref={trackRef}
        role="region"
        aria-label="Featured projects, scroll sideways"
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={(e) => {
          // a drag should not count as a click on a card link
          if (drag.current.moved) {
            e.preventDefault();
            e.stopPropagation();
            drag.current.moved = false;
          }
        }}
        className="no-scrollbar -mx-5 flex cursor-grab snap-x snap-mandatory scroll-pl-5 gap-6 overflow-x-auto px-5 pb-4 active:cursor-grabbing sm:-mx-8 sm:scroll-pl-8 sm:px-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      >
        {items.map((p) => {
          const Icon = p.icon;
          return (
            <article
              key={p.id}
              data-card
              className="group flex w-[86%] shrink-0 snap-start flex-col rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/60 sm:w-[26rem] sm:p-8"
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                  {p.period}
                </span>
              </div>

              <h3 className="font-display text-2xl font-bold leading-tight">{p.title}</h3>
              <p className="mt-1 text-sm font-medium text-primary">{p.impact}</p>

              <dl className="my-6 grid grid-cols-3 gap-3 border-y border-border py-4">
                {p.metrics.map((m) => (
                  <div key={m.label}>
                    <dd className="font-display text-xl font-bold">
                      <CountUp value={m.value} />
                    </dd>
                    <dt className="text-xs text-muted-foreground">{m.label}</dt>
                  </div>
                ))}
              </dl>

              <ul className="mb-6 space-y-2 font-serif text-[0.95rem] leading-relaxed text-muted-foreground">
                {p.highlights.slice(0, 2).map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>

              <div className="mt-auto flex flex-wrap gap-2 pb-6">
                {p.skills.slice(0, 4).map((s) => (
                  <span key={s} className="rounded border border-border px-2 py-1 text-xs text-foreground/80">
                    {s}
                  </span>
                ))}
              </div>

              <Link
                href={`/projects?open=${p.id}`}
                className="inline-flex items-center gap-2 font-medium text-foreground transition-colors group-hover:text-primary"
              >
                Read the details
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </article>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {active + 1} of {items.length}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={active === 0}
            aria-label="Previous project"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary disabled:opacity-40 disabled:hover:border-border disabled:hover:text-inherit"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            disabled={active === items.length - 1}
            aria-label="Next project"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary disabled:opacity-40 disabled:hover:border-border disabled:hover:text-inherit"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
