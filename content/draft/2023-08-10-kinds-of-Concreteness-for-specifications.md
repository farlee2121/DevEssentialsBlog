---
date: 2023-08-10
tags: [Requirements, Project Management, Shape Up]
title: Kinds of Concreteness in Work Specification
---

[Shape up](https://basecamp.com/shapeup) suggests too much concreteness is harmful in work specifications. I think the issue may be kind, not degree, of concreteness.
<!--more-->

## Brief context

Basecamp created their own approach to project management called [Shape Up](https://basecamp.com/shapeup/). It's an very interesting and quick read.

Two core elements of their approach are work shaping and the pitch.

Before any idea can be considered for work, it first has to be [shaped](https://basecamp.com/shapeup/1.1-chapter-02). Shaping explores the problem to ensure we understand it and a solution exists that should fit in the amount of time the company wants to invest. 

A [pitch](https://basecamp.com/shapeup/1.5-chapter-06) is refined out of the shaping exploration. The pitch explains the problem and the gist of the expected solution. It's intended both to inform managers deciding work to schedule and set the high-level direction for implementation.

## Problems with concreteness

A key stumbling block Shape Up hammers home with pitches is the level of concreteness. 

Detailed artifact like mocks and wireframes make lots of decisions about the final appearance and design of the work. These decsions are being made without the context of implementation. The planner has little to prevent them from making decisions that are hard to implement for hidden reasons when there may be many equally good but easier solutions. The decisions may not even be important, they're just there because *some* decision had to me made to produce the mock/wireframe. The decisions, however arbitrary, will baseline an implementer's understanding of the work and thus results in unnecessary complexity.

 
## Kinds of Concreteness

I think the Basecamp team identified a real and significant problem with high-fidelity mocks early in the design process.

However, I'm not sure the issue here is the level of concreteness. I think it might be the *kind* of concretess. What details are we making concrete. 

I strongly believe in [better wrong than vague](https://spencerfarley.com/2022/06/16/1-software-as-clarity/#better-wrong-than-vague) because vagueness tempts us to sweep problems down the line. It complicates the already complicated task of cross-functional communication, or just communication in general.

And, I don't think Shape Up disagrees. They go to great lengths to prepare well defined problems and clear direction.

So, what is being made concrete? What concreteness do we want in our work specifications?

### Problem Concreteness

I suggest we do want to be very concrete about the problem being solved. Here are artifacts I think are concrete, but problem-focused
- Core value of the expected value
  - Examples of where users currently struggle 
  - Examples of customer requests
  - Examples of customer workarounds to the current problem (Shape Up actually [suggests including these](https://basecamp.com/shapeup/1.5-chapter-06#examples))
- [Appetite](https://basecamp.com/shapeup/1.2-chapter-03#setting-the-appetite), or how much investment the problem is worth to the company
- Other constraints or conflicts
  - critical events the feature should be ready for
  - deals that might depend on the feature
  - special resources the project may require
  - other design elements or value props we want to be sure not to conflict with

These artifacts are all very concrete, but they're concrete about the problem and not the solution. They limit the danger of accidental solution complexity while improving the implementer's awareness of expected value.

I considered other tools, like acceptance criteria, but decided not to include them in this list.
I've too often seen acceptance criteria dive into fine-grained implementation details. Acceptance criteria are good, but they can tempt us into concreteness about the solution. I think the above artifacts both provide more context and less temptation to solutionize.

I also considered Event Storms, but I'm not sure how I'd categorize them. Event storms are a modeling tool. They describe processes more than define problems. That model can certainly inform our understanding of problems and shape work, but I'm still not sure how I'd relate event storms to this exploration of concreteness. Perhaps such flexible models are a mechanism, not a category, of concreteness. Perhaps event storming is more discovery tool than problem specifier.

## Solution Concreteness

The above problem-focused artifacts are enough to start exploring solutions, but not enough to hold someone accountable for delivering a solution. As Shape Up points out, we also need to feel confident the problem has a solution fitting the constraints before we expect someone to deliver it.

This is where solution concreteness, like with mocks, can be a problem.

I like the solutions Shape Up proposes.

Breadboarding is like wireframing without the pictures. It identifies the key navigation locations as headers, key interactions as a list of text below the headers, and uses connecting lines to show flow between these groups. Here's a [great visual example](https://basecamp.com/shapeup/1.3-chapter-04#breadboarding).

[Fat marker sketches](https://basecamp.com/shapeup/1.3-chapter-04#fat-marker-sketches) are wireframes, but draws with a very large marker tip to limit the temptation for detail.
These still require more discipline to choose the right level of detail, but provide a faster intuition of the solution.

Acceptance criteria could work too, but it's important to keep the criteria focused on outcomes and only the most essential interactions.

## Conclusion

I think Shape Up identified a significant problem with accidental complexity from over detailed designs early in the process. 
However, I don't think concreteness in general is the problem. Rather, I think the problem is the kind of concreteness. It's good to get concrete with examples and constraints of the problem being solved. It's more dangerous, but to some degree still necessary, to use detailed concrete artifacts when exploring solutions. Shape Up offers some interesting tools for combating the temptation for unnecessary detail. 



<!-- note a key theme here is alignment, especially by reducing accidental complexity in alignment. Appetite reduces accidental misalignment about value. Lo-fi mocks reduce accidental complexity about implementation. These techniques try to better focus the most essential aspect of each phase and leave everthing else to those closer to the work (who thus have better context and shorter cycles to address issues there) 

I'm not sure they see it this way, but its a thread I notice because I look for in just about everthing. It is my most fundamental software view of software https://spencerfarley.com/2022/10/21/five-foundational-beliefs/#understand-the-problem-->