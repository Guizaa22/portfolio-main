"use client";

import { ThemedIcon } from "@/components/ThemedIcon";
import { skillGroups } from "@/data/portfolio";

/** Skills as a ledger: group name on the left, the tools on the right. */
export function SkillsSection() {
  return (
    <dl className="divide-y divide-border border-y border-border">
      {skillGroups.map((group) => (
        <div key={group.name} className="grid gap-4 py-7 md:grid-cols-12 md:gap-8">
          <dt className="font-display text-xl font-bold md:col-span-3">{group.name}</dt>
          <dd className="flex flex-wrap gap-2.5 md:col-span-9">
            {group.skills.map((s) => (
              <span
                key={s.name}
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card/60 px-3 py-1.5 text-sm transition-colors hover:border-primary/60"
              >
                {s.logo && (
                  <ThemedIcon
                    name={s.logo}
                    alt=""
                    width={16}
                    height={16}
                    className="h-4 w-4 object-contain"
                  />
                )}
                {s.name}
              </span>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  );
}
