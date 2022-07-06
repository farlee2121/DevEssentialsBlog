---
date: "2022-02-25T00:00:00Z"
tags:
- Design Thinking
- Principles
---

# Process Quality Drivers: Stable, Incremental, Additive

"No ideal process, or set of processes, exists" "Software processes must be selected, adapted, and applied as appropriate for each project and each organizational context." ([SWEBOK](https://www.computer.org/education/bodies-of-knowledge/software-engineering/v3) Ch 1.1 intro). No one likes to hear "that's just how we do it". Process without understanding leads to [frustrating lack of results](https://stevemcconnell.com/articles/cargo-cult-software-engineering/). Understanding factors of good process is critical for effective work across projects and for continued improvement.

My working hypothesis is that effective processes are incremental, stable, and additive.

<!--more-->


## Background

I, like many software professionals, have spent years grappling with techniques like [agile](https://agilemanifesto.org/), [continuous integration](https://en.wikipedia.org/wiki/Continuous_integration), [SOLID principles](https://en.wikipedia.org/wiki/SOLID), [ports and adapters](https://blog.ploeh.dk/2013/12/03/layers-onions-ports-adapters-its-all-the-same/), [distributed source control](https://en.wikipedia.org/wiki/Distributed_version_control), automated regression testing (e.g. unit tests), and similar.

I further believe that elegant design uses a few concepts combined powerfully.

Contemplating why these core techniques work in this elegant design minset led me to notice a trend. At first, I noticed all of these techniques promote stable increments of work (e.g. commits, work items, services).

However, stable increments alone are insufficient to produce results. It's quite possible to work in increments that rewrite previous work and create little or no forward momentum. This kind of churn is common in systems that fail the open closed principle, or generally have high technical debt.

Increments must also be additions to some baseline that is already stable in itself. This is why commits should be complete units of work, why stories are self-contained increments of user value, why services expose extensibility through abstract ports, etc.


## The Properties & Property failures

Boiling down the thought experiment leaves three key qualities for effective process
- Stable: existing work is rarely effected by changes in other units of work
- Incremental: value can be delivered in small and complete chunks
- Additive: the chunks don't just replace each other, the value adds up over time

If any of these fail, it results in a bad situation

- Stability failure: Characterized by heavy rework or fear of change. Hampers forward progress.
- Increment failure: Characterized by complex task dependencies, long times between delivered work, and high risk of delay or failure of the whole deliverable. Work is highly coupled causing ineffective division of work.
- Additive failure: Characterized by lateral movement (change rather than progress). This often involves duplicated work or frequent modification of existing work. The pieces fail to be composable such that new work can build on what exists rather than change what exists.

Conversely, a stable, incremental, and additive process, by definition, should reliably add value with ability to adapt to changing circumstances.

## Design Forces

I think these three properties have found their way into many software processes because they satisfy key forces common in software. Conversely, the qualities may not matter if these design forces are not true for a given problem.

- *Shifting Environment*: most software solves problems in a shifting environment. Businesses, technologies, hardware, regulations, developer understanding and other factors shift over time.
- *Large Designs and Limited Human Brains*: Even moderate software systems easily range into hundreds of thousands of lines of code. All that code is [part of the design](https://www.developerdotstar.com/mag/articles/reeves_design.html). No individual can understand fully understand such a design, and [understanding is one of the most important limitations on our solutions](https://dl.acm.org/doi/10.1145/355604.361591). The less we need to understand at once, the better a design can be maintained and adapted.
- *Increasing Expectations*: Success generally brings more users with more diverse expectations. Our systems are expected to get better and solve more needs over time. This increases the size of our design. Redesign for added features quickly becomes an economic impossibility.
- *Understanding is incremental*: Software is problem modeling, and [understanding is incremental](https://en.wikipedia.org/wiki/Scientific_method). Our understanding changes as we interact with a problem even if the problem hasn't changed.

Note, these forces also may be negligible on small projects or overwritten by extreme requirements for efficiency, reliability, or security that sometimes require tighter integration.


## In the Wild

As mentioned, I believe existing best practices satisfy these qualities. Here's a few of them with the connections made explicit

- Software Architecture: 
  - Hexagonal, Clean Architecture, and Port and Adapters architecture patterns are built around these properties. Each service owns its dependency abstractions to prevent change from external factors (stable). Owned dependencies also mean each service contains all the knowledge it needs to do it's job (incremental). Services are composed externally by adapting their abstractions (incremental & additive).
  - Similar examples: pipes and filters, message-based architectures 
- Requirements: 
  - Stories are self-contained definitions of need (stable). Each story should satisfy a need and provide delivered value when it's completed (incremental). A story is only useful if it adds to the knowledge collected by previous stories (additive).
- Testing: 
  - Behavior-Driven testing like [TestApi](../posts/2020-08-21-Test-Api-InPractice.md) or [Gherkin](https://specflow.org/learn/gherkin/) separate test definitions from code. The tests are thus much like stories, an expression of need independent from the system (stable). Each test provides value through verifying a new self-contained expectation (incremental, additive).
  - Automated regression testing encodes individual expectations as tests and each expectation can be verified independently (incremental, stable). New test cases are generally selected to cover new expectations or errors that slip through (additive). If one isn't careful about coupling tests to implementations, then it breaks stability/additivity and leads to the [Fragile Test Problem](http://xunitpatterns.com/Fragile%20Test.html)
- Scientific Method: Each experiment defines a clear hypothesis then attempts to definitely prove or disprove it. Each experiment both establishes a fact and builds a foundation for further inquiry (stable, incremental, additive).
- Team/organization structures: The advent of devops has pushed many team organizations to vertically integrated teams. Each team owns it's features from requirements to production. Products are composed of many such teams working in tandem and collaborating when needed. Each team is a stable unit delivering it's own unique value.
- Continuous Integration 
  - Every code push is automatically run through the suite of tests and expectations for the code. Effectively each push shouldn't break any existing work (stable). Any expectations in the new code also have to pass (incremental), and changes are expected to add value to the system (additive). 
- Continuous Deployment
  - A philosophy that believes in it's stable increments so thoroughly it expects every increment merged to the main branch is also ready to deploy to production. To be fair, the other half is a robust error handling strategy to discover and address issues early. This locks in stability of the added work as soon as possible.
- Other
  - [Composition for low-level design](https://fsharpforfunandprofit.com/composition/)
  - Change control: commits, pull-requests, etc

## Alternate view for coders

Stable, incremental, additive can be seen as a different angle on the Single Responsibility Principle and Open/Closed Principles. I think stable, incremental, additive is more intuitive for applications beyond code.

## Conclusion

I believe stable, incremental, and additive are underlying properties driving process and design quality. These qualities stem from fundamental forces on software, describe common practices, explain common failures, and agree with existing principles. 

At the very least, they've served as a useful guide for selecting and adapting a personal set of practices. 

## Further Reading
- Update: I explore how these properties lead to [Progressive Design](../posts/2022-03-04-Progressive-Design.md) in a later post 
- I have [Design of Design](https://www.amazon.com/Design-Essays-Computer-Scientist/dp/B005YWVRE2) to thank for much of my understanding of design process and design across disciplines.
- Mark Seemann has one of the best descriptions of [Open-Closed architecture](https://blog.ploeh.dk/2013/12/03/layers-onions-ports-adapters-its-all-the-same/) I've encountered
