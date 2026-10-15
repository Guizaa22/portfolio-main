"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { ExperienceTimeline } from "@/components/home/ExperienceTimeline";
import { education, profile } from "@/data/portfolio";

export default function ExperiencePage() {
  return (
    <div className="mx-auto w-full max-w-[90rem] px-5 py-16 sm:px-8 sm:py-24">
      <Reveal>
        <div className="mb-14 max-w-3xl">
          <h1 className="display-wide text-5xl sm:text-6xl lg:text-7xl">Experience</h1>
          <p className="mt-6 max-w-[52ch] font-serif text-xl leading-relaxed text-muted-foreground">
            Electronics in automotive and renewable energy, then data and AI for aircraft engines.
            Pick a role to read what I built.
          </p>
        </div>
      </Reveal>

      <ExperienceTimeline />

      <section className="mt-28 grid gap-10 lg:grid-cols-12">
        <h2 className="display-wide text-3xl sm:text-4xl lg:col-span-4">Education</h2>
        <div className="space-y-8 lg:col-span-8">
          {education.map((e) => (
            <article key={e.degree} className="border-l-2 border-border pl-6 transition-colors hover:border-primary">
              <h3 className="font-display text-xl font-bold">{e.degree}</h3>
              <p className="mt-1 text-primary">
                {e.school}
                {e.place ? ` · ${e.place}` : ""}
                <span className="ml-3 text-sm text-muted-foreground">{e.status}</span>
              </p>
              <p className="mt-2 max-w-[60ch] font-serif text-lg leading-relaxed text-muted-foreground">{e.focus}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-28 flex flex-col items-start gap-6 border-t border-border pt-12 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="display-wide text-3xl sm:text-4xl">Want the full picture?</h2>
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="/projects">See my projects</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={profile.cv} target="_blank" rel="noopener noreferrer">
              Download CV
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
