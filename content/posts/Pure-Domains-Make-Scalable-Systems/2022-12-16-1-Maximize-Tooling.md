---
date: "2022-12-16T01:00:00Z"
tags: [Event Streaming, Dependency Rejection, Event-based Architecture, Domain Modeling Made Functional]
title: "Pure Domains Make Scalable Systems: Maximize Tooling"
seriesId: Pure Domains Make Scalable Systems
---
This series explores the scalability benefits of pure domains. This post explores how pure domains mesh well with common system tools: async messaging, logging, and caching.
<!--more-->
<!-- TODO: I kinda feel like I should split this more -->

I highly recommend you read the [series intro](./2022-12-16-0-Intro.md) if you are unfamiliar with pure domain modeling.

## Benefit: Maximize Event Tooling

Horizontal scaling is key to scalability. Think more servers instead of more powerful servers. Asynchronous messaging tools like queues, event buses, and event streams are key tools for horizontal scaling. For example, tools like [Kafka](https://kafka.apache.org/), [RabbitMQ](https://www.rabbitmq.com/), and [Azure Service Bus](https://azure.microsoft.com/en-us/services/service-bus).

Using events for all input and output of the domain maximizes benefits from these messaging tools.

These tools generally offer mature capabilities for scale
- Flexible consumers: Messages can be processed arbitrary consumers configured without knowledge of the producer. 
  - Pure domains represent all state change as events that can be streamed and thus require little additional effort to support granular and flexible response to system events.
- Decoupled Uptime: the event stream acts as a queue and decouples uptime between producers and consumers. 
  - Pure domains thus can achieve highly granular uptime independence, since all state changes are data and can be composed over event tooling
- Central cross-cutting policies: Event/Messaging tools typically support configuration for policies like retry, error handling, and delivery guarantees without code changes. 
  - A pure domain does not depend on external state, and thus decouples dependency on risky out-of-process resources. The risky integrations can be composed via event tooling which centralizes error handling behaviors
  - This also works for events in a well-done dependency inversion structure, but less of the system is represented as events

Event streams offer the additional benefit of system history. Event streams or an event store can track the entire history of system states, [which has many benefits](../../posts/2021/2021-05-28-Transaction-Databases.md).

## Benefit: Traceability

Mark Seemann [suggests](https://www.informit.com/store/code-that-fits-in-your-head-heuristics-for-software-9780137464401) we log everything we can't reproduce. Logging is generally the front line for understanding production errors.

Pure functions are deterministic. If you have the inputs, you should always get the same outputs. Thus, a pure domain is rather straightforward to log. Logging all inputs should comprehensively reproduce most errors. All increments of system change can also be tracked via domain event outputs. Sequence is largely eliminated from reproducing errors making traceability and reproduction dramatically less complex. 

Composed domain actions also have the option to commit all returned domain events in one transaction, whereas impure domain actions necessarily commit state incrementally when called. This can lead to less debugging by eliminating quirky state transitions in the middle of a call chain.


## Benefit: Caching

[Cache friendly systems are performance-friendly systems](https://www.infoq.com/presentations/top-10-performance-myths/).

Pure functions always give the same output for a given input. This allows [referential transparency](https://en.wikipedia.org/wiki/Referential_transparency), where a function call can be replaced with their return value without changing the system. In other words, pure functions are very cache friendly. A whole domain that's pure is a system primed for caching.


## Conclusion

Pure domains encapsulate all inputs and state changes in data structures, deterministically returning the same output for a given input. This predisposes pure domains to work effectively with tools for scale like async messaging systems, logging, and caching.