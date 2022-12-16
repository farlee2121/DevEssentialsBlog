---
date: "2022-12-16T02:00:00Z"
tags: [Event Streaming, Dependency Rejection, Event-based Architecture, Domain Modeling Made Functional]
title: "Pure Domains Make Scalable Systems: Intelligent Concurrency"
seriesId: Pure Domains Make Scalable Systems
---

This series explores the scalability benefits of pure domains. In this post we explore how pure domains enable sophisticated concurrency rules without modifying the domain.
<!--more-->

I highly recommend you read the [series intro](./2022-12-16-0-Intro.md) if you are unfamiliar with pure domain modeling.

Horizontal scaling (e.g. more servers instead of more powerful servers) is key to scalability. 

Ideal horizontal scaling would be perfectly parallelizable. Pure domains are naturally highly parallelizable since each action depends only on inputs and no shared system state that may require locking.

However, not all events are parallelizable. The very nature of some business actions requires certain events to follow others (e.g. pay before shipping) or limited the total events (e.g. limited inventory). An event-based pure domain offers flexible concurrency control that maximizes horizontal scaling. 

A pure domain decouples domain decisions from their enactment in system state. Thus we can use event streaming tools (e.g. [Kafka](https://en.wikipedia.org/wiki/Apache_Kafka)) to decide, per event type, how to distribute and enact domain events. This could mean a simple queue, multiple concurrent processing, or an auto-scaling pool of consumers. Events could be queued to different consumers by some quality (e.g. fullfilling warehouse for purchases), or limited to a single processor to avoid state conflicts.

Special cases may even employ complex custom logic that analyzes system state to decide event execution. Such complex schedulers can make decisions with as much information as possible, based on both current and pending system state. For example, an e-commerce platform could schedule parallel orders based on remaining inventory (i.e. 100 left, so schedule up to 100 orders). Then batch decisions can be made about errored orders or orders remaining in the queue after inventory is empty. 

In any case, the decision and enactment of events are decoupled. Distribution and handling can be tweaked to the requirements of each domain event without modifying the domain.

<!-- IDEA: I just realized that authentication could be centralized. It takes context and some T. It runs default rules and any registered rules for T -->
