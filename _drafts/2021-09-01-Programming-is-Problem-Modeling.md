---
layout: post
tags: [Design Thinking]
---
# Programming is Problem Modeling

<!-- TODO: this is a post worth having reviewed before I release it -->
<!-- TODO: align overall angle. The post is half visual experimentation, half dissertation on modeling -->
Code is often considered the goal of programming. This abjectly false. Programming is about understanding and representing problems. While this belief is expressed by many experts, the repercussions are many and nuanced. This is my latest attempt to communicate the idea clearly.

## Goals

Problem modeling permeates all aspects of software development. 
The primary ideas I want to communicate are

- Problem understanding evolves through the whole software lifecycle
  - Problem understanding can't be confined to requirements 
- Lifecycle / process artifacts are restatements of the same problem
- Problem understanding is fundamentally progressive
  - The problem changes over time
  - Understanding is naturally incomplete
- Lifecycle stages are not strictly sequential
- The problem is defined by user need
  - Success is defined by satisfaction of user need
- How each lifecycle stage refines the problem
- Lifecycle stages are an accumulation of problem clarity

I found this was too much to communicate in a single visual. So, I've split the idea across three key visuals and an established process:
- the software lifecycle as problem refinement
- the scientific method
- modeling as incremental progress to "good enough"
- volatility analysis as deeper understanding and sustainability

<!-- 
Secondary ideas I'd like to communicate 

- Software/developer needs constrain solutions to the problem, but are secondary
  - Examples: 
    - Developer time impacts schedule, but not individual functional expectations
    - Qual
    - maintainability impacts velocity and developer happiness
- There is no perfect design -->


## Software Lifecycle of Problem Understanding

![Lifecycle stages of problem refinement](../post-media/SWEBOK/problem-refinement-cycle.drawio.svg)

This first visual focuses on the relationship of lifecycle stages to problem modeling. 

The core is understanding the problem, which is defined by customer need and achieved through critical thinking. All progress is made by better understanding what our customer needs and how we can satisfy that need through our product or processes.

The outer layer is the lifecycle phases. Each phase outputs some artifact, and all artifacts are a restatement of the problem with additional details we've uncovered.

The middle layer states how [each lifecycle phase refines the problem](../_posts/2021-08-13-Swebok-transform-view.md). 
- Requirements define the problem enough to effectively consider solutions (SWEBOK chapter 1 intro or 1.7.1)
- Design refines the problem by considering tradeoffs between different solutions (SWEBOK 2.3.4). Tradeoffs should be weighed with stakeholders (SWEBOK 11.1.9)
- Construction states the problem in code (precise processes). Construction further refines the problem by weighing tradeoffs between potential solutions and forcing resolution of ambiguity 
- Testing measures how well our code matches our mental model for behavior and other expectation measures (SWEBOK 4.intro)
- Delivery makes our solution available for application by end users. Application to the real problem is the most important measure of success.
- Monitoring watches for changes in the problem or improvements in understanding that must be addressed in our solution

## Underlying Scientific Method

Notice how the lifecycle repeatedly refines understanding.
- identify a need
- identify a solution
- test the solution to make sure it fits the need
- Deliver the solution
- Repeat

The software lifecycle is the scientific process.

<a title="Efbrazil, CC BY-SA 4.0 &lt;https://creativecommons.org/licenses/by-sa/4.0&gt;, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:The_Scientific_Method.svg"><img width="512" alt="The Scientific Method" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/The_Scientific_Method.svg/512px-The_Scientific_Method.svg.png"></a>

These question/hypothesis/test loops underlie not only the lifecycle, but each individual activity as well. Each prototype, shadowing, user story, tradeoff analysis, unit test, and so on is a hypothesis about the problem. Testing each hypothesis compares our understanding against reality and refines what we know. These small tests add up and push us to a solution one increment at a time.


## Increment to Good Enough

![Good Enough target](../post-media/SWEBOK/iterative-good-enough.drawio.svg)


Each hypothesis/test cycle tells us something about the problem and solutions. These increments of progress interpolate to a final solution.

Once can consider lifecycle stages as benchmarks in these accumulated increments of understanding. Certain amounts of understanding may trigger review, change in process, or transfer of work that we see as lifecycle stages.

Note that there is no single perfect solution. Instead, there is a target of "good enough". Any solution that meets all known requirements falls in "good enough".
Conversely, satisfying requirements is our stop condition to consider work complete. 

> A designer knows he has achieved perfection not when there is nothing left to add, but when there is nothing left to take away. - Antoine de Saint-Exupery

Good requirements are essential. Bad requirements cause us to narrow in on the wrong solutions and consider work finished before it meets the actual customer need. The further off our requirements, the worse our solutions.

Fortunately, requirements mostly need to limit explorations to the right area. Problem understanding is refined through the programming lifecycle, adding new requirements to the "definition of done". This will shift our final "good enough" target, but also enables progressive discovery.

Undoubtedly, more requirements will also appear after work is delivered. This shifts target of "good enough" and we iterate to reach the new target just like before. 

It's important to note, requirements in our "definition of done" are not just behavior expectations ("functional requirements"). They should also include quality measurements like maintainability and defect rates. The customer may not realize how these non-functional requirements effect their outcomes, but they likely do want the results. For example, maintained productivity, low failure rates, and secure software. Quantifying and benchmarking these requirements is a whole topic of it's own. 


