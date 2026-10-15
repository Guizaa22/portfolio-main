"use client";

import { useEffect, useState } from 'react';
import { projectsData, type Category, type PortfolioItem } from '@/data/projects';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/Reveal';
import { MatrixRain } from '@/components/MatrixRain';
import { CircuitBackground } from '@/components/CircuitBackground';
import {
  ExternalLink,
  Calendar,
  Target,
  Award,
  Users,
  Shield,
  Cpu,
  Layers,
  FileText,
  X,
  CheckCircle2,
} from 'lucide-react';
import Link from 'next/link';

const categories = [
  { id: 'all', label: 'All', icon: Target },
  { id: 'fullstack', label: 'Full Stack Dev', icon: Layers },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'embedded', label: 'Electronics (Embedded)', icon: Cpu },
] as const;

const categoryAccent: Record<Category, string> = {
  security: 'text-emerald-500 border-emerald-500/40 bg-emerald-500/10',
  fullstack: 'text-primary border-primary/40 bg-primary/10',
  embedded: 'text-orange-500 border-orange-500/40 bg-orange-500/10',
};

const categoryLabel: Record<Category, string> = {
  security: 'Security',
  fullstack: 'Full Stack',
  embedded: 'Embedded',
};

const VALID_CATEGORIES = ['all', 'fullstack', 'security', 'embedded'];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selected, setSelected] = useState<PortfolioItem | null>(null);

  // Open a project's details straight from a link like /projects?open=14
  useEffect(() => {
    const id = Number(new URLSearchParams(window.location.search).get('open'));
    if (!id) return;
    const match = projectsData.find((p) => p.id === id);
    if (match) setSelected(match);
  }, []);

  // Allow deep-linking to a category via URL hash, e.g. /projects#security
  useEffect(() => {
    const applyHash = () => {
      const h = window.location.hash.replace('#', '');
      if (VALID_CATEGORIES.includes(h)) setActiveCategory(h);
    };
    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, []);

  const selectCategory = (id: string) => {
    setActiveCategory(id);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', id === 'all' ? '/projects' : `/projects#${id}`);
    }
  };

  const filteredProjects =
    activeCategory === 'all'
      ? projectsData
      : projectsData.filter((item) => item.category === activeCategory);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'badge-success';
      case 'published':
        return 'badge-info';
      case 'live':
        return 'badge-highlight';
      case 'ongoing':
        return 'badge-warning';
      default:
        return 'bg-muted/30 text-muted-foreground border-border';
    }
  };

  const countFor = (id: string) =>
    id === 'all' ? projectsData.length : projectsData.filter((p) => p.category === id).length;

  const themed = activeCategory !== 'all';
  const themeClass = themed ? `projects-theme theme-${activeCategory}` : '';

  return (
    <div className={`min-h-screen bg-gradient-to-br from-background to-muted/20 ${themeClass}`}>
      {/* Per-category animated background */}
      {activeCategory === 'security' && <MatrixRain />}
      {activeCategory === 'fullstack' && (
        <MatrixRain
          color="#6366f1"
          head="#c7d2fe"
          glyphs="{}[]()<>/;=+-*&|!?:.01constletfn=>ifelsereturnasyncawait"
        />
      )}
      {activeCategory === 'embedded' && <CircuitBackground />}

      <div className="projects-content container mx-auto px-4 py-12 md:py-20">

        {/* Hero Section */}
        <Reveal>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-foreground">
              Projects
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              Cybersecurity, full-stack and embedded work, from API penetration testing and SOC
              pipelines to IoT and robotics.
            </p>

            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{projectsData.length}</div>
                <div className="text-sm text-muted-foreground">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-500">{countFor('security')}</div>
                <div className="text-sm text-muted-foreground">Security</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground">3</div>
                <div className="text-sm text-muted-foreground">Domains</div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => selectCategory(category.id)}
                className={`flex items-center gap-2 px-4 md:px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                    : 'bg-card hover:bg-muted border border-border hover:border-primary/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm md:text-base">{category.label}</span>
                <Badge variant="secondary" className="ml-1 text-xs">
                  {countFor(category.id)}
                </Badge>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, i) => {
            const Icon = project.icon;
            return (
              <Reveal
                key={project.id}
                variant={i % 2 === 0 ? 'left' : 'right'}
                delay={(i % 2) * 80}
                className={`group relative overflow-hidden rounded-2xl bg-card border border-border/50 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] ${
                  project.featured ? 'ring-2 ring-primary/20 shadow-primary/10' : ''
                } card`}
              >
                {project.featured && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="badge-prize">
                      <Award className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                )}

                <div className="p-6 md:p-8">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="mb-2">
                        <span
                          className={`text-[11px] px-2 py-0.5 rounded border font-medium ${categoryAccent[project.category]}`}
                        >
                          {categoryLabel[project.category]}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-primary font-semibold mb-2 text-sm">{project.subtitle}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Calendar className="w-3 h-3" />
                        <span>{project.period}</span>
                        <span>•</span>
                        <span>{project.impact}</span>
                      </div>
                      <div
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}
                      >
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </div>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-muted/30 rounded-xl">
                    {project.metrics.map((m) => (
                      <div key={m.label} className="text-center">
                        <div className="text-base font-bold text-primary">{m.value}</div>
                        <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Highlights */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-foreground mb-3">Key Highlights</h4>
                    <ul className="space-y-2">
                      {project.highlights.slice(0, 3).map((highlight, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  {project.team && (
                    <p className="text-xs text-muted-foreground mb-4">
                      <span className="font-semibold text-foreground">Team:</span> {project.team}
                    </p>
                  )}

                  {/* Action */}
                  <div className="space-y-3">
                    <Button className="w-full" onClick={() => setSelected(project)}>
                      <FileText className="w-4 h-4 mr-2" />
                      View Project Details
                    </Button>
                    {project.link && (
                      <Button asChild variant="outline" className="w-full">
                        <Link href={project.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Source Code
                        </Link>
                      </Button>
                    )}
                    {project.liveUrl && (
                      <Button asChild variant="outline" className="w-full">
                        <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Live Demo
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12 max-w-2xl mx-auto">
            <Users className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Have a project in mind?</h2>
            <p className="text-muted-foreground mb-6">
              Tell me what you are building. I work on security, full-stack and embedded projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Start a Project
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/experience">
                  View Experience
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Project Details Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            data-lenis-prevent
            className="relative w-full max-w-2xl max-h-[86vh] overflow-y-auto rounded-2xl bg-card border border-border shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              aria-label="Close details"
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 md:p-8">
              {/* Header */}
              <div className="flex items-start gap-4 mb-5 pr-10">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <selected.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="mb-2">
                    <span className={`text-[11px] px-2 py-0.5 rounded border font-medium ${categoryAccent[selected.category]}`}>
                      {categoryLabel[selected.category]}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground leading-tight">{selected.title}</h3>
                  <p className="text-primary font-semibold text-sm mt-1">{selected.subtitle}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Calendar className="w-3 h-3" />
                    <span>{selected.period}</span><span>•</span><span>{selected.impact}</span>
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-3 mb-5 p-4 bg-muted/30 rounded-xl">
                {selected.metrics.map((m) => (
                  <div key={m.label} className="text-center">
                    <div className="text-base font-bold text-primary">{m.value}</div>
                    <div className="text-[11px] uppercase tracking-wide text-muted-foreground">{m.label}</div>
                  </div>
                ))}
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed mb-5">{selected.description}</p>

              <div className="mb-5">
                <h4 className="text-sm font-semibold text-foreground mb-3">What I did</h4>
                <ul className="space-y-2">
                  {selected.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-5">
                <h4 className="text-sm font-semibold text-foreground mb-2">Tech &amp; Tools</h4>
                <div className="flex flex-wrap gap-2">
                  {selected.skills.map((s) => (
                    <Badge key={s} variant="outline" className="text-xs">{s}</Badge>
                  ))}
                </div>
              </div>

              {selected.team && (
                <p className="text-xs text-muted-foreground mb-5">
                  <span className="font-semibold text-foreground">Team:</span> {selected.team}
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                {selected.detailsUrl && (
                  <Button asChild className="flex-1">
                    <a href={selected.detailsUrl} target="_blank" rel="noopener noreferrer">
                      <FileText className="w-4 h-4 mr-2" /> Open Presentation
                    </a>
                  </Button>
                )}
                {selected.link && (
                  <Button asChild variant="outline" className="flex-1">
                    <a href={selected.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" /> View Source Code
                    </a>
                  </Button>
                )}
                <Button variant="ghost" onClick={() => setSelected(null)} className="sm:w-auto">Close</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
