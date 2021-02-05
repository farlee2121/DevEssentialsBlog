# Verb-based Design: Events, Transforms, and State

I just finished reading [Domain Modeling Made Functional](). Wow, the technique in this book just feels right. It wraps up a bunch of development values I already had in a technique that is clear, thorough, and fluid.

Some of the values it refines are
- Understand a problem before coding
- Design to the problem and not the implementation
- Design is a spectrum: progressively uncovering knowledge of the problem
  - Coding is just the last mile design phase
- Self-documenting code
- Core code should be infrastructure-agnostic
- Orient the api around verbs, not nouns

Something about a natural progression from domain to code

## Event Storming
Starts with a event storming: a technique that has quickly rooted itself in the DDD community

TODO: Probably use exerpts from blocker  

## Storm to Design
Quick rules for understanding the text model `|` is or (alternative values), `{}` are bundled values, `->` is a transform

## Refining the design: State Machines & Contraints


## Design To Code

psyc it's already code

## Personal Take
fricken amazing. never had a modeling paradigm that both translated to code so smoothly and surfaced so many issues before coding.
Definitely takes some adjustment to how you think, but in a very good way. Disentangles bad habits accumulated from accomodating limited type systems, storage, and the like.

## Not just applicable to functional languages
- c# 9 makes a lot of these techniques reasonable
  - See post on union types
    - enable reasonable state machines and compositional polymorphism (wrap rather than inherit)
  - see my post on result types
    - big step toward total functions
  - Positional records as simple types
<!-- maybe follow up with a post about how these  -->