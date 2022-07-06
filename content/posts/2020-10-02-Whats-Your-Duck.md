---
date: "2020-10-02T00:00:00Z"
tags:
- Design thinking
- TDD
- Reading Notes
---

# What's Your Duck?

The Pragmatic Programmer tells the now legendary tale of talking with a rubber duck to overcome programming problems. This sounds a bit silly, but programming is a design activity all the way down to the source code implementations. Problems and possibilities often won't reveal themselves until we try to communicate them. Every programmer needs a duck. So what is yours?

> Update 2022-06-03: I've published a [refined version](../posts/Whats-Your-Duck-V2/2022-06-16-0-Intro.md) of this idea

My duck is usually a text document. What I do isn't so formal as a requirements spec, design spec, or architecture document. It's not constrained to one phase of software process, or even to software at all. 

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
 - **Primary goals**: Must haves. These must be addressed in order for the problem to be considered solved
 - **Desiderata**: Nice to haves or secondary goals. Not essential, but desired.
 - **Constraints**: Not essential to the problem in general, but must be met in this case. Things like budgets, timelines, and team limitations. Two available developers is not a general property of building a recipe app, but may be all you have.
 - **A utility function**: Some way of evaluating solutions against goals and constraints

Jumping to full solutions is a lot of wasted work if the one you pick doesn't meet the goals and constraints. At the same time, considering every alternative before moving to the next decision is impossible.

Realistically, the designer uses a pseudo-depth-first approach.
 - Choose a key decision branch
 - Identify likely solutions
 - Consideration the alternatives deeply to choose between design groups.
 - Narrow to the best design and repeat
  
The best design possibilities are iteratively narrowed and more is known about the final design. This often informs the goals and constraints, in essence refining our definition of the problem that we are solving.

## Practical Adaptation

I've spent a lot of time in small team and startup environments. I often had no one pair program or discuss ideas with to refine them. 

Thus, I started pairing with a text document. This helped be to keep track of my ideas while simultaneously documenting my design considerations. The duck doc could be cleaned up and condensed if the task needed a more permanent documentation for other contributors.

## Duck Doc Basics

The standard outline is 
- Motivation
- Requirements
  - Goals
  - Constraints
- Knowns
- Unknowns (that I likely need to figure out)
- Solution Explorations

Duck docs always start with a through compilation of the requirements. Any solution is useless if you don't first identify the right problem to solve. An explicit problem statement allows the problem to be refined and debated. This exposes differences in understanding whereas unstated assumptions often go unchecked until a solution is already complete. I highly recommend chapter 9 of Design of Design: User Models - Better Wrong Than Vague.

Identifying knowns and unknowns helps me to orient. If there are too many unknowns then I need to back up to an earlier design phase. If there are many knowns, I may be able to skip to a more detailed phase of design. Knowns and unknowns also prime my lines of thought for solution exploration.

Solution exploration looks different for every task. The general idea is to iteratively fill in your most important unknowns and narrow your choices. By the time you've run out of unknowns, the task is done and the problem solved. Iteratively tackling the most important unknowns help to minimize wasted effort from working on solutions that don't meet your goals.

Here are some common considerations by task type

**Requirements**
- Who are we building this for?
- Why do they want it?
- What must the software do to meet their goal?
- When: what time frame is a solution relevant in?
- How much is it worth to them?
- Is the trio of what, when, and cost feasible?

**Architecture**
- Scale expectations
- Reliability and availability expectations
- Security expectations
- Team boundaries
- Domain/Non-Domain solution properties
- Volatility / likely changes
- Key events

**Feature Design**
- Timeline vs quality expectations
- Is it a Domain or Non-domain feature?
- What code already exists?
- What are the high level operations that allow me to read the code naturally?
- What can libraries solve for me, and how can I limit their scope in my system?

**Test Engineering**
- Threat matrix, how likely is an issue versus how impactful
- What are the reliability and quality expectations?
- What data do we have on previous errors? What components have the highest defect rates?
- Who might attack the system and why?

## What's Your Duck?

Duck docs have been an invaluable tool for me to organize my thoughts. Communicating flushes out issues earlier and creates a persistent record for future collaboration or extension. 

There are certainly many viable alternatives: pair programming, inspections, walk-throughs, design specs, actual rubber ducks, and more. What's your duck?
