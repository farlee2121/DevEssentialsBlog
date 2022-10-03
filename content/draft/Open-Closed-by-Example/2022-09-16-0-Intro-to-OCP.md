---
date: "2022-09-16T00:00:00Z"
tags: [SOLID, Design Principles]
seriesId: "Open-Closed Principle by Example"
title: "Open-Closed Principle by Example: Introduction to OCP"
---

The [Open-Closed Principle](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle), one of the [SOLID principles](https://en.wikipedia.org/wiki/SOLID), is crucial to reusable code and insulated domains. This series will clarify the principle with examples.
<!--more-->

<!-- 
TODO: consider how principles like scope, proximity, consistency, and naming/semantic factor into this series. Think about using these terms to mimic construction
- i.e. ports and adapters is about limiting scope. This also improves proximity and focuses semantics/naming.
 
TODO: revisit series titles and intro statements to ensure smooth progression
 -->
 
 <!-- Q: Do I add a post about custom predicates in FsSpec? It's a good example of metadata. Library doesn't care. All custom elements are in control of consumer. Can still validate, print sensible messages, *maybe* generate data (but we offer another route for adding a generation customization, registering a strategy) -->

<!-- Q: Do I add a post with misc OCP applications, but without deeper examples
- Generics
- Configuration in general
- Strategies?
- "context": either this meta is probably a good name for what I intend with FsSpec
 -->

## Definitions

First off, let's make sure we're all on the same page about the Open-Closed Principle definition.

Bertrand Meyer originally defined the Open-closed Principle as
> software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification - Bertrand Meyer

Robert Martin later rephrased the principle when he coined the SOLID principles.
> You should be able to extend the behavior of a system without having to modify that system. - Bob Martin

## Motivating Questions

The Open-Closed Principle definitions are correct, but... they can be difficult to picture if you don't already know what the applications look like.
We'll get into plenty of examples soon, but I also find it helpful to think about the principle from the questions that motivate it.

- How can we publish libraries that can adapt to unknown users without changing library code?
  - In general, how do we accommodate unknown use cases?
- How do we prevent changes from cascading between services (or other kind of components)?
- How does a service isolate it's domain *and* support semantics needed by the caller?
- How can a service compose new dependencies without changing the service?
- Design stamina: How can code [handle more use cases but remain simple](https://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html)?


I encourage you to pause for a few minutes and write down your thoughts about these questions. You don't have to know the answers, guesses and questions are good too.
Making predictions has been [proven to improve learning](../../posts/2022-03-07-Small-Teaching-Review.md#predicting).

## History

Bertrand Meyer originally described this principle while considering how to make reusable software libraries. 
He wanted to publish some code that could be adapted to the use cases of many consumers without the different 
consumers having access to modify the library itself. 

Think about all the packages you add to your software projects. Loggers, data access libraries, authentication, and much more.
These libraries would not be possible if the source code had to be changed for every system.

## Analogy: Function Parameters
Imagine if functions didn't have parameters. They would be nearly useless. 
A new function would be needed for every combinations of inputs. There would be almost no potential for reuse or abstraction.

```cs
// wat?
int Add2and2() => 2 + 2;

// :)
int Add(int x, int y)
```

Parameters offer self-defined flexibility. The function owns the parameters which work as a contract with the caller. The function implentation can consistently operate against this contract, yet many different callers can adapt a function to their own puposes by passing different data.

This same idea applies to components in our systems. We can design our components to accommodate diverse needs without anticipating the needs of each different caller.
The component defines what flexibility it offers on it's own terms (like parameters), but lets callers imprint their own meaning within that defined flexibility.
This makes our system robust to change and powerful to reuse.

## Up next
Components can offer this parameter-like open-closed flexibility many ways. First we'll cover approaches [with data](./2022-09-16-1-OPC-through-Data.md), then [with behaviors](./2022-09-16-3-Flexible-Behavior.md), and [with whole systems](./2022-09-16-4-OCP-as-architecture.md). We'll also look at some [examples that might look like OCP, but fail to deliver the expected value](./2022-09-16-5-OCP-anti-examples.md).
