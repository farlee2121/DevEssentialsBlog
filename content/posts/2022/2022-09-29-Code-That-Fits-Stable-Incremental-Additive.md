---
date: "2022-08-14T00:00:00Z"
tags: [Software Engineering]
title: "Code That Fits in Your Head Practices are Stable Incremental and Additive" 
---

[Stable, incremental, and additive](../../posts/2022/2022-02-25-Stable-Incremental-Additive.md) is my personal theory about what underlies effective software practices. I'm pleased to find these qualities hold up quite well for practices described by Code That Fits in Your Head.
<!--more-->

[Code That Fits in Your Head](https://www.informit.com/store/code-that-fits-in-your-head-heuristics-for-software-9780137464401) seeks to collect scattered effective practices into a clear picture of effective software development. It is a fantastic read and I [highly recommend it](../../posts/2022/2022-09-09-Code-that-fits-in-your-head-review.md)


A quick recap of stable, incremental, and additive

- Stable: existing work is rarely effected by changes in other units of work
- Incremental: value can be delivered in small and complete chunks
- Additive: the chunks don't just replace each other, the value adds up over time


These ideas permeate the practices from Code That Fits in Your Head
- Fractal architecture: Refactor out a complete sub-concern as a unit of code exceeds a set complexity. Promotes a hierarch of similarly a system that is is a semantically clear and bite-sized in any given component. The system is fractal because any focused and low-complexity component may be make up of similarly focused and low-complexity components.
- Walking skeleton: create the minimal deployable stack and deploy it so successive work can also be easily be deployed in incremental units.
- Small & complete commits: Source control and commiting small self-contained units of work is foundational to the book's development flow 
- Drivers: use defined motivations (TDD, BDD, complexity, etc) to initiate each change in the code and clarify when that unit of work is complete
- Multiple-daily code reviews: lean into continuous integration and review code multiple times a day. Keeps reviews focused and small while pressuring for frequent complete units of work.
- Strangler: New and refactored code exist side-by-side until the new approach replaces the old. Keeps code in a stable state while refactoring progresses incrementally.

The book also leverages idea's I've previously identifies as stable, incremental, and additive. This includes
- Continuous Integration / Continuous Deployment
- Hexagonal Architecture / Ports and adapters
- TDD, Red-Green-Refactor


