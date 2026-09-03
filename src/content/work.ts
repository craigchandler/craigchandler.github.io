export type DiagramType = 'platform' | 'control' | 'supply-chain' | 'fatigue';

export interface WorkItem {
  slug: string;
  number: string;
  title: string;
  kicker: string;
  summary: string;
  card: {
    problem: string;
    role: string;
    complexity: string;
  };
  challenge: string;
  response: string;
  outcome: string;
  services: string[];
  technologies: string[];
  diagram: DiagramType;
  featured: boolean;
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  externalLinks?: Array<{ label: string; href: string }>;
}

export const work: WorkItem[] = [
  {
    slug: 'faid-quantum',
    number: '01',
    title: 'FAID Quantum',
    kicker: 'Fatigue-risk analytics platform',
    summary:
      'A secure, multi-tenant web platform that turns work schedules into practical fatigue-risk analysis and reporting.',
    card: {
      problem: 'Turn complex work schedules into secure, organisation-specific fatigue-risk analysis.',
      role: 'Product architecture + full-stack engineering',
      complexity: 'Angular · .NET · Azure · Auth0 · multi-tenancy · biomathematical analysis'
    },
    challenge:
      'Bring a specialist biomathematical analysis capability into a customer-facing product while keeping organisation data isolated, access controlled, and the analytical workflow clear.',
    response:
      'The application spans Angular, .NET services, identity, tenancy boundaries, analytical processing, and Azure deployment. Explicit separation between customer context, fatigue calculations, and reporting allows each concern to evolve without weakening the security model.',
    outcome:
      'FAID Quantum gives organisations a focused way to assess schedules, understand fatigue exposure, and support risk-management decisions. Public material confirms the platform has operated as a progressive web application since 2020.',
    services: ['Product architecture', 'Full-stack engineering', 'Cloud architecture', 'Identity and multi-tenancy'],
    technologies: ['Angular', 'TypeScript', '.NET', 'C#', 'Auth0', 'Azure', 'REST'],
    diagram: 'fatigue',
    featured: true,
    image: '/assets/images/faid-quantum-dashboard.webp',
    imageAlt: 'FAID Quantum sample schedule dashboard showing KSS and FAID risk indicators',
    imageWidth: 1200,
    imageHeight: 1741,
    externalLinks: [
      { label: 'Visit FAID Quantum', href: 'https://faidquantum.com/' },
      {
        label: 'Read the user guide',
        href: 'https://www.interdynamics.com/download/documents/FAID-Quantum-Web-User-Guide.pdf'
      }
    ]
  },
  {
    slug: 'dash-x',
    number: '02',
    title: 'DASH-X',
    kicker: 'Cloud simulation platform',
    summary:
      'A cloud platform for preparing, orchestrating, and running analytical simulation workloads at scale.',
    card: {
      problem: 'Run computational simulation workloads without coupling long-running compute to the user experience.',
      role: 'Solution architecture + full-stack engineering',
      complexity: 'Angular · .NET · Azure · container orchestration · Cosmos DB'
    },
    challenge:
      'Connect an interactive scenario workflow to isolated compute workloads, then make execution state and analytical outputs available without coupling the user experience to long-running simulation processes.',
    response:
      'A clear workload boundary separates the interactive product from long-running compute: an Angular client and .NET API prepare scenarios, orchestration services schedule containerised jobs, and cloud storage retains inputs, state, and results.',
    outcome:
      'The architecture supports independently scalable workload execution and a durable path from scenario definition to analytical output. Detailed performance and customer outcomes are not published here.',
    services: ['Solution architecture', 'Cloud workload design', 'API design', 'Application engineering'],
    technologies: ['Angular', '.NET', 'Azure', 'Containers', 'REST', 'OpenAPI', 'CI/CD'],
    diagram: 'platform',
    featured: true
  },
  {
    slug: 'moving-block',
    number: '03',
    title: 'Moving Block Train Control',
    kicker: 'Cross-platform control and simulation',
    summary:
      'A C++ train-control component for modelling moving-block separation, routes, switching, and network-aware speed authority.',
    card: {
      problem: 'Model network-aware movement authority and safe train separation across changing rail topology.',
      role: 'Systems architecture + C++ engineering',
      complexity: 'C++ · moving block · route control · Planimate integration · Windows · Linux'
    },
    challenge:
      'Represent control decisions against a changing rail topology while keeping safety-relevant separation logic deterministic, testable, and portable across Windows and Linux hosts.',
    response:
      'A platform-neutral C++ core defines explicit interfaces for network state, route control, speed and headway logic, and Planimate integration. Control rules remain separate from the simulation host.',
    outcome:
      'The component provides a reusable engineering boundary for detailed train-control behaviour and cross-platform simulation. Operational validation is kept distinct from compilation and native test evidence.',
    services: ['Systems architecture', 'C++ engineering', 'Simulation integration', 'Verification design'],
    technologies: ['C++', 'CMake', 'Windows', 'Linux', 'Planimate', 'Native APIs'],
    diagram: 'control',
    featured: true
  },
  {
    slug: 'rail-supply-chain',
    number: '04',
    title: 'Rail & Bulk Supply Chain Modelling',
    kicker: 'Operational decision support',
    summary:
      'A body of simulation and capacity work spanning mine, rail, port, logistics, and infrastructure planning.',
    card: {
      problem: 'Expose capacity constraints and trade-offs across tightly coupled mine, rail, and port systems.',
      role: 'Operational modelling + decision-support design',
      complexity: 'Discrete-event simulation · scheduling · stochastic delay · capacity analysis'
    },
    challenge:
      'Understand how infrastructure, schedules, maintenance, stochastic delay, and operating rules interact across tightly coupled bulk supply chains.',
    response:
      'Calibrated operational models make the system visible from source to destination, support controlled scenario comparison, and report throughput, cycle times, utilisation, and constraints.',
    outcome:
      'Representative public work includes Mineral Resources iron ore, Bowen Rail, Roy Hill, CBG bauxite, BHP Billiton iron ore, Aurizon coal, Queensland Rail bulk freight, and Hunter Valley coal operations. A Roy Hill platform was delivered over 10 weeks, with partial functionality after five.',
    services: ['Operational modelling', 'Capacity analysis', 'Scenario design', 'Decision support'],
    technologies: ['Discrete-event simulation', 'Rail modelling', 'Scheduling', 'Scenario analysis', 'Planimate'],
    diagram: 'supply-chain',
    featured: true
  }
];

export const getWorkItem = (slug: string) => work.find((item) => item.slug === slug);
