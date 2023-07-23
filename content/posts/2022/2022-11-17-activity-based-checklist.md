---
date: 2022-11-17
tags: [Checklist, Software Engineering, Process]
title: "Activity-based Developer Checklist"
---

This is my attempt at short actionable checklists to guide key moments in software process.
<!--more-->

I previously wrote a [software checklist based on increments of time](../../posts/2022/2022-01-21-Development-Cycles-Checklist.md).
I was reading more about checklists and noticed many are based on key events in some process. I later learned these key moments are called *pause points*.

Here's my attempt to identify key process moments (pause points) for software, and what is most important to verify at that juncture.
I also aimed to keep the list very short.

## The Checklist
Commiting Code
  - [ ] Is the code well covered with automated tests?
  - [ ] Is the commit only a single focused change? (e.g. a rename, a small refactor, a preparatory refactor, a small behavior change and it's tests)
  - [ ] Is the commit message clear and descriptive of context for the change?
  - [ ] Could I pull request / integrate my work?
  - [ ] Have I pushed my changes?

Integration
  - [ ] Does the code pass all automated checks?
  - [ ] Does the work satisfy acceptance criteria?
  - [ ] Is the completed work small, cohesive, and production stable?
  - [ ] Does the pull request include all context a reviewer needs to understand the change?
  - [ ] Have all required reviewers approved?
  <!-- - [ ] is any new behavior covered by tests? -->

Work planning
  - [ ] Does this work have clear acceptance criteria?
  - [ ] Is the scope of this work estimated and less than 1 week?
  - [ ] Are upstream dependencies completed?
  - [ ] Does the developer have everthing needed to execute the task (information, experience, support)?
<!-- Access to domain experts to clarify work? -->

Deployment
  - [ ] Is the deployment automated?
  - [ ] Do we have a recovery strategy?
  - [ ] Do we have measures to detect change failure?
  - [ ] Have any migrations been validated and proven backwards-compatible?
  - [ ] Has this code passed robust automated checks, review, acceptance criteria, and been merged into trunk/main?


## Thoughts
I was impressed how easily this checklist came together and how much it covers.

There is certainly much I think about that is not covered by this checklist. 
However, I think I would be comfortable supporting most code that can pass this checklist.
It promotes small units of work, testing, review, and safe deployment. 

This list is also pretty low-controversy. Almost every item is generally accepted good practice. 
Many are well proven indicators of team performance.

I might potentially add documentation and self-documentation in various places.

I would also consider additional checklists for team process events like stand-up and retrospective.
However, those checklists would be oriented for the engineering manager or project manager.

<!-- Achieving these checklist would likely require training. For example, learning effective design and testing practices that enable those small units of work. 
But, the design is probably fairly good if it can sustain those small increments of work.
The checklist doesn't teach all necessary skills, but it does put up guard rails to continue pushing toward good practice. 

Trying to say the checklist isn't sufficient to be an expert, but it should be good pressure toward expert practices
-->

<!-- Standup is mostly about proactively identifying issues. It might look Something like this

Standup
  - [ ] Has every developer been able to complete an increment of work in the last day (could be a design doc progress, code commits, recorded measurements, etc)?
  - [ ] Is any work over it's estimate?
  - [ ] Have any unexpected blockers, complexities, or unknowns been discovered that endanger completion of work?
  - [ ] Are any developers feeling unconfident about their work -->