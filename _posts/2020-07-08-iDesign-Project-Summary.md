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
The most basic info to build the graph is
  - Activities 
    - Coding activities (depends on your design method, IDesign largely splits it by service)
    - Non-coding activities (UX design, migrations, negotiating design contracts with other departments, acceptance tests, etc)
  - Activity dependencies
    - from architecture diagram, call chains, activity diagrams
    - team input, organizational dependencies
  - Estimates of all activities
    - could use PERT, historical analysis, Wideband Delphi

To interpret the graph you should also record 
  - Planning Assumptions
  - Constraints
    - limited resource access (i.e. no specialists, limited available developers, timeline, cost limits)

Here's the example for making chili.
![Chili activity network]()

Notice that the activities are the edges and dependencies are nodes. That's because the common scenario of many-to-many dependencies(where a collection tasks all need to finish in order for any in another set to begin.
![Arrow vs Node Graph]()
(use a single edge with weight and nodes, label activities, activity dependency, estimate)
explain why arrow is activity (takes a dense bigraph and makes it clean, were one set activities is all needed for the next set to start)

## Schedule
### Critical Path
The minimum duration of your project is the network's diameter, or the length of the slowest minimal dependency chain in the network.
![Critical Path Example]() // label floats too

This path assumes you can complete every dependency off the critical path before it delays a critical activity.
The project is *sub-critical* if you do not have enough staff to have all dependencies ready for the critical path. This effectively creates a new critical path by adding artificial (or resource-limitation) dependencies to the work that can't be done fast enough.

> *Sub-critical* ~= understaffed

In the case of one developer, every activity is critical.
![One developer scenario]() 
Everything off the critical path must have *float*: the amount of time it can be put off before it delays the critical path (thus delaying the project). 

### Compression
The project can be shortened by shortening the critical path through *compression*.

Types of compression
- Assign faster resources to critical path
- Break down an activity to separate chains (i.e. separate UI design from UI implementation)
- Forcefully split chains by designing to a contract and later integrating

![Breakdown activity example]()
![Design to Contract example]()

