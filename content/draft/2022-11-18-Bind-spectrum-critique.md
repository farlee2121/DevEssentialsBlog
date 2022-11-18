---
date: 2022-11-18
tags: []
# title: Abstraction vs Composition Dependency Spectrums
title: Revisiting iDesign and Clean Architecture Merge
---

<!-- TODO: do a sweep for potentially confusing terms to link
- iDesign
- Clean ARch
- Dependency Inversion
- ports & adapters?
- domain -->
<!-- TODO: rename file according to final title -->
I generated a visual while trying to reconcile the iDesign and Clean Architecture architectural patterns. The visual helped cement some important ideas, but I never published it. Here I'll revisit the visual and review how my ideas have changed.
<!--more-->

## Original Visual

![2 axis systems layering table](../static/post-media/SolidStructure-Refined/SolidStructureTable.png)

### iDesign Layers
iDesign organizes software systems into layers based based on responsibility cohesions within the problem domain. Specifically,
- Clients: Define interactions for external actors. Could be users or other systems
- Managers: Centralize orchestration and sequence. Tend to reflect usecase groups.
- Engines: Define interchangeable calculations
- Accessors: Hide external dependencies from the system, like data stores or 3rd-party apis.
- Utilities: Repeated non-domain concerns across other services, like pub-sub tooling.

Most of these layers define abstractions that model the problem being solved.

For the most part the higher services types call the layer below. For example, clients call managers and managers call engines and accessors. Utilities tend to be cross-cutting and are used across the layers.

I've written [more on iDesign](../posts/2020-07-03-iDesign-Visual-Summary.md) if you want to explore deeper.

### Clean Architecture layers
Clean Architecture also organizes systems into layers, but bases the layers on abstraction. Dependency Inversion is used to defer details that are not essential to the business rules or may vary.
- Enterprise Rules: Aggressively limited set of abstractions shared across the system that represent normalized fundamental domain concepts
- App Business Rules: model business rules free from incidental implementation concerns
- Interface Adapters: Thin mappers from an abstract domain dependency, usually an interface, to a concrete implementation like a data store, 3rd-party tool, other domain service, etc.
- Mechanisms: Non-abstracted components. Could be implementations of business rules dependencies or consumers of the business rules like user interfaces.

A short example

```cs
class ChatBusinessRule {

}
TODO: Show a port and an implementation. Then composing them together?
```

Clean Architecture is effectively the same architecture pattern as Ports and Adapters, Hexagonal Architecture, and Onion Architecture.

### Bringing Them Together

The core of this visual is realizing the two layering schemes are not at odds. 
iDesign defines layering within domain abstractions while Clean Architecture protects domain abstractions from unnecessary implementation concerns.

Placing iDesign service layer types within the clean architecture layers affords us both organization of domain responsibilities and composability of deferred component composition.

Both layering schemes obey the Stable Abstractions Principle, where the more abstract a type is the more stable it should be.


## What's Changed

My perspective has shifted since I made this visual. 

One, I prefer the Ports and Adapters analogy instead of Clean Architecture's terms. Ports being the abstractions services use to define dependencies on their own terms. Still the same concept as Clean architecture, just different terms.

Most significantly, I've de-emphasized importance of the iDesign layers. The roles of engines and accessors tend to be satisfied by ports. The adapter can map ports to a different domain service, data store, or to a third party service equally well. The core rule protected by the port is equally oblivious to external actors in any case, which is very good. This minimizes scope of each abstraction, and there isn't need for coordinating domain service abstractions. This also reduces pass-through calls just to satisfy layering rules. Overall, the role of domain service layers is de-emphasized.
Services themselves are more about what parts of the problem are *both* isolatable and reused.

Another way of looking at it, iDesign layers tend not do deliver on their intended Stable Abstractions promise. Services knowing about each other's abstractions creates conceptual coupling and changes to domain models tend to ripple through the layers.

## What's stayed the same

Identifying the progressive bind-time of decisions using dependency inversion and composition remains highly useful.

More explicitly
- Domain rules focus only on modeling the essence of the problem we're solving
  - Ports allow the domain rules to define dependencies in terms of the domain, not the implementation
- Adapters define a suite of alternatives we can swap in for different domain dependencies.
  - Many cross-cutting concerns like identity, logging, caching and similar can be separated from the domain rules into adapters to be composed later
- Clients or consumers of the rules decide which adapters to compose, and determine the final run-time behavior and run-time dependencies

I also still believe there is a useful 2-axis gradient of stability and abstraction. However, I don't know how to update the table for the new domain spectrum. 

The new domain spectrum spans a composed suite of services that don't know about each other. Some services will probably be more fundamental than others. Especially since many services evolve from adapters expanding to meet the needs of other services. 
This domain gradient informs how services should be composed and thus manages complexity by reducing mutual service dependencies. 

