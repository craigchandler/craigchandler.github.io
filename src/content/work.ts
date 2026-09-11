export type DiagramType = 'platform' | 'control' | 'supply-chain' | 'fatigue' | 'revival';

export interface CaseSection {
  label: string;
  title: string;
  paragraphs: string[];
  figure?: 'image';
  subsections?: Array<{ title: string; paragraphs: string[] }>;
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
  contributionNote?: string;
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
    kicker: 'Analytical implementation, product architecture and integration',
    summary: 'Two fatigue-analysis algorithms delivered through a native library, a browser application and a managed web API. Developed at InterDynamics, the products support direct schedule analysis and integration into third-party rostering and workforce systems.',
    card: {
      problem: 'Deliver two fatigue-analysis algorithms through web, API and native integration models.',
      role: 'Product + integration architecture and engineering',
      complexity: 'Angular · .NET · Azure · Auth0 · API Management · C++ · licensing'
    },
    metadata: {
      title: 'FAID Quantum — Analytical Implementation & Architecture | Craig Chandler',
      description: 'Implementation and product architecture for FAID and FAID Quantum: two fatigue-analysis algorithms delivered through a native library, browser application and managed web API.',
      image: '/assets/social/faid-quantum.png',
      imageAlt: 'FAID Quantum — web, API and native fatigue-risk integration platform',
      entityType: 'SoftwareApplication',
      applicationCategory: 'Fatigue-risk analysis software'
    },
    sections: [
      {
        label: '01 / Analytical implementation',
        title: 'From analytical models to production calculations',
        paragraphs: [
          'My work began with the existing FAID implementation in the desktop product. I translated the calculations into C++ and packaged them as a DLL, making the algorithm available to external applications while improving calculation performance within our own software.',
          'The second algorithm, FAID Quantum, required implementation directly from academic research papers covered by InterDynamics’ exclusive commercial licences. Results were checked against a calculation spreadsheet supplied by the researchers.',
          'The established DLL subsequently provided raw reference outputs for checking later implementations. Comparisons with the desktop product also covered the graphical presentation of results, including outputs requiring interpolation and interpretation.'
        ]
      },
      {
        label: '02 / Integration architecture',
        title: 'Two algorithms, three delivery models',
        paragraphs: [
          'The native library allows customers to calculate fatigue predictions from roster data within their own software. Customers control how the results are analysed and presented, fitting fatigue analysis into their existing product workflows.',
          'My responsibility included the integration interfaces, examples in multiple programming languages, API documentation, licensing and expiry controls, and error reporting for invalid inputs.',
          'The managed web API followed requests from customers who preferred remote calculation to installing a native component. Azure API Management and .NET Azure Functions provide the integration surface, with subscription access and product entitlement handled as separate controls.',
          'Both algorithms are available through the native library, web application and web API.'
        ]
      },
      {
        label: '03 / Product workflow',
        title: 'From exchanged files to retained assessments',
        paragraphs: [
          'The desktop product used a file-based workflow: users loaded roster data, ran an analysis and exchanged input files when sharing work. For the web application, I introduced named assessments that retain inputs and calculated outputs together, with access governed by group permissions.',
          'Corporate customers needed to collect individual submissions for manager-led analysis. In this workflow, ordinary users manage their own records; authorised managers can review and consolidate submissions into a separate group assessment. Shared assessments remain available for collaborative work.',
          'The distinction keeps individual users focused on their own data and prevents them from changing another person’s submissions, while giving managers the visibility needed for group analysis.'
        ],
        figure: 'image'
      },
      {
        label: '04 / Application and cloud architecture',
        title: 'Delivery across the application and platform',
        paragraphs: [
          'I owned the web product’s design and implementation across the Angular frontend, C# backend, database structure, cloud architecture, deployment and CI pipelines. Auth0 establishes user identity, while backend services enforce organisation context and access to assessment data. Calculations remain behind the application layer.',
          'The browser application extended access beyond the Windows desktop product and introduced persistent, permission-controlled workflows across users and groups. Colleagues contributed testing, QA and product feedback.',
          'Alongside engineering delivery, I led early internal presentations and customer demonstrations. Ongoing work includes technical support and helping customers integrate the products into their software and operational workflows.'
        ]
      },
      {
        label: '05 / Outcomes',
        title: 'Established products and corporate adoption',
        paragraphs: [
          'The DLL became one of InterDynamics’ strongest-selling products over many years.',
          'The web application gained corporate customers, including organisations seeking individual data collection with manager-led consolidation and analysis. The web API attracted several corporate users within its first year of operation.'
        ]
      }
    ],
    services: ['Algorithm implementation and verification', 'Product and integration architecture', 'Full-stack engineering', 'Database and cloud architecture', 'CI and deployment', 'Customer integration support'],
    technologies: ['C++', 'Angular', 'TypeScript', 'C# / .NET', 'Azure', 'Auth0', 'Azure API Management', 'Azure Functions'],
    diagram: 'fatigue',
    featured: true,
    image: '/assets/images/faid-quantum-dashboard.webp',
    imageAlt: 'FAID Quantum Sample Schedule Dashboard showing the analysis date range, KSS indicators, hours worked chart and FAID indicators',
    imageWidth: 1200,
    imageHeight: 1741,
    imageNaturalRatio: true,
    imageLabel: 'Product interface / Sample schedule',
    imageCaption: 'FAID Quantum sample schedule dashboard showing calculated KSS and FAID fatigue indicators. Sample data.',
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
    kicker: 'Cloud simulation and analysis workflows',
    summary: 'Developed at InterDynamics, DASH-X supports simulation studies from scenario preparation through repeated runs, statistical analysis and result inspection. It was designed around Planimate Monte Carlo workloads, while allowing configured Windows and Linux executables to run within the same workflow.',
    card: {
      problem: 'Prepare simulation scenarios, run seeded repetitions and consolidate outputs for analysis.',
      role: 'Product workflow + application and cloud architecture',
      complexity: 'Angular · .NET · Azure Container Instances · Cosmos DB · Blob Storage'
    },
    metadata: {
      title: 'DASH-X — Cloud Simulation & Analysis Workflows | Craig Chandler',
      description: 'Application and cloud architecture for DASH-X at InterDynamics: scenario preparation, repeated simulation runs, configured analysis phases and result inspection.',
      image: '/assets/social/dash-x.png',
      imageAlt: 'DASH-X — cloud simulation workload architecture',
      entityType: 'SoftwareApplication',
      applicationCategory: 'Simulation software'
    },
    sections: [
      {
        label: "01 / Operational context",
        title: "From individual runs to simulation studies",
        paragraphs: [
          "A simulation study often needs more than a single result. Analysts run the same scenario with different random seeds to examine the distribution of possible outcomes, then compare scenarios representing different operating assumptions.",
          "Before DASH-X, users typically started those runs manually, exported the outputs and assembled them for analysis in their own scripts or Excel. They also needed access to enough local computing capacity to complete the work.",
          "DASH-X brought preparation, execution and access to results into a shared application. InterDynamics could configure projects for customers to use directly, or use the platform internally to carry out studies and prepare client reports."
        ]
      },
      {
        label: "02 / Analyst workflow",
        title: "Projects, studies and scenarios",
        paragraphs: [
          "I designed the application structure around the way an analyst organises work. A project represents the system under investigation, such as a supply chain. Within it, a study contains the scenarios to be compared, each with its own inputs.",
          "Project managers define workloads, typically representing a particular simulation version. Users upload scenario input files and, where the project is configured for it, edit those files within the application. Existing scenarios can be duplicated to prepare further alternatives.",
          "My responsibility covered the management application’s design and implementation: the Angular interface, application backend, database structure, cloud architecture, project membership and roles, and access to input and output data."
        ]
      },
      {
        label: "03 / Execution and analysis",
        title: "Repeated runs followed by post-processing",
        paragraphs: [
          "A scenario can contain multiple execution phases, with one phase’s outputs becoming inputs to the next. For a Monte Carlo study, the first phase runs the simulation repeatedly with different random seeds. A second phase can execute a configured process that consolidates those outputs and calculates statistics.",
          "Each run’s status is recorded. A subsequent phase can require a minimum number of successful runs before proceeding, allowing the analyst to set whether incomplete results are sufficient for further processing.",
          "The resulting data can be inspected through a spreadsheet-style interface, with charts created from the outputs. All output data is also available for download and external analysis or report preparation."
        ]
      },
      {
        label: "04 / Architecture",
        title: "Separate application responsibilities from compute control",
        paragraphs: [
          "A colleague developed the core Azure Container Instances API for creating and removing containers, staging data, starting workloads and collecting outputs. The application keeps project organisation, user access and analytical workflow decisions outside the controller.",
          "That separation allowed the controller to remain reusable across applications. DASH-X itself is not restricted to Planimate: workloads can use Windows or Linux executables, provided they are configured to read inputs and write outputs in the form expected by the execution environment.",
          "Input and output files are held in Blob Storage. These datasets can be large, their structure varies between projects, and the application did not need database queries over their contents. Application metadata is stored separately in Cosmos DB.",
          "Azure Container Instances allowed compute resources to be sized for individual runs. The simulation workloads were single-threaded, so each run could use a small container.",
          "Independent runs can execute concurrently rather than sequentially. For example, 100 runs taking ten minutes each would require around 1,000 minutes if executed one after another. With sufficient cloud capacity to run all 100 concurrently, the simulation time could approach ten minutes, plus container startup, data transfer and other orchestration overheads."
        ]
      },
      {
        label: "05 / Verification and use",
        title: "Supporting client analysis and reporting",
        paragraphs: [
          "Initial comparisons checked cloud execution against local runs, particularly Linux command-line execution against the Windows graphical application. For one client with an existing cloud system, comparisons also established equivalent simulation results before InterDynamics used DASH-X to perform analysis and prepare reports for them.",
          "In consulting work, the platform supported studies involving 10–20 seeded runs or 10–20 scenarios, with consolidated outputs used to report distributions around the results.",
          "Client users who tried DASH-X reported a more responsive interface than their existing system and valued the ability to include post-processing in the workflow. Its practical value to InterDynamics has been supporting the analysis and reporting work around a simulation, alongside supplying the model itself."
        ]
      }
    ],
    services: ['Product workflow and application architecture', 'Angular frontend', 'Application backend and database design', 'Cloud architecture', 'Project access and roles'],
    contributionNote: 'A colleague developed the underlying Azure Container Instances control API.',
    technologies: ['Angular', 'TypeScript', 'C# / .NET', 'Azure Container Instances', 'Cosmos DB', 'Blob Storage'],
    diagram: 'platform',
    featured: true
  },
  {
    slug: 'moving-block',
    number: '03',
    title: 'Moving Block Train Control',
    kicker: 'Railway simulation capability and integration',
    summary:
      'A C++ component integrated with Planimate to represent moving-block railway operation within a wider operational simulation. I initiated the work for InterDynamics, defining the requirements and directing development while building the Planimate integration, test networks and tools used to review train behaviour. The work is owned by InterDynamics.',
    card: {
      problem: 'Model realistic train separation and network interactions across changing rail topology.',
      role: 'Engineering direction + Planimate integration and validation',
      complexity: 'C++ · moving block · rail topology · Planimate integration · Windows · Linux'
    },
    metadata: {
      title: 'Moving Block Train Control — C++ Simulation | Craig Chandler',
      description:
        'Operational requirements, engineering direction and Planimate validation for an InterDynamics moving-block simulation component, ready for project-model integration.',
      image: '/assets/social/moving-block.png',
      imageAlt: 'Moving Block Train Control — C++ simulation and control architecture',
      entityType: 'CreativeWork'
    },
    sections: [
      {
        "label": "01 / Modelling requirement",
        "title": "Represent changing separation across a railway",
        "paragraphs": [
          "Moving-block operation requires a railway simulation to account for changing separation between trains. Train length, speed, acceleration and the surrounding network all affect how movements interact.",
          "The requirement extends beyond trains following one another along a line. Junctions, single-track sections, passing loops, dwell times and speed restrictions introduce different operating conditions that need to remain consistent within the same simulation.",
          "Closures and changing speed restrictions can alter the conditions during a run, requiring train behaviour to respond as the simulated operation changes.",
          "The purpose of this work is to represent those behaviours for operational modelling and decision support. It concerns train movement within a simulation, rather than control of an operating railway."
        ]
      },
      {
        "label": "02 / Architecture",
        "title": "Keep detailed control practical to simulate",
        "paragraphs": [
          "I chose a separate C++ library for the decision engine because the control problem is computationally intensive. The aim was to keep simulation run times practical as the detail and complexity of the model increased.",
          "Planimate provides the operational simulation around that component. My work included the integration, model construction, train graphs and reporting used to exercise and inspect its behaviour.",
          "The separation allows the control behaviour to be tested independently of the wider simulation. The same C++ source is designed to build for Windows and Linux.",
          "Keeping the engine separate also provides room to extend train-performance modelling when a project requires it. A full train-performance calculator is a possible future addition, subject to project scope."
        ]
      },
      {
        "label": "03 / Simulation development",
        "title": "Build complexity into the test networks progressively",
        "paragraphs": [
          "Testing began with a small network and simple movements. I then added operating features, including node dwell and section speed restrictions, before building a larger network containing duplicated track, single-track sections and passing loops.",
          "This progression made it possible to examine individual behaviours before reviewing their interaction across a more complex railway. The Planimate models provided an environment in which to observe movements, inspect data and repeat scenarios after changes.",
          "Train graphs were the main visual review tool. They show movements across the network over time, making unexpected stops, prolonged waits and conflicting movements easier to identify. Data review provided a further check on train speeds and headways."
        ]
      },
      {
        "label": "04 / Behavioural validation",
        "title": "Review the operation, not just the execution",
        "paragraphs": [
          "The train graphs exposed behaviours that required correction: a train remaining at a node while other trains passed it, an abrupt stop from running speed, or trains passing one another on single track. They also made it apparent when the operation became stuck because a train did not resume its journey.",
          "These observations directed further investigation and correction. The identified behaviours were retested after changes, and there are no currently known operational problems in the tested scenarios.",
          "Extended simulation runs also examined whether trains continued to circulate. Reaching the configured end time is insufficient if meaningful operational activity stopped earlier; movement records provide the evidence needed to distinguish the two."
        ]
      },
      {
        "label": "05 / Current status",
        "title": "Ready for project-model integration",
        "paragraphs": [
          "The component is ready for integration into a project model, with final API documentation to complete. It has not yet been delivered to a client.",
          "Further capability will be driven by project requirements, including whether more detailed train-performance calculations are needed."
        ]
      }
    ],
    services: ['Operational requirements', 'Architecture and engineering direction', 'Planimate integration', 'Simulation test models', 'Train graphs and reporting', 'Behavioural validation'],
    technologies: ['C++', 'Planimate', 'Windows', 'Linux', 'Discrete-event simulation'],
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
    "slug": "rail-supply-chain",
    "number": "04",
    "title": "Rail & Bulk Supply Chain Modelling",
    "kicker": "Operational modelling and decision support",
    "summary": "Over more than twenty years at InterDynamics, I have developed Planimate simulations for rail, bulk-material and distribution systems. The work spans capacity reviews, infrastructure expansion, annual operating and maintenance plans, and supply-chain redesign.",
    "card": {
      "problem": "Assess capacity, operating plans and redesign options across rail, bulk-material and distribution systems.",
      "role": "Simulation design + client scoping and decision support",
      "complexity": "Planimate · reusable components · configurable networks · scenario analysis"
    },
    "metadata": {
      "title": "Rail & Bulk Supply Chain Modelling | Craig Chandler",
      "description": "Twenty years of Planimate simulation work at InterDynamics: client scoping, reusable models and planning studies across rail, bulk-material and distribution systems.",
      "image": "/assets/social/rail-supply-chain.png",
      "imageAlt": "Rail and bulk supply-chain modelling — recirculating operational model",
      "entityType": "CreativeWork"
    },
    "sections": [
      {
        "label": "01 / Operational questions",
        "title": "Define the decision before the model",
        "paragraphs": [
          "Clients bring questions ranging from the capacity of an existing operation to the configuration of a proposed supply chain. Some studies investigate infrastructure or fleet investment; others support recurring capacity reviews, annual planning or maintenance programmes.",
          "Scoping begins with client discussions led by InterDynamics, drawing on our experience to examine how the operation works and what the study needs to establish. I generally worked as the sole simulation developer, often alongside a general manager responsible for project management. My role commonly extended from scoping and design reviews through to delivery, training and technical support.",
          "The required outputs guide the level of detail. Data availability also sets a practical limit: a detailed representation needs evidence to support its assumptions. Model design establishes the data requirements, but the available data can in turn change what is reasonable to model."
        ]
      },
      {
        "label": "02 / Model engineering",
        "title": "Reusable components, configurable networks",
        "paragraphs": [
          "Across these projects, I developed reusable simulation components and the system used to maintain and place them within a model. The main benefit is faster network construction, alongside consistent behaviour between models and less effort when the scope changes.",
          "The Coles Myer project in 2004 was my first supply-chain model built entirely from input tables driving generic network components. The network could be regenerated as designs changed, allowing the same modelling logic to represent different configurations.",
          "CBG subsequently used an early reusable rail-location component. By the Bowen Rail project in 2023, reusable rail-location components were used throughout the mine-to-port model, with their configuration defined by internal tables. This approach has made initial proof-of-concept models quicker to build.",
          "Internal model construction and client configuration are separate decisions. Some models expose the complete network definition to users; others provide controls for agreed operating and infrastructure alternatives, with further structural changes remaining development work."
        ]
      },
      {
        "label": "03 / Verification and interpretation",
        "title": "Compare model behaviour with the operation",
        "paragraphs": [
          "Existing operations provide the strongest starting point for checking model logic. Cycle times and achieved capacity can be compared with actual performance before introducing proposed changes. For Coles Myer’s redesigned network, the configurable model could first represent the existing network using the same underlying logic.",
          "Where practical, model outputs follow the data structures clients already use. That makes comparison with operational records more direct. Charts provide an overview, while train graphs are particularly useful to rail clients reviewing modelled movements.",
          "Reviews often expose mismatches or incomplete assumptions in the input data. A mine cycle that appears too short may indicate a missing process, or time that belongs within an existing pre-load or post-load activity. The task is to identify what explains the difference and represent it at an appropriate level of detail."
        ]
      },
      {
        "label": "04 / Representative work",
        "title": "Different systems, different uses",
        "paragraphs": [],
        "subsections": [
          {
            "title": "Coles Myer — supply-chain redesign, 2004",
            "paragraphs": [
              "Working within the implementation team, I ran a configurable model of a proposed distribution network. The study examined warehouse locations, truck fleet requirements and stocks of pallets, roll cages and other handling units against forecast demand growth.",
              "The model also served as a communication tool. It made the proposed operation tangible through measures such as daily truck movements at individual sites and the quantities of handling equipment required at each location. As the network design changed, its configuration could be rebuilt from input data."
            ]
          },
          {
            "title": "CBG — bauxite supply chain, since 2010",
            "paragraphs": [
              "The CBG model combines rail transport with a detailed conveyor and processing-plant representation. It has remained in use and under continuing development since 2010, supporting studies of staged capacity expansion.",
              "The client can change operating rates, equipment capacities, transport speeds, demand, breakdown assumptions and maintenance. Changes to rail infrastructure or the conveyor plant require corresponding model development."
            ]
          },
          {
            "title": "Bowen Rail — mine-to-port capacity planning, 2023 onwards",
            "paragraphs": [
              "The Bowen Rail model supports investigation of rail capacity, maintenance, infrastructure alternatives, rolling stock and demand. It was delivered with user training and remains in use by the client.",
              "Users can enable or disable locations, change passing capability and rail duplication, and adjust operating rates, speeds, maintenance, rolling-stock numbers and shipping demand. Adding new rail locations or links remains a model-development task.",
              "InterDynamics also used the model for a study comparing configuration combinations over a five-to-seven-year planning horizon. The work considered infrastructure, rolling stock, operating arrangements, demand, and mine and port stockpile capacities, with a report comparing alternatives to support investment planning."
            ]
          }
        ]
      },
      {
        "label": "05 / Delivery and ongoing use",
        "title": "Models for client use and consulting work",
        "paragraphs": [
          "Delivery depends on how the model will be used. For some assignments, I operate it within the project team and provide analysis and reporting. For others, clients receive a model they can configure and run themselves, supported by training and subsequent technical assistance.",
          "Deciding what clients can change is part of the model design. Clients need access to the assumptions and alternatives relevant to their planning work, while changes beyond that boundary require the model to be extended. Continued support allows the simulation to develop alongside new operating questions and project scope."
        ]
      }
    ],
    "services": [
      "Simulation design and development",
      "Client scoping and technical reviews",
      "Reusable modelling components",
      "Scenario analysis and reporting",
      "Training and ongoing support"
    ],
    "technologies": [
      "Planimate",
      "Discrete-event simulation",
      "Networks defined by data",
      "Rail and logistics modelling",
      "Scenario analysis"
    ],
    "diagram": "supply-chain",
    "featured": true
  },
  {
    slug: 'wizball-remake',
    number: '05',
    title: 'Wizball Remake — Legacy C++ Revival',
    titleSegments: ['Wizball Remake —', 'Legacy C++', 'Revival'],
    kicker: 'Legacy software recovery and modernisation',
    summary:
      'A recovery and modernisation of Graham Goring’s Retrospec Wizball remake, prompted by wanting to play it on a Linux handheld. After locating the surviving source, I directed the revival independently, choosing the architecture, guiding coding-agent implementation and testing the game through to its release on PortMaster.',
    card: {
      problem:
        'Bring a recovered C++ game remake to a Linux handheld, adapting its runtime, rendering and save behaviour to the device.',
      role: 'Recovery + engineering direction + validation',
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
        "label": "01 / Recovery and purpose",
        "title": "Bring the remake to a handheld",
        "paragraphs": [
          "Getting an Anbernic RG40XX-H prompted the project. I wanted to play Graham Goring’s Retrospec remake of Wizball on it, rather than an emulated version of the original Commodore 64 game.",
          "The remake was developed in 2006–2007, but by 2026 its source appeared to have been lost. After I contacted Graham, he reached out to Peter Hull, who had worked on the Mac conversion. Peter still had a surviving copy, including the Mac project material.",
          "The archive contained Visual Studio and early Xcode projects, bundled libraries and generated game data. Its runtime depended on Allegro 4, AllegroGL, desktop OpenGL and older FMOD APIs. The initial work established how the engine and data fitted together and brought up a working Linux baseline.",
          "The original game logic, scripting system and creative content provided the foundation for the revival. Modernisation concentrated on the platform dependencies and runtime assumptions that prevented the remake from working reliably on current hardware."
        ],
        "subsection": {
          "title": "AI-assisted engineering",
          "paragraphs": [
            "Coding agents, including Codex and Claude via GitHub Copilot, carried out much of the implementation. My work covered task definition, architectural decisions, reviewing and redirecting changes, and acceptance through builds, diagnostics, gameplay and device testing. The project also became a practical way to develop that engineering workflow against an unfamiliar legacy codebase."
          ]
        }
      },
      {
        "label": "02 / Runtime and performance",
        "title": "Choose portability, then test it on the device",
        "paragraphs": [
          "SDL2 was chosen as a cross-platform foundation with support for desktop systems and a possible Android version. Window management, input, timing and rendering moved behind a platform boundary, with SDL_image handling image loading and SDL_mixer replacing the legacy audio path.",
          "The initial SDL rendering path worked well on the desktop but was too slow on the handheld. Reviewing the alternatives led to a direct OpenGL ES 2.0 renderer, supported by PortMaster. Draw batching, texture handling, scaling and viewport behaviour were adapted for the device, while the conventional SDL renderer remained available for desktop use.",
          "Testing on the RG40XX-H guided that work. A functioning renderer was an intermediate result; acceptable performance had to be established through actual gameplay on the handheld.",
          "The platform boundary also supported the later Android version, which builds the native engine through Gradle and the NDK, uses the GLES2 renderer and adds a touch-control overlay."
        ]
      },
      {
        "label": "03 / Playing and testing",
        "title": "Make the game suit interrupted play",
        "paragraphs": [
          "A game of Wizball can occupy a long session, while handheld play is often interrupted. Save-and-continue was added so a run could be stopped and resumed later without losing progress.",
          "Restoring a run required corrections to entity state and bonus-stage behaviour. Saving also needed to be quick enough to use comfortably on the handheld. Removing unnecessary work from the save and load path made the feature practical for short sessions.",
          "Gameplay testing exposed assumptions elsewhere in the recovered engine: asset-name case differences, incomplete resource loads, unchecked references and input or simulation behaviour coupled to display refresh. A portal failure was traced to its frame-zero state being indistinguishable from an uninitialised value.",
          "Diagnostic logging, defensive loading, explicit validation and a sanitizer-enabled build configuration supported investigation. Repeated desktop and handheld play provided the evidence that changes worked in the game, alongside source review and build checks."
        ]
      },
      {
        "label": "04 / Delivery and current status",
        "title": "Package the game for players",
        "paragraphs": [
          "A release needed both the executable and a dependable route from source assets to packaged game data. CMake defines the native builds, while the game’s existing data-generation modes run headlessly to rebuild scripts, tile sets and tile maps.",
          "PhysFS provides access to a shared data.zip package across desktop, PortMaster and Android builds. Writable configuration, scores and saves remain outside the packaged assets.",
          "GitHub Actions builds the game data once, then produces Linux and Windows packages and PortMaster binaries for aarch64 and armhf. A separate assembly stage combines both handheld binaries with the launcher, metadata, controller mapping and game data.",
          "The PortMaster submission was accepted and the game is available through its catalogue. Submission testing led to startup-script adjustments, with no changes required to the game itself. It runs well on my Anbernic RG40XX-H and has also been tested through gameplay on my Linux and Windows desktops.",
          "The Android version is operational in emulator testing. Earlier memory and lifecycle problems have been resolved, with work continuing on the touch-control overlay before release."
        ],
        "subsection": {
          "title": "Provenance and credits",
          "paragraphs": [
            "The original Wizball was released by Sensible Software in 1987, designed by Jon Hare and Chris Yates, with programming by Chris Yates, graphics by Jon Hare and music by Martin Galway.",
            "The 2006–2007 Retrospec remake was programmed by Graham Goring, with graphics by Trevor “Smila” Storey, music and arrangements by Infamous — Chris Nunn — and a Mac conversion by Peter Hull. Scott Wightman contributed the original Linux conversion effort. This case study covers Craig Chandler’s 2026 recovery and modernisation of that work."
          ]
        }
      }
    ],
    services: [
      'Legacy software recovery',
      'Architecture and engineering direction',
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
      { label: 'Project website and development diary', href: 'https://craigchandler.xyz/wizball-remake/' },
      { label: 'Source repository and full credits', href: 'https://github.com/craigchandler/wizball-remake' },
      { label: 'Tagged releases', href: 'https://github.com/craigchandler/wizball-remake/releases' },
      { label: 'PortMaster listing', href: 'https://portmaster.games/detail.html?name=wizball' },
      { label: 'Original Retrospec project page', href: 'https://retrospec.sgn.net/info.htm?id=wizball&t=g' }
    ]
  }
];

export const getWorkItem = (slug: string) => work.find((item) => item.slug === slug);
