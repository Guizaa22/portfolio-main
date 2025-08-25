"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Briefcase, Trophy, BookOpen, ArrowRight, Award, TrendingUp, Code, Calendar, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const featuredExperience = {
  company: 'COFAT',
  role: 'Senior Technical of Electronics',
  period: '02/2023 – 06/2023',
  description: 'Design project for a COFAT automotive cable tester (Volkswagen, SEAT, etc.) and electronic tester for box support.',
  skills: ['Electronics', 'Automotive', 'Testing', 'Design'],
  status: 'completed'
};

const featuredProjects = [
  {
    title: 'IoT Security System',
    type: 'Academic Project',
    prize: '2024-2025',
    rank: 'Featured',
    icon: Trophy,
    color: 'badge-warning'
  },
  {
    title: 'Arduino Line Follower Robot',
    type: 'Robotics Competition',
    venue: 'ENIT Robotics',
    impact: 'Competition',
    icon: BookOpen,
    color: 'badge-info'
  },
  {
    title: 'Solar Panel Tracking System',
    type: 'Summer Internship',
    venue: 'TBC Technopole',
    impact: 'Internship',
    icon: Trophy,
    color: 'badge-success'
  }
];

const stats = [
  { label: 'Years Experience', value: '2+', icon: Briefcase },
  { label: 'Electronics Projects', value: '5', icon: Trophy },
  { label: 'Programming Languages', value: '3', icon: Award },
  { label: 'Academic Years', value: '2', icon: BookOpen }
];

export default function WorkPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-12 md:py-20">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <Badge variant="outline" className="px-4 py-2 text-sm font-medium">
              <Code className="w-4 h-4 mr-2" />
              Professional Portfolio
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text">
            My Work
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            Explore my professional journey through work experience and innovative projects that showcase my expertise in electronics and automation.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-xl mb-3 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Navigation Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          
          {/* Experience Section */}
          <div className="group relative overflow-hidden rounded-2xl bg-card border border-border shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] card">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
            <div className="relative p-8 md:p-10">
              
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 rounded-xl bg-primary/10 text-primary">
                  <Briefcase className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">Experience</h2>
                  <p className="text-muted-foreground">Professional work history</p>
                </div>
              </div>

              {/* Current Role Highlight */}
              <div className="bg-muted/30 rounded-xl p-6 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="badge-success">
                    ● Current Role
                  </Badge>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{featuredExperience.role}</h3>
                <p className="text-primary font-semibold mb-2">{featuredExperience.company}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Calendar className="w-4 h-4" />
                  {featuredExperience.period}
                </div>
                <p className="text-sm text-muted-foreground mb-4">{featuredExperience.description}</p>
                <div className="flex flex-wrap gap-2">
                  {featuredExperience.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <Button asChild className="w-full group/btn">
                <Link href="/experience">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Full Experience
                  <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Projects Section */}
          <div className="group relative overflow-hidden rounded-2xl bg-card border border-border shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] card">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent"></div>
            <div className="relative p-8 md:p-10">
              
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 rounded-xl bg-secondary/10 text-secondary">
                  <Trophy className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">Projects</h2>
                  <p className="text-muted-foreground">Competitions & research</p>
                </div>
              </div>

              {/* Featured Projects */}
              <div className="space-y-4 mb-6">
                {featuredProjects.map((project, index) => {
                  const Icon = project.icon;
                  return (
                    <div key={index} className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl">
                      <div className={`p-2 rounded-lg ${project.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-foreground">{project.title}</h4>
                        <p className="text-xs text-muted-foreground">{project.type}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-primary">
                          {project.prize || project.venue}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {project.rank || project.impact}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CTA */}
              <Button asChild className="w-full group/btn" variant="secondary">
                <Link href="/projects">
                  <Award className="w-4 h-4 mr-2" />
                  View All Projects
                  <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="text-center p-6 bg-card border border-border rounded-xl hover:bg-muted/50 transition-colors">
            <Briefcase className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-2">Work Experience</h3>
            <p className="text-sm text-muted-foreground mb-4">Professional roles and achievements</p>
            <Button asChild variant="outline" size="sm">
              <Link href="/experience">Explore</Link>
            </Button>
          </div>
          
          <div className="text-center p-6 bg-card border border-border rounded-xl hover:bg-muted/50 transition-colors">
            <Trophy className="w-8 h-8 text-secondary mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-2">Competitions & Projects</h3>
            <p className="text-sm text-muted-foreground mb-4">Winning solutions and innovations</p>
            <Button asChild variant="outline" size="sm">
              <Link href="/projects">Discover</Link>
            </Button>
          </div>
          
          <div className="text-center p-6 bg-card border border-border rounded-xl hover:bg-muted/50 transition-colors">
            <BookOpen className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-2">Research & Publications</h3>
            <p className="text-sm text-muted-foreground mb-4">Academic contributions and papers</p>
            <Button asChild variant="outline" size="sm">
              <Link href="/projects">Read More</Link>
            </Button>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full mb-6">
              <ExternalLink className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Work Together?</h2>
            <p className="text-muted-foreground mb-6">
              I&apos;m passionate about solving complex electronic problems and building innovative IoT solutions. Let&apos;s create something amazing together!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Get In Touch
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="mailto:your-email@example.com">
                  Send Email
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}