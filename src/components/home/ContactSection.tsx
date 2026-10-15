"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Copy, Github, Linkedin, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/portfolio";

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-8">
        <h2 className="display-wide text-4xl sm:text-6xl lg:text-7xl">
          Looking for a summer cybersecurity intern?
        </h2>
        <p className="mt-6 max-w-[48ch] font-serif text-xl leading-relaxed text-muted-foreground">
          My most hands-on work is API penetration testing, SOC pipelines and secure development.
          Send me a message and tell me what you need.
        </p>
      </div>

      <div className="lg:col-span-4">
        <button
          type="button"
          onClick={copyEmail}
          className="group flex w-full items-center justify-between gap-3 rounded-lg border border-border bg-card px-5 py-4 text-left transition-colors hover:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <span className="min-w-0">
            <span className="block text-xs text-muted-foreground">Email</span>
            <span className="block truncate font-medium">{profile.email}</span>
          </span>
          <span className="inline-flex shrink-0 items-center gap-1.5 text-sm text-primary" aria-live="polite">
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied" : "Copy"}
          </span>
        </button>

        <div className="mt-4 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/contact">Send a message</Link>
          </Button>
          <Button asChild variant="outline" size="icon" aria-label="GitHub">
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5" />
            </a>
          </Button>
          <Button asChild variant="outline" size="icon" aria-label="LinkedIn">
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
          <Button asChild variant="outline" size="icon" aria-label="Download CV">
            <a href={profile.cv} target="_blank" rel="noopener noreferrer">
              <Download className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
