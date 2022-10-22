---
date: 2022-10-21
tags: []
title: "Five Foundational Beliefs"
---

A friend asked me to summarize what I believe about software in five points or less. These are those five points.
<!--more-->

<!-- TODO: I have a somewhat odd mix of nouns and imperatives. I could also use better analogies for most of the beliefs. -->

## Understand the Problem

<!-- TODO: change to clarify the problem? -->
The first and most fundamental belief is "understand the problem". I've often referred to this as [programming is problem modeling](../posts/2022-02-18-Programming-is-Problem-Modeling.md).
This belief targets the basic nature of and mental model for software development.

Every aspect of programming is about understanding and representing the problem we are solving. Requirements, design, coding, testing, deployment, team cadence, and all other software activities are different angles of understanding the problem and capturing that knowledge in a form that computers can run and humans can understand (i.e. code). Software process is about understanding the problem and softare is about representing the problem.

In every situation, pursue problem understanding
- Feeling stuck? [Clarify what problem you're solving](../posts/Whats-Your-Duck-V2/2022-06-16-0-Intro.md)
- Trying to decide between multiple implementations? Weigh how each serves the problem you're solving
- What tests do I need to write? Identify observable requirements of the problem you're solving
- Trying to name a variable, function, class, etc? Describe what the component means to the problem it solves
- Organizing your system services? Look for self-contained sub-problems of the overall problem you are solving
- How often do we release? Agile aims for at least every two weeks. CI/CD says as often as possible; often several times daily. Both seek rapid feedback to better understand and adjust to the problem being solved

## Stable, Incremental, Additive

The second belief, [Stable, Incremental, Additive](../posts/2022-02-25-Stable-Incremental-Additive.md), targets the underpinnings of good software process. 

- Stable: existing work is rarely effected by changes in other units of work
- Incremental: value can be delivered in small and complete chunks
- Additive: the chunks don’t just replace each other, the value adds up over time

Each unit of work should be valuable and complete so the dev can stop or change directions at most any time. Together the small units add up to clean systems naturally equipped to evolve over time.

I coined this quality set in an attempt to unify an idea I saw echoed in many software writings.
This idea often manifests as emphasis on iterating (like in Code Complete) or to work in short loops (like in Refactoring or Code That Fits in Your Head). It underlies practices like 
- making small complete commits
- keeping pull requests small and focused
- Red-Green-Refactor from [TDD](https://en.wikipedia.org/wiki/Test-driven_development)
- Preparatory Refactoring
- Strangler refactoring pattern
- Continuous Integration / Continuous Deployment

Stable, incremental, additive serves [Understand the Problem](#understand-the-problem). Working in small complete increments pushes us to break off and understand bits of the problem. It keeps us returning to the problem context. It also equips us for quick feedback cycles and pivoting in response to new understanding without losing in-progress work.

## Self-Documenting Code

The third belief is Self-Documenting Code. Code is written for humans first, then computers. The code should communicate the domain and lead developers into deeper understanding of the problem.

Understandable code is essential to effective maintenance. Programs quickly become complex and expansive. Any documentation outside of the code will easily fall out-of-date and is difficult to keep in sync. The faster developers can understand the system, the faster and more safely they can modify the system.
The compiler will understand code as long as syntax is correct, and will likely micro-optimize performance better than you will. The real danger is future developers (including future you) misunderstanding the intent of code and incorrectly modifying the system.

Some information is hard to communicate effectively in code: external feedback, contribution guidelines, broad design patterns, etc. 
This information should be kept as [close to the code as possible](https://spencerfarley.com/2022/03/18/levels-of-developer-documentation/).
Comments and readmes are common choices, depending on the scope of the information.

Self-documenting code aligns with both [Understand the Problem](#understand-the-problem) and [Stable, Incremental, Additive](#stable-incremental-additive). The code embodies the problem understanding in its naming and structure. Self-documenting code also builds incrementally over time. Developers better understand the problem, adapt the code, the code become more descriptive, this leads to better understanding and the cycle repeats. 

## Camping Rule

The fourth belief is the camping rule: always leave the campsite cleaner than you found it. The same applies to code. Quality is a continuous effort made by every contributor.

Remember this rule in context of the other beliefs. We clean our code by making it self-documenting, by better representing the problem, making change points flexible, and also by improving tests (as we'll discuss in the next belief). 
Improvements should also be done in small complete steps on a continual basis. Large rewrites and refactors may sometimes be necessary, but long-term quality can only be maintained through continual care.

## Tighten the Net
<!--TODO: maybe change this to testing is design-->

The fifth belief is Tighten the Net. The image is that of a bug net. If a bug escapes, you tighten the net. If a defect escapes our test suite, we tighten the net by adding automated tests to ensure that error never escapes to production again.

This also requires that we cast the net in the first place. Our net is our automated test suite. Automated tests are fundamental to system maintainability.

Tests should reflect the requirements (externally visible qualities of the problem being solved), not the system (how we're currently solving the problem).
The latter leads to the fragile test problem. The former improves test suite stability, likelihood of detecting errors with change, and also better documents the motivations
that shaped the system to be the way it is. This ties in well with Understanding the Problem and Self-Documenting Code. Requirements-focused tests also tend to be Stable, Incremental, Additive since new requirements usually source from work items (which should be focused in scope) and requirements replace each other less frequently than do implementations.

## Runner-ups ideas

At this point I was out of allowed point. I think if I had a 6th point I might move into something about Ports and Adapters or otherwise try to cover the general approach to system structure and loose coupling.

I don't regret my choices though. I think these beliefs are the most broadly impactful on my decisions. They underlie most all of my other beliefs, and I can't currently think of any practices I think are more fundamental than these. I'd love to work with developers that aligns with these ideas, even if we differ on other ideas.
<!-- find it interesting that, as much as I love design and architecture, no principles of either made it into my most fundamental ideas of software. -->

## Summary

My five most fundamental beliefs about software, as best I can communicate them now are
1. Understand the problem
2. Stable, Incremental, Additive
3. Self-Documenting Code
4. Camping Rule
5. Tighten the Net

All together these ideas establish the nature of software, the basis of quality process, the importance of understandable code, the continuous nature of quality, and the importance of tests in establishing and improving quality.

