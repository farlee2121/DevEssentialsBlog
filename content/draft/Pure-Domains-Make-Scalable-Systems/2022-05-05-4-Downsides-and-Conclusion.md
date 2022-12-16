---
date: "2022-05-05T05:00:00Z"
tags: [Event Streaming, Dependency Rejection, Event-based Architecture, Domain Modeling Made Functional]
title: "Pure Domains Make Scalable Systems: Downsides & Conclusion"
seriesId: Pure Domains Make Scalable Systems
---

This series explores the scalability benefits of pure domains. This post explores downsides of pure domains and concludes the series.
<!--more-->

## Downsides

The primary downside of pure domains is a relatively a new and potentially unintuitive way of thinking. This event-based pure domain approach brings [system-level thinking](https://www.youtube.com/watch?v=ROor6_NGIWU&ab_channel=ClojureTV) to the domain and individual commands. Most programmers (myself included) are accustomed to an imperative programming approach that changes state through a series of instructions. Even a dependency inversion approach leans on the consumers calling their abstracted dependencies. This pure domain approach calls no one. 

This leads to the other key pitfall, indirection. The domain knows less about orchestration and state enactment, but it also knows less about orchestration and state enactment. It's a double edged sword. It's more flexible but it can be harder to get a full picture of what the system is doing. 

## Conclusion

Designing around pure domains prepares the system for scalability. A key part of this scalability is how the domain decouples from system state by modeling all inputs and state changes as data structures (commands and events).

These pure event-driven domains help us scale because they are
- Ready-made for common scaling tools like
  - async messaging (event streams, queues, etc)
  - Caches
  - Traceing/observability (easy to log and reproduce)
- Capable of complex concurrency rules without domain change
- Capable of batching and nesting commands

The benefits are tantalizing, but not without tradeoffs. Pure domains bring systems thinking into the core of the application. This can cause complexity and indirection unnecessary for smaller or less-complex projects.

<!-- hmm. I now know this is is called functional core, imperative shell -->

<!-- Q: Do I need to break up this post? -->