---
date: 2023-02-03
tags: []
title: Common Software Design Terms
---

Principles, patterns, and practices are common terms in software design, yet I've had a surprisingly hard time 
finding official definitions. Here I'll try to define these terms and differentiate them.
<!--more-->

I've also included other software design terms that I felt relevant and potentially nebulous. For each term I try to reference some official definition, informally explain the term, relate it to other design concepts, and provide examples. 

I frequently reference the [Software Engineering Body of Knowledge (SWEBOK)](https://www.computer.org/education/bodies-of-knowledge/software-engineering/v3).

<!-- Give some examples. Compare and contrast the terms against similar terms. focus on the value each category provides (like how my other post noticed principles are a compass. contrast with heuristic...  )

TODO: flesh out analogies
- principle: more like a compass than an odometer
- pattern is like sign posts. You can't just plop copies of the same sign everywhere. Each sign needs to be adapted to the context it is used in. Still, we know the purpose of signs and can reliably look for them to inform our direction 
- Practice: Is like packing food? Maybe just skip this one
- Convention: is like the side of the road you drive on. It doesn't matter right or left, it matters that everyone does it the same.
- Heuristics are like moss on a tree. Moss isn't always on the north but it can still give you a way to orient yourself
- Architecture: Architecture is like a trip itinerary. It identifies the main places we'll go and how they fit into the overall plan. It needs to balance detail with freedom so everyone can enjoy the trip and be back on the bus on time.
-->

<!-- Other potential terms
- driver
- methods and models
- library vs framework -->

## Principle

### Formal Definition
"A principle is "a comprehensive and fundamental law, doctrine, or assumption". Software design principles are key notions that provide the basis for many different software design approaches and concepts."   
\- SWEBOK 2.1.4

<!-- https://en.wikipedia.org/wiki/Visual_design_elements_and_principles#Principles_of_the_design_of_the_art
https://ieeexplore.ieee.org/document/6301346
https://en.wikipedia.org/wiki/Software_design_pattern -->


### Explanation
Principles clarify underlying factors that make software good or bad. They define our most fundamental goals, qualities, and guidelines for writing software. As such, they are often somewhat abstract and qualitative. You could say principles are [more like a compass than an odometer](https://spencerfarley.com/2023/01/06/are-principles-smart/#what-are-principles). 
They point the direction, but they don't tell you have far you've gone.

Principles tend to be the same across contexts like teams, languages, or systems since they focus on fundamental ideas.

Practices, heuristics and other design tools are ultimately in service of achieving principles.

### Examples

- [SOLID](https://en.wikipedia.org/wiki/SOLID)
- [Information Hiding](https://en.wikipedia.org/wiki/Information_hiding)
- [Abstraction](https://en.wikipedia.org/wiki/Abstraction_principle_(computer_programming))
- [Robustness (Postel's Law)](https://en.wikipedia.org/wiki/Robustness_principle)
- [Separation of Concerns](https://en.wikipedia.org/wiki/Separation_of_concerns)



## Pattern

### Formal Definition
"A design pattern is a common solution to a common problem in a given context"  
\- SWEBOK 2.3.3 quoting The Unified Software Development Process

"Each pattern describes a problem which occurs over and over again in our environment,  and then describes the core of the solution to that problem, in such a way that you can use this solution a million times over, without ever doing it the same way twice"  
\- Christopher Alexander quoted by [Design Patterns](https://en.wikipedia.org/wiki/Design_Patterns), the book that formalized design patterns for software

### Explanation
Patterns are a sort of solution template for common problems that can't be solved with code reuse. 

Patterns don't requisitely follow principles. They can be applied incorrectly. Patterns, however, do expand our toolbox for satisfying principles in common situations and improve shared understanding of code design.

Well defined patterns also describe pattern forces, or the challenges/conditions that motivate that pattern as well as trade-offs. These forces and trade-offs often relate the pattern back to achieving principles.
  
[Anti-patterns](https://en.wikipedia.org/wiki/Anti-pattern) are common solutions to common problems that tend to be ineffective. In other words, patterns that should be avoided. 

Patterns orignate from [building architecture](https://en.wikipedia.org/wiki/Pattern_language). A simple example would be doors. Doors come in all kinds of shapes, sizes, materials, and configurations. Still, no one is confused if you say "there should be a door here". We understand what doors are used for and can agree on their functional placement without details of the specific door.

### Examples
Wikipedia has collected a [large list of patterns](https://en.wikipedia.org/wiki/Software_design_pattern)

Some common patterns include
- [Singleton](https://en.wikipedia.org/wiki/Software_design_pattern)
- [Strategy](https://en.wikipedia.org/wiki/Strategy_pattern)
- [Command](https://en.wikipedia.org/wiki/Command_pattern)
- [Observer](https://en.wikipedia.org/wiki/Observer_pattern)
- [Decorator](https://en.wikipedia.org/wiki/Decorator_pattern)
- [Chain-of-responsibility](https://en.wikipedia.org/wiki/Chain-of-responsibility_pattern)
- [Constructor Injection](https://en.wikipedia.org/wiki/Dependency_injection#Constructor_injection)

Some patterns have become so common they're integrated into programming languages. For example
- [Iterator](https://en.wikipedia.org/wiki/Iterator_pattern)
- [Lock](https://en.wikipedia.org/wiki/Lock_(computer_science))

## Practice

### Formal Definition

"The customary, habitual, or expected procedure or way of doing of something"  
\- Oxford dictionary

### Explanation

Practices are a way of doing things. Practices provide guidance for achieving principles in typical activities. You could say they are a kind of applied how-to. 

There is no set of practices that applies uniformly for every software project. Practices must be selected and adjusted based on context. Though, some practices are effectively universal in some form (i.e. [source control](https://en.wikipedia.org/wiki/Version_control)).

### Examples

- [Source control](https://en.wikipedia.org/wiki/Version_control)
- Pull requests
- Code Reviews
- Test-Driven Development
- Unit testing
- Work item tracking



## Convention

### Formal Definition
Generally refers to [coding conventions](https://en.wikipedia.org/wiki/Coding_conventions) which are "a set of guidelines for a specific programming language that recommend programming style, practices, and methods for each aspect of a program written in that language. These conventions usually cover file organization, indentation, comments, declarations, statements, white space, naming conventions, programming practices, programming principles, programming rules of thumb, architectural best practices, etc."

### Explanation
> Style is the dress of thought, and a well-dressed thought, like a well-dressed man, appears to great advantage  
> \- Lord Chesterfield quoted in [Design of Design](https://en.wikipedia.org/wiki/The_Design_of_Design)

Conventions set rules for common decisions. For example, how to name classes, how to use whitespace, how to split files into folders, etc. 

Conventions aren't right or wrong, it's consistency that matters. Setting rules for frequent decisions promotes consistency, and consistency improves understandability. Conventions also reduce decision fatigue and prevent arguments for micro-decisions where the specific decision matters less than consistency, like casing of names. 

Conventions overlap with patterns. Some patterns set conventions for how to separate responsibilities or where certain kinds of code live. It's also generally a good convention to use the pattern name in the code when a pattern is applied. For example, `recipeAccessSingleton` uses patterns to communicate a lot about the purpose and lifetime of the value. Specifically `recipeAccessSingleton` would be responsible for reading and writing recipe data ("access" to that data) and "singleton" means this value will be the same RecipeAccess instance for the life of the program.

Conventions may highlight patterns and practices that a team prefers or prefers to avoid.
A good set of conventions should also consider underlying design goals (principles) to ensure the conventions align with those goals. For example, a convention of using global variables (for any reason) would undermine a wide range of software principles.

### Examples
- [Name cases](https://en.wikipedia.org/wiki/Naming_convention_(programming)#Examples_of_multiple-word_identifier_formats): camelCase, PascalCase, kebab-case, snake_case, UPPERCASE, etc
- Starting private member names with an underscore like `_internalMember`
- Whether or not curly braces start on a new line
- Indentation size
- Use pattern names in constructs that use them like `iAmAValueSingleton` or `calculateThingStrategy`
- Grouping files by domain responsibilities


## Heuristic

### Formal Definition
"Heuristic methods are those experience-based software engineering methods that have been and are fairly widely practiced in the software industry"  
\- SWEBOK 9.4.1

Heuristic is [generally defined](https://en.wikipedia.org/wiki/Heuristic) as "any approach to problem solving or self-discovery that employs a practical method that is not guaranteed to be optimal, perfect, or rational, but is nevertheless sufficient for reaching an immediate, short-term goal or approximation". "Heuristics are the strategies derived from previous experiences with similar problems. These strategies depend on using readily accessible, though loosely applicable, information to control problem solving"

### Explanation

Heuristics are rules of thumb. They define quick tests to that gauge if you're work is on the right track. Unlike principles, they are not rigorous or certain. However, they tend to be easier to follow and require less time to internalize compared to principles.

Violating a heuristic doesn't mean your solution is necessarily bad and meeting he heuristic doesn't mean it's necessarily good. To quote a certain pirate "they be more like guidelines". 

[Smells](https://en.wikipedia.org/wiki/Code_smell) are defect-focused heuristics. They suggest when something may be wrong rather than when something is right.

<!-- Progressive refinement of the software mod -
els leads to a detailed design. The detailed 
design  is  then  either  evolved  through  suc-
cessive iteration or transformed (using some 
mechanism)  into  the  implementation  view 
of  the  model -->

### Examples
- Integrate code at least twice a day
- If it's hard to name it's probably a poor abstraction or unfocused code
- Only 7 +/- 2 concepts at a time (i.e. number of function parameters, number of methods on a class, max cyclomatic complexity, etc)
- A function should read like a sentence
- X out function names and see if you can still understand what the function does from the types

Smells
- [Primitive obsession](https://blog.ploeh.dk/2015/01/19/from-primitive-obsession-to-domain-modelling/)
- Reassigning a variable
- Long method
- Large parameter list
- Large class
- [Feature Envy](https://refactoring.guru/smells/feature-envy)
- Deeply nested code
- Using null
- Mutating data

## Architecture

### Formal Definition
SWEBOK section 2.3 defines architecture as "how software is structured and how the software’s components interact" or "the set of structures needed to reason about the system, which comprise software elements, relations among them, and properties of both".

SWEBOK insightfully separately defines *architectural style* as "a specialization of element and relation types, together with a set of constraints on how they can be used".

Both of these are commonly referred to as architecture.

### Explanation

Architecture is notoriously hard to define. Part of the issue is multiple ways the term is used. It can refer to the main components of a system and how they interact, but it can also refer to patterns that guide what kinds of components and interactions are allowed. In general, the first is fairly tangible and the second (architectural styles) has few well-defined options.

Another challenge with architecture is the overlap with patterns. It can be hard to discern what consitutes a design pattern versus an architecture pattern. In truth, numerous patterns can be either depending on how you apply them. For example, batch, interpreter, pipes and filters, and model-view-controller can all fit into either category.

Unfortunately I don't have any silver bullets here. Here are some differences to consider. Architecture patterns tend to focus more on Information Hiding, coupling, and other principles that keep major portions of the system independent and stable. Construction and design patterns tend to focus more on solving individual problems. Architectural decisions tend to effect how the company can divide teams and how those teams work together. Architecture is big strokes while design patterns are smaller strokes.

A good architecture style should default developers to good use of principles, particularly principles regarding scope and communication, like Information Hiding or the Robustness principle. 

### Examples

Architecture: Examples require a concrete system. Here are some posts I've written with sample diagrams
- [Open-closed Principle By Example](../../posts/Open-Closed-by-Example/2023-03-02-4-OCP-as-architecture.md)
- [Notification Case Study](../../posts/2020/2020-08-14-Notification-Design.md)
- [Async Case Study](../../posts/2020/2020-09-11-Background-Task-Refactor.md)

Architectural styles
- [Hexagonal Architecture](https://en.wikipedia.org/wiki/Hexagonal_architecture_(software)) / Ports and Adapters
- [Functional core, imperative shell](https://blog.ploeh.dk/2016/03/18/functional-architecture-is-ports-and-adapters/)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- Pipes and filters (think Unix / command line)
- Batch
- [iDesign](https://www.youtube.com/watch?v=Jxm2rgeuC6s)



