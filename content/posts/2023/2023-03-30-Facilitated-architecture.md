---
date: 2023-03-30
tags: [Software Architecture, Design Process]
title: "Architecture - Facilitated over Separated"
---

I was asked what percentage of time I spend on system design (or architecture) over coding. The question didn't make sense to me, and I think I've articulated why. I see architecture as a facilitated aspect of implementation rather than a separable process.
<!--more-->

I've long believed that handing down designs to coders is not a recipe for success. 

This may have started with [What is Software Design](https://www.developerdotstar.com/mag/articles/reeves_design.html) by Jack Reeves, but has become interwoven with many of my beliefs about software. 

I see [the whole software lifecycle as design](../../posts/Whats-Your-Duck-V2/2022-06-16-1-Software-as-Clarity.md). 
The details of implementation are part of clarifying the problem being solved. Issues uncovered in implementation often reveal truths of the business problem we're solving.
Solving these issues is can change modeled concepts, structure, and contracts. These are design choices and their impacts may not be small.
Thus, there is no mechanical implementation phase. Everything is design. There is no breakdown between design time and implementation time.

If all coding is design, and those design choices can undermine larger decisions, then 
- all developers participate in system design
- design checks must continue through the work's whole lifecycle

As Alberto Brandolini said "it is the developer’s assumptions which get shipped to production".

This poses some challenges. Not every contributor will have a robust understanding of software design. 
The design can't be centralized, yet there must also be quality control.
Hand-holding junior contributors at all times is not feasible, and regularly sending back work is demoralizing.

So, the question is: how do we facilitate good design choices?

I wish I had a magical answer to that question.

Some qualities I think are necessary
- the process should grow contributors toward shared understanding
- the team should have checkpoints to ensure key outcomes (and assume group ownership)
- Decisions should be bounded to simplify the average contribution
- expectations should be encoded and available to all 


At first blush, these qualities mesh well with other techniques I already use.

Domain-Driven Design identifies sub-domains, which are separable sub-problems.
These sub-domains are effective boundaries for separting teams and creating high-level architectural boundaries.
Making changes in other sub-domains requires consulting another team. This incentivizes design choices isolated to the contributor's own sub-domain and that don't disrupt public contracts in order to avoid coordination with other teams. Wider impact changes automatically trigger extra review because they must been coordinated with other teams.
Separated sub-domains don't prevent one sub-domain from depending on internal knowledge of another sub-domain, but separate ownership does limit the convenience of such coupling.

Sub-domains are not locked in stone. They evolve over time as the team identifies separable elements of the problem they're solving.
These sub-domains can be guided by senior developers and team deliberations. They then bound the scope of average contributions without requiring continual design guidance from senior contributors.

Domain models also set a shared mental model for review feedback. Relating feedback to the domain model can grow shared understanding within the larger picture of the domain. This sets context for feedback both within a review and over time. Consistent context improves learning and decreases situations where feedback feels arbitrary.

Architectural decision records (ADRs) are another tool tool that guides system design without handing down individual decisions.
ADRs are simple documents that capture a practice the team has decided to follow along with motivations for the decision and, usually, examples.
ADRs can cover a wide variety of practices like design patterns, applications of certain technologies, naming schemes, and more.
The key is that they are recorded and available to everyone. They set a baseline of shared expectation that can be debated and improved.
They also make reviews more objective since there is a baseline for expectations.

Pull requests are the key process step where design standards like domain models and ADRs can be enforced.
These standards also improves pull requests by setting clear and consistent expectations.

Overall, I'm quite satisfied with this new articulation of how system design fits into team processes.
I think it also clarifies the role of existing techniques like Domain Modeling and Architectural decision records. It also clarifies how control and high-level guidance can achieved without centralization.

<!-- something about why clear standards for review are so important
- junior contributor has a big picture to connect feedback into
- junior contributor has a basis for reasoning and counter-proposing
  - they're not just at the whims of the reviewer's style preferences
-->


<!-- Think there may be a blog post clarifying my view on architecture

Said to lula that I couldn't give a good time breakdown between system design and code contribution because I don't see system architecture as a separable phase. Rather, architecture is a collaborative process that's facilitated.

Some good points came up with Doug too
- He thinks you can't have anyone do architecture and expect good results (I see a grain of truth here)
- It's easier to follow something put in place than to create the original structure

I realized neither Imperfect's approach or my views conflict with providing high-level guidance. In fact, a domain-based approach created some limits.
Sub-domains identify separate elements of the problem, which is a good divide for teams, which limits teams within a particular sub domain. They still make design decisions, but within the confines of a sub-domain. This can improve design since there is an inherent design force in having to wait on another team for changes, so individuals are more likely to make design decisions limited to what is most conveniently in their reach. 
Still does not prevent violations of information hiding and coupling to decisions in made in other services.

Another aspect is ADRs. Between major sub-domains and ADRs, architecture is guided while individual decisions are not handed down. The domains and ADRs are also a standard basis that review feedback. Like a good checklist, they lower the barrier to calling out desired behaviors between peers. Also like checklists, this means they should be focused and supported enough that people read them.


The advance here is mostly connecting various ideas into what it looks like to provide structure around architecture without handing down designs. 

Should be clear I don't have it all figured out. -->