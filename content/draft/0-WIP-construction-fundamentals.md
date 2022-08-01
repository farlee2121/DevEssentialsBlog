---
draft: true
---

I'm thinking about a presentation or a post where I have a limited amount of time to explain good construction. What would I talk about?
- !!! Understanding is king - all the other techniques are about improving understanding
- Naming
- Principle of proximity
  - applies to variables, functions, files (assemblies)
- Limit scope
  - at function level we want expressions rather than mutations. They minimize lifetimes, keep stories in one place limits indirection and side-effects as well
  - applies for values, functions, abstractions, etc. 
  - Want as little in global scope as possible. 
  - Function-scope w/ parameters for external dependencies is usually easiest to follow
  - information hiding - just because a function is small doesn't mean it has small conceptual reach. We want minimal conceptual reach (show example of coupling via shared data)
  - TODO: might need to talk about expressions separately because they touch on so many good practices
- Indenting and white-space
- Totality: clear in and out expectations enumerated in signature, no surprises 
  - principle of least surprise?
- Contain side-effects?

Process elements
- Preparatory refactoring: small complete units of work to the max
- scientific debugging
  - can probably demote because I'll cover it in critical thinking
- TDD / tests as refinement and speed enhancer (how would I split this with the testing responsibility)


Order of scope precedence (limit exposure)
- function local (don't hesitate to break out private functions)
- function parameter
- private class functions?
- private class data (i.e. config via constructor, rarely should be mutable)
- internal / package level access
- public constants
- data accessed via methods from some dependency
- Never use
  - global mutable data
  - note: anything public on a class becomes part of the global namespace and can be depended on. Direct access of persisted data (e.g. database, file system) is also global access unless that responsibility is intentionally contained to one component


If I could only pick 2:
- naming
- Preparatory refactoring


Hypothesis: I think construction may need split in two, one for low-level design and one for process
- i'm starting to change my mind. I think the way of working may help reinforce the way we design


## What is the layout of construction techniques?

It has a lot to do with your programming paradigm

Some techniques
- DbC
- type-driven
- event sourcing?
- table-driven
- "inside-out" refactoring
- polymorphism
- Patterns
- state machines

Clarity (thus naming, scope, info hiding, coupling) are always relevant

What have other books on the subject included?
- Clean Code
  - naming
  - comments
  - functions, parameters
  - objects & data structures
  - comments
  - formatting
  - boundaries (hiding ideas outside domain)
  - emergence & successive refinement 
  - concurrency (why?)
  - !!! smells and heuristics 
    - these embody a lot of situational decisions that are hard to systemize
- Code Complete
- Pragmatic Programmer 


## Presentation Outline


Key motivators: Information hiding, humble programmer (limited brain), Stable Incremental Additive
- these have a sort of progression
- they apply to both our design approach and our process, the what and how

domain + info hiding = breaking off a sub-problem
- recall iterating to good enough / design tree
- TODO: make sure I define domain

Preparatory Refactoring
- make the new feature easy, then add the feature
- refactoring done in self-contained steps valuable on their own
- Reference CI, but don't go deep

CROSS:/Concrete consequence: Commit frequently in complete units of work
- this takes practice and discipline
- forces you to pick one focused task at a time, think in small units of work


What do these increments of work look like?
- start with a test -> reminds us of our goal and gives us a clear point to stop and commit
  - test is, of course, written in terms of the domain problem. There's a whole other presentation for this
- limit scope -> limit change size when refactoring
- more semantically focused units -> reduced change scope on refactor
- may need to multi-step migration to be non-breaking

So, name to semantics in everything. Scope of semantic changes with scope of symbol
- again, a motivation to keep scope small. Makes naming easier
- show examples of global, package level, class-level, local, loop/lambda



## Education techniques not to forget

- curiosity
- advanced organizer (give them structure to organize info)
- Continually drive back to overarching structure
- motivation: never get to far from concrete. Lead with issues they've likely experienced as much as possible
- practice: think of how I can give them a chance to apply what they've learned
- predict: have them consider questions and ideas before giving answers


## Testing presentation in light of construction

There are many ways to write tests. As I believe programming is problem modelling. That, of course, also applies to the tests.
Tests encode the requirement and are very similar to a "definition of done" you might see in a work item

How do we reflect requirements (should this be quick with bulk to follow the tangles?)
- name relative to domain (e.g. gherkin-style)
- keep test abstracted from system
- Keep test reading clearly (should be able to see situation -> action -> outcome)
  - Sometime Arrange Act Assert, Given When Then
  - use a convention like naming expected / actual
  - minimal assertions (so wholistic picture of situation is seen, use a "world"/state)

Ways tests get tangled
- system details: cleanup/teardown (i.e. db, dependency setup), awkward apis
- coupling (shared resources between tests) -> isolation 
- flake -> also generally isolation, but may also be indeterminate state (dates, etc). -> test should be able to set any state / expectations in the test
- insufficiently expressive tools (e.g. need deep compare/better equality, need property so show relationship over example)

Come back to recommended approach now that we've seen the ways it can go wrong
- when done? -> thorns around gold (programattic consistency) + domain definition of done (tested all things users expect)

somehow need to address scope of testing (Unit? integration? etc.. yes. Done well, the scope is a matter of configuration)


I notice this is primarily developer testing. Domain may require tests of other sorts
- operational profile testing -> useful for ensuring system can handle data and loads it expects
- load testing -> graceful response under heavy load
- chaos testing -> graceful response in unfavorable operating conditions (failed equipment, failed networks, weird inputs, etc)
- ... can add many other tools for expectations here

TODO: I should review swebok testing info and make sure I address what it found important
- code-based techniques -> only care about public endpoint. Knowledge of code might be a guide for you to realize usage you hadn't considered
  - alternative include: heuristic approaches, 
- random vs example testing -> definitely think these should be worked in. I think I should cover it at least some in talking about properties.
  - Maybe talk about how most people think of *example-based* test, but domain expectations also often consider relationships i.e. data I save can be retrieved for any data, doing thing then it's reverse restores the original state (add/delete), for __ action order doesn't matter

common issues they've likely faced
- flaky tests
- excessive mocks
- fragile tests
- writing tests just for code coverage
- not knowing what is enough testing, feeling intimidated trying to start testing
  - feeling slowed by writing tests
  - !!!: potential hook, have your tests written for you (get them from task requirements)
- trying to back in tests on existing code

## Design

The most important concepts
- ports and adapters
- SOLID (strongly tied to ports and adapters)
- information hiding (strongly tied to scope)
- DDD (domain, encode understanding)

Performance wise: CQRS, more about breaking immediate consistency and caching than local optimizations


## Testing
- case selection: 
  - thorns around gold, requirements/BDD
- When are you done? -> completeness measures (e.g. some decide with knowledge of code, but I think tests focus on the contract. Paired with total intrefaces you can write a good test suite from signature + BDD style requirements. Must consider sequence behavior, behavior for different data)
  - property tests cover data well, mutation tests ensure logical coverage
- testing as design, and as process driver (increment condition)

## Maintenance

- CI/CD
- logging
- ??? Should probably survey some devops people for this responsibility

!!! OK, and probably good, to admit in some sections that I'm not an expert and that I've leaned on experts (and also experimented myself) to form practice list

## SCM

Source control, especially Git. Otherwise more tied to quality practices. Probably doesn't need it's own section

## Quality

- SQC / Formal Inspection
- Retrospectives, process improvement boards
  - should have some baseline so improvements accumulate instead of cycle

## Process / Methods

- Agile
- Stable, incremental, additive

## Thinking skills
- ducks
  - pro/con
  - boundary
  - equivalence classes
- threat matrix
- essence vs accident


TODO: consider revisiting a casual presentation on critical core of practices in view of SWEBOK overview
- probably present before releasing as a blog post