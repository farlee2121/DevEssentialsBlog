---
date: "2020-09-04T00:00:00Z"
tags: [Architecture, Design thinking, Reading Review]
title: System Language
---

[The Language of the System](https://www.youtube.com/watch?v=ROor6_NGIWU) by Rick Hickey is an illuminating talk about why systems differ from programs. It provides a clear framework for understanding and addressing the differences. I believe these same ideas underpin some of the recent movements in software design philosophy. Let's explore.
<!--more-->

## Talk Summary
The core of this presentation is recognizing how systems differ from programs and the consequences that has for system design.
- Programs
  - Generally written in a single language 
  - Enjoy the benefits strong shared assumptions from single language/runtime
    - shared memory management paradigm
    - shared abstraction and type system
    - coordination (error management, locks)
- Systems
  - comprised of several programs working together
    - need communication pattern external to the language or choices of each program
  - No central control
    - programs could be in different languages
    - could be on different machines
    - Weak default failure guarantees (each program fails independently, system can be in a partial failure state)


Systems live at a higher level than any single programming language. This means we need to fill in broader rules for system behavior and define language to help us reason about system-level design.

First, let's examine the consequences of a system's distributed nature on foundational assumptions
  - **Communication**: Programs within the system cannot rely on shared runtimes, languages, types systems, and the like. What we pass from program to program must be values that contain their own meaning. Actions and semantics outside of data cannot be passed. Frameworks that tried to do so (Corba, WCF) all died because of the complexity. Most values communicated in a system are ephemeral and unnamed. In other words, they only live as part of the communication and cannot be referenced otherwise. Values that are too large or must be repeatedly referenced have to be assigned "names" or references that are valid across the whole system (that is, globally).
  - **State**: We cannot rely on shared processes to guarantee the lifetime of values or transactional consistency. Any state management has to be independent of program lifetime. Guaranteeing data is globally consistent with the latest information is generally impossible and unmanageable. Rather, state is like world history, it accrues over time without destroying previous information. Each program is like an individual person. They can only be familiar with and consistent within the most recent set of information they've heard about.
  - **Names**: Names are global. References to data, resources, actions, or any other concrete instance of a construct must be valid and unique across all programs. This makes namespacing very important. Most system level names also refer to things rather than actions (e.g. to servers, storage, queues, resources, etc)
  - **Availability**: Reliable communication between objects in a program is taken for granted. Communication between programs in a system cannot be. The programs may not assume that other programs currently exist, will respond in a timely manner, or that the other program's failure will cause predictable behavior. 
  - **Failures**: A single program can coordinate failure by terminating the process. Programs in a system cannot. Large systems will also normally be in a state of partial failure. The system must manage what happens if only some programs in a workflow succeed.

Next, Rich proposes the core responsibilities at a system level. They are a sort of system Single Responsibility Principle guideline and should be kept separate
- Transform
- Move
- Route
- Record

Keeping these concerns separate pushes us to design parts that can be composed while preserving qualities of a distributed system we previously outlined. Failure to keep these concerns separate results in the same consequences as a stateful object graph in OO. That is, you lose the independence of components and the system becomes entangled into an invisible web of shared assumptions.

Finally, well factored systems can define an analog to language core libraries. Rich calls these "simple services". Example concerns are
- Communications -> e.g. message queues
- Coordination -> e.g. zoo keeper
- Control flow -> e.g. Azure Logic Apps, AWS Simple Workflow, Storm
- Memory/Temp Storage -> e.g. redis, memcache
- Storage -> e.g. S3, Blob (good for "reference" types at system level)

Each of these services 
 - provide some fundamental activity any system would need to compose programs while maintaining distributed properties
 - should be decided by the system as a whole and plugged into the individual programs generically.

This is a place where system design currently suffers. There is no common interface mechanism for system-level decisions. They need to be custom built into each system or program, making it complex to swap equivalent services at the system "core library" level.

The talk wraps up with some takeaways on how system-level design can inform our program-level design. Potentially spurring us to use languages that mirror system concerns at the program level. In particular, he calls out erlang as a language that embodies system-level communications (now I need to learn erlang) while Clojure embodies many of the qualities around value-based communication, state management, and accreted data history.

## Design movements

This talk lit up so many connections for me. Rich brings system concerns back to language choices, the same concerns I see driving many of the more recent design principle movements.

For example, Service-Orientation imposes many of the desired system qualities on languages by convention when they are not imposed by the language. It's main unit is the service, which
- communicates via semantically self-contained values
- Separates verbs and values
- are Place/Process unaware: services don't make assumptions about the storage, statefulness, or coordinated failure of other services

CQRS (Command-Query Responsibility Segregation) is a formalization of the idea that Transform and Record operations should be separate. Conflating them creates entangled flows that cannot be composed and reused in different contexts.

IDesign is an extension of service-orientation that tries to separate out coordination (managers), transformation (engines), and recording (accessors).

Clean architecture separates out an Interface Adapter layer. My recent grappling with the pattern has pushed me to move concerns like coordination, communications, fault management, and large value "references" out of core services and into the adapter layer to be decided by the consumer. This mirrors the system-level "core library" concerns that should be centrally determined and plugged into services.

## Conclusion

The correlation between Rich Hickey's system-level design paradigms and recent design principles seems like it is no accident. I believe that we are seeing the emergence of the next paradigm shift like Structured Programming or managed memory. 

Robert Martin argues in [A Little Structure](https://blog.cleancoder.com/uncle-bob/2015/09/23/ALittleStructure.html) that major advancements come from by taking harmful tools away more than by adding new tools. These new principles are all oriented at taking away the "privilege" that individual programs have for local place-oriented coordination.

I conclude that place-oriented programming will eventually die or be greatly constrained just like structure programming eliminated goto. This doesn't mean object-oriented and imperative languages will die. However, I believe it will involve a shift to languages and language features that favor these service-like and distribution-friendly properties.