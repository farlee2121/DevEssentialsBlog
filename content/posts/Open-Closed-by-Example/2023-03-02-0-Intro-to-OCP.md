---
date: "2023-03-02T00:00:00Z"
tags: [SOLID, Design Principles]
seriesId: "Open-Closed Principle by Example"
title: "Open-Closed Principle by Example: Introduction to OCP"
aliases:
- /draft/open-closed-by-example/0-intro-to-ocp/
---

The [Open-Closed Principle](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle), one of the [SOLID principles](https://en.wikipedia.org/wiki/SOLID), is crucial to reusable code and insulated problem domains. This series will clarify the principle with examples.
<!--more-->

<!-- 
TODO: consider how principles like scope, proximity, consistency, and naming/semantic factor into this series. Think about using these terms to mimic construction
- i.e. ports and adapters is about limiting scope. This also improves proximity and focuses semantics/naming.
 
TODO: revisit series titles and intro & conclusion statements to ensure smooth progression
 -->

## Definitions

First off, some official definitions for the Open-Closed Principle.

Bertrand Meyer originally defined the Open-closed Principle as
> software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification - Bertrand Meyer

Robert Martin later rephrased the principle when he coined the SOLID principles.
> You should be able to extend the behavior of a system without having to modify that system. - Bob Martin

## Motivating Questions

The Open-Closed Principle definitions are correct, but they can be difficult to picture if you don't already know what the applications look like.
We'll get into plenty of examples soon, but I find it helpful to first think about motivations of the principle.

Motivating questions include
- How can we publish libraries that can adapt to unknown users without changing library code?
  - In general, how do we accommodate unknown use cases?
- How do we prevent changes from cascading between services (or other kinds of components)?
- How does a service isolate it's domain *and* support semantics needed by the caller?
- How can a service compose new dependencies without changing the service?
- Design stamina: How can code [handle more use cases but remain simple](https://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html)?


I encourage you to pause for a few minutes and write down your thoughts about these questions. You don't have to know the answers, guesses and questions are good too.
Making predictions has been [proven to improve learning](../../posts/2022/2022-03-07-Small-Teaching-Review.md#predicting).

## History

Bertrand Meyer originally described this principle while considering how to make reusable software libraries. 
He wanted to publish some code that could be adapted to many systems without those systems modifying the library itself. 

Think about all the packages you add to your software projects. Loggers, data access libraries, authentication, and much more.
These libraries would not be meaningful if the source code had to be changed for every system.

## Analogy: Function Parameters
Imagine if functions didn't have parameters. They would be nearly useless. 
A new function would be needed for every combinations of inputs. There would be almost no potential for reuse or abstraction.

```cs
// wat?
int Add2and2() => 2 + 2;

// :)
int Add(int x, int y)
```

Parameters offer self-defined flexibility. The function owns the parameters, which work as a contract with the caller. The function implentation can consistently operate against this contract, yet many different callers can adapt a function to their own puposes by passing different data.

This same idea applies to components in our systems. We can design our components to accommodate diverse needs without anticipating the needs of each different caller.
The component defines what flexibility it offers on its own terms (like with function parameters), but lets callers imprint their own meaning within that defined flexibility.
This makes a system robust to change and powerful to reuse.

## Up next
Components can offer this parameter-like open-closed flexibility many ways. First we'll cover approaches [with data](./2023-03-02-1-OPC-through-Data.md), then [with behaviors](./2023-03-02-2-OCP-callbacks.md), with [dependencies](./2023-03-02-3-Interchangable-Dependencies.md) and [with whole systems](./2023-03-02-4-OCP-as-architecture.md). We'll also look at some [examples that might look like OCP, but fail to deliver the expected value](./2023-03-02-5-OCP-anti-examples.md).
