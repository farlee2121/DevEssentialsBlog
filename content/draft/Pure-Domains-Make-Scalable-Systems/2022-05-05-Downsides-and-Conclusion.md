---
date: "2022-05-05T00:00:00Z"
tags: [Event Streaming, Dependency Rejection, Event-based Architecture, Domain Modeling Made Functional]
title: "Pure Domains Make Scalable Systems: Downsides & Conclusion"
seriesId: Pure Domains Make Scalable Systems
---

This is a series exploring the benefits of pure domains for scalability. This post explores downsides of pure domains and concludes the series.
<!--more-->

## Downsides

First off, it can be hard to think this way. This event-based pure domain approach brings [system-level thinking](https://www.youtube.com/watch?v=ROor6_NGIWU&ab_channel=ClojureTV) to the domain and individual commands. Most programmers (myself included) are accustomed to an imperative programming approach that changes state through a series of instructions. Even a dependency inversion approach leans on the consumers calling their abstracted dependencies. This event approach calls no one. 

This leads to the other key pitfall, indirection. The domain knows less about orchestration and state enactment, but it also knows less about orchestration and state enactment. It's a double edged sword. It's more flexible but it can be harder to get a full picture of what the system is doing. 

## Conclusion

Designing domain code to be pure prepares the system for scalability. The input and output of the pure domain are really events.

These pure event-driven domains help us scale because they're
- Maximally parallelizable
- Ready-made for event streaming tools that power intelligent horizontal scaling and loosely coupled consumers
- Cache friendly
- Traceable: easy to log and reproduce
- Capable of complex concurrency rules 
- Capable of batching and nesting commands

The benefits are numerous, but not without tradeoffs. Pure domains bring systems thinking into the core of the application. This can cause complexity and indirection unnecessary for smaller or less-complex projects.

<!-- hmm. I now know this is is called functional core, imperative shell -->

<!-- Q: Do I need to break up this post? -->