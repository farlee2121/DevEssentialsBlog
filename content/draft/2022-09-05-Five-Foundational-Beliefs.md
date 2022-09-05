---
date: 2022-09-05T00:00:00-00:00
tags: []
title: "Five Foundational Beliefs"
---

A friend asked me to summarize what I believe about software in five points or less. These are those five points.
<!--more-->

This is part of a broader effort to identify and communicate what I believe about software.

<!-- TODO: I have a somewhat odd mix of nouns and imperatives. I could also use better analogies for most of the beliefs. -->
<!-- TODO: It's a bit long (7min read), maybe cut runner up section (down to 6 min) -->

## Understand the problem

The first and most fundamental belief is "understand the problem". I've often referred to this as [programming is problem modeling](../posts/2022-02-18-Programming-is-Problem-Modeling.md).
This belief targets the basic nature of and mental model for software development.

The idea is that every aspect of programming from start to finish is about understanding and representing the problem we are solving. Requirements, design, coding, testing, deployment, team cadence, and all other software activities are different angles of understanding the problem and capturing that knowledge in a form that computers can run and humans can understand (i.e. code). Software (the process) is about understanding problem and softare (the artifact) is about representing the problem.

In every situation, pursue problem understanding
- Feeling stuck? clarify what problem you're solving (see [What's you're duck](../posts/Whats-Your-Duck-V2/2022-06-16-0-Intro.md))
- Trying to decide between multiple implementations? How does each serve the problem you're solving
- What tests do I need to write? What are the requirements/ fundamental qualities of the problem you're solving.
- Trying to name a variable, function, class, etc? What role does it serve in the problem it solves
- Organizing your system services? Look for self-contained sub-problems of the overall problem you are solving.
- How often do we release? Agile aims for at least every two weeks. CI/CD says as often as possible; often several times daily. This enables rapid feedback to better understand and adjust to the problem being solved.

