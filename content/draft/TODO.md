---
title: todo
---

Placeholder for links that need filled

<!-- 

Emergency ideas
- Test API with Jest
- Mentoring pivot, work in system then summarize essence of the work done / problem solved. 
  - Self-directed, starts concrete and abstract comes later (versus starting with topic discussion and demonstration), does still require distilling essence though, have to live with code you made, NDA friendly
  - Better milestones. Not trying to master a full concept, which is broad and many-faceted. End is when you're happy with the code.
  - Seems obvious in retrospect. 
    - I would have defaulted to pairing w/o an NDA. This has less shared context, but is better in many ways. I'm limited in what solutions I can offer even if I want to. The student must take greater ownership and also has to think about the essence of what they did (link to summarizing?). In pairing, you'd have to be intentional about pausing to summarize and distill any learnings.
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
- Elm
  - Values win again. Simpler Hot reload due to composed state. Don't need to go deep into tooling chain. It's attainable mostly at the level we normally program at.
  - Comparing elm to transition away from OO because distributed state is hard to manage (Code that Fits ch 13 p 259)
    - "Object-oriented composition tends to focus on composing side effects together... this style of composition relies heavily on nesting objects in other objects, or side effects in other side effects. Since your goal should be code that fits in your head, this is a problem"
    - Essentially, side-effects are implicit coupling. When you compose code with side-effects, you have to remember all of those side-effects
    - So... how exactly does this apply back to Elm. I suppose we've seen the rise of redux, which is basically elm but the state is global. Parts of the UI will often que from shared signals. One way to deal with it is the global redux way, but then you have global data and you never know what all depends on something. It makes trimability a nightmare. Elm, on the otherhand, each component declares only what state it needs. It's parents are responsible for getting it the proper state, and so on. The child state is transparent to the parent, but not vice-versa.
    - Q: does this end up being like a bad version of constructor injection, where dependencies are percolated through the whole stack.
      - honestly, I don't have the experience yet to be sure, but it feels like "what's really different?". While I haven't extensively used an elm-like approach, I have gone to great lengths to create reusable components, which means they need to be provided state by their composing context. Yes, this involved some extra data mapping and configuration, but good [open-closed components](../posts/Open-Closed-by-Example/2023-03-02-2-OCP-callbacks.md) quickly pay back the value in spades. Components can be resused far more diversely, which leads to less duplicated work and faster development. There isn't really more data passing with Elm. The difference is more the consistency of state and that it goes all the way up. Child components are expected to not have any hidden statefulness, given the same data they'll always produce the same result. This means you don't get into funky states by mutating internal data. And, because this consistency (purity really) goes all the way up, the whole application can have it's state set or observed or persisted all at once 
      - probably give example of lots of state flags in a component (perhaps a form with states like isValid)
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

Tags to consolidate
- Language Design, Language Properties, Languages, Language Features, Programming Langauges
- Design, Software Design
  - maybe also: Design Theory, Design Thinking, Design Patterns, Design Principles, Design process
- System structure, Program Structure, maybe Project Structure
- process 
-->
