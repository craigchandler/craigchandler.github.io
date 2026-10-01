export interface ArticleSection {
  title: string;
  paragraphs: string[];
  blocks?: (
    | { type: 'paragraph'; text: string }
    | { type: 'code'; label: string; code: string }
    | { type: 'table'; caption: string; columns: string[]; rows: string[][] }
  )[];
  links?: { label: string; href: string }[];
  figure?: 'whole-train-clearance' | 'ryzen-ai-stack';
}

export interface ArticleItem {
  slug: string;
  title: string;
  subtitle: string;
  published: string;
  metadata: {
    title: string;
    description: string;
  };
  introduction: string[];
  context?: { title: string; text: string; link: { label: string; href: string } };
  sections: ArticleSection[];
  relatedWork?: {
    label: string;
    href: string;
  };
}

export const articles: ArticleItem[] = [
  {
    slug: 'amd-ryzen-ai-npu-arch-linux',
    title: 'Getting the AMD Ryzen AI NPU Working on Arch Linux',
    subtitle:
      'Keeping a working kernel driver, adapting the userspace stack and checking a real model against its CPU reference.',
    published: '2026-10-01',
    metadata: {
      title: 'Getting the AMD Ryzen AI NPU Working on Arch Linux',
      description:
        'A dated account of running Ryzen AI on Arch Linux and CachyOS: userspace integration, a Laya ONNX output failure and validation against a CPU reference.'
    },
    context: {
      title: 'Tested through 1 October 2026',
      text:
        'This account covers the versions tested on my workstation. Driver support and runtime behaviour may change; the setup repository records the installation steps, compatibility fixes and validation scripts.',
      link: { label: 'Setup instructions on GitHub', href: 'https://github.com/craigchandler/ryzen-ai-arch' }
    },
    introduction: [
      'My new Linux workstation has an AMD Ryzen AI 9 HX 470, including an XDNA2 neural processing unit (NPU). Under CachyOS, an Arch-based distribution, the kernel already detected it. The amdxdna driver was loaded and /dev/accel/accel0 existed. What was missing was the userspace stack needed to run a model.',
      'I wanted to find out whether AMD’s Ryzen AI tooling could use the functioning in-tree driver without replacing it with a separately managed kernel module. That worked, but getting the software installed was only the first part of the exercise. The more useful finding came when a model compiled and ran successfully, then returned invalid results.'
    ],
    sections: [
      {
        title: 'Keep the driver that already works',
        paragraphs: [
          'The XDNA project included Arch packaging, but its standard path brought in an external kernel driver alongside the userspace plugin. On this machine, that meant building a replacement for a driver the kernel already supplied.',
          'A full build tried to compile amdxdna.ko and exposed a compiler mismatch: CachyOS had built the kernel with Clang 22, while the XDNA build invoked GCC 16. GCC rejected the Clang-specific kernel flags. Forcing Clang across the whole build got past that problem, then caused the userspace build to fail on newer warnings treated as errors.',
          'The simpler answer was to reduce the build scope. AMD’s build script has a mode that omits the kernel module:'
        ],
        blocks: [
          { type: 'code', label: 'Build the userspace plugin', code: './build.sh -release -nokmod' },
          { type: 'paragraph', text: 'I packaged the userspace-only result as an Arch package and retained the in-tree amdxdna driver. This removed the kernel-module build from the installation path.' }
        ]
      },
      {
        title: 'Establish that the runtime can use the NPU',
        paragraphs: [
          'With XRT 2.26 and the XDNA userspace plugin installed, xrt-smi examine identified the device as NPU Gorgon Point 1, with an aie2p architecture, a 6×8 topology and firmware 1.1.2.64. All three xrt-smi validate tests passed.'
        ],
        blocks: [
          { type: 'code', label: 'XRT validation on this machine', code: 'GEMM        51.0 TOPS       PASSED\nLatency     57 μs           PASSED\nThroughput  94,922 ops/s    PASSED' },
          { type: 'paragraph', text: 'These synthetic tests confirmed that the driver and userspace components could execute NPU workloads. The next step was to install the model runtime.' }
        ]
      },
      {
        title: 'Adapt the userspace environment',
        paragraphs: [
          'Ryzen AI Software 1.8 used Python 3.12, while the Arch installation on this machine had moved to Python 3.14. I used uv to install an isolated Python 3.12 environment and left the system Python alone.',
          'AMD’s Ubuntu-targeted binaries then exposed three compatibility problems. An ONNX Runtime shared object was marked as requiring an executable stack, which this system rejected. Clearing that flag with patchelf --clear-execstack resolved the import failure.',
          'The Vitis AI provider expected libncurses.so.6, while Arch supplied libncursesw.so.6. I kept a compatibility link in a private library directory. FlexML also needed libpython3.12.so.1.0, which lived under uv’s managed Python installation. Adding that directory to the environment’s LD_LIBRARY_PATH resolved the missing library.',
          'After these changes, ONNX Runtime listed VitisAIExecutionProvider alongside CPUExecutionProvider, and AMD’s bundled quicktest passed. The software could now compile and execute the supplied test model through the NPU path.'
        ],
        figure: 'ryzen-ai-stack'
      },
      {
        title: 'Run a model beyond the quicktest',
        paragraphs: [
          'I chose Laya, a 421-million-parameter ModernBERT-based decision model, for the next test. Its published ONNX export has five inputs and two outputs: decision logits and action probabilities. It provided a concrete workload to compare between CPU and NPU execution.',
          'The exported graph used dynamic dimensions, and the Vitis compilation failed on those shapes. ONNX Runtime’s free-dimension overrides let me fix the NPU build to a batch size of 1, a sequence length of 512 tokens and 20 option slots. Unused options were padded and masked. With those dimensions fixed, compilation progressed.'
        ],
        links: [
          { label: 'Laya model', href: 'https://huggingface.co/convaiinnovations/laya' },
          { label: 'Published ONNX export', href: 'https://huggingface.co/receptron/laya-onnx' }
        ]
      },
      {
        title: 'Successful execution, invalid output',
        paragraphs: [
          'The two-output graph compiled, loaded and ran through Vitis AI. Both outputs contained NaNs: invalid numerical values.',
          'The same model and input produced finite results on the CPU. The test described a web service that had stopped accepting requests, with monitoring showing a full database disk. The choices were to restart the web server, free space on the database disk, or wait. The CPU assigned approximately 98.8% to freeing disk space; the NPU result could not be used.',
          'A report in AMD’s RyzenAI-SW issue tracker described similar failures in some multi-output ONNX graphs on a different hardware and software combination. It suggested an experiment: change the outputs exposed by the graph. The report included working multi-output models too, so this was a lead to investigate, not a confirmed diagnosis.'
        ],
        links: [
          { label: 'Related multi-output failure report: RyzenAI-SW #369', href: 'https://github.com/amd/RyzenAI-SW/issues/369' }
        ]
      },
      {
        title: 'Expose a single output and compare again',
        paragraphs: [
          'I created a second ONNX graph exposing only Laya’s logits output, retained the same external weights and compiled it with a fresh Vitis cache. For the test input, the returned logits were finite and matched the CPU reference.'
        ],
        blocks: [
          { type: 'code', label: 'Logits for the three choices', code: 'CPU\n[-1.7870014, 3.3337939, -1.7052455]\n\nNPU\n[-1.7870014, 3.3337939, -1.7052455]\n\nMaximum observed difference: 0.0\nFinite NPU output: True' },
          { type: 'paragraph', text: 'The compiler marked 1,598 of 1,611 operators and 99.998% of the graph’s estimated operation count as supported by VAIML, its NPU compilation path. After partitioning, the execution-provider report counted 1,461 VAIML assignments and 119 CPU assignments. This confirmed that work had been assigned to the NPU path while some operators remained on the CPU.' },
          { type: 'paragraph', text: 'The single-output graph now matched the CPU reference for this input. It no longer exposed the separate action-probability output. Preserving both logical outputs through one physical ONNX output remained a further experiment.' }
        ],
        links: [
          { label: 'Laya conversion and validation notes', href: 'https://github.com/craigchandler/ryzen-ai-arch/blob/main/docs/laya.md' }
        ]
      },
      {
        title: 'Measure the workload, not just the hardware',
        paragraphs: [
          'I then benchmarked the single-output model at batch sizes 1, 8 and 16, using five warm-up iterations and 20 measured iterations per provider. Sequence length remained fixed at 512 tokens, with 20 option slots. The larger batches repeated the same decision input, so this tested compute throughput rather than a broader range of decision problems.',
          'Both sessions remained alive for each benchmark. Timings covered the inference call, excluding input preparation, compilation and session creation. Every measured NPU result was checked for finite values and compared with the CPU reference. The reported maximum output difference was zero at all three batch sizes.',
          'The table shows median batch latency divided by batch size. A decision in a batch still waits for the whole batch to finish.'
        ],
        blocks: [
          {
            type: 'table',
            caption: 'Median inference time per decision (ms)',
            columns: ['Batch size', 'CPU', 'NPU'],
            rows: [
              ['1', '1,196.04', '1,156.77'],
              ['8', '1,118.98', '1,124.19'],
              ['16', '1,356.27', '1,359.55']
            ]
          },
          { type: 'paragraph', text: 'At batch 1, the NPU reduced median latency by 3.3%, equivalent to a 1.034× speedup. At batch 8, both providers delivered approximately 0.89 decisions per second; at batch 16, both fell to approximately 0.74. Increasing the batch beyond 8 made this workload slower per decision on both providers.' },
          { type: 'paragraph', text: 'Similar medians did not mean identical timing distributions. In the 20 measured batch-8 runs, NPU P95 batch latency was 11.00 seconds, compared with 9.10 seconds on the CPU.' },
          { type: 'paragraph', text: 'For this Laya workload on the tested Ryzen AI 9 HX 470 stack, the NPU provided no substantial latency or throughput advantage. Almost all of the estimated computation was supported by the NPU compiler, but that did not translate into a substantial speedup.' }
        ],
        links: [
          { label: 'Benchmark method and full results', href: 'https://github.com/craigchandler/ryzen-ai-arch/blob/main/docs/laya.md#benchmark-methodology' }
        ]
      },
      {
        title: 'Reloading the compiled model',
        paragraphs: [
          'The model compiled and ran in the Python process that created the NPU session, but a second process could not reliably reload the raw Vitis cache. I reproduced the failure without rebooting or changing the kernel, XRT or firmware.',
          'For the measurements above, I compiled a fresh cache and kept the session alive in the same process through warm-up and timing. An ONNX Runtime EP Context Cache experiment also failed to produce a reusable compiled model in this configuration.',
          'A long-running application could keep its session alive across requests. Reusing the compiled model after a process restart remains unresolved on this setup.'
        ],
        links: [
          { label: 'Cache reload limitation and context-cache experiment', href: 'https://github.com/craigchandler/ryzen-ai-arch/blob/main/docs/laya.md#raw-vitis-cache-reload-limitation' }
        ]
      },
      {
        title: 'What I would test next',
        paragraphs: [
          'With Laya running and checked against the CPU reference, I can use this setup to investigate other local inference workloads, including classification, embeddings and decision models.',
          'For Laya itself, the next useful measurement is host CPU utilisation during sustained inference. Comparable latency could still be useful if NPU execution leaves more CPU capacity available for other work. I have not measured that yet.'
        ],
        links: [
          { label: 'Setup instructions and benchmark script', href: 'https://github.com/craigchandler/ryzen-ai-arch' }
        ]
      }
    ]
  },
  {
    slug: 'modelling-moving-block-train-control',
    title: 'Modelling Moving-Block Train Control in a Discrete-Event Simulation',
    subtitle:
      'Why train length, changing separation and network topology make the problem harder than it first appears.',
    published: '2026-09-03',
    metadata: {
      title: 'Modelling Moving-Block Control in Discrete-Event Simulation',
      description:
        'Why train length, changing separation, network topology and simulation timing make moving-block railway behaviour difficult to model.'
    },
    introduction: [
      'Railway simulations often begin with a convenient abstraction: divide the track into sections, represent each train by its current location, and move it from one part of the network to the next. For many planning questions, this works well. It makes occupancy visible, creates clear event boundaries and keeps the model understandable.',
      "The separation between trains changes as they move. A train's front can pass a location while hundreds of metres of train remain behind it. Two trains that are adequately separated on parallel tracks may still compete for the same junction. A route that was available moments ago may be affected by another movement, a closure or a new restriction.",
      'Modelling these interactions requires an abstraction that remains physically meaningful as the state of the railway changes.',
      'The work discussed here concerns train-control behaviour inside an operational, discrete-event simulation. It is not a production signalling system, a safety case or a certified railway control implementation. Its purpose is to represent these operational effects with enough fidelity for simulation experiments and decision support.'
    ],
    sections: [
      {
        title: 'Why fixed sections are attractive',
        paragraphs: [
          'Fixed sections give a railway model a natural vocabulary. A section is occupied or unoccupied. A train enters it, traverses it and leaves it. Conflicting movements can be prevented by allowing only one compatible use at a time.',
          'That structure fits discrete-event simulation particularly well. Section entry and exit are observable events, and the model does not need to reconsider the relationship between two trains continuously. Many timetable, capacity and network-flow questions can be studied successfully at this level.',
          'The limitation appears when the control behaviour of interest depends on the changing distance between trains rather than only on which sections they occupy.',
          'Two trains may be travelling in the same direction on the same stretch of railway. Their operational relationship changes as the leader accelerates, slows or stops and as the follower responds. A binary occupied-or-clear description cannot express all of that variation. Treating the entire section as unavailable may be unnecessarily restrictive, while treating it as available says too little about the separation that remains.',
          'Moving-block modelling does not make sections or other discrete features disappear. Junctions, single-track corridors, stations and terminal approaches still impose distinct constraints. It adds another dimension to the problem: the model must account for changing relationships within and across those features.'
        ]
      },
      {
        title: 'A train is not a point',
        paragraphs: [
          'Train length affects both the space a movement needs and when infrastructure becomes available to other trains.',
          'Consider a leading train passing through a junction. Its front may already be on the outgoing track while its rear remains on the approach. To an animation or a node-based movement process, the train may appear to have reached the next part of its route. To another train seeking to use the junction, the first movement has not yet finished.',
          'This distinction affects more than junctions. It influences when following space becomes available, whether a train fits at a proposed stopping location, when a speed restriction has been fully cleared and whether a movement would leave part of the train obstructing shared infrastructure.',
          'Long trains also cross modelling boundaries frequently. The front and rear may occupy different sections, with a node, crossing or other network feature between them. A model that records only the leading position risks releasing infrastructure too soon or misunderstanding the space available to the next train.',
          'The model therefore needs to represent the physical extent of the train wherever length affects clearance, available space or interaction with another movement.'
        ],
        figure: 'whole-train-clearance'
      },
      {
        title: 'Topology turns separation into coordination',
        paragraphs: [
          'On a straight railway with trains moving in one direction, the problem can be described mainly in terms of separation. Network topology makes that description incomplete.',
          'At a merge, two adequately separated trains may still want to occupy the same path. On single track, trains travelling in opposite directions can be far apart and nevertheless be committed to incompatible movements. At a crossing, movements on different tracks may interact even though neither train is following the other.',
          'The surrounding network matters as well. It is not always enough to know that a junction itself is clear. The receiving track must be able to accommodate the movement without leaving the train stranded across the conflict. A seemingly helpful advance can make the wider operation worse if it blocks another movement needed to restore flow.',
          'Closures and restrictions add another source of change. They can alter which parts of the network are usable, which movements remain practical and how approaching trains behave. Their effects may extend beyond the location where they apply because trains need space and time to respond.',
          'The model must therefore account for how several movements interact across connected infrastructure. Separation between individual trains is only part of that assessment.'
        ]
      },
      {
        title: 'A continuously changing problem in a discrete-event model',
        paragraphs: [
          'Railway movement appears continuous, but a discrete-event simulation advances through selected events and time points. Between those points, trains move and separation changes.',
          'This creates a modelling trade-off. Reconsidering every movement extremely frequently may add significant computational work without improving the decisions being studied. Waiting too long can leave the simulated behaviour based on conditions that no longer describe the railway.',
          'The appropriate balance depends on the purpose of the model. A strategic capacity model may not need the same movement detail as a study concerned with close following, junction approaches or the effects of temporary restrictions. Greater detail is valuable only when it changes the operational questions the model can answer.',
          'Timing also affects physical credibility. A train cannot change its behaviour at an arbitrary point without regard to how it arrived there. If the model recognises a constraint too late, the resulting movement may contain implausible stops or abrupt changes.',
          'Movement behaviour must remain physically credible at the chosen simulation resolution.'
        ]
      },
      {
        title: 'Valid decisions can become outdated assumptions',
        paragraphs: [
          'A movement decision depends on the conditions when it is made: the speed of the leading train, the availability of a route, the use of shared infrastructure and any restrictions in effect.',
          'A leader may slow unexpectedly. Another movement may occupy shared infrastructure. A route may become unavailable, or a temporary restriction may change the appropriate approach. Conversely, a constraint may clear and allow a train to resume progress.',
          'An earlier decision may have been appropriate when it was made but no longer suit the current conditions. The model needs to reflect that change in train behaviour while keeping physical movement, network occupancy and recorded events consistent.'
        ]
      },
      {
        title: 'What meaningful validation should ask',
        paragraphs: [
          'Testing this kind of model requires more than confirming that a calculation returns an expected value.',
          'Some questions concern physical consistency. Does the model continue to account for the rear of a train after its front crosses a boundary? Can a proposed movement fit in the space available? Does the model continue to represent shared infrastructure as occupied until the movement has physically cleared it?',
          'Other questions concern changing conditions. Does a slowing leader affect the following movement appropriately? Does a closure or restriction influence trains that have not yet reached it? Can traffic resume after a temporary constraint disappears?',
          'Long-run behaviour introduces another category of evidence. A simulation can reach its configured end time even though the operation stopped making meaningful progress much earlier. Successful process completion proves that the software finished; it does not prove that trains continued to circulate, constraints continued to clear or the intended service remained active.',
          'Validation should therefore examine trajectories, movement continuity, occupancy, recovery and sustained operational activity. It should also distinguish narrowly controlled tests from evidence produced by a complete simulation run. Both are useful, but they answer different questions.'
        ]
      },
      {
        title: 'Start with the physical abstraction',
        paragraphs: [
          'The modelling abstraction needs to preserve the physical facts that affect the study: the space a train occupies, its changing separation from other trains and its interaction with connected infrastructure.',
          'Implementation choices can then be assessed against observable behaviour: credible movement, appropriate responses to changing conditions and continued operation over the course of a simulation.'
        ]
      }
    ],
    relatedWork: {
      label: 'Moving Block Train Control case study',
      href: '/work/moving-block/'
    }
  }
];

export const getArticle = (slug: string) => articles.find((article) => article.slug === slug);
