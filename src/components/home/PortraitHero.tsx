"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import { profile } from "@/data/portfolio";

/** Tunis clock for the location chip. Renders a placeholder until mounted so server and client markup match. */
function TunisTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Africa/Tunis",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{time || "--:--"}</span>;
}

/**
 * Home hero. Headline on the left, portrait on the right running off the
 * bottom edge. On the very first visit of a session the figure drops in from
 * above, lands with a flash and a shock ring, then the text rises. Every
 * entrance is CSS (see "Portrait hero" in globals.css), so repeat visits and
 * reduced-motion users get the finished layout with no animation.
 */
export function PortraitHero() {
  const { t } = useTranslation();
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
    el.dataset.active = "1";
  };
  const onLeave = () => {
    if (wrapRef.current) delete wrapRef.current.dataset.active;
  };

  // The last element to animate marks the intro as played for this session,
  // so coming back to Home later in the same visit does not replay it.
  const markSeen = (e: React.AnimationEvent) => {
    if (e.animationName === "hero-rise") document.documentElement.dataset.seen = "1";
  };

  return (
    <section
      id="top"
      className="relative -mt-16 flex min-h-[100svh] flex-col overflow-hidden pt-16 lg:block"
    >
      {/* red light behind the figure */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-18%] top-[4%] h-[80vh] w-[80vh] rounded-full bg-primary/15 blur-[130px] lg:right-[2%]"
      />
      {/* impact flash (first visit only) */}
      <div aria-hidden className="hero-flash hero-anim pointer-events-none absolute inset-0 z-[5]" />

      {/* Text */}
      <div className="pointer-events-none relative z-20 mx-auto flex w-full max-w-[90rem] px-5 sm:px-8 lg:min-h-[calc(100svh-4rem)] lg:items-center">
        <div className="pointer-events-auto w-full pb-2 pt-8 lg:w-[56%] lg:pb-20 lg:pt-0">
          <p className="hero-anim hero-rise mb-7 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
            <span aria-hidden className="h-2 w-2 rounded-full bg-primary" />
            <span className="font-medium text-foreground">{profile.name}</span>
            <span aria-hidden className="hidden h-px w-8 bg-border sm:block" />
            <span>Cybersecurity engineering student</span>
          </p>

          <h1 className="hero-title text-[3.6rem] sm:text-7xl lg:text-[6.8rem]">
            <span className="hero-anim hero-rise hero-rise-2 block">Attack it.</span>
            <span className="hero-anim hero-rise hero-rise-3 block font-serif font-normal italic">
              Then defend it.
            </span>
          </h1>

          <p className="hero-anim hero-rise hero-rise-3 mt-8 max-w-[38ch] font-serif text-xl leading-relaxed text-muted-foreground sm:text-2xl">
            {t("hero.description")}
          </p>

          <div
            onAnimationEnd={markSeen}
            className="hero-anim hero-rise hero-rise-4 mt-9 flex flex-wrap items-center gap-3"
          >
            <Button asChild size="lg">
              <Link href="#work">
                See the work
                <ArrowDown className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={profile.cv} target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-4 w-4" />
                Download CV
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Portrait */}
      <div
        ref={wrapRef}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="portrait-wrap relative z-10 mx-auto h-[112vw] max-h-[46rem] w-full max-w-[34rem] overflow-hidden lg:absolute lg:inset-y-0 lg:right-[1vw] lg:mx-0 lg:h-auto lg:max-h-none lg:w-[calc(60.8svh+2.5rem)] lg:max-w-none"
      >
        {/* HUD frame corners */}
        <div aria-hidden className="pointer-events-none absolute inset-x-1 bottom-10 top-24 hidden lg:block">
          <span className="absolute left-0 top-0 h-7 w-7 border-l border-t border-primary/60" />
          <span className="absolute right-0 top-0 h-7 w-7 border-r border-t border-primary/60" />
          <span className="absolute bottom-0 left-0 h-7 w-7 border-b border-l border-primary/60" />
          <span className="absolute bottom-0 right-0 h-7 w-7 border-b border-r border-primary/60" />
        </div>

        {/* The figure (this is the part that drops in) */}
        <div className="hero-drop hero-anim absolute inset-x-0 top-0 mx-auto h-[150vw] w-[67.5vw] [container-type:inline-size] lg:left-auto lg:right-0 lg:top-16 lg:mx-0 lg:h-[135svh] lg:w-[60.8svh]">
          {/* light streak that trails the fall */}
          <div
            aria-hidden
            className="hero-trail hero-anim pointer-events-none absolute bottom-full left-[16%] h-[70vh] w-[68%] bg-gradient-to-t from-primary/60 via-primary/20 to-transparent blur-2xl"
          />
          <Image
            src="/img/portrait.webp"
            alt="Mohamed Guizani in a black armored cybersecurity suit with red light strips"
            width={864}
            height={1920}
            priority
            sizes="(min-width: 1024px) 40vh, 70vw"
            className="portrait-img h-full w-full select-none object-contain"
          />
          {/* name plate on the chest */}
          <div className="absolute left-[12%] top-[60%] w-[31%] rounded-[3px] border border-primary/80 bg-black/80 px-[2.5%] py-[1.4%] text-center">
            <p className="font-display text-[clamp(0.55rem,6cqw,1rem)] font-bold leading-tight tracking-wide text-white">
              GUIZANI
            </p>
            <p className="text-[clamp(0.4rem,3.2cqw,0.62rem)] leading-tight tracking-[0.18em] text-primary">
              SEC ENGINEER
            </p>
          </div>
        </div>

        {/* cursor spotlight */}
        <div aria-hidden className="portrait-fx" />
        <div aria-hidden className="portrait-ring hidden lg:block" />

        {/* shock ring at the moment of landing (first visit only) */}
        <div
          aria-hidden
          className="hero-shock hero-anim pointer-events-none absolute bottom-[-2.5rem] left-1/2 h-24 w-56 rounded-[50%] border-2 border-primary"
        />

        {/* chips */}
        <div className="absolute left-5 top-32 z-10 hidden rounded-full border border-border bg-card/70 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur lg:block">
          Tunis, Tunisia · <TunisTime /> GMT+1
        </div>
        <div className="absolute bottom-6 left-2 z-10 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1.5 text-xs text-foreground backdrop-blur lg:bottom-auto lg:left-5 lg:top-44">
          <span aria-hidden className="h-2 w-2 rounded-full bg-emerald-400" />
          Open for internship
        </div>
      </div>

      {/* fade into the next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[15] h-28 bg-gradient-to-t from-background via-background/70 to-transparent"
      />
    </section>
  );
}
