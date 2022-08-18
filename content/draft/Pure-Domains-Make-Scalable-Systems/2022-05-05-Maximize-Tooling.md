---
date: "2022-05-05T00:00:00Z"
tags: [Event Streaming, Dependency Rejection, Event-based Architecture, Domain Modeling Made Functional]
title: "Pure Domains Make Scalable Systems: Maximize Tooling"
seriesId: Pure Domains Make Scalable Systems
---

<!-- TODO: I kinda feel like I should split this more -->

## Benefit: Maximize Event Tooling

Using events for all input and output of the domain enables maximal leverage of mature event streaming tooling
- System History: Event streams or a event store can track the entire history of system states, [which has many benefits](../../posts/2021-05-28-Transaction-Databases.md)
- Decoupled Uptime: the event stream acts as a queue and decouples uptime between producers and consumers
- Flexible consumers: All decisions of the domain rule are contained in data. That data can be passed to any number or type of consumer without changing the domain. 
- Central cross-cutting policies: Event tooling typically supports configuration for policies like retry, error handling, and delivery guarantees without code changes. 
  - This also works for events in a well-done dependency inversion structure, but less of the system is represented as events

## Benefit: Traceability

Mark Seemann [suggests](https://www.informit.com/store/code-that-fits-in-your-head-heuristics-for-software-9780137464401) we log everything we can't reproduce.

Pure functions are deterministic. If you have the inputs, you should always get the same outputs. This makes traceability and reproduction dramatically less complex. 

The event responses can also be enacted in one transaction. This can lead to dramatically less debugging by eliminating quirky transitions of state in the middle of a call chain.


## Benefit: Caching

[Cache friendly systems are performance-friendly systems](https://www.infoq.com/presentations/top-10-performance-myths/).

Pure functions always give the same output for a given input. This allows [referential transparency](https://en.wikipedia.org/wiki/Referential_transparency), where a function call can be replaced with their return value without changing the system. In other words, pure functions are very cache friendly. A whole domain that's pure is a system primed for caching.