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
