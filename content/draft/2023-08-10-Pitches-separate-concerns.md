---
date: 2023-08-10
tags: [Shape Up, Requirements, Project Management]
title: Pitches Separate Concerns For Smoother Cross-level Coordination
---
<!-- TODO: The title might need work -->

Shape Up's [Pitches](https://basecamp.com/shapeup/1.5-chapter-06) reduce the distance between managers and implementers while actually giving both sides more control over what's most important to them.

<!--more-->

<!-- 
Shape Up's [Pitches](https://basecamp.com/shapeup/1.5-chapter-06) define one artifact for both managers to pick projects and define the project to developers. I think this approach has interesting implications for shared understanding and effective communication across levels. -->
## Context

According to Shape Up, any work must first be shaped and pitched before it's planned.


[Shaping](https://basecamp.com/shapeup/1.1-chapter-02) explores the problem to ensure we understand it and a solution exists that should fit in the amount of time the company wants to invest (the [appetite](https://basecamp.com/shapeup/1.2-chapter-03#setting-the-appetite)). 

A [pitch](https://basecamp.com/shapeup/1.5-chapter-06) is refined out of the shaping exploration. The pitch explains the problem and the gist of the expected solution. It's intended both to inform managers deciding work to schedule and set the high-level direction for implementation.

A pitch includes 3 key elements: The problem, the appetite, and the solution. All of them are frame as a pitch in the same sense as pitching an idea for venture funding.

The problem paints the story for the current situation and how it's falling short in a specific way, who's effected by it, and what is gained by solving it. Appetite succinctly measures how much investment the problem is worth. Lastly, a high-level solution is proposed. It should be clear how the solution delivers the expected value and that it should be deliverable in the expected appetite. This is especially critical since work is automatically not extended if it exceeds its timeline.

It may also include elements such as rabbit holes handle cautiously and work explicitly not included in the scope of the pitch.

Shape Up goes to great lengths to ensure these solutions include the minimum necessary detail. The key elements should be quickly discernable, enough to know we have a sufficiently small scope and no more.

## Just the Essence

I think the core of this approach is a focus on the problem and a rigorous insistence on only the essential solution details. 

Exploring the solution well enough to feel certain it solves the problem in the given appetite may require quite a bit more detailed exploration than shows up in the pitch. 
Excluding that work may feel like work lost, but the rigorous limitation is key.

Let me summarize what ends up in a pitch again
- Mostly a focus on understanding the problem, who it helps, and value from solving it
- time investment value of a solution
- Only enough solution to know it's possible, with other details intentionally removed
- key boundary cases for what work is in or out

Pitches define the minimal interface that matters to both management and programmers.

The managers need all this information to decide if they want to schedule work. It's often enough information to decide if the work is worth scheduling, and there isn't any information the manager is uninterested in.

Likewise, the programmers need all of this information to make well informed decisions about implementation. It likely tells the programmers everything the management expects of them, and it doesn't include an extra information.

## Reduced Accidental complexity

This minimal specification may cause some discovery work to be lost. In exchange it reduces the risk of accidental complexities. The people closest to a certain kind of work are the ones making any decisions.

The manager has more predictable control over timelines and delivered value. There's no decisions down the chain to renew work that passes the desired investment. There's no unnecessarily large estimates because developers imagined a solution not knowing the appetite when, with the appetite, they might have found a fitting solution. 

In return, the implementing team is handed as few details as possible. They have maximal freedom to make tradeoffs to meet the timeline while still delivering the core value. The specification cuts details to avoid even accidentally pressuring the team into unnecessary decisions. The team is also prepared to make good tradeoff decisions quickly because they're working off the same pitch as the management, and pitch doesn't skimp on problem context.

## Shared View, better alignment

A shared concrete definition between management and developers minimizes chances for miscommunication or value misalignment. Everybody is looking at one definition. Everybody is steeped in the problem to solve, but also in general alignment on the solution direction. 

There's no telephone of breaking down work further for developers and potentially losing problem context. Lower risk of developers focusing on specific tasks at the risk of losing the overall expected value.

Conversely, managers also don't have to parse a sea of broken down work and chart out the value they want delivered. They're always looking at the self-contained end value their expecting to have delivered.

## Duck Docs

I have pretty high confidence in the core idea behind pitchs.
I use many of the same core elements in my [duck docs](https://spencerfarley.com/2022/06/16/0-intro/). While I haven't exactly used duck docs for project management, I've used them for many years with great success to reduce uncertainty on projects and coordinate with stakeholders for decision making.

## Uncertainties

I see a lot of benefit in shaping and pitches. But, I also still have some uncertainties.

Specifically, Shape Up frame the work as typically being 2 week or 6 week increments.
However, I've long followed the philosophy that work over 2 weeks is too big to gauge effectively and must be broken down.

The longer timeframe isn't necessarily an intrinsic to the good I see in pitches. In fact, I think stories are *supposed* to be much like pitches in focusing on a user-centric unit of value.

However, I very commonly see stories go awry and assume a lot about the overall solution, if not directly specifying a solution instead of a problem.

I wonder if the longer timelines are worth the uncertainty for the tradeoff of making it easier to specify self-contained. Perhaps breaking down to sub-week units of value applies too much pressure to lean into an overarching plan, and thus stories become more like tasks or pre-determined implementation steps.

What happens all the little work. The small bugs, the minor UI tweaks.

Part of Shape Up is a 2-week cool down after each 6-week cycle. Perhaps the small work is concentrated into those. I suppose that would reduce flow interruptions.

Perhaps there's just less small work if you consider projects closed books (if it was good enough to ship it's good enough to leave) and value props have to be big enough to get attention. Neither of those sound like bad things.

[Chapter 15](https://basecamp.com/shapeup/3.6-chapter-15) warns against reacting to the small tasks and feedback that pop up after a release. It feels natural to respond to feedback and these items feel like quick wins, but I suppose it isn't worth it if they end up disrupting the larger flow of prioritization.

Perhaps the average work size is also larger when the appetite is fully inclusive of everything from pitch to delivery. Design, development, and all kinds of testing need to fit in the appetite. Estimates notoriously bias to only the dev work. Unaccounted time from handoffs are a common schedule buster. It's hard to estimate when there's not just one responsible party. Actually, It's hard estimate in any case.

There's still a lot of unknowns for me around scope sizes and how they interact with specification quality. I'll need to experiment with these ideas to feel out the balance.


## Conclusions

I think shape up has hit at a key separation of concerns in project management.
Pitches define a minimal problem-focused work specification that gives both managers and developers everything they need, and only what they need, to make effective decisions. This minimal specification improves alignment by keeping on shared work definition. It allows a separation of concerns that reduces accidental complexities while giving both sides more control over the parts most important to them.

I still have many outstanding questions about the technique that will probably require first-hand experiments to resolve. I'm excited to, at minimum, use some of these ideas to refine my duck docing process.

