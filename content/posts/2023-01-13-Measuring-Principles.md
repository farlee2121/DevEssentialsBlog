---
date: 2023-01-13
tags: [education, principles, measurement, Quality]
title: "Measuring Principles"
---

<!-- TODO: reconsider the title -->

A [previous post](../posts/2023-01-06-Are-principles-SMART.md) got me thinking about how principles can be measured and what value such measures could provide. 
<!--more-->

Principles highlight good or bad qualities to guide decisions. They don't outline prescriptive implementations. As such, principles manifest in diverse ways, many of them subjective. 

A trained individual can generally look at code and decide if it follows a principle (say the [SOLID principles](https://en.wikipedia.org/wiki/SOLID)). But, there generally isn't any runtime metric or automated code analysis that can prove we're following a set of principles. We can measure related outcomes, like churn or change frequency, but those don't requisitely translate into use of principles.

What could we gain from measuring principle usage itself?

I can only think of one answer so far: to gauge how well a team understands principles and is using them to guide decisions. This would allow management to measure the outcomes of educational initiatives.

From this standpoint, we could measure principles with a sort of audit. Experts outside of the team could periodically review a codebase for use of principles. This would likely be a pseudo-random sampling of fairly recent code, including contributions from each member. The expert could count actualized and overlooked applications of the principles. This would set a rough benchmark for how well the team understands principles in their daily work.

Similar measures could be collected by classifying and tracking defects found in code reviews. However, this is susceptible to shared blindspots within a team.

Alternatively, developers could take assessments targeting certain design principles. Perhaps by [detecting defects in work](../posts/2022-06-12-Better-Interviews-with-Defect-Detection.md). This sounds much less invasive, but potentially less descriptive of true application.

There's no real conclusion here. Just some interesting thoughts to tuck away for future consideration and experimentation. Always good to have better education tools.


