export type DiagramType = 'platform' | 'control' | 'supply-chain' | 'fatigue' | 'revival';

export interface CaseSection {
  label: string;
  title: string;
  paragraphs: string[];
  points?: string[];
  subsection?: {
    title: string;
    paragraphs: string[];
  };
}

export interface WorkItem {
  slug: string;
  number: string;
  title: string;
  titleSegments?: string[];
  kicker: string;
  summary: string;
  card: {
    problem: string;
    role: string;
    complexity: string;
  };
  metadata: {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    entityType: 'SoftwareApplication' | 'CreativeWork';
    applicationCategory?: string;
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
  imageLabel?: string;
  imageCaption?: string;
  imageNaturalRatio?: boolean;
  externalLinks?: Array<{ label: string; href: string }>;
  furtherReading?: Array<{ label: string; href: string }>;
}

export const work: WorkItem[] = [
  {
    slug: 'faid-quantum',
    number: '01',
    title: 'FAID Quantum',
    kicker: 'Fatigue-risk analytics platform',
    summary:
      'A secure, multi-tenant fatigue-risk platform with interactive web, managed API and native integration options.',
    card: {
      problem: 'Deliver one fatigue-analysis capability through secure web, API and native integration models.',
      role: 'Product + integration architecture and engineering',
      complexity: 'Angular · .NET · Azure · Auth0 · API Management · C++ · licensing'
    },
    metadata: {
      title: 'FAID Quantum — Fatigue-Risk Platform | Craig Chandler',
      description:
        'Case study of a multi-tenant fatigue-risk platform spanning the FAID Quantum web product, developer API and Shared Object Library.',
      image: '/assets/social/faid-quantum.png',
      imageAlt: 'FAID Quantum — web, API and native fatigue-risk integration platform',
      entityType: 'SoftwareApplication',
      applicationCategory: 'Fatigue-risk analysis software'
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
        label: '03 / Integration models',
        title: 'One analytical capability, three delivery models',
        paragraphs: [
          'The same FAID methodology can be applied interactively through FAID Quantum, remotely through the developer API, or embedded directly into third-party software through a native library. Each surface fits a different operating context while providing a consistent fatigue-analysis capability.'
        ],
        points: [
          'Web application — Angular and .NET provide schedule analysis, identity, organisation context, reporting and the complete user workflow.',
          'Developer API — Azure API Management and .NET Azure Functions provide remote integration. Requests require API subscription credentials and valid product entitlement, checked separately through the InterDynamics Licensing Platform.',
          'Native integration — The FAID Quantum Shared Object Library (formerly FAID DLL) embeds FAID calculations in third-party rostering, scheduling or workforce-management software without requiring a remote API call.'
        ]
      },
      {
        label: '04 / Product outcome',
        title: 'Analysis that can be inspected and reported',
        paragraphs: [
          'FAID Quantum brings schedule preparation, FAID and KSS indicators, comparative views and reporting into one browser-based workflow. For integrated workflows, the developer API and native library let the consuming system choose managed or local calculation while applying the same FAID methodology.'
        ]
      }
    ],
    services: [
      'Product & integration architecture',
      'Full-stack engineering',
      'API & cloud architecture',
      'Identity, tenancy & entitlement'
    ],
    technologies: ['Angular', 'TypeScript', '.NET / C#', 'C++', 'Auth0', 'Azure API Management', 'Azure Functions', 'REST'],
    diagram: 'fatigue',
    featured: true,
    image: '/assets/images/faid-quantum-dashboard.webp',
    imageAlt: 'FAID Quantum sample schedule dashboard showing KSS and FAID risk indicators',
    imageWidth: 1200,
    imageHeight: 1741,
    externalLinks: [
      { label: 'Visit FAID Quantum', href: 'https://faidquantum.com/' },
      { label: 'Developer portal', href: 'https://developer.faidquantum.com/' },
      {
        label: 'FAID Quantum user guide',
        href: 'https://www.interdynamics.com/download/documents/FAID-Quantum-Web-User-Guide.pdf'
      },
      {
        label: 'Shared Object Library overview',
        href: 'https://www.interdynamics.com/download/documents/The-FAID-Suite-of-Products.pdf'
      },
      { label: 'InterDynamics licensing platform', href: 'https://licensing.interdynamics.com/about' }
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
    metadata: {
      title: 'DASH-X — Cloud Simulation Platform | Craig Chandler',
      description:
        'Case study of a cloud platform separating interactive scenario workflows from asynchronous, containerised simulation workloads and persisted results.',
      image: '/assets/social/dash-x.png',
      imageAlt: 'DASH-X — cloud simulation workload architecture',
      entityType: 'SoftwareApplication',
      applicationCategory: 'Simulation software'
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
      'A C++ train-control component for modelling moving-block train behaviour, changing separation and network-aware rail operations.',
    card: {
      problem: 'Model realistic train separation and network interactions across changing rail topology.',
      role: 'Systems architecture + C++ engineering',
      complexity: 'C++ · moving block · rail topology · Planimate integration · Windows · Linux'
    },
    metadata: {
      title: 'Moving Block Train Control — C++ Simulation | Craig Chandler',
      description:
        'Case study of a cross-platform C++ component for modelling moving-block train behaviour and network-aware rail operations within Planimate simulations.',
      image: '/assets/social/moving-block.png',
      imageAlt: 'Moving Block Train Control — C++ simulation and control architecture',
      entityType: 'CreativeWork'
    },
    sections: [
      {
        label: '01 / Control problem',
        title: 'Movement constraints change with the railway',
        paragraphs: [
          'Moving-block behaviour depends on more than which section of track a train occupies. Train length, changing separation, junctions, shared infrastructure, closures and speed restrictions all affect what movements remain practical as the simulation evolves.',
          'Representing those effects requires the model to account for changing physical and network conditions rather than treating movement as a fixed sequence of occupied and clear sections.'
        ]
      },
      {
        label: '02 / Control architecture',
        title: 'Separate the operational model from specialist control logic',
        paragraphs: [
          'The train-control logic is implemented as a separate C++ component integrated with the operational simulation. Keeping those responsibilities separate allows the railway model to focus on the wider operation while the specialist component handles detailed train-control behaviour.',
          'That separation also makes the control behaviour easier to test independently from the larger simulation model and keeps the integration boundary explicit.'
        ],
        points: [
          'Train length and changing separation affect movement behaviour',
          'Junctions and shared infrastructure introduce network-level constraints',
          'Closures and speed restrictions can alter earlier operating assumptions'
        ]
      },
      {
        label: '03 / Integration',
        title: 'Detailed train behaviour within a larger operational simulation',
        paragraphs: [
          'The component is written in C++ and integrated with Planimate through a deliberately narrow native boundary. The same source is designed to build for Windows and Linux.',
          'Within the wider simulation it supports topology-aware train movement, changing operating constraints and interactions across the rail network.'
        ]
      }
    ],
    services: ['Control-system architecture', 'C++ engineering', 'Planimate integration', 'Test architecture'],
    technologies: ['C++', 'CMake', 'Windows', 'Linux', 'Planimate', 'Native APIs'],
    diagram: 'control',
    featured: true,
    furtherReading: [
      {
        label: 'Read the deeper discussion of the modelling problem',
        href: '/articles/modelling-moving-block-train-control/'
      }
    ]
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
    metadata: {
      title: 'Rail & Bulk Supply Chain Modelling | Craig Chandler',
      description:
        'Case study of discrete-event models for mine, rail and port operations, examining fleet cycles, capacity constraints, bottlenecks and operating scenarios.',
      image: '/assets/social/rail-supply-chain.png',
      imageAlt: 'Rail and bulk supply-chain modelling — recirculating operational model',
      entityType: 'CreativeWork'
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
  },
  {
    slug: 'wizball-remake',
    number: '05',
    title: 'Wizball Remake — Legacy C++ Revival',
    titleSegments: ['Wizball Remake —', 'Legacy C++', 'Revival'],
    kicker: 'Legacy software recovery and modernisation',
    summary:
      'Recovered the source of a 2007 C++ game remake and revived it for modern Linux and ARM handhelds, replacing obsolete platform dependencies, hardening runtime behaviour and establishing a modern build and release path with extensive AI-assisted engineering.',
    card: {
      problem:
        'Modernise a recovered C++ game codebase whose original platform, runtime and distribution assumptions no longer held on current systems.',
      role: 'Legacy recovery + C++ modernisation',
      complexity: 'C++ · SDL2 · legacy migration · Linux · ARM handhelds · build/release engineering'
    },
    metadata: {
      title: 'Wizball Remake — Legacy C++ Revival | Craig Chandler',
      description:
        'Case study of recovering and modernising a 2007 C++ game remake for modern Linux and ARM handhelds, including platform migration, runtime hardening and release engineering.',
      image: '/assets/social-preview.png',
      imageAlt: 'Craig Chandler — Solution Architect and Decision Intelligence Specialist',
      entityType: 'CreativeWork'
    },
    sections: [
      {
        label: '01 / Recovery',
        title: 'Recover a codebase from another software era',
        paragraphs: [
          'The original Wizball was released by Sensible Software in 1987. Nearly two decades later, Graham Goring and collaborators created the Retrospec remake for Windows and Mac, with new graphics by Trevor “Smila” Storey and music and arrangements by Infamous, Chris Nunn.',
          'By 2026, the remake’s source appeared to have been lost. After I contacted Graham, he reached out to Peter Hull, who had worked on the Mac conversion. Peter still had a surviving copy, including the Mac-specific project material from that period.',
          'Recovering the files was only the beginning. The archive contained Visual Studio and early Xcode project files, bundled legacy libraries, generated binary data and runtime output. The engine expected Allegro 4, AllegroGL, desktop OpenGL 1.3 and FMOD APIs from the original development period. It also contained Windows, Mac and partial Linux assumptions accumulated across earlier ports.',
          'The first task was therefore investigative: establish what had survived, reconstruct how the engine and data fitted together, and create a working Linux baseline without confusing the 2026 revival with authorship of the original remake.',
          'Preservation included provenance as well as code. The original documentation and contributor credits were retained, and the project history now distinguishes clearly between the 1987 game, the 2006–2007 Retrospec remake and the later recovery work.'
        ]
      },
      {
        label: '02 / Runtime boundary',
        title: 'Replace the platform layer, preserve the game',
        paragraphs: [
          'The modernisation was not approached as a clean-sheet rewrite. The aim was to keep the existing game, scripting system and creative content recognisable while concentrating change around the platform services that had aged out.',
          'Window management, input, timing and rendering were progressively moved behind a new platform boundary. SDL2 replaced the active Allegro runtime, SDL_image took over image loading, and SDL_mixer replaced the legacy FMOD audio path. The old AllegroGL and desktop OpenGL integration was retired from the supported build.',
          'Rendering was split into two targets. A conventional SDL renderer supports the desktop Linux build, while a direct OpenGL ES 2.0 path serves PortMaster and other handheld-style environments. The GLES2 renderer required more than API substitution: draw batching, texture handling, scaling and viewport behaviour had to be adapted until the game reached usable performance on the target hardware.',
          'This boundary also made a later Android experiment possible. The Android branch builds the same native engine through Gradle and the NDK, packages the same game data, uses the GLES2 renderer and adds a touch-control overlay through the SDL activity. It can reach gameplay, but remains prototype work with unresolved lifecycle and memory concerns rather than a completed Android release.',
          'The result is not universal portability, nor a claim of exact behavioural equivalence. It is a substantially more portable runtime architecture that retains the original remake as the system being modernised.'
        ]
      },
      {
        label: '03 / Runtime hardening',
        title: 'Make runtime assumptions visible',
        paragraphs: [
          'A successful compilation did not mean the game was correct.',
          'The recovered code contained assumptions that had been harmless—or at least hidden—on its original platforms. Asset names did not always match their on-disk case. Partial resource loads could leave invalid data for later systems to consume. Tile, collision and scripting paths assumed that indexes and references were valid. Input and simulation behaviour could become coupled to display refresh. A portal failed because its frame-zero state was indistinguishable from an uninitialised value.',
          'Later stages exposed a different class of problem. The first handheld rendering path worked but was too slow to be useful. Release candidates uncovered GLES2 scaling problems. New asset packaging revealed stale-cache behaviour. Save-and-continue required several corrections around restored entities and bonus-stage state. Android testing exposed second-launch crashes, surface lifecycle behaviour and the cost of eagerly decoding long audio streams.',
          'These failures were addressed with more explicit validation, defensive loading, diagnostic logging, a sanitizer-enabled build configuration and repeated testing on the environments that mattered. The purpose was not to suppress every symptom. It was to make enough of the old engine’s implicit contract visible that failures could be understood and corrected.'
        ],
        subsection: {
          title: 'AI-assisted engineering',
          paragraphs: [
            'Coding agents, including Codex and Claude via GitHub Copilot, were used extensively for scaffolding, migration and repetitive implementation. Their output was treated as a proposed change rather than evidence of correctness. Source review, builds, diagnostics, desktop execution, handheld testing and later release feedback determined whether each change was acceptable.',
            'This distinction matters in legacy work. Agents can move quickly through unfamiliar code, but they cannot replace the engineering judgement required to recognise when a plausible change has altered a load-bearing behaviour.'
          ]
        }
      },
      {
        label: '04 / Delivery',
        title: 'From recovered source to distributable software',
        paragraphs: [
          'Portability extended beyond the executable.',
          'The original project mixed source assets with generated scripts, tile sets, tile maps and historical packfiles. Some release data could only be regenerated by running modes built into the game itself. Those relationships had to become explicit before the project could be built consistently outside its original development environment.',
          'CMake now describes the native build, dependency selection, renderer target and installation layout. The existing data-generation modes can run headlessly, allowing scripts and map data to be rebuilt without opening a game window. Generated output is no longer treated as hand-maintained source.',
          'PhysFS provides a consistent virtual filesystem over a single data.zip. The same package can be mounted by desktop, PortMaster and Android builds, while unpacked files remain available during development. Writable configuration, scores, saves and reports are kept outside the packaged assets.',
          'GitHub Actions builds the game data once and uses it to produce Linux and Windows packages together with PortMaster binaries for both aarch64 and armhf. A separate assembly stage creates the exact launcher, metadata, controller mapping, licence and directory layout expected by PortMaster.',
          'The Windows pipeline demonstrates automated compilation and packaging, but Windows runtime validation has not been established. The strongest completed outcome is the Linux and handheld path: the game runs on modern Linux, reached usable speed on ARM hardware, is available through tagged releases and is now distributed through PortMaster as a ready-to-run port.',
          'What began as an uncertain source-recovery exercise is now a maintained public codebase with an explicit runtime boundary, a defined asset package and a repeatable route from source to release.'
        ]
      },
      {
        label: '05 / Attribution',
        title: 'Provenance and credits',
        paragraphs: [
          'Wizball was originally released in 1987 by Sensible Software, designed by Jon Hare and Chris Yates, with programming by Chris Yates, graphics by Jon Hare and music by Martin Galway.',
          'The 2006–2007 Retrospec remake was programmed by Graham Goring, with graphics by Trevor “Smila” Storey, music and arrangements by Infamous — Chris Nunn — and a Mac conversion by Peter Hull. Scott Wightman contributed the original Linux conversion effort.',
          'This case study covers Craig Chandler’s 2026 recovery and modernisation work. It does not imply authorship of the original game or Retrospec remake.'
        ]
      }
    ],
    services: [
      'Legacy software recovery',
      'C++ modernisation',
      'Cross-platform runtime engineering',
      'Runtime diagnostics and hardening',
      'Handheld Linux porting',
      'Build, packaging and release automation',
      'AI-assisted engineering'
    ],
    technologies: [
      'C++',
      'CMake',
      'SDL2',
      'SDL_image',
      'SDL_mixer',
      'OpenGL ES 2.0',
      'PhysFS',
      'Linux',
      'GitHub Actions',
      'PortMaster'
    ],
    diagram: 'revival',
    featured: false,
    image: '/assets/images/wizball-gameplay.png',
    imageAlt: 'Wizball gameplay running through the modern SDL2-based runtime',
    imageWidth: 640,
    imageHeight: 480,
    imageLabel: 'Gameplay / Modern Linux runtime',
    imageCaption: 'The recovered 2007 Retrospec remake running through the modern SDL2-based runtime.',
    imageNaturalRatio: true,
    externalLinks: [
      { label: 'Source repository and full credits', href: 'https://github.com/craigchandler/wizball-remake' },
      { label: 'Tagged releases', href: 'https://github.com/craigchandler/wizball-remake/releases' },
      { label: 'PortMaster listing', href: 'https://portmaster.games/detail.html?name=wizball' },
      { label: 'Original Retrospec project page', href: 'https://retrospec.sgn.net/info.htm?id=wizball&t=g' }
    ]
  }
];

export const getWorkItem = (slug: string) => work.find((item) => item.slug === slug);
