---
date: "2021-11-26T00:00:00Z"
tags: [Quality, Governance, Testing, Measurement]
title: Governance is a mine of Quality techniques
aliases:
- /2021/11/26/governance-and-multiple-verification
---

I recently put together that multiple verification (the quality technique) is effectively the same and as [governance](https://en.wikipedia.org/wiki/Corporate_governance) techniques. It's about managing the level of trust and risk we accept from individual contributors.
<!--more-->

<!-- Aiming for "low-trust" may sound bad, but good governance doesn't mean we don't trust, it means we don't *have to*.
 -->


Testing and quality measure desired outcomes. Any individual measurement might be flawed. Equipment might be bad, conditions might be bad. All kinds of errors could happen. Scientists and engineers can mitigate this error with multiple measurements and measurements through multiple means. If the measurements agree, then we trust the result. In terms of development, the measures are usually tests.

The same applies to process. Process and people can go awry. The way we mitigate contributor error or malice is by having multiple people involved. This happens at all kinds of levels from informal to rigorous: pair programming, peer reviews, audits, pull request policies, etc.

Consider the company source control. No single developer should be able to simply delete company source control. Such capability could sink the company. It's a huge risk to the company and a liability for the developer who needs to control their credentials. Instead, deleting a repository could require approval from multiple people, or have a separately controlled recovery mechanism. This reduces risk for everybody.

These kinds of practices are older and much more general than programming. They are known as [governance](https://en.wikipedia.org/wiki/Corporate_governance).

Governance is, of course, a trade-off. Governance naturally tends to slow process down, but reduces severity and frequency of errors. Fewer controls allow contributors to move independently, which usually means faster. 

This tradeoff between speed and safety is really a decision of about risk. How much we are willing to tolerate possibility of failure for increased throughput. 

![governance risk vs speed spectrum](../../../static/post-media/Governance-and-Multiple-Verification/risk-spectrum.drawio.svg)

A spectrum of governance techniques have evolved for many levels of speed vs trust. To name a few 
- Requiring multiple approvals
- Committees & boards
- Voting systems 
  - Quorum
  - Veto
  - Veto override
  - 2/3rds majority



Deciding how much governance is needed for a given process is tricky, but a threat matrix is your best friend.

![threat matrix](../../../static/post-media/threat-matrix.png)

In general,
- more contributors increases probability some contributor will err
- public and permanent actions tend to be riskier
  - conversely internal and temporary decisions are less risky 
- safety-critical decisions should be considered high risk

Side note, multi-factor authentication is also an application of governance. It mitigates trust that a single data point really verifies a user's identity. I wasn't sure how to incorporate it in the flow, so I put it awkwardly here at the end.

## Conclusion

I've unknowingly been using governance techniques for years. Such process is common in programming whether we call it such or not. Making an explicit connection to governance opens up a well-developed trove of techniques for managing software quality and process effectively!