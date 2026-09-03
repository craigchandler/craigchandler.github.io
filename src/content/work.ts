export type DiagramType = 'platform' | 'control' | 'supply-chain' | 'fatigue';

export interface CaseSection {
  label: string;
  title: string;
  paragraphs: string[];
  points?: string[];
}

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
  sections: CaseSection[];
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
    sections: [
      {
        label: '01 / Product problem',
        title: 'Turn schedule data into a usable fatigue picture',
        paragraphs: [
          'Fatigue analysis starts with working-time and sleep data, but the useful output is not a raw score. People need to see where risk changes across a schedule, compare patterns, and understand the result in the context of the work being assessed.',
          'The same product serves multiple customer organisations. Jobs, schedules, analysis and reports therefore have to remain within the correct organisation and access context throughout the workflow.'
        ]
      },
      {
        label: '02 / Application architecture',
        title: 'Identity and tenancy run through the application',
        paragraphs: [
          'The Angular application supports schedule import, editing, analysis and review. Auth0 establishes user identity; the .NET application services resolve organisation context and enforce access before customer data or analytical services are reached.',
          'Fatigue calculations sit behind the application layer rather than inside the browser. That keeps the analytical model separate from interface concerns and gives reporting a consistent set of results to work from.'
        ],
        points: [
          'Organisation context follows authenticated requests',
          'Schedule data and analysis remain separate concerns',
          'Charts, tables and reports use the same calculated result set'
        ]
      },
      {
        label: '03 / Product outcome',
        title: 'Analysis that can be inspected and reported',
        paragraphs: [
          'FAID Quantum brings schedule preparation, FAID and KSS indicators, comparative views and reporting into one browser-based workflow. Teams can examine fatigue exposure across a roster and carry the findings into their operational risk process.'
        ]
      }
    ],
    services: ['Product architecture', 'Full-stack engineering', 'Identity and tenancy', 'Cloud architecture'],
    technologies: ['Angular', 'TypeScript', '.NET', 'C#', 'Auth0', 'Azure', 'OpenAPI'],
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
    sections: [
      {
        label: '01 / Workload problem',
        title: 'A simulation run is not a web request',
        paragraphs: [
          'Users prepare projects, studies and scenarios interactively, but the associated simulation work can be long-running and computationally intensive. It cannot depend on an open browser tab or the lifetime of a single API request.',
          'Inputs, run state and outputs also need durable identities so a scenario can be monitored, revisited and compared after its compute process has finished.'
        ]
      },
      {
        label: '02 / Workload architecture',
        title: 'A control plane submits work; a compute plane runs it',
        paragraphs: [
          'The Angular client and .NET application API form the interactive control plane. They manage scenario configuration, submission and status. A separate cloud-run service turns approved requests into staged container workloads and monitors their execution.',
          'Scenario metadata and execution state are persisted independently of the workers. Inputs and outputs live in cloud storage, so containers can remain isolated and disposable without losing the analytical record.'
        ],
        points: [
          'The browser observes work; it does not host or hold it open',
          'Each compute run has explicit inputs, state and outputs',
          'Application and workload services can change independently'
        ]
      },
      {
        label: '03 / Operating model',
        title: 'Run state is independent of the browser session',
        paragraphs: [
          'A user can submit a run, follow phase and workload status, leave the application, and return to the persisted results. The split also keeps customer-facing concerns out of the container runtime and compute-specific concerns out of the web application.'
        ]
      }
    ],
    services: ['Solution architecture', 'Cloud architecture', 'Workload orchestration', 'Full-stack engineering'],
    technologies: ['Angular', '.NET', 'Azure', 'Containers', 'Cosmos DB', 'Blob storage', 'OpenAPI'],
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
    sections: [
      {
        label: '01 / Control problem',
        title: 'Authority changes as trains and topology change',
        paragraphs: [
          'Moving-block control cannot treat the railway as a fixed sequence of occupied blocks. Authority depends on train front and rear position, the route ahead, following trains, switches, shared track, active restrictions and reservations.',
          'Those inputs change continuously. A route event, closure or new train observation can shorten an earlier authority and invalidate its speed plan, so control decisions have to be recalculated against current state.'
        ]
      },
      {
        label: '02 / Control architecture',
        title: 'Observed state in; current commands out',
        paragraphs: [
          'Planimate owns simulation time, events and train movement. At each control step it passes the observed railway state across a native interface. The C++ controller evaluates route access, following separation and conflict reservations, then returns movement authority and speed commands.',
          'The authority is a position limit along the selected route, not simply permission to reach the next node. Commands carry revisions so the simulation host can discard a superseded speed profile after the controller state changes.'
        ],
        points: [
          'Train length and rear clearance affect occupancy and release',
          'Junctions and shared track are handled as reservable resources',
          'Closures and speed restrictions feed the same authority calculation'
        ]
      },
      {
        label: '03 / Integration',
        title: 'Detailed control behaviour inside an operational model',
        paragraphs: [
          'Keeping the control core outside the simulation model makes the logic testable against explicit network and train-state fixtures. The same source builds as a Windows DLL and Linux shared library, with a narrow adapter handling the Planimate table interface.',
          'The component supports topology-aware following, route and switch decisions, speed profiles and conflict handling within larger rail simulations.'
        ]
      }
    ],
    services: ['Control-system architecture', 'C++ engineering', 'Planimate integration', 'Test architecture'],
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
    sections: [
      {
        label: '01 / Operational question',
        title: 'The bottleneck moves',
        paragraphs: [
          'The capacity of a loadout, rail line or unloader does not predict the throughput of the whole operation. Fleet cycles, queues, train interactions, maintenance, stochastic delay and operating rules move the effective constraint from one part of the system to another.',
          'The modelling task is to represent those dependencies at the level needed for a real planning decision, without burying the result in unnecessary detail.'
        ]
      },
      {
        label: '02 / Model boundary',
        title: 'Follow the complete operating cycle',
        paragraphs: [
          'Discrete-event models follow material from mine or source through stockpile and loadout, across the rail network, into port or plant unloading, and then follow the empty fleet back into the next cycle.',
          'Schedules, asset availability, maintenance windows, delay distributions, infrastructure limits and operating rules all change the same shared system state. That is what exposes queue formation, knock-on delay and constraints that isolated calculations miss.'
        ],
        points: [
          'Calibrated process and travel times',
          'Explicit infrastructure, fleet and operating constraints',
          'Controlled scenario changes against a common baseline'
        ]
      },
      {
        label: '03 / Decision outputs',
        title: 'Compare the operation, not just a headline tonnage',
        paragraphs: [
          'Scenario runs report throughput alongside cycle times, utilisation, queues and bottlenecks. Together, those measures explain why a result changed and help distinguish a local improvement from a constraint shifted elsewhere in the chain.'
        ]
      },
      {
        label: '04 / Representative work',
        title: 'Rail and bulk systems across several operating contexts',
        paragraphs: [
          'Public examples include Mineral Resources iron ore, Bowen Rail, Roy Hill, CBG bauxite, BHP Billiton iron ore, Aurizon coal, Queensland Rail bulk freight and Hunter Valley coal operations.',
          'The Roy Hill rail operations platform was delivered over ten weeks, with partial functionality available after five. It combined mine and port delays, train scheduling, maintenance closures, infrastructure options and operational reporting in one simulation environment.'
        ]
      }
    ],
    services: ['Operational modelling', 'Discrete-event simulation', 'Capacity analysis', 'Scenario design'],
    technologies: ['Discrete-event simulation', 'Rail modelling', 'Scheduling', 'Scenario analysis', 'Planimate'],
    diagram: 'supply-chain',
    featured: true
  }
];

export const getWorkItem = (slug: string) => work.find((item) => item.slug === slug);
