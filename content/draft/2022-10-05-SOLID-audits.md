---
date: 2022-10-05
tags: []
title: "SOLID Audits"
---

<!-- TODO: reconsider the title -->

A [previous post](../draft/2022-10-05-Are-principles-SMART.md) got me thinking about how principles can be measured and what value such measure could provide. 
<!--more-->

Principles guide decisions. They manifest in many ways, many of them subjective. A trained individual can generally look at code and decide if it follows a principle (say the [SOLID principles](https://en.wikipedia.org/wiki/SOLID)), but there probably isn't any runtime metric or automate code analysis that can prove we're following a set of principles. We can measure related outcomes, like churn or change frequency, but those don't requisitely translate into use of principles.

What might we gain from directly measuring use of principles?

I can only think of one answer so far: to check how well a team understands principles and is using them to guide decisions. This would allow management to measure the outcomes of educational initiatives.

From this standpoint, we could measure principles with a sort of audit. Periodically have experts from outside a team review a codebase for use of principles. This would likely be a sudo-random sampling of fairly recent code, including contributions from each member. The expert could count realized and overlooked applications of the principles. This would set a rough benchmark for how well the team understands principles in their daily work.

Similar measures could be collected by tracking classified defects found in code review. However, this is susceptible to shared blindspots within a team.

Alternatively, developers could take assessments targeting certain design principles. Perhaps by [detecting defects in work](../posts/2022-06-12-Better-Interviews-with-Defect-Detection.md).


