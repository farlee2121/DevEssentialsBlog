---
date: 2022-09-25
tags: []
title: Properties of Self-Documenting Code
---

<!-- IDEA: Semantic or Meaning might be better than Naming. I'm realizing that actions like groupings of parameters or if we give something a dedicated type are also actions that carry semantic, but aren't covered in my current principles 
If I use semantic over naming the acronym could be SSPC (speak). The code should speak for itself, it should speak of the domain, it should speak to the readers.
- Essence is another potential option instead of naming (SPEC?)
- or essence and accident for speac
- or readability for sprk
- current version is spnc (spunk)
-->

<!-- TODO: consider portability and trimability -->

I've been trying to identify a minimal set of factors that guide how I write self-documenting code.
It seems these may be sufficient: naming, proximity, consistency, and scope.
<!--more-->


## Context

I've been working through the [SWEBOK key knowledge areas](../posts/2021-08-27-SWEBOK-Modified-topic-diagram.md) trying 
to distill compact systems for teaching effective practice. Or, at the least, to describe how I approach software development.

Construction is my current focus, and I ended up splitting it in two: the process of making code and the qualities of the code itself.
Process including activities like debugging, red-greed-refactor, working in small commits. 
Qualities of the code including aspects like style, readability, understandability. In general everything that impacts the mid to low level
design and implementation.

I've previously distilled [stable, incremental, additive](../posts/2022-02-25-Stable-Incremental-Additive.md) as drivers of healthy iterative process.
I've also covered [incremental problem solving](../posts/Whats-Your-Duck-V2/2022-06-16-2-Design-Tree-and-Incremental-Progress.md).

The code quality half of construction kept bringing me back to the term "self-documenting code". I believe that software ultimately [encodes problem understanding](../posts/Whats-Your-Duck-V2/2022-06-16-1-Software-as-Clarity.md). It encodes the problem so a computer can execute it, but future programmers are the more important audience.
A well constructed system encodes the problem so that future maintainers can understand and modify the system correctly. 
"Correctly" requiring them to understand the problem that was solved, including the intent and not just what the solution ended up looking like.

## The properties

So, what qualities drive self-documenting code?
I arrived at naming, proximity, consistency, and scope.

- **Naming:** Includes everthing from variables, to functions, classes, namespaces, packages, and more. 
Naming is one of the most common activities in programming and a primary means of communicating intent. Clarity of the name is often the same as the clarity of a component.
- **Proximity:** How close are different elements to each other. This could be grouping of variables or functions. It could also be distance from declaration to final use of a symbol (e.g. a variable).
- **Consistency:** Fred Brooks described style as "consistency in micro-decisions across time and similar decisions". Consistency allows readers to make predictions about how the system behaves instead of storing individual facts. It frees up brain space for higher concepts instead of incidental details.
- **Scope:** How much must be considered to understand a piece of code. Or, how far must a change be traced to confidently understand it's impact. For example: do you only need to know the function parameters, or do you have to worry about mutated class state, mutated system state, sequence of calls, data formats, etc. Scope is effectively about Information Hiding.

### Property origins

I didn't pull these properties out of thin air. I selected them from principles I learned other places and use frequently.
- Naming: Many origins. Widely considered one of the most important activities in programming, if not exactly a principle. I initally learned much about naming from Code Complete.
- Proximity: Code Complete's Principle of Proximity. Backed by research
- Consistency: Design of Design, but also generally backed by design research
- Scope: Information Hiding

## Sufficiency

It seems fairly clear that each of these properties are important factors, but are they *sufficient* to explain the motivation behind all the kinds of decisions we face when constructing understandable code? 

To be clear, I'm just considering what makes code understandable. I'm not considering the process for writing the code. 

Here are some of my considerations. Be warned, they're rather stream-of-thought

- context (relation to other code and ideas in the code) -> appears to comprise of scope and proximity. Relationships between names is part of consistency and naming. Comments are potentially not covered. External resources seems like they belong to scope.
- immutability -> is motivated by scope
- side-effect management -> motivated by scope
- contracts & abstractions -> an intersection of scope, consistency, proximity, and semantics
  - abstractions are largely driven by the domain, though consistency of an api and hiding scope are certainly major factors of the domain qualities chosen.
  - Names cover much of an abstraction's definition, but the grouped concepts also matter. While plausibly covered by the four properties, it is important enough I would consider broadening naming to semantic, essence, or similar. The trade-off is reduced concreteness of the properties
- design patterns -> are a variety of naming
- naming potentially belongs to a broader category of intent or semantics that might not just be naming
  - There aren't many other aspects to programming forms though. Spacing, grouping, braces (which are grouping), ordering, and names are most everything. Proximity and scope cover spacing and grouping. I'm not sure it's worth a more abstract property.
- Concurrency ... I'd say that belongs to scope. The problem with concurrency is side-effects. Those aren't an issue if you lock state for a given transaction i.e. pure functions
- monitoring, retries, and similar cross-cutting -> more part of maintenance or system-level discussion. I'm not worried about covering them here. If anything they belong to scope because they shouldn't be intermixed
- table-driven methods -> scope
- complexity -> too abstract a concept and not directly actionable. Addressed via these concerns
- Nesting -> scope & consistency 
- SOLID
  - Single-responsibility -> scope (reasons for change), naming/intent
  - Open-Closed -> scope & semantic
  - Liskov -> scope
  - Interface Segregation -> scope & semantics
  - Dependency Inversion -> scope affecting naming and proximity
- Eventual consistency -> hmm. not sure. scope? It has to do with breaking uptime and transactional boundaries. So yes, scope.

I don't know that I can claim sufficiency, but this is more than I expected to cover!


## Conclusion

Self-documenting code is the heart of sustainable construction and low-level design.

Naming, proximity, consistency, and scope cover a surprisingly large variety of understandability factors. Each is a clearly definable property and I think I could quickly produce examples of how each plays out at different scales of construction. Further, each can be learned and valuably applied fairly independently.

I believe naming, proximity, consistency, and scope are a good foundation for teaching self-documenting code. 
