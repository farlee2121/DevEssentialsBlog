---
date: 2022-11-20
tags: []
title: Smooth iteration over improved prediction
---

I've been thinking about the estimation books sitting on my shelf. Why haven't I read them? They don't seem as critical as other reads. Estimation may be taking a back seat to improved iterative process.
<!--more-->

<!-- Would estimation be more important to other groups?  
Realized that estimation may have reduced in importance in software.-->

Iterative process is reaching its maximum with the [CI/CD](https://en.wikipedia.org/wiki/CI/CD) movement. It's not just about having an automated build and release. CI/CD is intended to maximize feedback loops and refine problem understanding in stable increments. It's about [iterating quickly and sustainably](../posts/2022-04-24-CI-and-Refactoring.md) with units of value that users can experience.

This fits well with how I view the nature of software. Software is problem modeling. [Progress is measured in understanding and solving user needs](../posts/2021-01-29-Going-Fast-is-Going-Well.md), not in code released or effort expended. 

Quick stable feedback loops render estimates less important, since we're always delivering the next most important work as quickly as we can then re-evaluating priorities in light of the new feedback.

This doesn't justify sloppy or rushed work. We must do work in a way that is stable enough to live on in production and be iterated on again and again. We must consider the impacts our work has on system complexity, quality, and future ability to iterate. This means keeping a clean work environment, as Robert Martin would say. This usually means keeping errors down, keeping code clean and understandable, keeping a robust test suite, etc.

The more frequently the team completes stable increments, the more readily they can pivot to new knowledge. Conversely, rushed work and un-curated workspaces create  friction to adapting.

I've heard that military special forces say

> Slow is smooth. Smooth is fast.

Slow in this case doesn't mean inefficient. It means we should never be rushed. We should never move so fast we lose sight of the end goals. By taking time to be deliberate and measured, we make higher quality decisions and we move faster than if we hurry.

Cutting quality for short-term gains is not smooth. Shortcuts create friction that effect performance and build bad habits. The key to going fast is a sustainable and consistent process, a smooth process.

<!--  -->

[DORA](https://www.devops-research.com/research.html) is one of the longest and most measured studies on software team performance. It identified four key measures that predict team performance 
- lead time (from review passed to deployed)
- Deploy frequency
- Mean time to recovery (how long to fix broken things)
- change failure rate

None of these differentiating measures relate to long-term planning. They measure how we approach work. How smooth our continuous process is.

I want to be clear that I'm not against estimation or long-term planning. Smooth process requires a prioritized pipeline, which requires a sense of the bigger picture and cost-benefit tradeoffs. It's more that estimation and planning milestones takes a back seat to how ongoing work achieves understanding, agility, and adaptability. The plan serves the work, the work doesn't serve the plan.

In conclusion, I think estimation has reduced in importance because we've realized good estimation is not a forcing function of performance. Most business software systems respond to continual change. We are continually refining the problem. Thus the driver of performance is the quality of our processes. It is more important to focus on smooth increment progress than to better predict the future.