---
date: "2022-08-14T00:00:00Z"
tags: [Software Engineering]
title: "Code That Fits in Your Head: Mental Models" 
---

Mental models are foundational. They decide how we interpret information and reason about a topic. Yet mental models for writing software are immature and little discussed. Code That Fits in Your Head puts mental models front and center.

The first chapter lays out some analogies use for software and how they fall short. I'll briefly recap the ideas to lead up to my own mental model.

## House/Construction Model

Building a house is an old, common, and damaging mental model for software development.

The idea goes that there is an order to things. You first need to put up a frame, run utilities like water and electricity, then you can start building rooms. Building out of order causes needless rework.

A chief problem with this model is that it suggest some developers are like construction workers and there is a somewhat mechanical phase of writing code. I've seen this idea in practice, and it works out poorly. All phases of writing software [are design](https://www.developerdotstar.com/mag/articles/reeves_design.html).

Another issue is the assumed rigidity in dependencies. Learning architecture approaches like [ports and adapters](https://blog.ploeh.dk/2013/12/03/layers-onions-ports-adapters-its-all-the-same/) showed me that software doesn't and shouldn't rely on some infrastructure phase. Good designs insulate components from external knowledge. Unlike houses, we can and should build the "kitchen" before deciding utilities. We can and should be able to lift "rooms" from one system and use them unchanged in a different system.

## Garden Model

Code That Fits in Your Head also calls out the [garden model](http://www.growing-object-oriented-software.com/) of software. 

This model is doesn't consider so much harmful as incomplete. This model captures the progressive nature and continual care creating software. However, it focuses on reaction and says relatively little of active creation.

## Engineering Model

Even traditional engineering disciplines are an inaccurate mental model for software engineering.

In software, the design is the product. We don't need models to avoid material and labor costs of construction. Experiments can work alongside implementations (MVP, A/B tests, etc).

Other engineering can impart significant lessons to software. Mark talks about checklists an signing off on each others work. Also, heuristics for encoding knowledge while also leaving wiggle room for differences between problems. 

Engineering bridges art and science. If it could be mechanized it wouldn't require engineers, it'd be manufacturing. Yet the goal isn't just expansion of knowledge like science. There is a significant recurrance of familiar and solved problems.


## My model

I feel grateful to have a background in mathematics, and for my early connection to the writtings of Fred Brooks. Both shaped my mental model for software and prepared me for working directly with ideas.

> The programmer, like the poet, works only slightly removed from pure thought-stuff. He builds his castles in the air, from air, creating by exertion of the imagination.  
> \- Fred Brooks, Mythical Man-month

I see programming as problem modeling ([1](../posts/Whats-Your-Duck-V2/2022-06-16-0-Intro.md), [2](../posts/2022-02-18-Programming-is-Problem-Modeling.md)). Programmers, somewhat like mathematicians, encode ideas rigorously in a standard notation. 

This math analogy also isn't perfect. Unlike in math, software only needs enough rigor for a computer to run the code. Math models/proofs can be arcane so long as they are rigorous. They only need to be understood once. Software models are regularly updated, more like [engineering designs](https://www.developerdotstar.com/mag/articles/reeves_design.html), so understandability is key.

Software tends to model business processes. The whole software process is finer grain iterations of understanding the business problem. Even released code is part of refining understanding to make future updates. A developer's job is only done when the problem is sufficiently understood such that the software no longer needs to change.

[Motorcycle maintenance](https://en.wikipedia.org/wiki/Zen_and_the_Art_of_Motorcycle_Maintenance) helped paint a more concrete picture for one friend. The hard part of mechanical work usually isn't replacing parts, it's asking good questions to understand the problem and replace just the right parts. 


Approaching software a problem modeling process has served me well. It also aligns with the model described in the [Software Engineering Body of Knowledge](../posts/2021-08-13-Swebok-transform-view.md)


## Conclusion

The mental model we use to understand software greatly impacts what we believe about software. Code That Fits in Your Head explicitly calls out several models and shows the progression toward a better, but still not perfect, engineering model of software. The engineering model meshes well with my personal model born from math and general problem solving.

<!-- Write post on -driven development? 
One of my favorite takeaways. I use many drivers but this calls out the idea so clearly. 
Drivers aren't exclusive, not is a specific set currently known to best every other set of drivers. What matters is that you're motivating the code you write from consistent sources

TODO: Find x-driven dev ref in book
List some drivers
- Test Driven
- Behavior Driven 
- Type Driven
- Domain Driven
- cyclomatic complexity

I use most of these approaches in varying situations, and many of them all at once. Using complexity measures as a driver is new to me, and I certainly intent to give it a try
-->