> Compression should always be done on the critical path (or it won't shorten the project).

Splitting tasks allows more parallel work, but may require more developers and increases complexity of running the project.

It's worth noting that some compression usually pays for itself in reduced indirect cost, but projects usually only be compressed about 30%.

### Decompression
*Decompression* is adding artificial float (generally to critical path). This lengthens the project and decreases risk. Think of it as a calculated safty buffer.

## Staffing
The network allows you to plot what staff/resources will be needed over time in the project. Start with a bar chart that assumes staff is always and only employed when you need them.

This shows how realistic ideal staffing is for your project.
![Good and bad staff charts]()
//show unattainable solutions and attainable (red x and green check)
  // - brief description of criteria (no dropoffs, no oscillating, sub-critical:understaffed or idle developers)

If your staff curve is not practical you might 
 - compress to provide more parallel work options
 - try assuming the staffing levels and see how it effects network

## Cost
- *Direct Cost*: Cost incurred on activities in the network. More generally, cost for work that advances project completion. Think developer time.  
 Our network dependencies allow us to calculate how much work is available when. This can be compared against staffing options to calculate active working time and idle time for a given solution. Some projects count idle time as direct cost some as indirect.

- *Indirect Cost*: Costs like office space, supplies, utilities, tooling, PTO, managers. These costs tend to be constant with time, or cummulatively linear over time.

- *Total Cost*: Sum of direct and indirect costs 

Note that while project design affects staffing, thus direct cost, the project duration also affects indirect cost. Thus adding staff to shorten a project can pay for itself, to a point.

![Cost over Time]()
- all one visual with brief definitions
   - direct cost (activity time)
   - indirect cost (linear function)
   - Total cost (make sure death zone is evident)
 - Show risk/cost crossovers?
## Efficency
Project efficiency is the sum of all activity efforts without regard to workdays or idle time over the sum of actual effort accounting for idle time and workdays.

Target range is $15\% \le \text{efficiency} \le 25\%$. Over 30% is likely too rigorous for any team to execute and high-risk.

## Earned Value
*Earned value* is essentially % project completion over time. More specifically, it is the sum of the effort on completed tasks.

The network allows us to plot the expected curve right away, which can reveil potential issues
![Earned value comparison]()
//- Show lumpy (impractical staffing), too steep (high-risk), too shallow (sub-critical), good

## Complexity
A project can be complicated to deliver for many reasons: politics, pandemics, changing markets, etc. 
Many of these factors can't be calculated and are also consistent across project plans. However, the difficulty of work distribution and communication very much depends on the project design.

This is extimated using *cyclomatic complexity*.
$C = \text{Complexity} = (\text{\# Dependencies}) - (\text{\# Activities}) + (2 *  \text{\# Disconnected Subgraphs})$  

In practice, this should always be  
$C = (\text{\# Dependencies}) - (\text{\# Activities}) + 2$

Target values are $10 \le C \le 12$ and 15 is too complex to execute.
![High vs low complexity chart]()

## Risk
Risk can be calculated multiple ways but there are two main formulas. 

Risk as a decision tool is best understood when piecing everything together. We'll revisit risk in the [All Together](#all-together) section, but the general rule is that risk should be  
$0.4 \le \text{risk} \le 0.75$

Keep in mind that risk is not a probability, but an index. It only shows relative likelyhood of failure.  

### Criticality risk
*Criticality risk* is based on grouping the activity floats into G groups and assigning a weight to each group. Typically $G = 4$ and the groups are critical=4, high=3, medium=3, and low=1.

$Risk = \frac{\sum\limits_{i=1}^G{W_i*\text{Count}_i}}{W_c*(\text{Total Activities})}$

Effectively, the sum of activity risk weights over the sum if every activity were critical.  
This method works well with even float distributions and has low sensitivity to outliers

### Activity risk
*Activity risk* is the sum of all activity floats over the sum if every activity had the maximum float.

$Risk = 1-\frac{\sum\limits_{i=1}^N{Float_i}}{(\text{Max Float})*(\text{Total Activities})}$  

This method is more sensitive to individual activities. It will generally be close to criticality risk unless there is an uneven distribution of risk that should be investigated.

## All together
First off, this is all project **design**. It cannot automatically produce a successful project. Rather, it is a toolbox of quantitative insights for how different arrangements fit you're project's needs.

That said. The book's examples seems to follow a typical flow.

### Establish the *Normal* Solution: 
The network created from the natural activity dependencies may not be a realistic project. The staffing distribution may not be achievable, or it may violate project constraints like access to developer and specialists.

Your first goal is to establish the *normal solution*, or the solution that
 - has least direct cost
 - does not impede the critical path
 - is possible (doesn't violate any project constraints like unrealistic staffing)

Some common tweaks to make a project possible are
- Try splitting the project into stages to level staff curve (eg.g developing high reuse components up front)
- Try settings realistic limits on max staff
- Try limiting specialized resources 
- Split out sub-projects

### Compress
With normal established, start trying to compress the graph. Realize that each iteration of compression may change the critical path, thus likely compression candiates.   
Compressing may also change the desired staff distribution.

Graph cost vs duration for each solution. Repeat until you start hitting a limit. This could be
- ~25-30% project duration reduction from normal
- it's too hard to find compression candidates,
- you see compression reaching an asymptote (cost way up with little time reduction)
- complexity is too high
- costs exceed project limits

![Cost vs duration]() // reaching asymptote

### Decompress
Decompress normal solution and/or compressed solutions with favorable risk values. Try adding different amounts of float to see how each responds with change in cost and risk. Plot risk and total cost versus duration.

Stop condidions
 - hit bottom of target risk range ($.3 \le risk \le .75$)
 - pass likely project duration limits
 - Risk starts decreasing slowly (much past point of minimum decompression)

![Cost and Risk vs Duration]()

### Pick 3(ish)  
Pick the ones that give management the best value trade-offs between duration cost and risk from the Cost & Risk vs Duration plot assembled while building solutions.

It's also wise to use a regression tool to find a best-fit curve of the solution Total Cost over Duration points.

This serves as a guide for accepting project conditions. Any projects with cost and duration above the line are possible. Any under the line are impossible and should be killed immediately.

![Total Cost vs duration]()

# Reservations
This method offers quantitative insights far above any project planning method I've seen. However, it's context in Righting Software is always long-ish standalone projects. It is unclear to me how effectively this method could be applied at smaller companies. Surely the staffing constraints will greatly limit the possible solutions.

The bigger issue is the size of technical initiatives. Many startups or small companies don't have technical initiatives longer than a few weeks. Understanding and business plans also change much more rapidly than at big companies. It's normal for startups to completely change the nature of their business. For those pioneering new spaces, many things just might not be clear until a product or feature is already out there. 

Maybe those are too extreme of scenarios expect stable insights. Maybe Kanban or Scrum are better suited to such sensitive environments. Still, I can't help but want the powerful metrics of Critical Path. 
  
# Asides for Math Nerds
I focused on discrete math in my undergrad, so here are my mathy musings. 

This is just me speculating, but graphs with a low minimum cut size are likely to be risky because they will have a few dependency choke points.
On the other hand, very large cut sizes likely mean high execution complexity. What could we learn from a distribution of cut sizes?

I'd also be interested to see 
 - an analysis of in-degree and out-degree related to risk
 - an analysis of connectivity for identifying useful sub-graphs (i.e. feature verticals or sub-systems)
 - are there properties we can leverage because projects should always be directed acyclic graphs?
 - what do we know about sub-graph patterns (like directed diamonds) that could be useful?
   - Could we identify complete bigraphs as a measure of risk or complexity?
 - does reachability tell us anything different than float?
 - is the number of leaves (sources) a meaningful measure of complexity or risk?
 - are ears useful for compressing a graph? Splitting projects?

Observations that are probably minimally helpful
- the only sink should be the end of the project. 
  - I suppose this could be multiple tasks if you don't have a final milestone node
- Any cycles signify self-dependent activities and are impossible to schedule
- The critical path is the graph's diameter (since there is effectively one sink, the critical path is going to be the shortest path to that final sink from it's furthest node, so yes, that is the diameter)