"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Badge } from '@/components/ui/badge';
import { ThemedIcon } from "@/components/ThemedIcon";
import { useTranslation } from "@/hooks/useTranslation";
import {
  Github,
  Linkedin,
  Mail,
  CodeXml, // Icon for Programming Languages
  BrainCircuit, // Icon for ML/AI
  ServerCog, // Icon for Backend & APIs
  Cloud, // Icon for Cloud & MLOps
  WandSparkles, // Icon for AI Dev
  Trophy,
  BookOpen,
  ArrowRight,
  Award,
  TrendingUp,
  Code,
  Calendar,
  ExternalLink,
  Users,
  Briefcase
} from 'lucide-react';

// Enhanced Skills Data with better organization and balance
const skillsCategories = [
  {
    name: "Programming Languages",
    icon: CodeXml,
    skills: [
      { name: "Python", iconName: "python" },
      { name: "C/C++", iconName: "c" },
      { name: "Java", iconName: "java" },
      { name: "SQL", iconName: "sql" },
    ],
  },
  {
    name: "Electronics & IoT",
    icon: BrainCircuit,
    skills: [
      { name: "Arduino", iconName: "arduino" },
      { name: "ESP32", iconName: "arduino" },
      { name: "Raspberry Pi", iconName: "raspberrypi" },
      { name: "STM32", iconName: "stm32" },
    ],
  },
  {
    name: "Design & CAD Tools",
    icon: ServerCog,
    skills: [
      { name: "SolidWorks", iconName: "solidworks" },
      { name: "Matlab", iconName: "matlab" },
      { name: "Xilinx ISE", iconName: "xilinx" },
      { name: "Quartus", iconName: "quartus" },
    ],
  },
  {
    name: "Web Development",
    icon: WandSparkles,
    skills: [
      { name: "HTML", iconName: "html" },
      { name: "CSS", iconName: "css" },
      { name: "JavaScript", iconName: "javascript" },
      { name: "Ubuntu Linux", iconName: "linux" },
    ],
  },
  {
    name: "Cloud & Tools",
    icon: Cloud,
    skills: [
      { name: "AWS", iconName: "aws" },
      { name: "Git", iconName: "git" },
    ],
  },
  {
    name: "Developer Tools",
    icon: Code,
    skills: [
      { name: "Cursor", iconName: "cursor" },
      { name: "MCP", iconName: "mcp" },
    ],
  },
];

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
    icon: Code,
    color: 'badge-highlight'
  },
  {
    title: 'Arduino Line Follower Robot',
    type: 'Robotics Competition',
    venue: 'ENIT Robotics',
    impact: 'Competition',
    icon: Trophy,
    color: 'badge-warning'
  },
  {
    title: 'Solar Panel Tracking System',
    type: 'Summer Internship',
    venue: 'TBC Technopole',
    impact: 'Internship',
    icon: BookOpen,
    color: 'badge-info'
  }
];



export default function Home() {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-8 md:py-12">
        
        {/* Hero Section */}
        <section id="hero" className="mb-12 md:mb-16 flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Image */}
          <div className="flex-shrink-0">
            <Image
                             src="/img/me.png" // Updated to use your new photo
              alt="Mohamed Guizani"
              width={180} // Adjust size as needed
              height={180}
              priority // Load image eagerly as it's above the fold
              className="rounded-full object-cover border-4 border-primary/20 shadow-lg"
            />
          </div>
          {/* Text Content */}
          <div className="text-center md:text-left flex-grow">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-3">
              {t('hero.title')}
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-muted-foreground mb-6">
              {t('hero.subtitle')}
            </h2>
            <p className="max-w-3xl text-base sm:text-lg text-muted-foreground mb-8">
              {t('hero.description')}
            </p>
            <div className="flex justify-center md:justify-start items-center space-x-4">
              <Button asChild variant="outline" size="icon">
                <Link href="https://github.com/Guizaa22" target="_blank" rel="noreferrer" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="icon">
              <Link href="https://www.linkedin.com/in/guizani-mohamed-b66802250/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="icon">
              <Link href="mailto:hama.guizeni842@gmail.com" aria-label="Email">
                <Mail className="h-5 w-5" />
              </Link>
            </Button>
          </div>
         </div> {/* Add missing closing div for text content */}
        </section>

        {/* Main Navigation Cards */}
        <section id="navigation" className="mb-12 md:mb-16">
          <div className="grid md:grid-cols-2 gap-8 md:items-stretch">
            
            {/* Experience Section */}
            <div className="group relative overflow-hidden rounded-2xl bg-card border border-border shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] flex flex-col card">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
              <div className="relative p-8 md:p-10 flex flex-col flex-1">
                
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-primary/10 text-primary">
                    <Briefcase className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground">{t('experience.title')}</h3>
                    <p className="text-muted-foreground">Professional work history</p>
                  </div>
                </div>

                {/* Current Role Highlight */}
                <div className="bg-muted/30 rounded-xl p-6 mb-6 flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="badge-success">
                      ● Current Role
                    </Badge>
                  </div>
                  <h4 className="text-lg font-bold text-foreground mb-2">{featuredExperience.role}</h4>
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
                <div className="mt-auto">
                  <Button asChild className="w-full group/btn">
                    <Link href="/experience">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      View Full Experience
                      <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Projects Section */}
            <div className="group relative overflow-hidden rounded-2xl bg-card border border-border shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] flex flex-col card">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
              <div className="relative p-8 md:p-10 flex flex-col flex-1">
                
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-primary/10 text-primary">
                    <Trophy className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground">{t('projects.title')}</h3>
                    <p className="text-muted-foreground">Full stack, AI hackathons & publications</p>
                  </div>
                </div>

                {/* Featured Projects */}
                <div className="space-y-4 mb-6 flex-1">
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
                          <div className="text-sm font-bold text-foreground">
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
                <div className="mt-auto">
                  <Button asChild className="w-full group/btn">
                    <Link href="/projects">
                      <Award className="w-4 h-4 mr-2" />
                      View All Projects
                      <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section - Enhanced Design */}
        <section id="skills" className="mb-12 md:mb-16">
          <h2 className="text-3xl font-bold text-center mb-6 md:mb-8 text-foreground">
            {t('skills.title')}
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {skillsCategories.map((category) => (
              <div
                key={category.name}
                className="skills-card group"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/60 to-secondary/60 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/15 transition-colors">
                      <category.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="skill-item group/skill"
                      >
                        <div className="skill-icon-container">
                          <ThemedIcon
                            name={skill.iconName}
                            alt={`${skill.name} logo`}
                            width={20}
                            height={20}
                            className="themed-icon h-5 w-5 object-contain"
                          />
                        </div>
                        <span className="text-sm font-semibold text-foreground/85 group-hover/skill:text-foreground transition-colors whitespace-nowrap">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section id="cta" className="text-center">
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full mb-6">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('cta.title')}</h2>
            <p className="text-muted-foreground mb-6">
              {t('cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">
                  {t('cta.contact')}
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="mailto:hama.guizeni842@gmail.com">
                  {t('cta.email')}
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