## Volatility Analysis as Essence Discovery
 
![Volatility analysis](../site-media/../post-media/IDesign-System/iDesignSolutionScubbing.png)

So far we've mostly explored how problem modeling applies to present work. However, problem modeling is even more important for managing the big picture of inevitable change.

Needs naturally change over time. New technologies are invented, regulations are enacted, businesses expand, etc. Businesses and software solutions must change to stay relevant. 

The key is how well the software adapts to the changes it faces, and how well our software adapts is largely dependent on how well we separate the true nature of our business from temporary coincidences. The traditional design terms are essence (true nature) and accident (coincidental qualities).

The true nature of the problem is often referred to as the "core domain" of our system. It is the fundamental business rules and should be stable. The coincidental qualities should be contained in as little of our system as possible. 

Put another way, understanding what is least likely to change in our system is an act of understanding the true nature of the problem we are solving. Aligning our code with that nature maximizes long term adaptability.

A good example is notifications. It is often fundamental to a process that people must be alerted of a software event. However, whether that notification is by email, text, mail (legal notice?), or triggers a company representative to make contact is very likely to change. Notifying is fundamental, delivery mechanism is "accident".

[Domain Driven Design](https://en.wikipedia.org/wiki/Domain-driven_design) and [Clean/hexagonal Architecture](https://en.wikipedia.org/wiki/Hexagonal_architecture_(software)) are two popular techniques that try to bring structure to this process.


## Conclusion

Programming is an exercise in understanding and modeling problems. 

At the it's most fundamental, this is cycles of the hypothesis testing and collaboration with customers to incrementally translate their problem into a solution. There is no perfect solution. Rather, a solution is good enough when it meets the needs of the customers.

Software lifecycle stages are not sequential self-contained steps. Rather, they are checkpoints of clarity while incrementally translating the problem to software. These checkpoints often trigger new techniques for clarification, and possibly team process to capture progress and verify quality.

Long term durability of software often depends on how well the design matches the nature of the problem being solved, centralizing the core nature of the business while keeping temporary details flexible.



## Further Reading
- [No Silver Bullets](https://www.cs.unc.edu/techreports/86-020.pdf) (article)
- [What is Software Design](https://www.developerdotstar.com/mag/articles/reeves_design.html) (article)
- [Design of Design](https://www.amazon.com/Design-Essays-Computer-Scientist/dp/0201362988) (book)
- [Domain Driven Design](https://www.amazon.com/Domain-Driven-Design-Tackling-Complexity-Software/dp/0321125215) (book)

## Similar Past Posts (from me) 

I've written a variety of previous posts covering different views on this underlying idea.
- [SWEBOK: Software Engineering As Problem Translation](../_posts/2021-08-13-Swebok-transform-view.md)
- [Going Fast is Going Well](../_posts/2021-01-29-Going-Fast-is-Going-Well.md)
- [What's your duck?](../_posts/2020-10-02-Whats-Your-Duck.md)
- [Requirements](../_posts/DevEssentials/2018-11-25-Requirements.md)
- [Quantified Communication (from customer to code)](../_posts/2021-03-19-Quantified-Communication-Customer-to-Code.md)

## SWEBOK Citations

<!-- > "The besetting mistake of expert designers is not designing the thing wrong, but designing the wrong thing" - Fred Brooks, Design of Design p. 167 -->

I don't expect you to take these statements of software truth on my word. Here are many of the key points taken directly from the [Software Engineering Body of Knowledge](../_posts/2021-07-30-SWEBOK-review.md).

Customer need defines "correct" software (heart of design process)
- Ch 11.1.9 Tradeoff analysis - software engineer must evaluate tradeoffs with stakeholders
- Ch 7.4.1 Customer satisfaction is principle goal of engineering management
- Ch 1.3.2 "The software engineer, first of all, must determine the real purpose of the software"

Software Engineering is Problem Modeling
- Ch 1.2.1 Requirements are refined through all lifecycle phases
- Ch 13.1.5 Software Engineering is a set of translations from plain language to executable code. The lifecycle phases refine the problem statement
- Ch 1.3.2 "The software engineer, first of all, must determine the real purpose of the software"

Problem understanding is fundamentally progressive
- Ch 1.7.1 Iteration is Fundamental
- Ch 1.7.1 Requirements *will* change
- Ch 1.7.1 No perfect requirement specification
- Ch 2.3.4 Design less of an activity more of a decision process
- Ch 12.5.1 "Good Enough" principle and RACE Reduce Accidents and Control Essence


<!-- I also strongly recommend learning [Domain Driven Design (DDD)](https://www.amazon.com/Domain-Driven-Design-Tackling-Complexity-Software/dp/0321125215). DDD is a popular design philosophy all about explicitly coupling our designs to domain (problem) understanding. DDD explores the discovery and application process in much more detail than I can here.  -->

<!-- Testing isn't optional
- Ch 4.intro "Software testing is, or should be, pervasive throughout the entire development and maintenance lifecycle" -->




<!-- "The quality of your questions determines the quality of your decisions"

  - in this vein, one visual is responsible for communicating connection to problem understanding, the other to progression of the understanding over time -->
