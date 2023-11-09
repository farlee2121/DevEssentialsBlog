---
title: todo
---

Placeholder for links that need filled

<!-- 

Emergency ideas
- Test API with Jest
- describe the performance gain in trx performance. Fell for fallacy of the in-memory doc selection being fast (not deep, ID lookup usually fast). Not the case here.
- Describe gotchas in ionide test debugging (need processid returned in console only when in debug mode, need to continue for breakpoints to load)
- .C# adding type aliases! https://learn.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-12#alias-any-type. A significant tool for domain modeling, especially if you want to incrementally refactor to semantic names
- useful randomness methods for in .NET 8 https://learn.microsoft.com/en-us/dotnet/core/whats-new/dotnet-8#methods-for-working-with-randomness. Implemented these myself too many times
- Interested to see where C# will go with these AOP features https://learn.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-12#interceptors. Personally, I no longer see meta-programming based AOP as especially desirable. A good dependency inversion strategy achieves much of the value. Though, this could centralize some rather deterministic situations like authorization or logging decorators.
  - should investigate more before writing about it https://github.com/dotnet/roslyn/blob/main/docs/features/interceptors.md
  - DI libraries like CastleWindsor have had proxies for a long time, and SourceGenerators enabled some of this to become compile-time reflection-based, but I haven't seen much adoption of dynamic AOP-style decorators. 
  - Curious what their motivations are

backup idea queue
- FsCheck saga
  - better understanding delegates (target issue) 
- try to make some incremental duck examples?? (demonstrate working through a duck? maybe skip through several stages to show techniques/questions applied at those stages)
- OCP Q&A add-on post
- Explore https://en.wikipedia.org/wiki/Bloom%27s_taxonomy and https://blog.edmentum.com/webb%E2%80%99s-depth-knowledge-framework-basics as a means of more effective/intentional question asking
- Standards over control? 
  - I think I want more application with this before I give it a dedicated post
  - flow over prediction related to distributed architecture over central planning (might have more info in my Scaling Architecture Conversationally notes) -> Decentralized decision making means faster feedback loops, greater scalability. 
  - Refine the guardrails/SOP over controling specifics. Not easy though.
- I can probably wring a post or two out of my Ionide contributions 
  - maybe talking about minimal parameters / the refactoring I did early on could be a good case study in information hiding and how to choose parameters
    - maybe frame as: I can see how all this would be considered helpers to improve readability of the main flow, but now I want to reuse parts of this and their current parameters don't let me do that. Need to identify the core reusable logic, isolate it, and require only the parameters needed for that bit of logic. Refactoring that first, then I can use the logic in my new flow when I add it. 
  - probably just show of some of the challenges I was able to overcome (multiple sources, not all aligned; updating from code)
  - can probably do a high-level one that's essentially just the PR
- Elm
  - Values win again. Simpler Hot reload due to composed state. Don't need to go deep into tooling chain. It's attainable mostly at the level we normally program at.
  - Comparing elm to transition away from OO because distributed state is hard to manage
  - (maybe) elm state as CRDTs?
- Async vs Sync another reason to keep system as pure as possible
  - did a big deep dive on multi-threading best practices and performance gotchas. Two bits that stood out where that async IO can be much faster in aggregate. Separately, sync and async callchains shouldn't be mixed. Pure functions don't really matter though. They're already perfectly parallelizable and can be called safely without blocking in a sync or async environment. Distributed state will lead to distributed IO, which will pull your whole application into async and overall increase complexity. But, if you keep many functions pure, then a larger part of your app is indifferent to the execution context and such decisions can be relatively centralized. Check out functional-core architecture [link to Mark Seemann post of some kind]
  - probably need to explain purity, again 

Longer-form 
- NOTE: don't try tackling these as one great series. I think it'll be easier to tackle them as individual posts (maybe give them a tag or a retroactive series so people can work through the similar posts)
- What's your duck process applied to construction process in concrete technique demonstrations (probably many posts)
  - interpolation (via logs, commenting, breakpoints, etc)
  - NOTE: perhaps some of these examples follow SPEAC so we can also show that in these examples too. Possibly as a driver of sorts (inconsistent level of abstraction / reads smoothly, implementation-specific concerns in signature, need to add an alternative implementation, etc)
  - a Driver-based loop (namely with tests, then some refactorings)
  - Dealing with some legacy code (strangler and related) -> a multi-phase refactor is a sort of hypothesis about what would make a better shape/api/factoring and then you give it a limited trial without turning everthing over 
  - remember to tie things back to test-hypothesis and increments
-->
