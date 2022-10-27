---
date: 2022-10-27T00:00:00-00:00
tags: []
title: "Five Foundational Beliefs: Origins"
---

A friend asked me to summarize what I believe about software in five points or less. I [previously described those points](../posts/2022-10-21-Five-Foundational-Beliefs.md). Here is where each of those beliefs originates from.
<!--more-->

## Understand the Problem

Understand the Problem originally stems from Fred Brooks and his writings on essence vs accident. Namely [No Silver Bullets](https://www.cs.unc.edu/techreports/86-020.pdf) and [Design of Design](https://www.amazon.com/dp/0201362988). The idea was given greater form by [What is Software Design](https://www.developerdotstar.com/mag/articles/reeves_design.html), [Domain-Driven Design](https://www.amazon.com/dp/0321125215) and the [Software Engineering Body of Knowledge (SWEBOK)](https://www.computer.org/education/bodies-of-knowledge/software-engineering/v3). SWEBOK is particularly responsible for the view of software as a [series of translations of the same problem definition](../posts/2021-08-13-Swebok-transform-view.md). [Stop Corrupting Yourself](https://codewithspoon.com/2019/12/stop-corrupting-yourself-test-against-abstractions/) improved how I apply this belief to tests.

## Stable, Incremental, Additive

Stable, Incremental, Additive also stems from Fred Brook and his book [Design of Design](https://www.amazon.com/dp/0201362988). He uses the design tree to describe incremental work cycles, [which I've also written about](../posts/Whats-Your-Duck-V2/2022-06-16-2-Design-Tree-and-Incremental-Progress.md). This idea has been reinforced often in my career, but I'd say [Refactoring](https://martinfowler.com/books/refactoring.html) and [Code That Fits in Your Head](https://blog.ploeh.dk/2021/06/14/new-book-code-that-fits-in-your-head/) are some of the best demonstrations. Refactoring helped me understand true [CI/CD](https://en.wikipedia.org/wiki/CI/CD) and how Stable, Incremental, Additive can be practically maximized through the whole software lifecycle.

## Self-Documenting Code

I first encountered Self-Documenting Code in [Code Complete](https://www.amazon.com/gp/product/0735619670/) and [Pragmatic Programmer](https://www.amazon.com/dp/020161622X). The idea was refined by [Domain-Driven Design](https://www.amazon.com/dp/0321125215), [Domain Modeling Made Functional](https://fsharpforfunandprofit.com/books/#domain-modeling-made-functional), and many other sources through out my career.

## Camping Rule

This belief stretches back a long ways. I'm not quite sure of the origin. I first encountered a name for it in [Refactoring](https://martinfowler.com/books/refactoring.html).

## Tighten the Net

I've valued automated testing since the absence of it sunk the first professional project I worked on. Tightening the Net itself stems from [Pragmatic Programmer](https://www.amazon.com/dp/020161622X). Reflecting requirements through the test suite stems from [Stop Corrupting Yourself](https://codewithspoon.com/2019/12/stop-corrupting-yourself-test-against-abstractions/), which triggered a major reshaping of my testing practices.

