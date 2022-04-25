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