---
date: 2022-10-16
tags: []
title: Common Software Design Terms
---

Principles, patterns, and practices are common terms in software design, yet I've had a surprisingly hard time 
finding official definitions. Here I'll try to define these terms and differentiate them.

I've also included other software design terms that I felt relevant and potentially nebulous. For each term I try to reference some official definition, informally explain the term, relate it to other design concepts, and provide examples. 

I commonly reference the [Software Engineering Body of Knowledge (SWEBOK)](https://www.computer.org/education/bodies-of-knowledge/software-engineering/v3).

<!-- Give some examples. Compare and contrast the terms against similar terms. focus on the value each category provides (like how my other post noticed principles are a compass. contrast with heuristic... heuristic is like moss on a tree, moss isn't always on the north but it can still give you a way to orient )

TODO: flesh out analogies
- pattern is like sign posts. You can't just plop copies of the same sign everywhere. Each sign needs to be adapted to the context it is used. Still, we know the purpose of signs and can reliably look for them to inform our direction 
- Practice: 
- Convention: is like the side of the road you drive on. It doesn't matter right or left, it matters that everyone does it the same.-->

<!-- Other potential terms
- driver
- methods and models
- library vs framework -->

## Principle

A principle is "a comprehensive and fundamental law, doctrine, or assumption". Software design principles are key notions that provide the basis for many different software  design approaches and concepts. (Extracts from SWEBOK 2.1.4)

<!-- https://en.wikipedia.org/wiki/Visual_design_elements_and_principles#Principles_of_the_design_of_the_art
https://ieeexplore.ieee.org/document/6301346
https://en.wikipedia.org/wiki/Software_design_pattern -->


### Explanation
Principles condense knowledge about what makes software good or bad. They set out our most fundamental goals, qualities, and guidelines for writing software. As such, they are often more abstract and qualitative. 

Principles isolate qualities of good software and thus tend to be the same across contexts like teams or problem type.  

Practices, heuristics and other design tools are ultimately in service of achieving principles.

### Examples

- [SOLID](https://en.wikipedia.org/wiki/SOLID)
- [Information Hiding](https://en.wikipedia.org/wiki/Information_hiding)
- [Abstraction](https://en.wikipedia.org/wiki/Abstraction_principle_(computer_programming))
- [Robustness (Postel's Law)](https://en.wikipedia.org/wiki/Robustness_principle)
- [Separation of Concerns](https://en.wikipedia.org/wiki/Separation_of_concerns)




## Pattern

A design pattern is a common solution to a common problem in a given context (SWEBOK 2.3.3). Or, "Each pattern describes a problem which occurs over and over again in our environment,  and then describes the core of the solution to that problem, in such a way that you can use this solution a million times over, without ever doing it the same way twice" (Christopher Alexander quoted by [Design Patterns](https://en.wikipedia.org/wiki/Design_Patterns), the book that formalized design patterns for software)

### Explanation
Patterns are a sort of solution template for common problems that can't be solved with code reuse. 

Patterns don't requisitely follow principles. They can be applied incorrectly. Patterns, however, do expand our toolbox for satisfying principles in common situations and improve shared understanding of code design.

Well defined patterns also describe pattern forces, or the challenges/conditions that motivate pattern as well as trade-offs. These forces and trade-offs often relate the pattern back to achieving principles.
  


### Examples
Wikipedia collected a [large list of patterns](https://en.wikipedia.org/wiki/Software_design_pattern)

Some common ones
- [Singleton](https://en.wikipedia.org/wiki/Software_design_pattern)
- [Strategy](https://en.wikipedia.org/wiki/Strategy_pattern)
- [Command](https://en.wikipedia.org/wiki/Command_pattern)
- [Observer](https://en.wikipedia.org/wiki/Observer_pattern)
- [Decorator](https://en.wikipedia.org/wiki/Decorator_pattern)
- [Chain-of-responsibility](https://en.wikipedia.org/wiki/Chain-of-responsibility_pattern)
- [Constructor Injection](https://en.wikipedia.org/wiki/Dependency_injection#Constructor_injection)

Some patterns have even become common language constructs like 
- [Iterator](https://en.wikipedia.org/wiki/Iterator_pattern)
- [Lock](https://en.wikipedia.org/wiki/Lock_(computer_science))



## Practice

### Formal Definition

The customary, habitual, or expected procedure or way of doing of something (Oxford dictionary).

### Explanation

Practices are a way of doing things. Practices generally provide guidance for achieving principles in typical activities. You could say they are a kind of applied how-to. 

There is no set of practices that applies uniformly for every software project. Practices must be selected and adjusted based on context. Though, some practices are effectively universal in some form (i.e. [source control](https://en.wikipedia.org/wiki/Version_control)).

### Examples

- [Source control](https://en.wikipedia.org/wiki/Version_control)
- Pull requests
- Code Reviews
- Test-Driven Development
- Unit testing
- Work item tracking



## Convention
Generally refers to [coding conventions](https://en.wikipedia.org/wiki/Coding_conventions) which are "a set of guidelines for a specific programming language that recommend programming style, practices, and methods for each aspect of a program written in that language. These conventions usually cover file organization, indentation, comments, declarations, statements, white space, naming conventions, programming practices, programming principles, programming rules of thumb, architectural best practices, etc."

### Explanation
> Style is the dress of thought, and a well-dressed thought, like a well-dressed man, appears to great advantage  
> \- Lord Chesterfield quoted in [Design of Design](https://en.wikipedia.org/wiki/The_Design_of_Design)

Conventions set rules for decisions like how to name classes, how to use whitespace, how to split files into folders, etc. 

Conventions aren't right or wrong, it's consistency that matters. Setting rules for frequent decisions promotes consistency, and consistency improves understandability. Conventions also reduce decision fatigue and prevent arguments for micro-decisions where the specific decision matters less than consistency, like casing of names. 

Conventions overlap with patterns. Some patterns set conventions for how to separate responsibilities or where certain kinds of code live. It's also generally a good convention to use the pattern name in the code when a pattern is applied. For example, `recipeAccessSingleton` uses patterns to communicate a lot about the purpose and lifetime of the value.

### Examples
- [Name cases](https://en.wikipedia.org/wiki/Naming_convention_(programming)#Examples_of_multiple-word_identifier_formats): camelCase, PascalCase, kebab-case, snake_case, UPPERCASE, etc
- Starting private member names with an underscore like `_internalMember`
- Whether or not curly braces start on a new line
- Indentation size
- Use pattern names in constructs that use them like `iAmAValueSingleton` or `calculateThingStrategy`
- Grouping files by service they 



## Heuristic

"Heuristic methods are those experience-based software engineering methods that have been and are fairly widely practiced in the software industry" (SWEBOK 9.4.1)

### Explanation

### Examples
- Integrate code at least twice a day


## Smell
https://en.wikipedia.org/wiki/Code_smell

### Explanation

Heuristics for bad design issues

### Examples


## Architecture

(SWEBOK 2.3) "meaning how software is structured and how the software’s components interact"
  - "the set of structures needed to reason about the system, which comprise software elements, relations among them, and properties of both"
  - architectural style "a specialization of element and relation types, together with a set of constraints on how they can be used"

### Explanation

Architecture is notoriously hard to define.

### Examples


<!-- 
## Anti-pattern

### Formal Definition

### Explanation

### Examples -->


