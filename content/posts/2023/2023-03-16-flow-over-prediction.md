---
date: 2023-03-16
tags: [Continuous Integration, Continuous Deployment, Estimation]
title: Smooth iteration over improved prediction
aliases:
- /draft/flow-over-prediction/
---

I've been thinking about the estimation books sitting on my shelf. Why haven't I read them? For some reason they don't seem as critical as other reads. Estimation may be taking a back seat to improved iterative process.
<!--more-->

<!-- Would estimation be more important to other groups?  
Realized that estimation may have reduced in importance in software.-->

Iterative process is reaching its maximum with the [Continuous Integration / Continuous deployment (CI/CD)](https://en.wikipedia.org/wiki/CI/CD) movement. It's not just about having an automated build and release. CI/CD is intended to maximize feedback loops and refine problem understanding in stable increments. It's about [iterating quickly and sustainably](../../posts/2022/2022-04-24-CI-and-Refactoring.md) with units of value that users can experience. 
<!-- Doing challenging activities (like deploys and merges) more frequently pushes us to solve -->

This fits well with how I view the nature of software. Software is problem modeling. [Progress is measured in understanding and solved user needs](../../posts/2021/2021-01-29-Going-Fast-is-Going-Well.md), not in code released or effort expended. 

Quick stable feedback loops render estimates less important, since we're always delivering the next most important work as quickly as we can then re-evaluating priorities in light of the new feedback.

This doesn't justify sloppy or rushed work. We must do work in a way that is stable enough to live on in production and be iterated on again and again. We must consider the impacts our work has on system complexity, quality, and future ability to iterate. This means keeping a clean work environment, as Robert Martin would say. This usually means keeping errors down, keeping code clean and understandable, keeping a robust test suite, etc.

The more frequently the team completes stable increments, the more readily they can pivot to new knowledge. Conversely, rushed work and un-curated workspaces create friction to adapting.

I've heard that military special forces say

> Slow is smooth. Smooth is fast.

Slow in this case doesn't mean inefficient. It means we should never be rushed. We should never move so fast we lose sight of the end goals. By taking time to be deliberate and measured, we make higher quality decisions and we move faster than if we hurry.

Cutting quality for short-term gains is not smooth. Shortcuts create friction that effect performance and build bad habits. The key to going fast is a sustainable and consistent process, a smooth process.

Phrases used with CI/CD include "shift pain left" or "if it hurts, do it more often". Doing challenging activities like reviews, merges, and deployments more frequently forces us to invest in those processes and smooth the experience. You can't rely on manual deployment steps or extended manual testing if you deploy several times daily. These processes need to find errors fast and with as much automation as possible. In a sense, CI/CD extends ["tightening the net"](../../posts/2022/2022-10-21-Five-Foundational-Beliefs.md#tighten-the-net) beyond testing into other key processes. The goal is to permanently improve agility and safety by refining process in sustainable ways.

[DORA](https://www.devops-research.com/research.html) is one of the longest and most measured studies on software team performance. It identified four key measures that predict team performance 
- Lead time (from review passed to deployed)
- Deploy frequency
- Mean time to recovery (how long to fix broken things)
- Change failure rate

None of these differentiating measures relate to long-term planning. They measure how we approach work. How smooth our continuous process is.

I want to be clear that I'm not against estimation or long-term planning. Smooth process requires a prioritized pipeline, which requires a sense of the bigger picture and cost-benefit tradeoffs. It's more that estimation and planning milestones takes a back seat to how ongoing work achieves understanding, agility, and sustainability. The plan serves the work, the work doesn't serve the plan.

Of course, I may be missing the perspectives or contexts that benefit most from estimation.

In conclusion, I think estimation has reduced in importance because we've realized good estimation is not a forcing function of team performance. Most business software systems experience continual change. We are continually refining the problem. Thus the driver of performance is the quality of our processes and feedback. It is more important to focus on smooth increments of progress than to better predict the future.