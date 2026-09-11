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
