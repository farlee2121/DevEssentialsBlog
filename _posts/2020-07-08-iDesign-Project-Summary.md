---
layout: post
tags: [Architecture, DDD, iDesign, Reading Notes]
strip_title: false
excerpt: "Part 2 of Righting software presents the most complete theory of project management I've seen: the Critical Path Method."
---

# Righting Software - Project Design Summary

Part 2 of Righting software presents the most complete theory of project management I've seen: the [Critical Path Method](https://en.wikipedia.org/wiki/Critical_path_method). 

It originated in the 1940's out of the Manhattan project and is based on understanding project dependencies as a graph or network. For example,
![Network example](). While conceptually simple, this opens up the whole field of math known as graph theory as a tool for understanding properties of our projects like: duration, cost, stability, and staffing.

Lets start with how to build the graph, then dive into the data and decisions we can make from it.

## Building the graph
use making a simple recipe as understandable and small graph
- inputs
  - Activities with dependencies
    - Coding activities (from arch call chains or activity diagrams)
    - Non-coding activities (design, migrations, negotiating design contracts with other departments, acceptance tests, etc)
  - Estimates of all activities
    - could use PERT, historical analysis, Wideband Delphi
  - Planning Assumptions
  - Constraints
    - limited resource access (i.e. no specialists, limited available developers, timeline, cost limits)

(use a single edge with weight and nodes, label activities, activity dependency, estimate)
explain why arrow is activity (takes a dense bigraph and makes it clean, were one set activities is all needed for the next set to start)

## Staffing



the plan: show a graph, explain critical path, float, compression, decompression, normal. 
 - label stuff on a network. have a brief key

 - schedule
   - compression, show splitting a node (ui design, ui development is a good one), show splitting a chain with simulator & adding integration
   - decompression: increasing a float visualized, point of minimum decompression visualized
 - resources affect graph
Then get straight into using visuals to make decisions
 - normal: lowest direct cost achievable solution or natural state + fiddling to ensure it is an achievable solution (accptable risk and staffing)
 - Staffing: show unattainable solutions and attainable (red x and green check)
   - brief description of criteria (no dropoffs, no oscillating, sub-critical:understaffed or idle developers)
 - Risk
   - show formulas, visualize acceptable ranges
   - show a high-risk chart and a good risk chart along with their index values
 - Complexity
   - show a high-complexity chart and a low-complexity chart along with their values
 - Efficiency
   - not sure how to visualize. maybe don't bother
 - Earned Value
   - brief description. Show lumpy, too steep (high-risk), too shallow (sub-critical), good
 - Cost
   - all one visual with brief definitions
   - direct cost (activity time)
   - indirect cost (linear function)
   - Total cost
 - Show risk/cost crossovers?
## Asides for Math Nerds
I focused on discrete math in my undergrad, so here are my mathy musings. 

This is just me speculating, but graphs with a low minimum cut size are likely to be risky because they will have a few dependency choke points.
On the other hand, very large cut sizes likely mean high execution complexity. What could we learn from a distribution of cut sizes?

I'd also be interested to see 
 - an analysis of in-degree and out-degree related to risk
 - an analysis of connectivity for identifying useful sub-graphs (i.e. feature verticals or sub-systems)
 - are there properties we can leverage because projects should always be directed acyclic graphs?
 - what do we know about sub-graph patterns (like directed diamonds) that could be useful?
 - does reachability tell us anything different than float?
 - is the number of leaves (sources) a meaningful measure of complexity or risk?
 - are ears useful for compressing a graph? Splitting projects?

Observations that are probably minimally helpful
- the only sink should be the end of the project. 
  - I suppose this could be multiple tasks if you don't have a final milestone node
- Any cycles signify self-dependent activities and are impossible to schedule
- I do believe the critical path is the graph's diameter (since there is effectively one sink, the critical path is going to be the shortest path to that final sink from it's furthest node, so yes, that is the diameter)