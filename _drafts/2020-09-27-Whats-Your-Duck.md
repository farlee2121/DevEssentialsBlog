---
layout: post
tags: [Design thinking, TDD, Reading Notes]
---

# What's Your Duck?

The Pragmatic Programmer tells the now legendary tale of talking with a rubber duck to overcome programming problems. This sounds a bit silly, but programming is a design activity all the way down to the source code implementations. Problems and possibilities often won't reveal themselves until we try to communicate them. Every programmer needs a duck. So what is yours?

My duck is usually a text document. What I do isn't so formal as a requiments spec, design spec, or architecture document. It's not constrained to one phase of software process, or even to software at all. 

Still, I use this technique daily. It needed a name, and so I call them *duck docs*.  

## Origins

My philosophy of programming is greatly influenced by Fred Brooks. Some of the earliest programming books I read were Mythical Man-Month and Design of Design.

In Mythical Man-Month, Fred Brooks muses

> “The programmer, like the poet, works only slightly removed from pure thought-stuff. He builds his castles in the air, from air, creating by exertion of the imagination.”

Even so
> “For the human makers of things, the incompletenesses and inconsistencies of our ideas become clear only during implementation.”

Programming is such a flexible medium that our designs are pretty much only limited by our imagination. We need constraints and communication to refine our ideas. 

In Design of Design, Brooks outlines the core process of all design activities.

First, identify
 - Primary goals (must haves)
 - Desiderata (nice to haves)
 - Contraints (not goals, but have to be met)
 - A utility function (for evaluating solutions against goals and contraints)

The designer then uses a pseudo-depth-first consideration of solutions to choose between design groups. The best design possiblilities are iteratively narrowed and more is known about the final design. This often informs the goals and constraints, in essence refining our definition of the problem that we are solving.

## Practical Adaptation

I've spent a lot of time in small team and startup environments. I often had no one pair program with or discuss ideas with to refine them. 

Thus, I started pairing with a text document. This helped be to keep track of my ideas while simultaneously documenting my design considerations. The duck doc could be cleaned up and condensed if the task needed a more peranent documentation for other contributors.

## Duck Doc Basics

The standard outline is 
- Motivation
- Requirements
  - Goals
  - Constraints
- Knowns
- Unknowns (that I likely need to figure out)
- Solution Explorations

Duck docs always start with a through compilation of the requirements. Considering solutions is useless if you don't understand the problem being solved. The problem statement needs to be explicity in order to make consistent judgments and so that it can be refined. Any gaps that are left implicit will be filled with assumptions, often leading to the solving the wrong problem. 
<!-- todo: need to consolidate these sections -->
I don't mean to promote waterfall-ish requirements. The point is a clear communication of the problem that all stakeholder can read and know their trying to solve the same problem. Then gaps can be mended instead of unnoticed. I highly recommend chaper 9 of Design of Design: User Models - Better Wrong Than Vague.

Solution exploration looks different for every task. The general idea is to iteratively fill in your most important unknowns and narrow your choices. By the time you've run out of unknowns, the task is done and the problem solved. Iteratively tackling the most important unknowns help to minimize wasted effort from working on solutions that don't meet your goals.

Here are some common considerations by task type

**Requirements**
- Who are we building this for?
- Why do they want it?
- What must the software do to meet their goal?
- When: what timeframe is a solution relevant in?
- How much is it worth to them?
- Is the trio of what, when, and cost feasible?

**Architecture**
- Scale expectations
- Reliability and availability expections
- Team boundaries
- Domain/Non-Domain solution properties
- Volatility / likely changes
- Key events

**Feature Design**
- Timeline vs quality expectations
- Is it a Domain or Non-domain feature?
- What code already exists?
- What are the high level operations that allow me to read the code naturally?
- What can libraries solve for me, and what components do I need to hide them from?

**Test Design**
- Threat matrix, how likely is a issue versus how impactful


## What's Your Duck?

Duck docs have been an invaluable tool for me to organize my thoughts. Communicating the problem and solutions identifies issues earlier and creates a persistent record for future collaboration or extention. 

There are certainly many viable alternitives: pair programming, inspections, walk throughs, design specs, actual rubber ducks, and more. What's your duck?
