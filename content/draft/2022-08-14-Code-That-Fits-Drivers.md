---
date: "2022-08-14T00:00:00Z"
tags: [Software Engineering]
title: "Development Drivers" 
---

<!-- TODO: need to align intro with conclusion. Useful to have category focusing on motivations -->
I love how [Code That Fits in Your Head](https://www.informit.com/store/code-that-fits-in-your-head-heuristics-for-software-9780137464401) clarifies the myriad of somthing-driven practices. It's not about picking one, it's about intentional motivations behind changing code. These motivation-focused tools are called *drivers*.
<!-- more -->

There are many -driven developments out there. To name some popular ones
- [Test-Driven Development](https://en.wikipedia.org/wiki/Test-driven_development)
- [Behavior-Driven Development](https://en.wikipedia.org/wiki/Behavior-driven_development)
- [Domain-Driven Design](https://en.wikipedia.org/wiki/Domain-driven_design)
- [Type-Driven Development](https://fsharpforfunandprofit.com/series/designing-with-types/)


Each of these techniques is says something about our motivations when we write code. Each forms a school of thought that comes with its own techniques, tools, and communities.

I've encountered a misconception that these approaches are exclusive. That choosing one puts a developer at odds with the others approaches. This isn't true. I commonly use all of these approaches, many of them all at the same time.

I think part of the issue that these kinds of techniques are not well defined as a category. We don't have a unified schema for them, so we see them like frameworks.

Mark Seeman elegantly collects all these approaches into one category: *drivers*.

These approaches all solve the problem that our unguided intuition is not very good deciding between solutions. These drivers provide us with guided motivations for why our code changes and what qualities that change should embody. For example

- TDD -> Code should be written incrementally in response to a series of automatically testable expectations.  
- BDD -> Software is made to satisfy expected observable behaviors, generally for non-developers. These expectations should drive tests and those test drive our implementations.
- DDD -> The language and structure of the problems we solve should drive the design of our software.

Defining drivers as clear motivations for changing code also expands the category to more tools
- Compiler errors and warnings
- Linters and static analyzers
- Cyclomatic complexity or other complexity analysis

Each of these are a prescriptive process that could motivate us to change our code, even if they don't come with a -driven label.

I think this is brilliant. Drivers collect seemingly disparate set of tools into a well-defined category. It seems obvious in retrospect to enumerate tools that inform developer motivations. Labeling this category improves how we organize about our options for developing software.
