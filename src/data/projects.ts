import {
  Code,
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
  Trophy,
  Workflow,
  Lock,
  Container,
} from 'lucide-react';

export type Category = 'fullstack' | 'security' | 'embedded';

export type Metric = { label: string; value: string };

export type PortfolioItem = {
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

export const projectsData: PortfolioItem[] = [
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

  {
    id: 14,
    category: 'security',
    title: 'TerraShield MCP',
    subtitle: 'DevSecOps • MCP Server',
    period: '2026',
    impact: 'IaC Security Auditing Agent',
    description:
      'An MCP server that audits Terraform infrastructure-as-code for security weaknesses, designed with the AI agent itself as a first-class concern. Built as an individual engineering project around DevSecOps practices.',
    highlights: [
      'MCP server that lets an AI agent audit Terraform code for security weaknesses',
      'Designed agent-first: tools and outputs shaped around the agent as the main user',
      'Individual engineering project built around DevSecOps practices',
    ],
    skills: ['MCP', 'Terraform', 'DevSecOps', 'Python'],
    status: 'ongoing',
    featured: true,
    icon: Lock,
    metrics: [
      { label: 'Type', value: 'MCP' },
      { label: 'Target', value: 'Terraform' },
      { label: 'Focus', value: 'IaC' },
    ],
  },
  {
    id: 15,
    category: 'security',
    title: 'Secure Authentication & Cryptography Notes API',
    subtitle: 'Secure Development • Flask API',
    period: '2026',
    impact: 'Authenticated Notes Service',
    description:
      'A secure notes API built around authentication and applied cryptography, developed following a structured six-week plan.',
    highlights: [
      'Built around authentication and applied cryptography',
      'Python and Flask API',
      'Developed following a structured six-week plan',
    ],
    skills: ['Python', 'Flask', 'Authentication', 'Applied Cryptography'],
    status: 'ongoing',
    icon: Shield,
    metrics: [
      { label: 'Stack', value: 'Flask' },
      { label: 'Plan', value: '6 weeks' },
      { label: 'Focus', value: 'Crypto' },
    ],
  },
  {
    id: 16,
    category: 'security',
    title: 'DevSecOps Container Labs',
    subtitle: 'DevSecOps • Docker',
    period: '2026',
    impact: 'Hands-on Container Labs',
    description:
      'Hands-on Docker and Docker Compose labs, versioned in Git.',
    highlights: [
      'Containerized applications with Docker and Docker Compose',
      'Every lab versioned in Git',
    ],
    skills: ['Docker', 'Docker Compose', 'Git'],
    status: 'ongoing',
    icon: Container,
    metrics: [
      { label: 'Tool', value: 'Docker' },
      { label: 'Orchestration', value: 'Compose' },
      { label: 'Repo', value: 'Git' },
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

  {
    id: 17,
    category: 'fullstack',
    title: 'Social Media Reels Automation',
    subtitle: 'Automation • n8n',
    period: '2026',
    impact: 'Approval-Gated Publishing',
    description:
      'An n8n workflow that turns supplied content into AI-generated videos, with a posting calendar and approval-gated publishing to TikTok, Instagram and Facebook, plus an analytics assistant that advises on trends and strategy.',
    highlights: [
      'Turns supplied content into AI-generated videos',
      'Posting calendar with approval before publishing to TikTok, Instagram and Facebook',
      'Analytics assistant that advises on trends and strategy',
    ],
    skills: ['n8n', 'Google Veo', 'Notion', 'Automation'],
    status: 'ongoing',
    icon: Workflow,
    metrics: [
      { label: 'Engine', value: 'n8n' },
      { label: 'Platforms', value: '3' },
      { label: 'Video', value: 'Veo' },
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
