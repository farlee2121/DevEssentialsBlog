---
date: "2022-06-16T00:04:00Z"
publishDate: "2022-06-16T00:04:00Z"
seriesId: What's your Duck v2
tags: [Design Process, Ducks]
title: "What's your Duck: Stage-specifc questions"
aliases:
- /2022/06/16/4-stage-specific-questions
---

This series is about design process and organizing our thoughts for effective development. The main goal is to establish a mental model and intuition for effective design process. This post explores questions to clarify thoughts in specific software lifecycle stages.
<!--more-->


### Questions For Requirements

I like to approach requirements with the 5ish interrogatives
- Who (am I solving a problem for)
- Why (is it important to them)
- What (do they see as necessary qualities of a solution)
- When (do they need it)
- How much (are they willing to invest in a solution)

The trio of what, when, and how much [inform if a solution is even worth pursuing](../../posts/2020/2020-07-16-iDesign-Project-Summary.md).

Most requirement techniques are different angles at these questions that try to achieve enough granularity for development. It's also critical to align understanding between customers and developers. Again, it's better to be wrong than vague. Producing artifacts (sketches, descriptions, diagrams, etc) that both implementers and the customer understand helps surface differences in understanding early and saves pain for everyone later.

Common requirement communication tools include
- [Wire Frames](https://en.wikipedia.org/wiki/Website_wireframe)
- [Mockups](https://en.wikipedia.org/wiki/Mockup#Software_engineering)
- [User Stories](https://en.wikipedia.org/wiki/User_story)
- Semi-formal language like [Gherkin](https://specflow.org/learn/gherkin/)
- [Prototypes](https://en.wikipedia.org/wiki/Software_prototyping)

Requirement Approaches
- Event Storming ([original overview](http://ziobrando.blogspot.com/2013/11/introducing-event-storming.html)) ([official resources](https://www.eventstorming.com/resources/))
- [Behavior-Driven Development and Acceptance tests](https://en.wikipedia.org/wiki/Behavior-driven_development)
- [Story Maps](https://en.wikipedia.org/wiki/User_story#Story_map) and [User Journey Maps](https://en.wikipedia.org/wiki/User_story#User_journey_map)
- Interviews
- Shadowing

## Questions for Architecture and High-level Design

I make a point to ask people about their views on architecture. Often, I get responses about X framework or Y technology stack. These are not architecture.

I like how Robert Martin broadly describes architecture as [making the important decisions that allow you to put off the unimportant decisions](https://blog.cleancoder.com/uncle-bob/2016/01/04/ALittleArchitecture.html). Unimportant decisions being things that shouldn't control the overall structure of your program. They may be important for other reasons like cost or developer familiarity.

Unimportant 
- Data Schema
- Language
- Frameworks & Storage
- Implementation details

Important
- Domain / Non-Domain properties
- Details to defer (or hide at architecture level)
- Likely design changes
- Project scale

Seen another way, architecture is [understanding the problem domain](../../posts/2022/2022-02-18-Programming-is-Problem-Modeling.md). [Domain Driven Design](https://en.wikipedia.org/wiki/Domain-driven_design) is one of the most popular design methodologies. It prescribes that software should reflect the problem it solves and provides various techniques for understanding and reflecting the domain. For example, sub-domains (or separable responsibilities of the problem domain) can often be discovered by considering business departments.

My main lines of thought for evaluating a design include
- [Essence vs accident](http://worrydream.com/refs/Brooks-NoSilverBullet.pdf): What is a fundamental part of the problem versus what could change by circumstance
  - Could we be a (company type) if we didn't (activity)?
- [Volatility Analysis](../../posts/2022/2022-02-18-Programming-is-Problem-Modeling.md#adaptability-volatility-analysis-as-essence-discovery): Using likelihood of change to understand how fundamental concepts are to a problem
  - Note: frameworks, data stores, data schemas, communication protocols, UI organization, and similar are almost never essential to a problem and highly likely to change. They are poor foundations for organizing a system
- [Information Hiding](https://en.wikipedia.org/wiki/Information_hiding): How can I minimize the scope a programmer needs to consider to understand a given piece of the system 
- [SOLID](https://en.wikipedia.org/wiki/SOLID): A well-known set of design principles that guide ways to avoid key design problems.

Common design communication tools include
- Service Diagrams: Enumerate the major system components and how they interact 
  - Here are [some simple examples](https://spencerfarley.com/2020/08/14/notification-design/)
  - More generally refer to [component diagrams](https://en.wikipedia.org/wiki/Component_diagram))
- Component signatures:
  - the methods on a service
  - the inputs and outputs of each method
  - data contracts (any complex data types used as input or output to a service)
  - expected side-effects of an action (i.e. exceptions, events)
- [Activity diagrams](https://en.wikipedia.org/wiki/Activity_diagram): these lay out the steps of a process, if a process is sufficiently complex to design before construction. I rarely use these

Design Approaches
- [Domain Driven Design](https://en.wikipedia.org/wiki/Domain-driven_design) ([book](https://www.amazon.com/Domain-Driven-Design-Tackling-Complexity-Software/dp/0321125215))
  - I highly recommend [Domain Modeling Made Functional](https://fsharpforfunandprofit.com/books/#domain-modeling-made-functional). It covers a modeling process from end to end in digestable increments.
- [Ports and Adapters, Clean Architecture, Hexagonal Architecture](https://blog.ploeh.dk/2013/12/03/layers-onions-ports-adapters-its-all-the-same/)
- [IDesign](../../posts/2020/2020-07-03-iDesign-Visual-Summary.md)

I describe much of my design process in these posts
- [Programming is Problem Modeling](../../posts/2022/2022-02-18-Programming-is-Problem-Modeling.md)
- [Stable, Incremental, Additive](../../posts/2022/2022-02-25-Stable-Incremental-Additive.md)
- [Patterns in practice](../../posts/2021/2021-07-09-Patterns-in-Practice.md)


## Questions for Construction

Many architecture and high-level design questions trickle down to construction, just at a smaller scale with more detail.

The main questions I ask myself while coding are
- **Testing**: How can I write automated tests for this code?
- **Understandability**: How can I communicate my intent clearly in code so future contributors can correctly modify the system?
- **Coupling and Cohesion**: Another view of volatility analysis and information hiding. How can I separate activities so each chunk is independently understandable and future change has minimal impact? How can I minimize and clarify expections between components?
- **Design Patterns**: What established [patterns](https://en.wikipedia.org/wiki/Software_design_pattern) can I use to maximize understandability?

The primary communication tool for construction is code and tests. Diagram sketches, signatures, or duck docs can still be helpful for getting thoughts out. However, anything others should understand about the system should be made evident in the system itself. 

Construction Approaches
- [Test-Driven Development](https://en.wikipedia.org/wiki/Test-driven_development)
- Pseudo-code Programming Process (Code Complete 2nd ed chapter 9)
  - Use pseudo-code to progressively understand a process. Aids consistent abstraction / code that reads like a sentence and conceptually well-factored code 
- [Pair Programming](https://en.wikipedia.org/wiki/Pair_programming)
- Preparatory Refactoring ([Refactoring](https://refactoring.com/) Ch 2): 
  - How do I change my system so it's easy to add the feature I want? 


## Next

That's a wrap for new content. Next we'll [review what we've covered](2022-06-16-5-Conclusion.md).