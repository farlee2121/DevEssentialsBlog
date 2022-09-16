---
date: "2022-09-15T00:00:00Z"
tags: [Software Engineering]
title: "Development Drivers" 
---

[Code That Fits in Your Head](https://www.informit.com/store/code-that-fits-in-your-head-heuristics-for-software-9780137464401) collects the myriad of somthing-driven practices into a category of *drivers*. Drivers create a toolkit for highlighting motivations and responding to them with code.
<!--more-->

There are many -driven developments out there. To name some popular ones
- [Test-Driven Development](https://en.wikipedia.org/wiki/Test-driven_development)
- [Behavior-Driven Development](https://en.wikipedia.org/wiki/Behavior-driven_development)
- [Domain-Driven Design](https://en.wikipedia.org/wiki/Domain-driven_design)
- [Type-Driven Development](https://fsharpforfunandprofit.com/series/designing-with-types/)
<!-- [capability-based design](https://fsharpforfunandprofit.com/video/#designing-with-capabilities) -->


Each of these techniques says something about our motivations when we write code. Each forms a school of thought that comes with its own techniques, tools, and communities.

I've encountered a misconception that these approaches are exclusive. That choosing one puts a developer at odds with the others approaches. This isn't true. I commonly use all of these approaches, many of them all at the same time. 

I think part of the issue that these kinds of techniques are not a well defined category. We don't have a unified mental slot for them, so we see them like frameworks.
Mark Seeman elegantly collects all these approaches into one category: *drivers*.

These approaches all solve the problem that unguided intuition is not very good at deciding between solutions. These drivers provide guided motivations for why our code might change and what qualities that change should embody. For example

- Test-Driven -> Code should be written incrementally in response to a series of automatically testable expectations.  
- Behavior-Driven -> Software is made to satisfy expected externally observable behaviors. These expectations should drive tests and those tests drive our implementations.
- Domain-Driven -> The language and structure of the problems we solve should drive the design of our software. This includes names, low-level design, large-scale structure, and more.
- Type-Driven -> Types condense knowledge into the code and provide design-time feedback. We should lean into types to model our domain and disallow improper code use.

Defining drivers as clear motivations for changing code also expands the category to more tools
- Compiler errors and warnings
- Linters and static analyzers
- Cyclomatic complexity or other complexity analysis

Each of these define a motivation and a measure to change our code, even if they don't come with a -driven label.

I think this is brilliant. Drivers collect a seemingly disparate set of tools into a well-defined category. It seems obvious in retrospect to enumerate tools that inform developer motivations. Labeling this category improves how we organize about our options for developing software.
