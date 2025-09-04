"use client";

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trophy, BookOpen, Code, ExternalLink, Calendar, Target, Award, Users } from 'lucide-react';
import Link from 'next/link';

// Types to enable safe access to stats based on item type
type ProjectStats = { frontend: string; backend: string; deployment: string; Microcontroller?: string };
type CompetitionStats = { participants: string; prize: string; rank: string };
type PublicationStats = { venue: string; impact: string; type: string };

type BaseItem = {
  id: number;
  title: string;
  subtitle: string;
  period: string;
  impact: string;
  description: string;
  highlights: string[];
  skills: string[];
  status: string;
  featured?: boolean;
  link?: string;
  liveUrl?: string;
};


type ProjectItem = BaseItem & { type: 'project'; stats: ProjectStats };
type CompetitionItem = BaseItem & { type: 'competition'; stats: CompetitionStats };
type PublicationItem = BaseItem & { type: 'publication'; stats: PublicationStats };

type PortfolioItem = ProjectItem | CompetitionItem | PublicationItem;

const projectsData: PortfolioItem[] = [
  {
    id: 1,
    type: 'project',
    title: 'IoT Security System for Connected Visitors',
    subtitle: 'Academic Project • Raspberry Pi 4 Implementation',
    period: '2024 – 2025',
    impact: 'IoT Security Solution',
    description: 'Created an IoT system security for connected visitors using Raspberry Pi 4, implementing secure access control and monitoring systems.',
    highlights: [
      'Designed secure IoT system for visitor management',
      'Implemented Raspberry Pi 4-based security solution',
      'Developed access control and monitoring features',
      'Integrated secure communication protocols',
      'Created user-friendly interface for security personnel',
      'Successfully deployed and tested in academic environment'
    ],
    skills: ['Raspberry Pi', 'IoT Security', 'Python', 'System Design', 'Access Control', 'Monitoring'],
    status: 'ongoing',
    featured: true,
    link: 'https://github.com/Guizaa22',
    stats: { frontend: 'Python', backend: 'C', Microcontroller: 'Raspberry Pi', deployment: 'Local Network' }
  },
  {
    id: 2,
    type: 'project',
    title: 'Parking Management CRUD Application',
    subtitle: 'Console Application • C Programming with GLADE',
    period: '2024 – 2025',
    impact: 'Data Management Solution',
    description: 'Developed a console-based CRUD application for managing parking lot data using C programming language with GLADE for graphic interface.',
    highlights: [
      'Built comprehensive parking management system',
      'Implemented CRUD operations for data management',
      'Used C programming language for core functionality',
      'Integrated GLADE for graphical user interface',
      'Text file-based data persistence system',
      'Efficient data handling and user experience'
    ],
    skills: ['C Programming', 'GLADE', 'CRUD Operations', 'Data Management', 'GUI Development'],
    status: 'completed',
    link: 'https://github.com/Guizaa22',
    stats: { frontend: 'GLADE', backend: 'C', deployment: 'Local' }
  },
  {
    id: 3,
    type: 'project',
    title: 'Java IoT/AI Agricultural Optimization',
    subtitle: 'Multi-Role Application • Spring Boot & JavaFX',
    period: '2024 – 2025',
    impact: 'Agricultural Productivity Enhancement',
    description: 'Development of a Java IoT/AI application to optimize agricultural productivity with multi-role interfaces and predictive AI.',
    highlights: [
      'Centralization of sensor data (humidity, weather) and generation of smart alerts',
      'Design of multi-role interfaces (Farmer, Expert, Admin) with Spring Boot and JavaFX',
      'UML modeling and integration of predictive AI for eco-responsible recommendations',
      '20% reduction in water consumption on pilot farms',
      'Advanced IoT sensor integration and data analysis',
      'Sustainable agriculture optimization through AI'
    ],
    skills: ['Java', 'Spring Boot', 'JavaFX', 'IoT', 'AI/ML', 'UML Modeling', 'Agriculture'],
    status: 'ongoing',
    link: 'https://github.com/Guizaa22',
    stats: { frontend: 'JavaFX', backend: 'Spring Boot', deployment: 'Local Network' }
  },
  {
    id: 4,
    type: 'competition',
    title: 'Arduino Line Follower Robot',
    subtitle: 'ENIT Robotics Competition • Obstacle Detection',
    period: '2023',
    impact: 'Robotics Competition Entry',
    description: 'Arduino line follower robot and obstacle detector designed for ENIT robotics competition, showcasing advanced sensor integration and control systems.',
    highlights: [
      'Designed and built line following robot with Arduino',
      'Integrated obstacle detection sensors for safety',
      'Participated in ENIT robotics competition',
      'Implemented efficient line tracking algorithms',
      'Advanced sensor fusion and control systems',
      'Competition-ready robotics solution'
    ],
    skills: ['Arduino', 'Robotics', 'Sensor Integration', 'Control Systems', 'Line Following', 'Obstacle Detection'],
    status: 'completed',
    link: 'https://github.com/Guizaa22',
    stats: { participants: 'Competition', prize: 'Participation', rank: 'Competitor' }
  },
  {
    id: 5,
    type: 'project',
    title: 'Ultrasonic Radar System',
    subtitle: 'Arduino-Based Radar • Distance Measurement',
    period: '2023',
    impact: 'Distance Sensing Solution',
    description: 'Creation of radar using ultrasonic sensor and Arduino card for distance measurement and object detection applications.',
    highlights: [
      'Designed ultrasonic radar system with Arduino',
      'Implemented distance measurement algorithms',
      'Real-time object detection and ranging',
      'Efficient sensor data processing',
      'Practical applications in automation and robotics',
      'Cost-effective radar solution'
    ],
    skills: ['Arduino', 'Ultrasonic Sensors', 'Radar Systems', 'Distance Measurement', 'Object Detection'],
    status: 'completed',
    link: 'https://github.com/Guizaa22',
    stats: { frontend: 'Arduino IDE', Microcontroller: 'Arduino', backend: 'C', deployment: 'Embedded' }
  }
];

