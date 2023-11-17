---
date: "2021-10-24T00:00:00Z"
tags: [F#, Dependency Injection, iDesign, Layered Architecture]
title: "Theory: Dependency Injection Scheme is Determined by Responsibility Layer"
aliases:
- /2021/10/24/di-strategy-by-layer
---

Scott Wlaschin posted an [incredible series](https://fsharpforfunandprofit.com/posts/dependencies/) on dependency injection. It clarifies the different techniques and cases where each is useful. I noticed an interesting relationship between the techniques and the layers I use to categorize services.
<!--more-->

# Techniques

Here is a quick overview of the techniques. I highly recommend Scott's article for a deeper view.
- **Dependency Retention**: Hard-coded dependencies
- **Dependency Rejection**: No dependencies. Only data in an data out. (more feasible in languages with union types)
  - Advanced versions may be likened to batch systems, which are like interpreter without control flow.
- **Dependency Parameterization**: Pass strategy implementations as function parameters (Think `List.map` or most anything LINQ in C#)
- **Reader Monad**: Similar to constructor injection in OO. Build up functionality that is waiting on some implementations.
- **Dependency Interpretation**: Return more advanced data structures that represent a series of actions to be enacted later

Overall, he recommends avoiding Reader Monad and Dependency Interpretation unless you have specific need for them.

## IDesign Layers

A quick review of iDesign layers. Each separates out a kind of cohesion or responsibility in the system.
- **Managers**: encapsulate composition of business rules into workflows
- **Engines**: encapsulate repeated business rules, especially those that may have alternative strategies.
- **Accessors**: encapsulate key "atomic" actions on some domain concept. They build up the basic units of change for that domain type.


## The Conjecture

Scott mentions that Dependency Parameterization is good for I/O heavy workflows.

This got me to thinking of accessors in iDesign. Then I realized that each iDesign layer represents a type of cohesion. Thus, it would make sense that each layer typically wants the same kind of dependency injection pattern.

- Accessory -> parameterization
- Engines -> pure / rejection
- Managers -> 
  - rejection
  - parameterization if injecting an engine-like concern


I've been using dependency rejection and data structure-focused techniques for managers since reading Domain Modeling Made Functional (also by Scott Wlaschin and amazing). 

I know I like it because
- It reduces mocks
- It's transaction friendly (nothing committed until whole logic flow is finished)
- The domain is more evident. Harder to hide decisions in side-effects nested somewhere in a call-chain
- It's portable and composable by default

The exception to dependency rejection for managers is when I have a swappable pure behavior. In other words, when I want to use an engine.

I've tried keeping my engines to pure data-in data-out for a long time. The [CQRS](https://en.wikipedia.org/wiki/Command%E2%80%93query_separation) principle is a good explanation for why.

Accessors are the uncertain one here. Dependency rejection in managers greatly reduces the need for centralized storage services. My accessors have been fewer and smaller when using this pattern, so the issues haven't really popped up. It would make sense that accessors would use parameterization or reader monad because they are IO heavy. Any transactional guarantees at this level of interfacing with infrastructure probably require stateful, imperative workflows.

## Conclusion

Not a whole lot to conclude. Mostly a neat recognition that the responsibilities separated by iDesign layers are correlated to the same forces that impact dependency injection patterns.
The connection isn't entirely proven, but the logical connection is intuitive.

