---
title: todo
---

Placeholder for links that need filled

<!-- 
backup idea queue
- FsCheck saga
  - better understanding delegates (target issue) 
- Pact https://pact.io/
- OCP Q&A add-on post
- try to make some incremental duck examples??
- flow over prediction related to distributed architecture over central planning (might have more info in my Scaling Architecture Conversationally notes) -> Decentralized decision making means faster feedback loops, greater scalability. Refine the guardrails/SOP over controling specifics. Not easy though.
- Announce notedown updates
- why I think AI isn't an existential problem for programmers (think of how much modeling tools do for engineers. Someone still needs to match established solutions to the situation. Cross no silver bullets)
- Explore https://en.wikipedia.org/wiki/Bloom%27s_taxonomy and https://blog.edmentum.com/webb%E2%80%99s-depth-knowledge-framework-basics as a means of more effective/intentional question asking

- The difference I experienced translating event storm to C# vs pure & event-based
  - Context, Translating event storm into software design. A lot of extra detail we're digging into here is what data is needed. For commands, for events, but also some data is needed for the workflows that never shows up in the command or events. Those are dependencies.
  - trying to use C# and ports and adapters quickly surfaced some issues. Can't express alternatives without it clearly becoming code syntax. Value types are a bit messy. Dependencies are a no-go
  - F# trying to consider distributed state enaction (find better way to describe this) failed in F# too. It's an improvement since we can partially apply in the signature without requiring us to decide an enclosing class for a set of workflows or dip into implementations (constructors) to show dependencies 
  - TODO: need to explain and contrast the two approaches (inversion of control -> flow enacts state through abstract dependencies running the flow means changing system state, functional-core/pure event-based -> running the workflow doesn't change system state. The workflow returns data structures that can be interpreted into state changes)
  - F# with a type-driven / functional-core approach can map the events pretty directly into types without any implementations or awkward translations
    - The F# itself can almost express all of our domain ideas without it obviously being code. It reads more like a semi-formal specification convention. It's simple enough to be easy to read, but formal enough that we're unambiguous about what we're expressing and detailed enough that we can expose gaps in our understanding.
    - F# has a few aspects that can be confusing (like -> between parameters, single-pass requiring root types/flows you start with to come last). can make it pretty intuitive to read if you're willing to tweak a few things for f# inspired pseudocode. Doesn't take much tweaking though. 
      - Brief syntax explanation (unions as alternatives/OR, records as AND, aliases/value types, function signature aliases -> workflows)
      - example of my pseudocode
  - Don't have to use a pure event-based model for the code, but use it for the model. It keeps unnecessary coding concerns out of the discussion and enables a fair bit of detailed design in collaboration with less technical stakeholders. The pure event-based model can always be translated to other patterns by developers later.
  - cross: concise syntax matters

next
- urban planner over architect metaphor from Architecture Without Architects
- picard leadership?
- new langauge about event and commands (fact vs intent), events change how we interpret state of system
-->
