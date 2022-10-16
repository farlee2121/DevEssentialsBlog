---
date: 2022-10-16
tags: []
title: Common Software Design Terms
---

Principles, patterns, and practices are common terms in software design, yet I've had a surprisingly hard time 
finding official definitions. Here I'll try to define these terms and differentiate them.

<!-- https://en.wikipedia.org/wiki/Visual_design_elements_and_principles#Principles_of_the_design_of_the_art
https://ieeexplore.ieee.org/document/6301346
https://en.wikipedia.org/wiki/Software_design_pattern -->

<!-- TODO: consider reorganizing by term with sub-sections for formal def, informal def, and examples -->

## Formal definitions

The [Software Engineering Body of Knowledge (SWEBOK)](https://www.computer.org/education/bodies-of-knowledge/software-engineering/v3) comes to the rescue.
It provides definitions for common software design terms, and is about as official of a source as I could hope for.

- *Principle*: A principle is "a comprehensive and fundamental law, doctrine, or assumption". Software design principles are key notions that provide the basis for many different software  design approaches and concepts. (Extracts from SWEBOK 2.1.4)

- *Pattern*: A design pattern is a common solution to a common problem in a given context (SWEBOK 2.3.3). Or "Each pattern describes a problem which occurs over and over again in our environment,  and then describes the core of the solution to that problem, in such a way that you can use this solution a million times over, without ever doing it the same way twice" (Christopher Alexander quoted by Design Patterns, the book that formalized design patterns for software)

- *Practice*: the customary, habitual, or expected procedure or way of doing of something (Oxford dictionary)


## Informal Explanations

- *Principle*: Principles condense knowledge about what makes software good or bad. They set out our most fundamental goals, qualities, and guidelines for writing software. As such, they are often more abstract and qualitative. Principles, practices, heuristics and other design tools are ultimately in service of achieving principles.
  - Examples: [SOLID](https://en.wikipedia.org/wiki/SOLID), [Information Hiding](https://en.wikipedia.org/wiki/Information_hiding), [Abstraction](https://en.wikipedia.org/wiki/Abstraction_principle_(computer_programming)), [Robustness (Postel's Law)](https://en.wikipedia.org/wiki/Robustness_principle), [Separation of Concerns](https://en.wikipedia.org/wiki/Separation_of_concerns)

<!-- key differentiator is is that principles always apply while patterns, practices, etc are more contextual -->

- *Pattern*: Patterns are a sort of solution template for common problems that can't be solved with code reuse. Patterns don't requisitely follow principles. They can be applied incorrectly. Patterns, however, do expand our toolbox for satisfying principles in common situations and improve shared understanding of code design. Well defined patterns also describe pattern forces, or the challenges/conditions that motivate pattern as well as trade-offs. These forces and trade-offs often relate the pattern back to achieving principles.
  - [Examples](https://en.wikipedia.org/wiki/Software_design_pattern): [Singleton](https://en.wikipedia.org/wiki/Software_design_pattern), [Strategy](https://en.wikipedia.org/wiki/Strategy_pattern), [Command](https://en.wikipedia.org/wiki/Command_pattern), [Observer](https://en.wikipedia.org/wiki/Observer_pattern), [Decorator](https://en.wikipedia.org/wiki/Decorator_pattern), [Chain-of-responsibility](https://en.wikipedia.org/wiki/Chain-of-responsibility_pattern), [Constructor Injection](https://en.wikipedia.org/wiki/Dependency_injection#Constructor_injection)
  - Some patterns have even become common language constructs like [Iterator](https://en.wikipedia.org/wiki/Iterator_pattern) and [Lock](https://en.wikipedia.org/wiki/Lock_(computer_science))

- *Practice*: Practices are a way of doing things. Practices generally provide guidance for achieving principles in typical activities. You could say they are a kind of applied how-to. There is no set of practices that applies uniformly for every software project. Practices must be selected and adjusted based on context. Though, some practices are effectively universal in some form (i.e. [source control](https://en.wikipedia.org/wiki/Version_control)).
  - Examples: [source control](https://en.wikipedia.org/wiki/Version_control), [pull requests]()

## Additional Terms

Here are other common design terms lightly explained




Give some examples. Compare and contrast the terms against similar terms. focus on the value each category provides (like how my other post noticed principles are a compass. contrast with heuristic... heuristic is like moss on a tree, moss isn't always on the north but it can still give you a way to orient )

The words that get thrown around a lot
- Principle
- Practice
- Pattern
- Anti-pattern
- heuristic 
  - 9.4.1 "Heuristic methods are those experience-based software engineering methods that have been and are fairly widely practiced in the software industry"
- smell
- driver
- convention: Decides how a certain kind of decision should be made, like casing in names, the focus of names, spacing, etc. There isn't necessarily right or wrong, it's the consistency that matters.
- architecture (SWEBOK 2.3) "meaning how software is structured and how the software’s components interact"
  - "the set of structures needed to reason about the system, which comprise software elements, relations among them, and properties of both"
  - architectural style "a specialization of element and relation types, together with a set of constraints on how they can be used"
- library 
- framework

What about 
- method - not actually sure how this differs from practice
- models