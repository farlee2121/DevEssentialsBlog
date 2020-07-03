---
layout: post
tags: [Languages, Functional Programming, Design Thinking,
        Pivotal Insights]
excerpt: null
series: Language-Limited Thought
series_description: Exploring how different languages equip us to solve different design problems
---

# Result Types

Recap: this 

Problem Statement: The happy path returns a value, but the behavior has well-known (expected) error states that should be handled.

Concrete examples
-  Edit user details (Success, Unauthorized, Invalid data,... )
-  Fetch data (Success/value, not found, parent data doesn't exist,...)
-  Parsing (Success/value, Reasons it couldn't parse)
-  Network calls (Success/value, Not available, Errored call, Wrong endpoint, ...)

Result types is our first design problem because it can be expressed in C#, but is a bit awkward. Plus, it leaves us with some nice lessons to fold back into C#.

Solutions in C#
 - often, people just forget error states
 - Exceptions
   - always felt wrong. Known error states are not exceptions, they should be part of the flow
 - Stringly-typed error states (all states dumped into string, or worse, null/special values)
   - fortunately was steered from this early on
 - Custom return types w/ enums
 - Generics / SaveResult
   - doesn't inherit well. hard to get values out

Nullable - exists, but binary and awkward in c# or verbose

Still end up with check all the way up

Core failure, no consistent notion of sometimes, verbose

# Functional Approach
 - discriminated unions. more than just sometimes a value, it's any kind of OR
 - Map and Bind (monad, but not necessary to understand)
 - railway-oriented (map and bind let you shuffle error handling to the side)


Mapping back
 - generic and less awkward
 - railway, pattern match


Result type
- difficult in c# because c# doesn't cope with the idea of sometimes. 
  - Stingly-typed
  - typed per-case
    - lot of extra type defs
  - Generic and awkward
    - result type don't generally need to be interchangeable 

- disciminated union (OR types)

Also cover nullables here?
- Again, a "somtimes" expression. C# has nullables but the artifact of null reference types makes them nasty
- this is really a monad, but I'll direct you to a different blog for that
- options maps back to c# alright, but is syntactically noisy
- can map the f# implementation back to c# 
  -  a generic with two type args, a result value and an error value. Result and error types could be enums, polymorphic, etc
     -  i.e. Error<TStateEnum>{ State, Message} or IError {GetMessage} an case on type is (this pattern matching is taken from f#)
  -  F# can handle arbitrary types at one level though if you get off the standard track

## Further Reading
- https://fsharpforfunandprofit.com/posts/recipe-part2/
- https://fsharpforfunandprofit.com/posts/against-railway-oriented-programming/