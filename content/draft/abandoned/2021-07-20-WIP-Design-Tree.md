---
date: "2021-07-20T00:00:00Z"
draft: true
tags:
- Design Process
- Ducks
---

<!-- Outmoded by What's your duck post -->

<!-- TODO: 
- add threat matrix
- change name. Incremental design process?
- reference how I typically capture this process in a duck doc
- hmm. will probably merge these at some point -->

> "It's useful to think of the architectural design process from a decision-making perspective rather than from an activity perspective" - SWEBOK 2.3.4


The decision and transform views dovetail nicely into my favorite model of the software process.

I see the overall process as a spectrum from unknown to known. Each of the transforms is a checkpoint in how much known information we've uncovered.

![Design spectrum, unknown -> known](../post-media/SWEBOK-transform/spectrum.png)

Known information can be of all kinds
- User expectations
- Expected tradeoffs between conflicting expectations
- How to map messy expectations into precise process
- Key segments of a process
- How the processes and expectations are stated with code
- Economical decisions (build vs buy, can expectations be loosened to shorten timelines)
- Measuring how well the solution actually meets expectations

Each of these choices can be modeled into a *Design tree*. The design tree represents all possible decisions that can be made. A solution is some leaf, or furthest node, in any particular path of the tree.

Progress along the spectrum is measured in how many decisions we've made toward a single leaf (full solution) that meets all of the requirements. This kind of progress is hard to track quantitatively, but it does illuminate some significant consequences for how we make decisions.

Humans naturally gravitate toward two approaches that don't work in practice
- Depth-first approach: Trying to jump straight to full-solutions is likely to throw away lots of work
- Breadth-first approach: There are nearly infinite possibilities. We can't evaluate them all

The optimal process is a repeated loop of limited-choice comparisons.
- Identify some key decision 
- Enumerate a few likely alternatives
- Evaluate alternatives in enough depth to make a decision
- Lock in a choice
- Identify the next key decision on that path

Decisions naturally get more fine grained as the loop locks in more decisions. Some decisions will inevitably be wrong, but we throw away minimal work because we can back up to the closest key decision that still works.

![search pattern view](../post-media/SWEBOK-transform/search-methods.drawio.svg)
