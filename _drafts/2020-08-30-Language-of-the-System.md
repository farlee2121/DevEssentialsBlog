# System Language

[The Language of the System](https://www.youtube.com/watch?v=ROor6_NGIWU) by Rick Hickey is an illuminating talk about why system differ from programs. It provides a clear framework for understanding and addressing the difference. I believe these same ideas underpin some of the recent major movements in sofware design philosophy. Let's explore.

## Talk Summary
The core of this presentation is recognizing how systems differ from programs and the consequences that has for system design.
- Programs
  - Generally written in a single language 
  - Enjoy the benefits strong shared assumptions from single language/runtime
    - shared memory management paradigm
    - shared abstraction and type system
    - coordiation (error management, locks)
- Systems
  - comprised of several programs working together
    - need communication pattern external to the language/choices of each program
  - no central control
    - programs could be in different languages
    - could be on different machines
    - Weak default failure guarantees (each program fails independently, system can be in partial failure state)


Systems live at a higher level than any single programming language. This means we need to define the language of how the system communicates and how we reason about system-level design.

First, we need to examine the consequences of a system's distributed nature on foundational assumptions of our activities
  - **Communication**: Programs within the system cannot rely on shared runtimes, languages, types systems, and the like. What we pass from program to program must be values that contain their own meaning. Actions and semantics outside of data cannot be passed. Frameworks that tried to do so (Corba, WCF) all died because of the complexity. Most values communicated in a system are ephemeral and unnamed. In other words, they only live as part of the communication and cannot be refrenced otherwise. Values that are too large or must be repeatedly referenced must be assigned "names" or references that are valid across the whole system (globally).
  - **State**: We cannot rely on shared processes to guarantee the lifetime of values or transactional consistency. Any state management has to be independent of program lifetime. Guranteeing data is globally consistent with the latest information is generally impossible and unmanageable. Rather, state is like world history, it accrues over time without destroying previous information. Each program is like an individual person. They can only be familiar with and consistent within the most recent set of information they've heard about.
  - **Names**: Names are global. References to data, resources, actions, or any other concrete instance of a construct must be valid and unique across all programs. This makes namespacing very important.
  - **Availability**: Communication between objects in a program is taken for granted. Communication between programs in a system cannot be. The programs may not assume that other programs currently exist, will respond in a timely manner, or that the other program's failure will cause predictable behavior. 
  - **Failures**: A single program can coordinate failure by terminating the process. Programs in a system cannot rely on that coordination. Large systems will also pretty much always be in a partial state of failure. The system must manage what happens if only some programs in a workflow succeed.

Next, Rich proposes the core responsibilites at a system level. They are a sort of system Single Responsibility Principle and should be kept separate
- Transform
- Move
- Route
- Record

Keeping these concerns separate pushes us to design pieces that can be composed while preserving qualities of a distributed system we previously outlines. Failure to keep these concerns separate results in the same consequences as stateful object graphs in OO. That is, you lose the independence of components and the system becomes entangled into an invisible web of shared assumptions.

Finally, well factored systems can define an analog to language core libraries. Rich calls these "simple services". Example concerns are
- Communications -> message queues
- Coordination (e.g. zoo keeper)
- Control flow -> Azure Logic Apps, AWS Simple Workflow, Storm
- Memory/Temp Storage -> redis, memcache
- Storage -> S3, Blob (good for "reference" types at system level)

Each of these services provide some fundamental activity any system would need to compose programs while maintaining distributed properties. Each should be decided by the system as a whole and plugged into the individual programs generically. This is a place where system design currently suffers. There is not common interface mechanism for system-level decisons. They need to be custom built into each system or program, making it complex to swap equivalent services at the system "core library" level.

The talk wraps up with some take aways on how system-level design can inform our program-level design. Potentially spurring us to use langauges that make it easy to match concerns between our programs and systems. In particular, he calls out erlang as a language that embodies system-level communications (now I need to learn erlang). Clojure embodies many of the qualities around communicating with values and managing state.

## Design movements

This talk lit up so many connections for me. Rich brings system concerns back to language choices, but I can see them as a driving motivation behind many of the more recent design principle movements.

For example, Service-Orientation imposes many of the desired system qualities on languages by convention when they are not imposed by the language. It's main unit is services, which
- communicate via semantically self-contained values
- Separates verbs and values
- Place/Process unaware: services don't make assumptions about the storage, statefulness, or coordinated failure of other services

CQRS (Command-Query Responsibility Segregation) is a formalization of the idea that Transform and Record operations should be separate. Conflating them creates entagled flows that cannot be composed and reused in different contexts.

IDesign is an extension of service-orientation that tries to separate out coordination (managers), transformation (engines), and recording (accessors).

Clean architecture separates out an Interface Adapter layer. My recent grappling with the pattern has pushed me to move concerns like coordination, communications, fault management, and large value "references" out of core services and into the adapter layer to be decided by the consumer. This mirrors the system-level "core library" concerns that should be centrally determined and plugged into services.

## Conclusion

The corrolation between Rich Hickey's system-level design paradigms and recent design principles seems like it is no accident. I believe that we are seeing the emergence of the next paradigm shift like Structured Programming. Robert Martin argues in [A Little Structure](https://blog.cleancoder.com/uncle-bob/2015/09/23/ALittleStructure.html) that advancements are made by taking tools away. These new principles are all oriented at taking away the "privledge" that individual programs have for local place-oriented coordination.

I conclude that place-oriented programming will eventually die or be greatly contrained just like structure programming eliminated goto. This doesn't mean object-oriented and imperative langauges will die. However, I believe it will involve a shift to languages and language features that favor these service-like and distribution-friendly properties.