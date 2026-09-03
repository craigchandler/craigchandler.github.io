export interface ArticleSection {
  title: string;
  paragraphs: string[];
  figure?: 'whole-train-clearance';
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
  sections: ArticleSection[];
  relatedWork: {
    label: string;
    href: string;
  };
}

export const articles: ArticleItem[] = [
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
      'Moving-block behaviour asks a more demanding set of questions.',
      "The separation between trains changes as they move. A train's front can pass a location while hundreds of metres of train remain behind it. Two trains that are adequately separated on parallel tracks may still compete for the same junction. A route that was available moments ago may be affected by another movement, a closure or a new restriction.",
      'The challenge is not simply making trains move more smoothly. It is choosing a modelling abstraction that remains physically meaningful while the state of the railway changes.',
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
          'The most important physical correction is also one of the easiest to overlook. A train has length.',
          'Consider a leading train passing through a junction. Its front may already be on the outgoing track while its rear remains on the approach. To an animation or a node-based movement process, the train may appear to have reached the next part of its route. To another train seeking to use the junction, the first movement has not yet finished.',
          'This distinction affects more than junctions. It influences when following space becomes available, whether a train fits at a proposed stopping location, when a speed restriction has been fully cleared and whether a movement would leave part of the train obstructing shared infrastructure.',
          'Long trains also cross modelling boundaries frequently. The front and rear may occupy different sections, with a node, crossing or other network feature between them. A model that records only the leading position risks releasing infrastructure too soon or misunderstanding the space available to the next train.',
          'The public lesson is not about a particular data structure or algorithm. It is that the physical extent of an asset must remain visible in the abstraction. If length matters operationally, representing the asset as a point creates errors precisely at the boundaries where coordination matters most.'
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
          'These are coordination questions rather than simple proximity questions. They require the model to consider how several movements interact across connected infrastructure. The important point is why a purely local view of each train is insufficient.'
        ]
      },
      {
        title: 'A continuously changing problem in a discrete-event model',
        paragraphs: [
          'Railway movement appears continuous, but a discrete-event simulation advances through selected events and time points. Between those points, trains move, separation changes and earlier assumptions age.',
          'This creates a modelling trade-off. Reconsidering every movement extremely frequently may add significant computational work without improving the decisions being studied. Waiting too long can leave the simulated behaviour based on conditions that no longer describe the railway.',
          'The appropriate balance depends on the purpose of the model. A strategic capacity model may not need the same movement detail as a study concerned with close following, junction approaches or the effects of temporary restrictions. Greater detail is valuable only when it changes the operational questions the model can answer.',
          'Timing also affects physical credibility. A train cannot change its behaviour at an arbitrary point without regard to how it arrived there. If the model recognises a constraint too late, the resulting movement may contain implausible stops or abrupt changes. If it retains an earlier decision for too long, the train may continue as though the surrounding railway had not changed.',
          'The difficulty lies in keeping the movement behaviour consistent with the resolution of the simulation, not in pretending that a discrete model has become continuous.'
        ]
      },
      {
        title: 'Valid decisions can become outdated assumptions',
        paragraphs: [
          'A movement decision is made in a context. The leading train is travelling at a particular speed. A route is available. Shared infrastructure is clear. A restriction is absent or has not yet begun.',
          'Any of those conditions can change.',
          'The earlier decision was not necessarily wrong. It may have been entirely appropriate for the state that existed when it was made. The modelling problem is recognising that its assumptions are no longer current.',
          'A leader may slow unexpectedly. Another movement may occupy shared infrastructure. A route may become unavailable, or a temporary restriction may change the appropriate approach. Conversely, a constraint may clear and allow a train to resume progress.',
          'Moving-block behaviour therefore has to respond to changing operating conditions. A decision that was appropriate earlier in the simulation may need to be reconsidered as the surrounding railway changes.',
          "A useful model makes these changes visible in the train's behaviour without creating contradictions between physical movement, network occupancy and the events recorded by the simulation."
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
          'Moving-block simulation becomes difficult because physical extent, changing separation, network topology and time interact. Simplifying any one of them can make the software easier to build, but it may also remove the behaviour the model was intended to study.',
          'The most useful design question comes before software architecture: what physical facts must remain true as the simulated operation changes?',
          'Once that abstraction is clear, implementation choices can be evaluated against it. Without it, even well-structured software can produce movement that is internally consistent but operationally unconvincing.'
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
