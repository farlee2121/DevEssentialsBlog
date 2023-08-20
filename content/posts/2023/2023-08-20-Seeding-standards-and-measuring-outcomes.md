---
date: 2023-08-20
tags: [Leadership, Standards, Measurement, Quality]
title: Seeding Standards and Measuring Development Outcomes
---

I've thought a lot about how to measure development outcomes, but never been satisfied with my answers. 
I think I may have a bit more clarity thanks to a new perspective.
<!--more-->

Specifically, I was thinking about how to lead an underperforming team into good practices even if they don't think their practices have any issues. I'll recount my discovery process here.

## Construx and Clear Standards

I should clarify that I'm not talking about any specific underperforming team. Rather, the [Waterfall vs Agile](https://www.youtube.com/watch?v=sGlydy4dovk&ab_channel=ConstruxSoftware) talk by Construx got me thinking about how practices apply to different team compositions. 

The Construx talk mentions clear standards (specifically a [career ladder](https://www.construx.com/professional-development-ladder/)) as key to lifting up underperforming teams. The standard serves as a clear benchmark that contributors can compare their efforts against.


## Standards and Ownership

<!-- I didn't realize ADRs had such broad support
- https://adr.github.io/
- https://docs.aws.amazon.com/prescriptive-guidance/latest/architectural-decision-records/adr-process.html
- https://cloud.google.com/architecture/architecture-decision-records
 -->

I'm tracking with their point so far. I've spent quite a bit time thinking about career ladders, Architectural Decision Records, process checklists, and similar team standards. But, I've also learned through experience that team buy-in is often more critical to success than any particular technique. If the implementers don't understand the goal, it's easy to violate the spirit of a technique while following the outer form simply out of obligation. A team that doesn't feel ownership over a standard is also unlikely to refine standards as their needs change. Stagnant standards quickly become cruft.

However, it's unreasonable to expect an underperforming team to create a good process standard out of nowhere. They probably wouldn't be underperforming if the group had a great grasp on process. I could help them refine the process over time, but that can be very intensive and even demoralizing if they don't start from a decent spot.

So, how could I encourage a team to define and own a decent starting process without dictating it to them?

Perhaps I could give examples. I'm sure everyone can agree that it's demoralizing and unpleasant to reactively put out fires, even more so when they happen outside normal working hours. Whatever we choose it should strive to limit emergencies that force our hand.

Hmm... that's not a process standard, that's a value and an outcome.

## Outcome-driven Direction

The way I've learned to delegate is to set measurable outcomes and leave the rest to the implementer. Such techniques for management include [EOS rocks](https://www.eosworldwide.com/clarity-break/rocks-for-all) and [OKRs](https://en.wikipedia.org/wiki/Objectives_and_key_results). 

The problem is finding the right measures. My flubbed process example got me thinking down a good path.

Minimizing emergencies is a sub-measure of change failure rate, one of four key measures identified by the [DevOps Research and Analysis project](https://dora.dev/quickcheck/). The full list is
- change failure rate 
- time to restore
- release lead time
- release frequency 

These are good. They describe how quickly, frequently, and reliably a team can release low-defect work. These measures are also backed up by long-term rigorous research.

There's still some things missing though. There needs to be some kind of user-centric measure that provides insight into the value we deliver. Velocity can be tempting here, but has proven itself a poor measure. Instead, [Net Promoter Score](https://en.wikipedia.org/wiki/Net_promoter_score) has become the standard for user satisfaction.

I'd also like to know how the team feels. Even with great quality, pace, and user satisfaction, the outcome is still bad if the team is unhappy. Well, that has an emerging standard too: [Employee Net Promoter Score](https://lattice.com/engagement/enps).


These might not cover all concerns for all teams, but the coverage is surprisingly good. They track employee and user satisfaction and how quickly, frequently, and reliably the team can release low-defect work. Each measure is simple, objective, and well researched. 
The measures also persist as a guidepost for refining process over time and holding the team accountable for what their standard achieves.

Perhaps when I've considered quality measures before I got too mired in details of a specific practices, teams, or systems. I'll be interested to see this leads. At the least, it's a good foundation for discussion.

