"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDown, Download, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import { profile } from "@/data/portfolio";

/**
 * Hero. The armored figure stands in front of the giant name. The black
 * faceplate hides the person; the lens (button or mouse hover) opens it to
 * show the real face. Lens position is a percentage of the figure image so it
 * stays aligned at every size.
 */
export function ArmoredHero() {
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const [unmasked, setUnmasked] = useState(false);
  const [hovering, setHovering] = useState(false);
  const open = unmasked || hovering;

  const { scrollY } = useScroll();
  const figureY = useTransform(scrollY, [0, 700], [0, reduce ? 0 : -70]);
  const nameY = useTransform(scrollY, [0, 700], [0, reduce ? 0 : 50]);

  return (
    <section
      id="top"
      className="relative -mt-16 flex min-h-[100svh] flex-col overflow-hidden pt-16"
    >
      {/* soft red light behind the figure */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-[8%] h-[70vh] w-[70vh] rounded-full bg-primary/20 blur-[120px] lg:right-[6%]"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-[90rem] flex-1 grid-cols-1 items-end gap-0 px-5 sm:px-8 lg:grid-cols-12">
        {/* Figure */}
        <motion.div
          style={{ y: figureY }}
          className="relative z-20 order-1 mx-auto w-[78%] max-w-[26rem] self-end sm:w-[56%] lg:order-2 lg:col-span-5 lg:col-start-7 lg:w-full lg:max-w-[38rem]"
          onPointerEnter={(e) => e.pointerType === "mouse" && setHovering(true)}
          onPointerLeave={(e) => e.pointerType === "mouse" && setHovering(false)}
        >
          <div className="relative">
            <Image
              src="/img/armor.webp"
              alt="A hooded figure in black armor with red light strips. The face is hidden behind a black plate."
              width={736}
              height={930}
              priority
              sizes="(min-width: 1024px) 38rem, 80vw"
              className="h-auto w-full select-none drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]"
            />

            {/* Lens over the faceplate */}
            <div
              aria-hidden={!open}
              className="absolute overflow-hidden rounded-full border border-primary/70 bg-background transition-[clip-path,opacity,transform] duration-500 ease-out"
              style={{
                left: "30.4%",
                top: "16%",
                width: "33%",
                aspectRatio: "1 / 1",
                opacity: open ? 1 : 0,
                transform: open ? "scale(1)" : "scale(0.72)",
                clipPath: open ? "circle(50% at 50% 50%)" : "circle(0% at 50% 50%)",
                boxShadow: open ? "0 0 0 6px rgb(var(--primary) / 0.18), 0 0 60px rgb(var(--primary) / 0.45)" : "none",
              }}
            >
              <Image
                src="/img/face.webp"
                alt="Mohamed Guizani smiling, wearing glasses"
                width={480}
                height={480}
                className="h-full w-full object-cover"
              />
              {/* scan sweep while open */}
              {open && !reduce && (
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-transparent via-primary/25 to-transparent"
                  style={{ animation: "scan-sweep 1.6s ease-in-out 1 both" }}
                />
              )}
            </div>
          </div>

          <div className="mt-3 flex justify-center lg:absolute lg:left-0 lg:top-[10%] lg:mt-0">
            <button
              type="button"
              onClick={() => setUnmasked((v) => !v)}
              aria-pressed={unmasked}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2 text-sm font-medium backdrop-blur transition-colors hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {unmasked ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {unmasked ? "Mask on" : "Show my face"}
            </button>
          </div>
        </motion.div>

        {/* Text */}
        <div className="relative z-30 order-2 pb-[calc(22vw+2rem)] pt-8 sm:pb-[calc(21vw+2rem)] lg:order-1 lg:col-span-6 lg:col-start-1 lg:pb-[calc(19.7vw+2.5rem)] lg:pt-0">
          <h1 className="sr-only">{profile.name}</h1>
          <p className="mb-4 font-display text-lg font-semibold text-primary sm:text-xl">
            {t("hero.subtitle")}
          </p>
          <p className="max-w-[34ch] font-serif text-2xl leading-snug text-foreground sm:text-3xl lg:text-[2.1rem] lg:leading-[1.2]">
            {t("hero.description")}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
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

      {/* Giant name along the bottom edge, behind the figure */}
      <motion.div
        aria-hidden
        style={{ y: nameY }}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 select-none overflow-hidden px-3 sm:px-6"
      >
        <div className="display-condensed whitespace-nowrap text-center text-[27vw] text-foreground sm:text-[25vw] lg:text-[24vw]">
          Guizani
        </div>
      </motion.div>
    </section>
  );
}
