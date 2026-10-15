export const profile = {
  name: 'Mohamed Guizani',
  email: 'hama.guizeni842@gmail.com',
  github: 'https://github.com/Guizaa22',
  linkedin: 'https://www.linkedin.com/in/guizani-mohamed-b66802250/',
  cv: '/Mohamed_Guizani_CV.pdf',
  location: 'Tunis, Tunisia',
};

export type ExperienceItem = {
  id: string;
  company: string;
  role: string;
  period: string;
  start: string;
  location: string;
  field: string;
  bullets: string[];
  skills: string[];
};

/** Newest first. */
export const experience: ExperienceItem[] = [
  {
    id: 'capgemini',
    company: 'Capgemini',
    role: 'Summer Intern — Data & AI',
    period: '07/2026 – 09/2026',
    start: '2026',
    location: 'Tunisia',
    field: 'Aerospace predictive maintenance · aircraft engine RUL prediction',
    bullets: [
      'Built a predictive-maintenance pipeline estimating the Remaining Useful Life (RUL) of aircraft turbofan engines from multivariate sensor time series (NASA C-MAPSS dataset).',
      'Cleaned and normalized sensor data, engineered features with sliding time windows, and trained and compared classical models (Random Forest, XGBoost) against LSTM deep-learning models, selecting the best performer on regression error metrics.',
      'Implemented the full workflow in Python (pandas, scikit-learn, TensorFlow/PyTorch).',
    ],
    skills: ['Python', 'pandas', 'scikit-learn', 'TensorFlow', 'PyTorch', 'XGBoost', 'LSTM'],
  },
  {
    id: 'cofat',
    company: 'COFAT',
    role: 'Senior Technician — Electronics',
    period: '02/2023 – 06/2023',
    start: '2023',
    location: 'Tunis, Tunisia',
    field: 'Automotive (Volkswagen, SEAT)',
    bullets: [
      'Designed an automotive cable tester and an electronic box-support tester, improving testing accuracy and efficiency.',
      'Collaborated with senior engineers on remediation strategies using durable, efficient circuit components.',
    ],
    skills: ['Electronics design', 'Circuit design', 'Automotive testing'],
  },
  {
    id: 'tbc',
    company: 'TBC — Technopole Borj Cedria',
    role: 'Summer Intern',
    period: '07/2022',
    start: '2022',
    location: 'Tunis, Tunisia',
    field: 'Renewable energy',
    bullets: [
      'Built a sun-tracking solar-panel system with light sensors and tracking algorithms for optimal energy capture.',
      'Developed the control system for panel positioning; tested and documented the full design.',
    ],
    skills: ['Solar tracking', 'Sensors', 'Control systems'],
  },
];

export const education = [
  {
    degree: 'Cybersecurity Engineering — 4th year',
    school: 'TEK-UP University',
    place: 'Tunisia',
    status: 'In progress',
    focus: 'SSIR — Security of Systems, Networks & Computing · network security · SOC operations · penetration testing · applied cryptography',
  },
  {
    degree: 'Licence in Embedded Systems',
    school: 'Tunisia',
    place: '',
    status: 'Completed',
    focus: 'Electronics, embedded & IoT systems, microcontrollers (Arduino, ESP32, STM32, Raspberry Pi)',
  },
];

export const languages = [
  { name: 'Arabic', level: 'Native' },
  { name: 'French', level: 'Fluent' },
  { name: 'English', level: 'Professional' },
];

export type SkillGroup = { name: string; skills: { name: string; logo?: string }[] };

export const skillGroups: SkillGroup[] = [
  {
    name: 'Security & network',
    skills: [
      { name: 'Wazuh (SIEM)' },
      { name: 'TheHive · Cortex' },
      { name: 'Shuffle SOAR' },
      { name: 'Burp Suite' },
      { name: 'Nmap' },
      { name: 'Wireshark' },
      { name: 'Kali Linux', logo: 'kali' },
      { name: 'hashcat' },
      { name: 'MITRE ATT&CK' },
      { name: 'OWASP API Top 10' },
      { name: 'Cisco ASAv', logo: 'cisco' },
      { name: 'OSPF · MPLS' },
      { name: 'GNS3 · EVE-NG' },
      { name: 'RADIUS / AAA' },
      { name: 'Zabbix' },
    ],
  },
  {
    name: 'Languages',
    skills: [
      { name: 'Python', logo: 'python' },
      { name: 'C / C++', logo: 'c++' },
      { name: 'Java', logo: 'java' },
      { name: 'JavaScript', logo: 'javascript' },
      { name: 'TypeScript' },
      { name: 'SQL', logo: 'sql' },
      { name: 'Solidity' },
    ],
  },
  {
    name: 'Frameworks & stack',
    skills: [
      { name: 'FastAPI', logo: 'fastapi' },
      { name: 'Flask' },
      { name: 'React · Next.js', logo: 'nextjs' },
      { name: 'Node.js', logo: 'nodejs' },
      { name: 'Spring Boot', logo: 'springboot' },
      { name: 'Symfony 7' },
      { name: 'Tauri 2 / Rust' },
      { name: 'PostgreSQL', logo: 'postgresql' },
      { name: 'Docker · Compose', logo: 'docker' },
      { name: 'n8n' },
    ],
  },
  {
    name: 'Systems & cloud',
    skills: [
      { name: 'Linux · Ubuntu', logo: 'ubuntu' },
      { name: 'Windows', logo: 'windows' },
      { name: 'AWS', logo: 'aws' },
      { name: 'Git', logo: 'git' },
      { name: 'Terraform' },
      { name: 'DevSecOps' },
      { name: 'MCP', logo: 'mcp' },
    ],
  },
  {
    name: 'Embedded & hardware',
    skills: [
      { name: 'STM32', logo: 'stm32' },
      { name: 'ESP32', logo: 'arduino' },
      { name: 'Arduino', logo: 'arduino' },
      { name: 'Raspberry Pi', logo: 'raspberrypi' },
    ],
  },
];

/** Ids from projects.ts shown in the home-page carousel, in order. */
export const carouselProjectIds = [1, 14, 2, 3, 4, 13];
