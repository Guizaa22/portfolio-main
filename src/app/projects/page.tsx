"use client";

import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/Reveal';
import { MatrixRain } from '@/components/MatrixRain';
import { CircuitBackground } from '@/components/CircuitBackground';
import {
  Trophy,
  Code,
  ExternalLink,
  Calendar,
  Target,
  Award,
  Users,
  Shield,
  Cpu,
  Layers,
  Bug,
  Server,
  Network,
  Eye,
  Briefcase,
  Sparkles,
  Blocks,
  FileText,
  X,
  CheckCircle2,
} from 'lucide-react';
import Link from 'next/link';

type Category = 'fullstack' | 'security' | 'embedded';

type Metric = { label: string; value: string };

type PortfolioItem = {
  id: number;
  category: Category;
  title: string;
  subtitle: string;
  period: string;
  impact: string;
  description: string;
  highlights: string[];
  skills: string[];
  status: string;
  metrics: Metric[];
  icon: typeof Code;
  featured?: boolean;
  team?: string;
  link?: string;
  liveUrl?: string;
  /** Optional presentation / report (PDF in /public) shown in the details modal. */
  detailsUrl?: string;
};

const projectsData: PortfolioItem[] = [
  /* ===================== SECURITY ===================== */
  {
    id: 1,
    category: 'security',
    title: 'API Penetration Test & Automation Dashboard',
    subtitle: 'Offensive Security • OWASP API Top 10',
    period: '2026',
    impact: 'Full Admin Compromise',
    description:
      'Complete OWASP API Security Top 10 audit against VAmPI, paired with a custom dashboard that reproduces the entire audit automatically — parse OpenAPI, run each attack module, persist evidence and export a report.',
    highlights: [
      '6 vulnerabilities across 4 OWASP API categories — 4 lead to full admin compromise',
      'Cracked HS256 JWT secret with hashcat (mode 16500) and forged admin tokens',
      'Chained BOLA + Mass Assignment for unauthenticated account takeover',
      'Built FastAPI + React + PostgreSQL platform with 7 attack modules & PDF report generator',
    ],
    skills: ['Kali Linux', 'Burp Suite', 'hashcat', 'FastAPI', 'React', 'PostgreSQL', 'Docker'],
    status: 'completed',
    featured: true,
    icon: Bug,
    metrics: [
      { label: 'Findings', value: '6' },
      { label: 'Critical', value: '4' },
      { label: 'Audit', value: '~3 min' },
    ],
  },
  {
    id: 2,
    category: 'security',
    title: 'Distributed SOC with AI-Powered Triage',
    subtitle: 'Blue Team • SIEM / SOAR',
    period: '2026',
    impact: 'Detection-to-Response Pipeline',
    description:
      'A fully functional open-source Security Operations Center spanning two physical hosts, integrating SIEM, incident response and SOAR into one pipeline — with a locally-hosted Llama 3 model for AI alert triage.',
    highlights: [
      'Wazuh (SIEM/HIDS) + TheHive + Cortex + Shuffle SOAR end-to-end pipeline',
      'Local Llama 3 (Ollama) for AI alert enrichment — no data leaves the lab',
      'ZeroTier mesh VPN with TCP-relay workaround for CGNAT traversal',
      '4 Linux agents monitored, full attack→detection→response chain validated',
    ],
    skills: ['Wazuh', 'TheHive', 'Cortex', 'Shuffle', 'Ollama / Llama 3', 'ZeroTier', 'EVE-NG'],
    status: 'completed',
    featured: true,
    icon: Server,
    team: 'Amin Maddouri · Med Guizani',
    metrics: [
      { label: 'Tools', value: '5' },
      { label: 'Agents', value: '4' },
      { label: 'AI', value: 'Llama 3' },
    ],
  },
  {
    id: 3,
    category: 'security',
    title: 'IP/MPLS Backbone with Firewall & DMZ',
    subtitle: 'Network Security • Cisco ASAv',
    period: '2025 – 2026',
    impact: 'Hardened Enterprise Backbone',
    description:
      'Enterprise IP/MPLS backbone hardened with redundant ASAv firewalls, a segmented DMZ hosting SMTP/WWW/DNS, high-availability failover, AAA and threat detection — integrated into Zabbix monitoring.',
    highlights: [
      'Dual Cisco ASAv firewalls with active/standby HA failover + stateful replication',
      'DMZ zone (SMTP/WWW/DNS) with strict ACL security policy & object groups',
      'OSPF routing across Federateurs, CE routers and firewalls',
      'RADIUS AAA, ASA threat-detection (IPS), SNMPv3 → Zabbix monitoring',
    ],
    skills: ['Cisco ASAv', 'OSPF', 'MPLS', 'RADIUS', 'Zabbix', 'EVE-NG', 'GNS3'],
    status: 'completed',
    icon: Network,
    metrics: [
      { label: 'Firewalls', value: '2 (HA)' },
      { label: 'DMZ svc', value: '3' },
      { label: 'Phases', value: '9' },
    ],
  },
  {
    id: 4,
    category: 'security',
    title: 'Emotet Malware — Complete Analysis',
    subtitle: 'Malware Analysis • Threat Intel',
    period: '2026',
    impact: 'IOCs & ATT&CK Mapping',
    description:
      'End-to-end analysis of the Emotet banking trojan / loader: infection chain, persistence, command-and-control behaviour and indicators of compromise, mapped to the MITRE ATT&CK framework.',
    highlights: [
      'Studied the full Emotet kill chain — from malicious macro delivery to C2',
      'Static & dynamic analysis of behaviour, persistence and evasion techniques',
      'Extracted indicators of compromise (IOCs) for detection engineering',
      'Mapped observed TTPs to MITRE ATT&CK techniques',
    ],
    skills: ['Malware Analysis', 'MITRE ATT&CK', 'IOCs', 'Sandbox', 'Threat Intel'],
    status: 'completed',
    icon: Cpu,
    metrics: [
      { label: 'Type', value: 'Loader' },
      { label: 'Framework', value: 'ATT&CK' },
      { label: 'Output', value: 'IOCs' },
    ],
  },

  {
    id: 13,
    category: 'security',
    title: 'SafeClub — Blockchain DAO Treasury',
    subtitle: 'Web3 Security • Solidity Smart Contract',
    period: '2025 – 2026',
    impact: 'Secure On-Chain Governance',
    description:
      'A secure on-chain treasury and governance smart contract for a student club: members propose ETH spending, vote within a deadline, and funds are released only when quorum and majority are reached. Paired with a React + ethers.js dashboard.',
    highlights: [
      'Solidity DAO treasury (Vault) with a proposal → vote → execute governance flow',
      'Security hardening: OpenZeppelin Ownable access control + ReentrancyGuard on payouts',
      'Quorum + majority rules, deadline-bound voting with one-vote-per-member enforcement',
      'Hardhat toolchain (compile / test / deploy) + React 18, TypeScript, ethers v6 & shadcn/ui GUI',
    ],
    skills: ['Solidity', 'Hardhat', 'OpenZeppelin', 'ethers.js', 'React', 'TypeScript', 'Web3'],
    status: 'completed',
    icon: Blocks,
    link: 'https://github.com/Mouadh-sys/SafeClub_Blockchain',
    metrics: [
      { label: 'Contract', value: 'Solidity' },
      { label: 'Guard', value: 'Reentrancy' },
      { label: 'Gov', value: 'DAO Vote' },
    ],
  },

  /* ===================== FULL STACK ===================== */
  {
    id: 5,
    category: 'fullstack',
    title: 'Smart Surveillance Platform w/ Watermarking',
    subtitle: 'Computer Vision • Full-Stack Monorepo',
    period: '2025 – 2026',
    impact: 'Tamper-Evident Video Proof',
    description:
      'Full-stack AI surveillance monorepo combining real-time monitoring, a face-recognition pipeline and tamper-evident watermarking. A FastAPI backend (PostgreSQL, JWT, WebSockets) powers a React + TypeScript dashboard, with Docker Compose deployment and a pytest suite.',
    highlights: [
      'Face pipeline: detection, embedding generation & recognition with authorization classification',
      'Tamper-evident captures: image watermarking + SHA-256 integrity verification endpoint',
      'Real-time live monitoring via WebSocket broadcasting; JWT auth with access & refresh tokens',
      'React + Vite + TypeScript dashboard (live, events, alerts, persons, cameras, reports) over a FastAPI/PostgreSQL API',
      'Monorepo with backend, frontend, docs & notebooks — Docker Compose + pytest test suite',
    ],
    skills: ['FastAPI', 'Python', 'React', 'Vite', 'TypeScript', 'PostgreSQL', 'WebSocket', 'JWT', 'Docker', 'OpenCV'],
    status: 'completed',
    icon: Eye,
    team: 'Mouadh Boukari · Med Guizeni · Rim Menzli',
    link: 'https://github.com/Mouadh-sys/Smart-Surveillance-platform-__monorepo',
    metrics: [
      { label: 'Stack', value: 'FastAPI+React' },
      { label: 'Live', value: 'WebSocket' },
      { label: 'Proof', value: 'SHA-256' },
    ],
  },
  {
    id: 6,
    category: 'fullstack',
    title: 'Java IoT/AI Agricultural Optimization',
    subtitle: 'Multi-Role App • Spring Boot & JavaFX',
    period: '2024 – 2025',
    impact: '-20% Water Consumption',
    description:
      'A Java IoT/AI application to optimize agricultural productivity with multi-role interfaces and predictive AI for eco-responsible recommendations.',
    highlights: [
      'Centralized sensor data (humidity, weather) with smart alert generation',
      'Multi-role interfaces (Farmer, Expert, Admin) with Spring Boot and JavaFX',
      'UML modeling and integration of predictive AI recommendations',
      '20% reduction in water consumption on pilot farms',
    ],
    skills: ['Java', 'Spring Boot', 'JavaFX', 'IoT', 'AI/ML', 'UML'],
    status: 'ongoing',
    icon: Layers,
    link: 'https://github.com/Guizaa22',
    metrics: [
      { label: 'Backend', value: 'Spring' },
      { label: 'Frontend', value: 'JavaFX' },
      { label: 'Impact', value: '-20% H₂O' },
    ],
  },
  {
    id: 11,
    category: 'fullstack',
    title: 'Beauty Center — Salon Management System',
    subtitle: 'Full-Stack • Spring Boot API · React · Tauri',
    period: '2025 – 2026',
    impact: 'Secure 3-Tier Management Suite',
    description:
      'A complete salon/beauty-center management system spanning three apps that share one secured REST API: a Java Spring Boot backend, a customer-facing React front office, and a Tauri 2 admin/staff desktop app. Covers appointments, scheduling, services, employees, client files and notifications — with JWT security, role-based access and a full audit trail.',
    highlights: [
      'Spring Boot modular-monolith API (auth, users, appointments, scheduling, services, client files, notes, notifications, audit) over PostgreSQL with Spring Data JPA & Flyway migrations',
      'Spring Security + JWT authentication with access & refresh tokens (custom JwtService / JwtAuthFilter) and role-based access control — Admin / Employee / Client',
      'Dedicated audit module (AuditEntry / AuditService) recording sensitive actions for compliance & traceability',
      'React 19 + Vite front office (React Router 7) deployed on Railway, and a Tauri 2 + Rust + React 19 admin/staff desktop app',
      'OpenAPI/Swagger docs, CORS config, standardized API responses, global error handling and SMTP email notifications',
    ],
    skills: ['Java', 'Spring Boot', 'Spring Security', 'JWT', 'JPA / Hibernate', 'PostgreSQL', 'Flyway', 'React', 'TypeScript', 'Vite', 'Tauri', 'Rust', 'OpenAPI'],
    status: 'completed',
    icon: Sparkles,
    metrics: [
      { label: 'Tiers', value: '3 Apps' },
      { label: 'Auth', value: 'JWT + RBAC' },
      { label: 'Audit', value: 'Full Trail' },
    ],
  },
  {
    id: 12,
    category: 'fullstack',
    title: 'Jobs & Internships Platform',
    subtitle: 'Web App • Symfony 7 + Doctrine',
    period: '2025 – 2026',
    impact: 'Role-Based Recruitment Portal',
    description:
      'A job and internship management platform where candidates browse, apply for and save offers, companies post and review applications, and administrators manage users and approvals — built with Symfony 7 on an MVC architecture.',
    highlights: [
      'Role-based access for Candidates, Companies and Administrators',
      'Eight Doctrine entities with custom repositories and service-layer business logic',
      'Application tracking, saved offers, company approval and admin activity logging',
      'Symfony 7 + Doctrine ORM + MySQL, Twig templates and form types',
    ],
    skills: ['Symfony 7', 'PHP', 'Doctrine ORM', 'MySQL', 'Twig', 'MVC'],
    status: 'completed',
    icon: Briefcase,
    link: 'https://github.com/Mouadh-sys/Jobs-Internships',
    metrics: [
      { label: 'Framework', value: 'Symfony 7' },
      { label: 'Entities', value: '8' },
      { label: 'Roles', value: '3' },
    ],
  },

  /* ===================== EMBEDDED / ELECTRONICS ===================== */
  {
    id: 7,
    category: 'embedded',
    title: 'IoT Security System for Connected Visitors',
    subtitle: 'Embedded • Raspberry Pi 4',
    period: '2024 – 2025',
    impact: 'Secure Access Control',
    description:
      'An IoT security system for connected visitors using Raspberry Pi 4, implementing secure access control and monitoring with a friendly interface for security personnel.',
    highlights: [
      'Designed secure IoT system for visitor management',
      'Raspberry Pi 4-based access control and monitoring',
      'Integrated secure communication protocols',
      'Deployed and tested in an academic environment',
    ],
    skills: ['Raspberry Pi', 'IoT Security', 'Python', 'Access Control', 'Monitoring'],
    status: 'ongoing',
    icon: Shield,
    link: 'https://github.com/Guizaa22',
    metrics: [
      { label: 'Board', value: 'RPi 4' },
      { label: 'Focus', value: 'Access' },
      { label: 'Lang', value: 'Python' },
    ],
  },
  {
    id: 8,
    category: 'embedded',
    title: 'Parking Management CRUD Application',
    subtitle: 'C Programming • GLADE GUI',
    period: '2024 – 2025',
    impact: 'Data Management Solution',
    description:
      'A CRUD application for managing parking-lot data using C with a GLADE graphical interface and text-file persistence.',
    highlights: [
      'Comprehensive parking management system',
      'Full CRUD operations for data management',
      'GLADE-based graphical user interface',
      'Text-file based data persistence',
    ],
    skills: ['C Programming', 'GLADE', 'CRUD', 'Data Management', 'GUI'],
    status: 'completed',
    icon: Code,
    link: 'https://github.com/Guizaa22',
    metrics: [
      { label: 'Lang', value: 'C' },
      { label: 'UI', value: 'GLADE' },
      { label: 'Type', value: 'CRUD' },
    ],
  },
  {
    id: 9,
    category: 'embedded',
    title: 'Arduino Line Follower Robot',
    subtitle: 'Robotics • ENIT Competition',
    period: '2023',
    impact: 'Robotics Competition Entry',
    description:
      'Arduino line follower robot with obstacle detection, built for the ENIT robotics competition with sensor fusion and control systems.',
    highlights: [
      'Line-following robot built with Arduino',
      'Integrated obstacle detection sensors',
      'Efficient line-tracking algorithms',
      'Competed at the ENIT robotics competition',
    ],
    skills: ['Arduino', 'Robotics', 'Sensors', 'Control Systems', 'C'],
    status: 'completed',
    icon: Trophy,
    link: 'https://github.com/Guizaa22',
    metrics: [
      { label: 'Board', value: 'Arduino' },
      { label: 'Event', value: 'ENIT' },
      { label: 'Type', value: 'Robotics' },
    ],
  },
  {
    id: 10,
    category: 'embedded',
    title: 'Ultrasonic Radar System',
    subtitle: 'Arduino • Distance Sensing',
    period: '2023',
    impact: 'Object Detection & Ranging',
    description:
      'A radar system using an ultrasonic sensor and Arduino for real-time distance measurement and object detection.',
    highlights: [
      'Ultrasonic radar system with Arduino',
      'Real-time distance measurement algorithms',
      'Object detection and ranging',
      'Cost-effective, practical radar solution',
    ],
    skills: ['Arduino', 'Ultrasonic Sensors', 'Radar', 'Distance Measurement', 'C'],
    status: 'completed',
    icon: Cpu,
    link: 'https://github.com/Guizaa22',
    metrics: [
      { label: 'Board', value: 'Arduino' },
      { label: 'Sensor', value: 'Ultrasonic' },
      { label: 'Output', value: 'Ranging' },
    ],
  },
];

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
              Projects &amp; Achievements
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              A showcase of my work across cybersecurity, full-stack development and embedded
              systems — from offensive testing and SOC operations to IoT and robotics.
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
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Collaborate on the Next Big Thing</h2>
            <p className="text-muted-foreground mb-6">
              I&apos;m always excited to work on challenging cybersecurity, full-stack and embedded
              projects. Let&apos;s build something secure and impactful together!
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
