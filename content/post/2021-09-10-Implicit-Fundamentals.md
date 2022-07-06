---
date: "2021-09-10T00:00:00Z"
tags:
- SWEBOK
- Design
- Fundamentals
---

# Implicit Fundamentals

I recently gave a presentation on the Software Engineering Body of Knowledge focused on road maps for software learning.
This involves much philosophy on how we think about software. The conversation surfaced many crucial fundamental views that often go unstated.
I've enumerated them here.

- There is no perfect solution, just a bullseye of good enough
- There is no general solution to expressing yourself clearly
  - Corollary: There is no simple way to find the right problem to solve. It takes continual refinement through all stages of software development
  - See [No Silver Bullets](https://www.cs.unc.edu/techreports/86-020.pdf)
- Understanding the problem is one of the most important responsibilities of a developer
- Change in requirements is unavoidable and actually good
  - Corollary: There is no perfect set of requirements
- Critical Thinking -> try to disprove your ideas
  - Corollary: Testing can't prove a system works. They can only show existence of errors. The posture for testing is to disprove that your system works. At some point you decide you have enough evidence that it works and accept remaining risk (Extra note: the risk can be quantified. One such technique is mutation tests)
- Major artifacts of the software process (requirements, design, code) are restatements of the original problem
  - Corollary: A significant portion of quality is how well our artifacts communicate the real-world problem
  - Further reading: [SWEBOK Transform View](../post/2021-08-13-Swebok-transform-view.md)
- Going fast is understanding the customer (some disagreement about how to best achieve that)
  - Corollary: Cheapest feature is the one you don't write (from better understanding why)
  - Further Reading: [Going Fast is Going Well](../post/2021-01-29-Going-Fast-is-Going-Well.md)
- Software lifecycle phases overlap significantly
- Different classes of problems require different amounts and kinds of process


Theres was also significant discussion on the difficulty of choosing the right amount of process for the given problem. Some key critical thinking skill to guide such decisions are
- [SWOT Analysis](https://en.wikipedia.org/wiki/SWOT_analysis)
- Threat matrixes ([example](../../static/post-media/threat-matrix.png))
