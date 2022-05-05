---
layout: post
tags: [Event Streaming, Dependency Rejection, Event-based Architecture, Domain Modeling Made Functional]
---

<!-- 
TODO: improve title
- maybe "and High-Scale Architecture"
- "and High-Scale Event Architecture"
- "Event-based Domains for High-scale system"
- "Pure Domains make Event-driven, High-scale systems" -> favorite so far
-->

# Pure Domains and High-Scale Event Streaming

Consider a system where the business rules (domain) don't change the system state. Instead they return data that represents a state change and let consumers enact the change. This is maximally event-driven and simplifies some difficult problems in high-scale systems.


<!-- [Domain Modeling Made Functional](https://fsharpforfunandprofit.com/books/#domain-modeling-made-functional) introduces a powerful modeling approach that focuses on a pure domain layer. In other words, the business rules don't change state. Instead they return data that represents a state change. This approach simplifies some difficult problems in high-scale systems. -->

## Progression of Dependency Ideas

It may be difficult to picture a system with a completely pure domain. Our intuition wants to point to some place in the program as the orchestrator ordering 

direct dependency -> injection -> inversion -> rejection
- later, rejection ~= event/message based system. 
<!-- try to lead them to realize the idea is a progression from already popular ideas -->

[Domain Modeling Made Functional's](https://fsharpforfunandprofit.com/books/#domain-modeling-made-functional) is an accessible and fantastic overview to this kind of programming. I've also written a [sampling of the book's approach](../_posts/2021-04-09-Designing-with-Events-Transforms-and-state.md).

<!-- TODO: consider a brief example here -->



Maybe blog about how dependency rejection turns the top level of our domain into an event producer. The domain rules, even the compositional layer (not really a manager anymore) is pure, it has no effect on system state. Instead it returns a structure that represents a change and the composition root can register any number and kinds of interpreting consumers.

I think I previously wrote on how this is a data gold mine. Using an event stream you can see the full history of system states.

I also now realized the power this has to simplify difficult concurrency issues at scale. For example, limited stock of an item. Purchase events can be validated, queued, and handled in a deterministic order. If we have 100 stock left we can parallelize 100 purchases requests, then the worker can see if any failed and decide what to do with the failures and remaining queue. These requests can also form separate queues based on properties, like the fulfilling warehouse

A pure domain is perfectly parallelizable. Any orchestration of state change is made outside the domain. Retry, failure, batching, sequencing, etc can be handled by robust generic event systems and changed without changing the domain or any direct derivations of domain ports. 
- eventual consistency is up-front in the structuring

Thought i'd written on it before, but I guess I only wrote it in my blocker system notes
- https://github.com/farlee2121/BlockScheduler/blob/main/docs/Event-basedModel.md#key-takeaways
- I realized that commands can nest. I could include a list of add-note/delete-note commands as part of the update-partner command. Then I could choose to call them together or separate without needing to write any new command handlers or event handlers 
  - there is also no ambiguity in resolving against current state because each level is in terms of an action (or difference)
- I'm realizing command convention (event-based) makes for very flexible invocation. Endpoints don't really matter. The identity is contained in the command. Thus
  - events can be nested / batched
  - events can be streamed/queued
  - we could serialize any subset of commands pretty easily
  - events can be invoked individually
  - events can be held for later execution In a way, it makes our api a batch language
