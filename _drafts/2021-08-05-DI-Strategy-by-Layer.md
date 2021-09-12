---
layout: post
tags: [F#, DI, Dependency Injection, iDesign, Layered Architecture]
---

# Theory: Dependency Injection Scheme is Determined by Responsibility Layer 

Scott Wlaschin posted an [incredible series](https://fsharpforfunandprofit.com/posts/dependencies/) on dependency injection. It clarified the different techniques and cases where each is useful. I noticed an interesting relationship between the techniques situations and the layers I use to categorize services.

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
- **Accessors**: each encapsulate key actions on some domain concept. They build up "atomic actions" of a domain type.


## The Theory

He mentions that Dependency Parameterization is good for I/O heavy workflows.

This got me to thinking of accessors in iDesign. Then I realized that each iDesign layer represents a type of cohesion. Thus, it would make sense that each layer typically wants the same kind of dependency injection pattern.

- Accessory -> strategy
- Engines -> pure / rejection
- Managers -> 
  - rejection
  - parameterization if injecting an engine-like concern


I've been using dependency rejection and data structure-focused techniques for managers since reading Domain Modeling Made Functional (also by Scott Wlaschin and amazing). 
I know I like it
- It reduces mocks
- It's transaction friendly (nothing committed until whole logic flow is finished)
- The domain is more evident. Harder to hide decisions in side-effects nested somewhere in a call-chain
- It's portable and composable by default

The exception to Dependency rejection for managers is when I have a swappable pure behavior. In other words, when I want to use an engine.

I've tried keeping my engines to pure data-in data-out for a long time.

Accessors are the uncertain one here. Dependency rejection greatly reduces the need for centralized storage services. My accessors have been fewer an smaller when using this pattern, so the issues haven't really popped up. It would make sense that Accessors would use parameterization because they are IO heavy. Any transactional guarantees that can't be met in a parameterized dependency are probably going to require stateful, imperative workflows.

## Conclusion

Not a whole lot to conclude. Mostly a neat recognition that the responsibilities separated by iDesign layers are correlated to the same forces that impact dependency injection patterns.
The connection isn't entirely proven, but the logical connection is intuitive.

