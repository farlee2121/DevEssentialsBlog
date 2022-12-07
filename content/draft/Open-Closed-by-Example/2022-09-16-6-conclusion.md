---
date: "2022-09-16T00:06:00Z"
tags: [SOLID, Design Principles]
seriesId: "Open-Closed Principle by Example"
title: "Open-Closed Principle by Example: Conclusion"
aliases:
- /draft/open-closed-by-example/6-conclusion 
---

This series clarifies the [Open-Closed Principle](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle) with examples. This post recaps what we've learned
<!--more-->

## Motivating Questions

Remember the motivating questions for the Open-Closed Principle
- How can we publish libraries that can adapt to unknown users without changing library code?
  - In general, how do we accommodate unknown use cases?
- How do we prevent changes from cascading between services (or other kinds of components)?
- How does a service isolate it's domain *and* support semantics needed by the caller?
- How can a service compose new dependencies without changing the service?
- Design stamina: How can code [handle more use cases but remain simple](https://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html)?

Take a moment to reflect on what predictions you made about these questions at the start of the series.
How has your perspective changed? 

## Recap

The Open-Closed Principle is one of the [SOLID](https://en.wikipedia.org/wiki/SOLID) principles, which defines it as
> You should be able to extend the behavior of a system without having to modify that system. - Bob Martin 

The OCP illuminates how components define contrained flexibility, allowing the component to adapt to caller needs without changing internally. This is much like how parameters
enable functions to be resused by many consumers without changing the function.

[Focusing too much on flexibility or reuse](./2022-09-16-5-OCP-anti-examples.md) can undermine expected value. Instead focus on isolating domains from each other. The OCP enables components to focus on the essence of their own problem domain and defer flexible details to other components.

Some of our primary tools to create this flexibility and independence are
- [Flexible or semi-structured data](./2022-09-16-1-OPC-through-Data.md), like tags. This allows callers to imprint their own idea on data without requiring the component to handle the data differently. 
- [Passing behaviors](./2022-09-16-2-OCP-callbacks.md) like event handlers and callback allow resuse of flows with interchangable behaviors
- [Self-owned interfaces](./2022-09-16-3-Interchangable-Dependencies.md), which allow non-domain dependencies to be deferred for callers to inject later.
- [Dependency Inversion with adapters](2022-09-16-4-OCP-as-architecture.md) to map between services, also known at the Ports and Adapters pattern. This allows services to become reusable libraries that are composed into different use cases as needed. This pattern also isolates cross-cutting concerns and integrations, allowing different system configurations to be accumulated and swapped rather than ripped and replaced.

