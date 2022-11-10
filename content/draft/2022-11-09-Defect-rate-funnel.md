---
date: 2022-11-09
tags: [Quality, Measurement]
title: Decreasing Defect Funnel
---

Only measuring total defects could incentivize misreporting. How do we measure defects in a way that aligns incentives with desired outcomes?
I don't have a sure answer, but here are some thoughts.

<!--more-->

First off, people tend to optimize for what they're measured by or rewarded for.
If it's easier to produce good metrics by violating the spirit of the measure, be sure that people will do so.
It's not necessarily malicious, it's just the nature of incentives.

I think this applies to measuring defect rates.


## Measuring total defects

Ideally, an application would have no defects. However, that's not realistic.
Setting a zero defect goal will likely incentivize contributors to not report defects if they don't have to.
It could disincentivize proper reporting or any actions that might uncover defects. That's dangerous.

This issues doesn't improve if the defect rate is set at any defect rate higher than zero either.
There might be less pressure to hide defects, but the pressure isn't toward minimizing defects or finding them early

## Setting Better goals

So, how could we measure defects such that incentives align with our goals.

This raises the question: what are the goals?

Ideally
- Zero (or minimal) customer-discovered defects
- Find defects early
- Every contributor is alert for defects
- Close the net: previous defects do not reoccur. We learn from past defects and get better at detecting them
- Balance speed and completeness: Tests especially shouldn't interfere with inner dev loop
- Sustainability: Test effort is relatively level as we continuously expand the system capabilities

## Defect Rate Funnel

These refined goals suggest a few properties for better measures.

We don't want customers to be impacted by defects, but there will be defects. This means we *do* want to find defects during development.

However, we don't want to accidentally incentivize carelessness or even intentional defects in earlier stages of development. 
Setting any specific goals for defects in any particular stage of the development cycle could lead to such incentive gaming.

We can't set specific rate goals for most stages, but we can say something about defect discovery over the whole process.
Discovering defects early as possible is well proven to save time and money in minimized rework.
This suggests defect rates should decrease the further we are in the development lifecycle. 

Visually, you could say defect rates create a cone or funnel narrowing as we move towards release.
This funnel probably shouldn't have any bulges, because that'd indicate certain phases injecting disproportionate numbers of defects.
The end of the funnel is user-reported bugs, and the goal should be zero.

In addition to the funnel, we could also track distance between defect source and defect discovery. A requirement issue discovered in system testing or production is much more serious than a requirement issue discovered in work refinement. Defect distance ideally also forms a funnel, with most defects being discovered close to their creation and progressively fewer further down the pipeline.

## Implied Tracking Qualities

Tracking a defect funnel requires certain changes in tracking
- There must be points before production where defects discover is tracked
- Who discovered the defect must be tracked
- Defect source-to-discovery distance also requires identifying a defect source (e.g. incorrectly specified, construction - misunderstood, construction - failed implementation, etc)

## Funnel checkpoints

The funnel approach requires tracking defects earlier than production. How and when we track those defects greatly impacts both the effectiveness and incentives of the measure.

Intuitively, I'd say defects created and discovered by a contributor within their work cycle should not be tracked. Tracking each refinement in understanding for would be too intensive and probably not very useful.

Defects created in an earlier lifecycle stage and discovered in a later stage should be reported though. This also is also relatively convenient for tracking because different lifecycle stages often have different contributors with different work tracking systems (e.g. product runs discovery, devs construction, devops monitoring). Defects can be raised in the work board of team that originated.

This also suggests that there should be some handoff that transitions responsibility for defects. 

Semi-standard transitions already exist for handoffs between teams and lifecycle stages
- Requirement refinement: the discovery -> development handoff
- Code review: the coding -> integrated code
  - perhaps separate automated code review checks (integration tests, security audits, etc)
- Deployment tests (e.g. canary tests, staging heathchecks, etc): the integrated -> deployed handoff
- Monitors & internal user reporting: deployment -> in-use

I'm still fuzzy on how ownership should be defined around these checkpoints to incentivize both teams to be vigilant 
for errors.

## Conclusions
I think this decreasing defect rate funnel model for defect measurement has clear advantages over single-source defect reporting,
especially for aligning incentives with quality goals. 

I imagine these thoughts are not original. It's probably part of why semi-standard handoffs processes already exist between
teams at different stages. Elements of this sort of measure are also evident in Formal Inspections or in root cause analysis processes.

