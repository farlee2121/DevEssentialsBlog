---
date: "2022-03-04T00:00:00Z"
tags: [Design Thinking, Architecture, Software Design]
title: Progressive Design
---

Choosing the right amount of process is an art. Too much process is smothering and too little is a mess. However, I think [incremental, stable, and additive processes](../posts/2022-02-25-Stable-Incremental-Additive.md) naturally start simple and mature *progressively* with our demands.
<!--more-->


Progressive value is inherent if our system isn't deeply affected by change (stable), changes in small complete chunks (incremental), and the increments mostly build on each other (additive).

All these properties together enable **progressive design**. We can design to what we know right now with minimized complexity, but adjust to change without massive rework.

## Examples with Architecture

To make this a bit more concrete. Lets consider a design flow with [Ports and Adapters architecture](../posts/2020-12-19-Ports-and-Adapters.md) and [similar plugin-style architectures](https://blog.ploeh.dk/2013/12/03/layers-onions-ports-adapters-its-all-the-same/).

Start with the top-level use case. The workflow is our first component.

Design only to the need of the workflow and in terms of the workflow. 
- Need some data? Define the data structure and dependency interface that delivers it to you.
- Have a behavior that could change? Accept an interface to accomplish it

This builds up your list of ports.

The second phase comes when fulfilling the ports with adapters. We can always opt for the simplest solution that fits our need.
- Does an existing service meet our need? -> use it
- No precedent? 
  - Is there a simple solution? -> implement it in the adapter
  - Does a 3rd party solution exist? -> use it
  - Is a need repeated between multiple services or is the need complex? -> Make a new service to centralize the behavior

In this way, our services stay stable, and dependency complexity is minimized for the current state of the service and system. We don't design to for any reuse we don't know we need. We don't require overarching system layers or roles for workflows that don't need it. Overall system structure is discovered over time and services can adapt to changes in the system at their own pace. 

Further, code-related processes like code ownership, quality measurement, approvals, and similar concerns can be ramped up for individual components of the system without changing the overall structure.

In short, system complexity and process formality progressively grow as demands on our system grow.

I don't want to give the impression such process magics away all pain. It's natural for the course of a business to change, and for our understanding of it to change. These progressive and well-insulated services help to minimize scope of such changes. Versioning is also a critical tool for progressively managing such change. Stipe tells a good story of how they [experienced business change](https://stripe.com/blog/payment-api-design) and [minimize change impact](https://stripe.com/blog/api-versioning) with stable, incremental, additive versioning.

## Examples with Companies

[Conway's Law](https://en.wikipedia.org/wiki/Conway%27s_law) states that systems structures reflect the organizations that built them.

In software, this has also moved the other direction. Better knowledge of software has enabled more independent teams. The growth of devops has pushed teams that own their entire feature verticals from requirements to production.

This aligns with the self-contained services of plugin-style architectures. Each team owns some number of services, and communicates with the teams that satisfy needs for their services. Process formality can vary for individual teams and for each relationship between teams.
<!-- 
Management is simplified because ownership of outcomes is very clear (which team ships the feature). Teams have the control to mitigate uncooperative upstream dependencies without diluting their own code base with temporary implementations that can be swapped if another team decides to take ownership -->

A product could start with a single team, and then split out new teams as services within the system become complex. Such teams are almost guaranteed to have maximally independent and focused work. The company can discover it's minimal and well-divided set of teams overtime without guesswork. 

This is, of course, a bit idealistic. Similar concerns may be addressed in multiple sections of the company. Bringing those solutions together is often painful and complex. However, the choice of when (or if) to bring them together becomes a business question (i.e. Is there enough long-term overlap to justify the investment?). 

## Example with testing
I've [previously explored](../posts/2021-10-31-Efficient-Inter-Team-Contracts-with-Acceptance-Tests.md) how behavior-driven acceptance tests might be used to progressively formalize testing process without restructuring tests.

## Conclusion
Choosing the right amount of process is hard. However, incremental, stable, and additive processes naturally lead to progressive systems that allow us to minimize immediate process *and* increase process as needed without restructuring our systems. This is true for code, and possibly also for organizations and tests!


<!-- - extra reference? 
- https://blog.ploeh.dk/2012/01/03/SOLIDisAppend-only/
- https://blog.ploeh.dk/2012/02/02/LooseCouplingandtheBigPicture/
- https://blog.ploeh.dk/2012/12/18/ZookeepersmustbecomeRangers/ -->






