---
date: "2018-11-15T00:00:00Z"
tags: [Construction, Dev Essentials, Process]
title: Iteration
aliases:
- /2018/11/15/iteration
---

>   “...the incompletenesses and inconsistencies of our ideas become clear only
>   during implementation.” – Fred Brooks (Mythical Man-Month)

>   “It is widely accepted that creative design is not a matter of first fixing
>   the problem and then searching for a satisfactory solution concept; instead
>   it seems more to be a matter of developing and refining together both the
>   formulation of the problem and ideas for its solution, with constant
>   iteration of analysis, synthesis, and evaluation process between the two
>   “spaces” – problem and solution.” - Nigel Cross and Kees Dorst

<!--more-->

You know that feeling where you write a bunch of code, run it, and it just works? Neither do I.

Software is a creative process. There isn’t one static understanding of the software problems. Rather, we tend to understand the problem better as we understand the solutions. The more time between concept and test, the more the implementation can drift from expectations.

Quick iterations of analysis, synthesis, and evaluation keeps the problem and solution in line. This minimizes design-breaking discoveries and the possible rework. With each iteration assumptions are identified, verified, the solution is expanded, and eventually a suitable design emerges.

This iteration applies across the software lifecycle. Planning, developing, testing, debugging are all design activities. The different stages are just different scopes of iteration. The cycle between planning, doing, and testing is the same.

Small Units of Work
===================

Imagine you are playing a game, but boss fights happen as random encounters. How often would you save your progress? All. The. Time.

It is hard to predict when a difficult problem will arise in development. Writing small and complete chunks of work are analogous to save points, especially if you commit these chunks of work to source control. If you tackle too hard a problem or mess something up, you can always reset to your most recent commit.

Short units of work also force us to break down the problem. To break the down the problem, we must understand it. This leads to clearer, more modular designs. It also leads to clearer statements of work.

Tracer Bullets / MVP
====================

Iteration also applies to larger features and whole applications.

The pragmatic programmer coined the term ‘Tracer Bullets’. The name comes from a kind of florescent bullet. Instead of shooting and hoping, tracer bullets help the gunner evaluate their situation.

The same technique is valuable in programming. Instead of programming and hoping something sticks, programmers can use a ‘tracer bullet’. Program a minimum function concept for the feature and see how it works. Building it and/or putting it in front of users will illuminate how the feature needs to grow.

When applied to systems, this technique is known as a minimum viable product (MVP). The idea is to code a minimum set of features before getting user feedback. Other features can then follow one at a time.

Iterative feature development forces prioritization. Unconstrained, users often think all their asks are important. However, breaking down the work and doing it one bit at a time makes the customer choose what they want first. This sets more
realistic expectations for the developers and lets the customer guide what is important.

Plus, value can be delivered more quickly with less lost time. When priorities shift, little or no code need be discarded because each small increment of work is useful on its own.

Refactoring
===========

Refactoring: “the process of changing a software system in such a way that it does not alter the external behavior of the code yet improves its internal structure” – Martin Fowler

Refactoring is like showering or good hygiene for code. It’s not something you do once a year, you do it every day. Software will tend to disorder over time (software entropy). Mistakes accumulate and code gets left behind as the understanding of the problem changes, our skills grow, or for any number of causes.

Refactoring frequently allows us to bring this code back in alignment and to keep a code base pleasant to work with.

TL;DR
=====

Software is a creative process, so the problem and solution understanding grow together. Quick iterations of analysis, synthesis, and evaluation keeps the problem and solution in line, minimize rework, and deliver value faster.

Iteration happens at all scales of the development process, including planning, coding, maintenance, and testing.

Cross-references
================

If all this sounds familiar, both Scientific Debugging and Test-Centered Development cover specific cases of iteration.

Further Reading
===============

-   Code Complete, Steve McConnell, Ch 34.8

-   Design of Design, Fred Brooks, Ch. 3, 5, 8, 9, 16

-   Agile Principles, Practices, and Patterns, Robert Martin, Chapters 1-6 (He is a signatory of the Agile Manifesto, after all)

-   The Pragmatic Programmer, Andy Hunt and David Thomas, Sections: 3,10,11,31,33
