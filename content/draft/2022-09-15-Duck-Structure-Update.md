---
date: 2022-09-15T00:00:00-00:00
tags: [ducks]
title: "Duck Structure Update"
---

My duck docs continue to evolve as my process changes. Here changes I've noticed lately.
<!--more-->

This post does not fully cover duck docs. You can check out the [original duck structure post](../posts/2021-05-21-Duck-Structure.md) or my [whole series on ducking](../posts/Whats-Your-Duck-V2/2022-06-16-0-Intro.md).
<!-- TODO: 
- update old post with a forward link. 
- Also update the link in the What's your duck series -->

## Sections

The major sections I use are mostly the same

- **Motivation**: Every doc starts with a high-level motivation statement. It's important to know the why behind the work so that the right problem is solved. This section is a great place to link pre-existing materials for the task
- **Requirements, Constraints, goals**: Starts breaking the motivation down into a checklist of success criteria. Could also be considered a "definition of done".
- **Exploration**: This section is the meat of the document. Questions and facts are collected and answered until the problem is solved.
- **TODO**: Track any action items that I discover but may not immediately addressed as part of exploration. Usually a checklist. Generally doesn't include outstanding questions, just determined actions
- **Meta**: A yaml section (usually at the top) with date, author, and work item information for clerical purposes.

The main change is the Plan and Implementation sections got absorbed into Exploration and TODO.

I've been refining my ability to work, commit, and pull request in small increments. I usually still ask a lot of questions before writing code, but I no longer a separate the exploration and implementation phases. I implement small chunks of value as I have enough knowledge to implement them. The exploration section is a continuous dialog until the problem is solved. 
This also better matches my mental model that [software is increments of clarity until you've represented the problem so that a computer can execute it](../posts/Whats-Your-Duck-V2/2022-06-16-2-Design-Tree-and-Incremental-Progress.md).

## Tags

I've also simplified my tagging. 
- **REQ:** What follows is a requirement
- **GOAL:** A factor that guides decisions between solutions that otherwise satisfy requirements. Not a requirement for a completed solution 
- **Q: / A:** A question and it's answer. Deliberation come between
- **OPT:** An option for a question with tradeoffs or multiple routes
- **PRO: CON:** Pros and cons of a given OPT:
- **SOURCE:** a reference that influenced a decision or question. Often a link
- **STUCK:** used if i'm spinning my wheels. I type out what I think is causing me to feel unsure or otherwise stall. Usually results in new questions that get me unstuck

The main change here is eliminating U: and K: for knowns unknown. I've found that phrasing all of my thoughts as questions and answers is easier for other readers to follow. It also encourages context for a given fact.

I've also added the STUCK tag. Ducks as a whole help organize thought and keep steps of the problem in focus. However, sometimes I might feel overwhelmed or otherwise stop making progress. The stuck tag gives me a standard outlet. I don't have to solve anything, I just explain why I feel stuck. That's usually enough to get going again.

I still occasionally use a handful of other tags
- **PROBLEM:** used for unforeseen issues in a previous decision. States the issue identifies and follows as a question of how to address the issue, potentially overturning earlier idea
- **ALT:** like OPT, but the option is more of an aside (alternative) to a main line of thought
- **DECIDED:** highlight the route chosen from alternatives. I'll generally use A: instead, since most most everthing is posed as a question now.   
- **PICKUP:** A reminder of where I left off to help me get back into the flow later. These usually get deleted once I get back into the flow


<!-- TODO: example? Be sure to show more untagged content to address Jack's complaint -->
