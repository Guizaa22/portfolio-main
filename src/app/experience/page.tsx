"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, ExternalLink, TrendingUp, Users, Code, Award } from 'lucide-react';
import Link from 'next/link';

const experienceData = [
  {
    id: 1,
    company: 'COFAT',
    role: 'Senior Technical of Electronics',
    period: '02/2023 – 06/2023',
    location: 'Tunis, Tunisia',
    type: 'Full-time',
    status: 'completed',
    achievements: [
      'Designed project for COFAT automotive cable tester (Volkswagen, SEAT, etc.)',
      'Developed electronic tester for box support which improved car cable testing system',
      'Collaborated with senior team members to develop remediation strategies for identified problems',
      'Used innovative, durable and efficient components for the test circuit',
      'Enhanced testing accuracy and efficiency for automotive cable systems'
    ],
    skills: ['Electronics Design', 'Automotive Testing', 'Circuit Design', 'Problem Solving', 'Team Collaboration', 'Testing Equipment'],
    impact: 'Developed innovative electronic testing solutions for automotive cable systems, improving testing efficiency and accuracy.'
  },
  {
    id: 2,
    company: 'TBC Technopole Borj Cedria',
    role: 'Summer Intern',
    period: '07/2022',
    location: 'Tunis, Tunisia',
    type: 'Internship',
    status: 'completed',
    achievements: [
      'Designed sun tracking solar panel system using solar sensors for sun rotation',
      'Implemented solar tracking algorithms for optimal energy capture',
      'Developed electronic control system for solar panel positioning',
      'Conducted testing and optimization of solar tracking efficiency',
      'Documented system design and implementation procedures'
    ],
    skills: ['Solar Energy', 'Sensor Integration', 'Control Systems', 'Electronics', 'Renewable Energy', 'System Design'],
    impact: 'Designed and implemented an innovative solar tracking system for improved solar panel efficiency and energy capture.'
  }
];

export default function ExperiencePage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current': return 'badge-success';
      case 'completed': return 'badge-info';
      default: return 'bg-muted/30 text-muted-foreground border-border';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-12 md:py-20">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text">
            Work Experience
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12">
            My professional journey in electronics and automation, building innovative solutions and advancing the field through practical applications and system design.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent transform md:-translate-x-px"></div>
          
          {experienceData.map((experience, index) => (
            <div
              key={experience.id}
              className={`relative flex items-center mb-16 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background transform md:-translate-x-2 z-10"></div>
              
              {/* Content Card */}
              <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 ml-20 md:ml-0' : 'md:pl-12 ml-20 md:ml-0'}`}>
                <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-[1.02] card">
                  
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={`text-xs font-medium border ${getStatusColor(experience.status)}`}>
                          {experience.status === 'current' ? '\u25cf Current' : 'Completed'}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {experience.type}
                        </Badge>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {experience.role}
                      </h3>
                      
                      <h4 className="text-lg font-semibold text-primary mb-3">
                        {experience.company}
                      </h4>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {experience.period}
                        </span>
                        <span className="hidden sm:block">•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {experience.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Impact */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <span className="text-sm font-semibold text-primary">Key Impact</span>
                    </div>
                    <p className="text-foreground font-medium">
                      {experience.impact}
                    </p>
                  </div>

                  {/* Achievements */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Award className="w-4 h-4 text-foreground" />
                      <span className="text-sm font-semibold text-foreground">Key Achievements</span>
                    </div>
                    <ul className="space-y-2">
                      {experience.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Skills */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Code className="w-4 h-4 text-primary" />
                      <span className="text-sm font-semibold text-primary">Technologies & Skills</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {experience.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12 max-w-2xl mx-auto">
            <Users className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Let&apos;s Work Together</h2>
            <p className="text-muted-foreground mb-6">
              I&apos;m passionate about solving complex electronic problems and building innovative IoT solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Get In Touch
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/projects">
                  View My Projects
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