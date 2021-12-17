---
layout: post
tags: [Checklist, Critical Thinking, Duck docs, Process]
---
# Development Cycles Checklist

A junior developer recently asked for a daily responsibilities checklist. This question made no sense to me at first. A developer's job isn't so routine as a daily checklist. However, it sparked me to think about how a developer's regular responsibilities activities can be quantified. 

The model I came up with is a riff on [Cycles of TDD](https://blog.cleancoder.com/uncle-bob/2014/12/17/TheCyclesOfTDD.html) by Robert Martin. I also previously [visualized the Cycles of TDD](../_posts/2020-11-13-Cycles-Of-TDD.md).

The format
- a scope of time
- 1-2 summative questions for that time frame
- An expansion of questions to ask in that timeframe

<!-- TODO: create a copy of the list that only has the most critical questions as reference, something printable 

IDEA: I should brain storm questions for each section, then boil each down to one or two questions
-->


## Minutes
Short
- what am I proving?
- what can I do to prove/disprove it?

Expanded
- Can I clearly communicate what I'm solving?
- What are my alternatives?
- What are the pros and cons of each option?
- What is the next most important question?
Tools: are things like pro/con, boundary cases, finding documentation

## Deca-minutes (order of 10min)
Short
- Is the end solution clearer?
- Am I stuck?

Expanded
- Are mini-investigations clarifying my bigger questions?
- Has my understanding shifted?
  - Does any work need refactored?
- What are the most important remaining questions?
  - What is most likely to undermine my task?
  - What would add the next most value?
- Do I need help or to change gears?
  - How long have I been working on this? 
  - Could someone on my team answer this easily?
  - Are there other promising paths that may be less work?

## Hour
Short version
- Have I done work worth committing?
- Is my task in danger?

Expanded
- Have I completed one or more meaningful stable increments of work?
  - Have I progressed toward completing my story?
  - Have I reduced risk to the task completion? 
  - Can I more clearly see the end of my story and that it meets requirements?
  - Have I committed (a stable increment of work)?
    - More frequent commits with complete chunks of work is a good thing, but commits should rarely happen less often than every 1-2 hours
- Can I move on to a later phase? (e.g. Requirements -> Design -> Construction -> Review)
- Is my task in danger?
  - Have any new risks surfaced?
  - Have any task assumptions been proven false?
  - Have any risks resisted clarification?

## Day
Short
- Standup: 
  - What progress would the team care about?
  - Will all my work likely finish by end of iteration?
  - Any blockers?

<!-- potential alt
- What do others (team, stakeholders) need to know?
- Is all my work on track to finish by end of iteration?
-->

Expanded
- Are my work items on track?
  - This is typically gauged against work assigned in 1-2 iterations. More continuous prioritization requires better developer intuition for the impact of work timelines.
- What do I expect to accomplish today?
- What did I expect to accomplish yesterday, and how did it differ from reality?
- What increments of progress have I *completed* towards my tasks?
- Do we need to reassess remaining work to prioritize the most important tasks?
- Do the team or customers need to be notified about any shifts in my work?
- What are my blockers and who can help me resolve them? 
  - defn: blockers -> things that could prevent me from completing my work
  - Do we need input from stakeholders?
  - Is there someone in standup that I can engage to resolve my blocker?


## Week

<!-- TODO: peer Review processes should be top of mind for the week -->

Short
- Iteration Planning
  - Did we deliver the expected customer value last week?
  - Does an incomplete work need intervention?
  - What are the next units of customer value?


Expanded
- Did we *deliver* at least one completed unit of customer value?
- Work carried over and does it need intervention (broken down, sidelined, additional support, etc)?
  - Has any task carried over two iterations?
    - If so, break it up, kill it, or reassign it.
- Reflect on process
  - What went well this week?
  - What went poorly and how do we improve it in the future?
- Are story/task estimates still in line with expectations?
- How much work can the team handle in the next week?
- Are there priorities within the work assigned this week?
- Are we on track to meet broader customer expectations (e.g. contracts, release schedules, milestones, general customer satisfaction)?

## Month(s)
Short
- Is the team delivering sustainably?
- Do I like my career trajectory?


Expanded
- Did we consistently deliver on expectations? 
- Did we hit an acceptable success metrics for stated goals? For other initiatives?
- On track to meet quarterly / yearly goals?
- Review metrics for quantitative improvement
  - e.g. defect reduction, estimation quality, velocity & utilization trends
- Is the team satisfied?
- Did I take steps toward my career objectives this quarter?
  - What steps do I want to take next quarter? 
  - e.g. take a course, read books, refine a skill, give a talk, etc
- Most business goals are above the developer level at this point
<!-- I can't find a good reference for landing zones, so I decided to cut the concept out -->

## Year

Short
- Reflect on large-scale trajectories of projects, business, and personal growth

Expanded
- Companies often have a 1-year plan
- Have I grown as a developer in the last year?
  - How has my understanding changed in the last year?
  - What do I do differently now than a year ago?
  - What did I enjoy and what would I avoid repeating?
- What do I want to improve next year?
  - How could I tell if it changed?



## Personal Takeaways

This was a surprisingly fruitful exercise. A developer balances many tools and techniques across diverse scenarios. However, a robust core of critical thinking and clarification skills bubbles to the top at all time scales and across activities. 

I was delighted to find a dividing line at appropriately one day. Everything one day and above is governed by common team rituals. Everything below a day forms the core of my [duck docs](../_posts/2020-10-02-Whats-Your-Duck.md). I have yet to blog the design tree bits of my presentation. That may need to become a priority.

This divide makes sense. Under a day is personal process. Managing more tightly would be impractical. Process over a day gradually increases in scope from team, to department, and company-wide alignment.


## Conclusion

A daily checklist of expectations still doesn't seem plausible for developers.
However, a series of time-based cycles does provide a decent picture of developer activities. These cycles also highlight the importance of critical thinking for developers. Technologies come and go based on task, but the thought process is the same.

