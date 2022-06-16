---
layout: post
tags: [Design Process, Ducks]
series: What's your Duck v2
---

# What's your Duck: Fundamental Questions

This series is about design process and organizing our thoughts for effective development. The main goal is to establish a healthy mental model and intuition for effective design process. The duck bit will be explained later.

The general layout of the series is
- Fundamental questions: understanding the big picture of software and design motivations

<!-- 
TODO: consider putting a warning in What's your duck pointing to this post as the presentation companion -->

<!-- 
IDEA: make this post a series to make it more approachable / smaller increments
TODO: Do I need to group section by what I think belongs in one post? Clearly delineate chunks that need to be taken as a whole
I think at least the stage-specific techniques might be good as a separate post. Most everything up to there flows pretty well
-->


<!-- Meta thoughts
This feels so much different from writing my other posts. I can see all the effort I put into connecting back 

Thinking about this as a potential series causes me to write each section intro like a blog intro and forge stronger context clarity
 -->

## Design Tree and Effective Work Increments

A spectrum describes the general lifecycle progression, but leaves the fine-grained progress unclear. Design trees can help us zoom in and understand the second motivational question "How do we effectively break down problems?".

The design tree is an idea that we can represent all possible design routes as a [graph](https://en.wikipedia.org/wiki/Graph_(discrete_mathematics)).
- Each graph node is is a possible decision we could make
- Edges show how later decisions depend on earlier ones
- The furthest nodes in the graph (or leaves) represent complete solutions.

Every path to a leaf represents a series of decisions we can make to arrive at a final solution.

![Design tree search patterns](../../post-media/Whats-your-duck/search-methods.drawio.svg)


Humans have a natural tendency toward depth-first approaches. We try to find complete solutions all at once.

The problem is that depth-first tends to lead to a lot of wasted work. We generally don't have all the information we need at first. Our solution probably wont quite match our need, and a lot of work is undermined.

Breadth-first search, where every next option is considered before making a choice, is not feasible. There are often effectively infinite options for any given decision in a design. 

A healthy design process uses an incremental approach. 
- First identify the next key decision
- Identify a few (3+) *likely* solutions to the decision
- Explore each route in enough depth to lock in an answer
- Lock in the answer and repeat until there are no more key decisions, at which point you have a complete solution.

Such a process nearly guarantees we'll reach a solution that meets our current understanding of the problem with as little rework as possible. It also meshes well with how our brains work. We break off smaller problems that are easier to solve. Each decision reduces the solution space, making downstream decisions easier with fewer unknowns to consider. 


## Self-Similar Process

<!-- TODO: This transition isn't good enough to start a post. Consider more connecting context, or maybe they'd be in the same post as the design tree -->
Fortunately, this design exploration is self-similar. The thought process is about the same no matter what scale or type of problem we face. This includes each sub-problem we explore while iterating through the design tree. In each increment we consider

- **Must haves (Requirements)**: Any qualites that *must* be satisfied to consider the problem solved
- **Nice to haves (Secondary goals)**: Qualities we'd like have, but are not essential to call the problem solved
- **Constraints**: Qualities that aren't essential to the problem in all cases, but must be met in our case. Common examples include budgets, timelines, available personnel, and hardware limitations
- **Solution Fit**: How we compare solutions against the enumerated goals and constraints.

First enumerate any known requirements, goals, and constraints. The list will probably evolve as we explore solutions, but it should serve as a strong initial filter for possible solutions.

Second, enumerate likely solutions. Consider how each solution category matches up to the goals and constraints. Possibly add new solutions based on your findings, and stop when you have a solution that meets all known needs. 

Break off another sub-problem if there isn't enough information to define the problem well or choose a solution. Repeat as until the higher-level problem is clear enough to solve.

This process is similar for each sub-problem, but that doesn't mean it's mechanical or formulaic. Asking good questions identifying the nature of a problem is a skill like any other. It gets better with experience and practice.

## Thread Matrix: How much effort

Enumerating requirements, goals, and constraints for evaluating solutions may sound like a lot of work, but it doesn't have to be. This process can fall anywhere from a few options weighed in your head, to sticky notes, to design documents, to expansive interviews and studies. A threat matrix helps us evaluate how important each decision is and how much effort we put into it.

![Threat matrix](../../post-media/Whats-your-duck/threat-matrix.drawio.svg)

On one axis we have impact should our decision be wrong, and on the other we have likelihood the decision is wrong. Decisions that are low-impact or unlikely to change don't need much consideration. Just pick something and move on. The higher impact or likelihood of change, the more time is worth investing to make sure the descision is right.


## Iterate to Good Enough

This brings us to our third and fourth motivating questions "Can software be perfect?" and "What makes software good?"

Think of how we iterate along the design tree. At each step we break off a problem, identify criteria we need to solve the problem, and stop when we have a solution that meets all criteria.

This is true for the overall process too. There is no one perfect solution. There are only solutions that meet our need as we understand it.

The increments help us refine our understanding of the problem, and step us closer to satisfactory solution. Our enumerated understanding of need creates a "definition of done". This definition of done is our benchmark for "good" work. Any solution that meets those critera is "good". Work below the line is not a complete solution. Any work beyond this definition is speculative "gold plating", which often translates into wasted work.

![How iteration narrows in on done](../../post-media/Whats-your-duck/iterative-good-enough.drawio.svg)
