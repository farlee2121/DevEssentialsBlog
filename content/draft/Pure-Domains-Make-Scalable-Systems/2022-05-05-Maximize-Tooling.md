---
date: "2022-05-05T01:00:00Z"
tags: [Event Streaming, Dependency Rejection, Event-based Architecture, Domain Modeling Made Functional]
title: "Pure Domains Make Scalable Systems: Maximize Tooling"
seriesId: Pure Domains Make Scalable Systems
---
This is a series exploring the benefits of pure domains for scalability. This post explores how pure domains mesh well with common system tools: event streams, logging, and caching.
<!--more-->
<!-- TODO: I kinda feel like I should split this more -->

## Benefit: Maximize Event Tooling

Horizontal scaling (e.g. more servers instead of more powerful servers) is key to scalability. Using events for all input and output of the domain enables maximal leverage of mature event and messaging tools (e.g [Kafka](https://kafka.apache.org/), [RabbitMQ](https://www.rabbitmq.com/), [Azure Service Bus](https://azure.microsoft.com/en-us/services/service-bus))

These tools generally offer mature capabilities for scale
- Flexible consumers: All decisions of the domain rule are contained in data. That data can be passed to any number or type of consumer without changing the domain. 
- Decoupled Uptime: the event stream acts as a queue and decouples uptime between producers and consumers
- Central cross-cutting policies: Event tooling typically supports configuration for policies like retry, error handling, and delivery guarantees without code changes. 
  - This also works for events in a well-done dependency inversion structure, but less of the system is represented as events

Event streams offer the additional benefit of system history. Event streams or an event store can track the entire history of system states, [which has many benefits](../../posts/2021-05-28-Transaction-Databases.md)

## Benefit: Traceability

Mark Seemann [suggests](https://www.informit.com/store/code-that-fits-in-your-head-heuristics-for-software-9780137464401) we log everything we can't reproduce. Logging is generally the front line for understanding production errors.

Pure functions are deterministic. If you have the inputs, you should always get the same outputs. A pure domain makes traceability and reproduction dramatically less complex. 

Event responses can also be enacted in one transaction. This can lead to dramatically less debugging by eliminating quirky transitions of state in the middle of a call chain.


## Benefit: Caching

[Cache friendly systems are performance-friendly systems](https://www.infoq.com/presentations/top-10-performance-myths/).

Pure functions always give the same output for a given input. This allows [referential transparency](https://en.wikipedia.org/wiki/Referential_transparency), where a function call can be replaced with their return value without changing the system. In other words, pure functions are very cache friendly. A whole domain that's pure is a system primed for caching.