*Origins of this belief:* This belief originally stems from Fred Brooks and his writings on essence vs accident. Namely [No Silver Bullets]() and [Design of Design](). The idea was given greater form by [Domain-Driven Design](https://www.amazon.com/dp/0321125215) and the [Software Engineering Body of Knowledge](). [Stop Corrupting Yourself](https://codewithspoon.com/2019/12/stop-corrupting-yourself-test-against-abstractions/) improved how I apply this belief to tests.

## Stable, Incremental, Additive

The second belief, [Stable, Incremental, Additive](../posts/2022-02-25-Stable-Incremental-Additive.md), targets the underpinnings of good software process. 

The idea is to work in small stable increments. Each unit of work is valuable and complete so the dev can stop or change directions at most any time. Together the small units add up to clean systems naturally equipped to evolve over time.

I coined this term in an attempt to unify an idea I saw echoed in many software writings.
This idea shows up many places as emphasis on iterating (like in Code Complete) or to work in short loops (Refactoring, Code That Fits in Your Head). It underlies practices like making small complete commits, keeping pull requests small and focused, TDD's Red-Green-Refactor, Preparatory Refactoring, the Strangler refactoring pattern, and Continuous Integration / Continuous Deployment. 

Stable, incremental, additive serves problem understanding. Working in small complete increments pushes us to break off and understand bits of the problem. It keeps us returning to the problem context. It also equips us for quick feedback cycles and to pivot in response to new understanding without losing in-progress work.

*Origins of this belief:* This belief also stems from Fred Brook and his book [Design of Design](https://www.amazon.com/dp/0321125215). He uses the design tree to describe incremental work cycles, [which I've also written about](../posts/Whats-Your-Duck-V2/2022-06-16-2-Design-Tree-and-Incremental-Progress.md). This idea has been reinforced often in my career, but I'd say [Refactoring](https://martinfowler.com/books/refactoring.html) and [Code That Fits in Your Head](https://blog.ploeh.dk/2021/06/14/new-book-code-that-fits-in-your-head/) are some of the best demonstrations. Refactoring helped me understand true CI/CD and how this value can be practically maximized through the whole lifecycle.

## Self-documenting code

The third belief is Self-Documenting Code. Any documentation outside of the code will easily fall out-of-date and is difficult to keep in sync. The code should communicate the problem and be understandable enough that it is its own documentation as much as possible.

Code is also written first for humans, not computers. The compiler will understand as long as syntax is correct, and will likely micro-optimize better than you will.
The real danger is future developers (including future you) misunderstanding the intent of code and incorrectly modifying the system.

Self-documenting code should be domain-driven in line with "Understand the Problem". The code embodies the problem being solved.
This is somewhat inherent to being self-documenting. Capturing intent (the problem being solved) is necessary so that that future contributors understand and modify the system correctly. Self-documenting code will also become more descriptive as developers better understand the problem and adapt the system.

Some information is hard to communicate effectively in code: like external feedback, contribution guidelines, broad design patterns, etc. 
This information should be kept as [close to the code as possible](https://spencerfarley.com/2022/03/18/levels-of-developer-documentation/).
Comments and readmes are common choices, depending on the scope of the information.

*Origins of this belief:* I first encountered this idea in [Code Complete](https://www.amazon.com/gp/product/0735619670/) and [Pragmatic Programmer](https://www.amazon.com/dp/020161622X). The idea was refined by [Domain-Driven Design](https://www.amazon.com/dp/0321125215) and many other sources through out my career.

## Camping Rule

The fourth belief is the camping rule: always leave the campsite cleaner than you found it. The same applies to code. Quality is a continuous effort made by every contributor.

Remember that this rule in context of the other beliefs. We clean our code by making it self-documenting, by better representing the problem, and also by improving tests as we'll discuss in the next belief. 
Cleaning should also be done in small complete steps on a continual basis. Large rewrites and refactors may sometimes be necessary, but long-term quality can only be maintained through continual care.

*Origins of this belief*: This belief stretches back a long ways. I'm not quite sure of the origin. I first encountered a name for it in [Refactoring](https://martinfowler.com/books/refactoring.html).

## Tighten the Net
<!--TODO: maybe change this to testing is design-->

The fifth belief is Tighten the Net. The image is that of a bug net. If a bug escapes, you tighten the net. If a bug escapes our test suite, we tighten the net by adding automatic tests to ensure that error never makes it to production again.

This also requires that we cast the net in the first place. Our net is our automated test suite. Automated tests are fundamental to system maintainability.

Tests should reflect the requirements (externally visible qualities of the problem being solved), not the system (how we're currently solving the problem).
The latter leads to the fragile test problem. The former improves test suite stability, likelihood of detecting errors with change, and also better represents the motivations
that shaped the system to be the way it is. This ties in well ith understanding the problem and self-documenting code.

*Origins of the belief:* I've valued automated testing since absence of it sunk the first professional project I worked on. Tightening the Net steps from [Pragmatic Programmer](https://www.amazon.com/dp/020161622X). Tests reflecting requirements stems from [Stop Corrupting Yourself](https://codewithspoon.com/2019/12/stop-corrupting-yourself-test-against-abstractions/), which triggered a major reshaping of my testing practices.


## Runner-ups ideas

At this point I was out of allowed point. I think if I had a 6th point I might move into something about Ports and Adapters or otherwise try to cover the general approach to system structure and loose coupling.

I don't regret my choices though. I think these beliefs are the most broadly impactful on my decisions. They underlie most all of my other beliefs, and I can't currently think of any practices I think are more fundamental than these. I'd love to work with developers that aligns with these ideas, even if we differ on other ideas.
<!-- find it interesting that, as much as I love design and architecture, no principles of either made it into my most fundamental ideas of software. -->

## Summary

<!-- TODO: tempting to move testing up. I'd rather have testing in place that have a self-documenting system or even frequent refactoring. On the other hand, it's easier to talk about self-documenting code first, then apply it to how we test. -->
My five most fundamental beliefs about software, as best I can communicate them now are
1. Understand the problem
2. Stable, Incremental, Additive
3. Self-Documenting Code
4. Camping Rule
5. Tighten the Net

All together these ideas establish the nature of software, the basis of quality process, the importance of understandable code, the continuous nature of quality , and the importance of tests in establishing and improving quality.

