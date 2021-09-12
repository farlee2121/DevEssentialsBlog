---
layout: post
tags: [Design Thinking, Principles]

excerpt_separator: <!-- more -->
---

# Stable, Incremental, Additive

<!-- TODO: This is one worth having reviewed before I release it -->

Understanding why things work is exceptionally important for developers. Our [job is about modeling problems](TODO) and the variety of problems we solve requires a wide range of processes. The [Software Engineering Body of Knowledge](https://www.computer.org/education/bodies-of-knowledge/software-engineering/v3) states
"No ideal process, or set of processes, exists" "Software processes must be selected, adapted, and applied as appropriate for each project and each organizational context." (Ch 1.1 intro), and process without understanding leads to [frustrating lack of results](https://stevemcconnell.com/articles/cargo-cult-software-engineering/).

I believe that a common set of properties underlie the most successful practices in software. These practices are all incremental, stable, and additive.

<!-- more -->

<!-- ## General Motivations

Beyond my dislike of memorizing, there are significant reasons practitioners need to understand the reasons behind design and process. 

First, "No ideal process, or set of processes, exists" "Software processes must be selected, adapted, and applied as appropriate for each project and each organizational context." ([SWEBOK Ch 1.1 intro](https://www.computer.org/education/bodies-of-knowledge/software-engineering/v3)). Process without understanding leads to [frustrating lack of results](https://stevemcconnell.com/articles/cargo-cult-software-engineering/).

Second, learning research suggests [expertise is largely about forming deeper knowledge connections](../_posts/Summary-How-Learning-Works/2021-02-12-1-Knowledge-Types-and-Mastery.md) -->

## Design Forces

I don't propose that these properties are appropriate for all contexts. However, there are some key forces that make them appropriate for most software.

- *Shifting Environment*: most software solves problems in a shifting environment. Businesses, technologies, hardware, regulations, developer understanding and other factors shift over time.
- *Large Designs and Limited Human Brains*: Even moderate software systems easily range into hundreds of thousands of lines of code. All that code is [part of the design](https://www.developerdotstar.com/mag/articles/reeves_design.html). No individual can understand fully understand such a design, and [understanding is one of the most important limitations on our solutions](https://dl.acm.org/doi/10.1145/355604.361591). The less we need to understand at once, the better a design can be maintained and adapted.
- *Increasing Expectations*: Success generally brings more users with more diverse expectations. Our systems are expected to get better and solve more needs over time. This increases the size of our design, and redesign for added features quickly becomes an economic impossibility.
- *Understanding is incremental*: Software is problem modeling, and [understanding is incremental](https://en.wikipedia.org/wiki/Scientific_method). Our understanding changes as we interact with a problem even if the problem hasn't changed.
<!-- scientific process? -->

Note, these forces may be insignificant on small projects or overwritten by extreme requirements for efficiency, reliability, or security that sometimes require tighter integration.


## The Properties
These forces lead us to three properties befitting software process

- Stable: component is rarely effected by changes in other system components
- Incremental: value can be delivered in small complete chunks
- Additive: the chunks don't just replace each other, the value adds up over time

If any of these fail, you end up with a bad situation

- Stability failure: Characterized by heavy rework or fear of change. Hampers forward progress.
- Increment failure: Characterized by complex task dependencies, long times between delivered work, and high risk of delay or failure of the whole deliverable. Work is highly coupled causing ineffective division of work.
- Additive failure: Characterized by lateral movement (change rather than progress). This often involves, duplicated work or frequent modification of existing work. The pieces fail to be composable such that new work can build on what exists rather than change what exists

## Applications Beyond Code

This trio is really another view of the Single Responsibility Principle and Open/Closed Principles, but the way it's stated makes is easier to see in applications beyond code.

Here are some examples of practices that satisfy these properties across many applications. I'll explain the first few

- Software Architecture: 
  - Plugin-style architectures (Hexagonal, Clean Arch, Port and Adapters) are built around these properties. Each service owns it's abstractions to prevent change from external factors (stable). Owned dependencies also mean each service contains all the knowledge it needs to do it's job (incremental). Services are composed externally by adapting their abstractions (additive).
  - Similar examples: pipes and filters, message-based architectures 
- Requirements: 
  - Stories are self-contained definitions of need (stable). Each story should satisfy a need and provide value when it's completed (incremental). A story is only useful if it adds to the knowledge collected by previous stories (additive).
- Testing: 
  - Behavior-Driven testing like TestApi or Gherkin separate test definitions from code. The tests are thus much like stories, an expression of need independent from the system (stable). Each test provides value through verifying a new expectation (incremental, additive).
- Scientific Method: Each experiment defines a clear hypothesis then attempts to definitely prove or disprove it. Each experiment both establishes a fact and builds a foundation for further inquiry (stable, incremental, additive).
- Team/organization structures: The advent of devops has pushed many team organizations to vertically integrated teams. Each team owns it's features from requirements to production. Products are composed of many such team working in tandem and collaborating when needed. Each team is a stable unit delivering it's own unique value.
- Other
  - [Composition for low-level design](https://fsharpforfunandprofit.com/composition/)
- Change control: commits, pull-requests, etc
- Delivery: the whole devops and CI/CD movement

<!-- I feel like this will get too long. Maybe just explain a few -->

<!-- ???: do I need to mention cohesion and coupling? separation of concerns? Nah, I think mentioning SRP is enough for this post-->

## Conclusion

I believe stable, incremental, and additive is an underlying driver of process and design quality. These qualities stem from fundamental forces on software, describe common practices, explain common failures, and agree with existing principles. 

At the very least, they've served as a useful guide for selecting and adapting a personal set of practices. 

## Further Reading
- I have [Design of Design](https://www.amazon.com/Design-Essays-Computer-Scientist/dp/B005YWVRE2) to thank for much of my understanding of design process and design across disciplines.
