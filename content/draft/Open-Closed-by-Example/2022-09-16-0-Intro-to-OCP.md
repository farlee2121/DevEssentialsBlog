---
date: "2022-09-16T00:00:00Z"
tags: [SOLID, Design Principles]
seriesId: "Open-Closed Principle by Example"
title: "Open-Closed Principle by Example: Introduction to OCP"
---

The [Open-Closed Principle](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle), one of the [SOLID principles](https://en.wikipedia.org/wiki/SOLID), is powerful but not broadly well understood. This series will run through a bunch of examples to clarify it.
<!--more-->

<!-- TODO: the excerpt doesn't motivate why we want the OCP. It probably wont interest people who aren't interested in the OCP
maybe "is critical to flexible and stable services"
 -->

## Definitions

First off, let's make sure we're all on the same page about what the Open-Closed Principle is.

Bertrand Meyer originally defined the Open-closed Principle as
> software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification - Bertrand Meyer

Robert Martin later rephrased the principle when he coined the SOLID principles.
> You should be able to extend the behavior of a system without having to modify that system. - Bob Martin

## Motivating Questions

The Open-Closed Principle definitions are correct, but... they can be difficult to picture if you don't already know what applications look like.
We'll get into plenty of examples, but I also find it helpful to thing about the principle from the questions that motivate it.

- How can we publish libraries that can adapt to unknown users without changing library code?
- How do we prevent changes from cascading between services (or other components)?
- How do we accommodate caller needs without knowing semantics from the callers?
- How can a service compose new dependencies without changing the service?

I encourage you to pause for a few minutes and write down your thoughts about these questions. You don't have to know the answers, guesses and questions are good too.
Making predictions about what you're about to learn has been [proven to improve learning](../../posts/2022-03-07-Small-Teaching-Review.md#predicting).


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

Parameters offer defined flexibility. The function owns the parameters which work as a contract with the caller. The function implentation can consistently operate against this contract, yet many different callers can adapt a function to their own puposes by passing the different data.

This same idea applies to components in our systems. We can design our components to accommodate diverse needs without anticipating the needs of each different caller.
The component defines what flexibility it offers on it's own terms (like parameters), but lets callers imprint their own meaning within that defined flexibility.
This makes our system robust to change and powerful to reuse.

## Up next
Components can offer this parameter-like open-closed flexibility many ways. First we'll cover approaches [with data](./2022-09-16-1-OPC-through-Data.md), then [with behaviors](./2022-09-16-2-Flexible-Behavior.md), and [with whole systems](./2022-09-16-3-OCP-as-architecture.md). We'll also look at some [examples that might look like OCP, but fail to deliver the expected value](./2022-09-16-4-OCP-anti-examples.md).



<!-- 

post break up
- intro: definition + motivations
- OCP through data
  - parameter analogy, metadata, tags
- Chat Thread sample 
- Implicit assumption != OCP 
  - include clojure spec here
  - TODO: consider combining this with Anti-examples. maybe dropping closure. I can't remember exactly the point I made there
- Behaviors & OCP (Not sure on title)
  - The build up is from object inheritance, to interface, to DI
- Notification Example
- OCP + DI as architecture
- Anti-Examples
- Conclusion

Maybe merge examples into their conceptual lead ups? Depends on how long they get. At least comment the prior post is critical to understanding the example-->

<!-- TODO: I think "defined flexibility" is a key term I should repeat often -->

<!-- Q: do I talk about approaches like loosely structured data? I.e. having a content field and letting callers decide any regular structure in that field. Like product descriptions where the structure is determined and interpreted in the UI, but saved as text to the service -->

<!-- Q: Do I add a post about custom predicates in FsSpec? It's a good example of metadata. Library doesn't care. All custom elements are in control of consumer. Can still validate, print sensible messages, *maybe* generate data (but we offer another route for adding a generation customization, registering a strategy) -->

<!-- Q: Do I add a post with misc OCP applications, but without deeper examples
- Callbacks (both with functions and endpoints)
  - depending on situation a continuations and callbacks might be used interchangably
- Webhooks: similar to webhooks, but 
- Generics
- Configuration in general
- "context": either this meta is probably a good name for what I intend with FsSpec

I this misc examples might be good for the recap post.
 -->