const categories = [
  { id: 'all', label: 'All Projects', icon: Target, count: projectsData.length },
  { id: 'project', label: 'Full Stack Projects', icon: Code, count: projectsData.filter(p => p.type === 'project').length },
  { id: 'competition', label: 'Competitions', icon: Trophy, count: projectsData.filter(p => p.type === 'competition').length },
  { id: 'publication', label: 'Publications', icon: BookOpen, count: projectsData.filter(p => p.type === 'publication').length }
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const filteredProjects = activeCategory === 'all' 
    ? projectsData 
    : projectsData.filter(item => item.type === activeCategory);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'won': return 'badge-success';
      case 'published': return 'badge-info';
      case 'live': return 'badge-highlight';
      case 'ongoing': return 'badge-warning';
      default: return 'bg-muted/30 text-muted-foreground border-border';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'competition': return Trophy;
      case 'publication': return BookOpen;
      case 'project': return Code;
      default: return Target;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-12 md:py-20">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text">
            Projects & Achievements
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            A showcase of my competition victories, research publications, and innovative projects in machine learning and AI.
          </p>

          {/* Achievement Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">5</div>
              <div className="text-sm text-muted-foreground">Electronics Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">3</div>
              <div className="text-sm text-muted-foreground">Programming Languages</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">2</div>
              <div className="text-sm text-muted-foreground">Academic Years</div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 md:px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                    : 'bg-card hover:bg-muted border border-border hover:border-primary/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm md:text-base">{category.label}</span>
                <Badge variant="secondary" className="ml-1 text-xs">
                  {category.count}
                </Badge>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => {
            const Icon = getTypeIcon(project.type);
            
            return (
              <div
                key={project.id}
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
                      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-primary font-semibold mb-2">
                        {project.subtitle}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Calendar className="w-3 h-3" />
                        <span>{project.period}</span>
                        <span>•</span>
                        <span>{project.impact}</span>
                      </div>
                      <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  {project.stats && (
                    <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-muted/30 rounded-xl">
                      {project.type === 'competition' && (
                        <>
                          <div className="text-center">
                            <div className="text-lg font-bold text-primary">{project.stats.rank}</div>
                            <div className="stat-label">Rank</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-foreground">{project.stats.participants}</div>
                            <div className="stat-label">Participants</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-primary">{project.stats.prize}</div>
                            <div className="stat-label">Prize</div>
                          </div>
                        </>
                      )}
                      {project.type === 'publication' && (
                        <>
                          <div className="text-center">
                            <div className="text-lg font-bold text-primary">{project.stats.venue}</div>
                            <div className="stat-label">Venue</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-foreground">{project.stats.impact}</div>
                            <div className="stat-label">Scope</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-primary">{project.stats.type}</div>
                            <div className="stat-label">Type</div>
                          </div>
                        </>
                      )}
                      {project.type === 'project' && (
                        <>
                          <div className="text-center">
                            <div className="text-lg font-bold text-primary">{project.stats.frontend}</div>
                            <div className="stat-label">Frontend</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-foreground">{project.stats.backend}</div>
                            <div className="stat-label">Backend</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-primary">{project.stats.deployment}</div>
                            <div className="stat-label">Deployment</div>
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {project.description.replace(/'/g, "&apos;")}
                  </p>

                  {/* Highlights */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-foreground mb-3">Key Highlights</h4>
                    <ul className="space-y-2">
                      {project.highlights.slice(0, 3).map((highlight, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
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

                  {/* Action */}
                  <div className="space-y-3">
                    {project.link && project.link !== '#' && (
                      <Button asChild className="w-full">
                        <Link href={project.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          {project.type === 'publication' ? 'View Paper' : 'View Source Code'}
                        </Link>
                      </Button>
                    )}
                    {project.liveUrl && (
                      <Button asChild className="w-full">
                        <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Live Demo
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12 max-w-2xl mx-auto">
            <Users className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Collaborate on the Next Big Thing</h2>
            <p className="text-muted-foreground mb-6">
              I&apos;m always excited to work on challenging electronics projects and innovative IoT solutions. Let&apos;s build something amazing together!
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
    </div>
  );
} 