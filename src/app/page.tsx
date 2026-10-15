"use client";

import { ArmoredHero } from "@/components/home/ArmoredHero";
import { ProjectCarousel } from "@/components/home/ProjectCarousel";
import { ExperienceTimeline } from "@/components/home/ExperienceTimeline";
import { SkillsSection } from "@/components/home/SkillsSection";
import { ContactSection } from "@/components/home/ContactSection";
import { Reveal } from "@/components/Reveal";
import { education, languages } from "@/data/portfolio";

function SectionHeading({ title, intro }: { title: string; intro?: string }) {
  return (
    <div className="mb-12 max-w-3xl">
      <h2 className="display-wide text-4xl sm:text-5xl lg:text-6xl">{title}</h2>
      {intro && (
        <p className="mt-5 max-w-[52ch] font-serif text-xl leading-relaxed text-muted-foreground">
          {intro}
        </p>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <ArmoredHero />

      <div className="mx-auto w-full max-w-[90rem] px-5 sm:px-8">
        <section id="work" className="scroll-mt-16 py-20 sm:py-28">
          <Reveal>
            <SectionHeading
              title="Selected work"
              intro="Offensive testing, a distributed SOC and hardened networks. Open any card for the full details."
            />
          </Reveal>
          <ProjectCarousel />
        </section>

        <section id="experience" className="scroll-mt-16 py-20 sm:py-28">
          <Reveal>
            <SectionHeading
              title="Experience"
              intro="Three internships and jobs, from solar tracking to aircraft engine prediction."
            />
          </Reveal>
          <ExperienceTimeline />
        </section>

        <section id="skills" className="scroll-mt-16 py-20 sm:py-28">
          <Reveal>
            <SectionHeading title="Tools I use" />
          </Reveal>
          <SkillsSection />
        </section>

        <section id="education" className="scroll-mt-16 py-20 sm:py-28">
          <Reveal>
            <SectionHeading title="Education" />
          </Reveal>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="space-y-10 lg:col-span-8">
              {education.map((e) => (
                <article key={e.degree} className="border-l-2 border-border pl-6 transition-colors hover:border-primary">
                  <h3 className="font-display text-2xl font-bold">{e.degree}</h3>
                  <p className="mt-1 text-primary">
                    {e.school}
                    {e.place ? ` · ${e.place}` : ""}
                    <span className="ml-3 text-sm text-muted-foreground">{e.status}</span>
                  </p>
                  <p className="mt-3 max-w-[60ch] font-serif text-lg leading-relaxed text-muted-foreground">
                    {e.focus}
                  </p>
                </article>
              ))}
            </div>

            <div className="lg:col-span-4">
              <h3 className="mb-4 font-display text-xl font-bold">Languages</h3>
              <ul className="divide-y divide-border border-y border-border">
                {languages.map((l) => (
                  <li key={l.name} className="flex items-center justify-between py-3">
                    <span>{l.name}</span>
                    <span className="text-sm text-muted-foreground">{l.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-16 border-t border-border py-20 sm:py-28">
          <Reveal>
            <ContactSection />
          </Reveal>
        </section>
      </div>
    </>
  );
}
