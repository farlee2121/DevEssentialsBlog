---
layout: post
tags: [Architecture, Design thinking, SOLID Structure]
---

# SOLID Structure - Checkin 1

I posted about [Synthesizing Project Organization Methods]({%post_url 2020-07-10-Synthesizing-Structure %}) a few weeks ago. Well, I've been busy the last several weeks putting it to practice in my own code. The results have been been beyond my expectations!

You may be wondering where SOLID Structure came from. I needed a name for referring to this organization method. I landed on SOLID Structure since SOLID principles comprised many of the guiding principles, and it sounds nice.

Let's look at what's been going well.

## Limited Design Scope
I originally concieved of this idea as a way to resolve the conflicting needs of calling and consumed services. Callers want only the most limited interface for their dependency and the consumed service wants to be as re-usable as possible.

I didn't anticipate how powerful this method would be for isolating design decisions. The caller defines it's own abstractions for dependencies it needs. Likewise, the called service is not concerned about who's calling it. I only define it's outbound abstractions based on the current services needs. Any flexibility for the caller is provided generically. Now realize that each service is a caller and called service.

This means I don't have to look outside of the singular service when making a design decision. In fact, this pattern encourages me not to.
I can make all decisions without jumping between code components. This makes for very fast and focused work. It simplifies write-time decisions, minimizes read-time scope (likely to a single assembly), and means that refactoring never leaks beyond the singlular service and its adapters. 

The fundamental power of this pattern is limiting design considerations scope.

## Pushy Information Hiding

Two common concerns I've long struggled to slot into my systems are email notifications and background processing. SOLID Structure has made both of these clear. You can see an in-depth exploration of notifications in [SOLID Notification Refactor and Ideal Design](2020-08-05-Notification-Design.md).

The underlying problem here is that notifications and background processing are actually separate utility-like services of their own. Defining dependency contracts in the calling service makes it easier to ignore these cross-cutting concerns than to weave them into the business process. This pushes cross-cutting concerns into the adapters where we can collect them into utilities.

## Decorator and Aspect Friendly

Defining dependencies contracts with only the calling service in mind produces contracts that are much smaller and more focused. This means that it is much easier to make new implementations and much more likely that usage constraints on all of the contract operations change together. This means that we can wrap a whole contract in some decorator without disrupting intent. Some potential decorators here being the classic AOP concerns: logging, security, async.

> Aside: Functional users can accomplish this generically idea with monads. OO users can employ some DI framework magic to dynamically proxy objects for completely central operations.

That is all pretty conceptual. Let's look at a concrete example from my code: indexing searchable entities asychronously. 

// maybe make this it's own blog post too? It'd make sense to go more in depth on something I expect to be a standard pattern and key design decision

**Case 1**: The action is part of a large generalized service that is called directly.  
None of our options are great. We can
 - bake the async knowledge into the calling service
 - bake the async knowledge into the called service, making it async for all consumers
 - implement a decorator on the large service, passing all the other methods through and only implementing async on the single one action.
   -  May be difficult to still meet return value expectations
   -  Involves more methods than likely need to be async
Making the call async is tangles with the concerns and demands of other services. A concrete example from my work was search indexing. 
// move concrete example up to the whole examination

**Case 2**: We follow SOLID Structure. Services defines their own abstractions that an influencer should be indexed  
-- the caller can adapt it's semantics and it's particular brand of async (i.e. use a thread if a value needs to be immediately returned, events if it can be done later )



## Reusable Services
- services become domain-specific libraries, essentially
- create email framework
- able to slot in a bus management framework
- This has the consequence that I'm pushed to accomodate any customization needs in a generic way. This actually makes writing the code easier and safer. 
  - actually makes testing easier. Everything has the same extension options, no specific paths based on other service knowledge

## Less room for Bugs
- on one hand, more things might get mapped than before and that introduces a new place for errors. Outweighed by 
- dependencies are simpler
- More generic brings a conceptual purity that reduces room for error (link to mark seemann)
  
## Event Friendly
 - not Event Driven arch. the goal isn't to structure everything around events
 - events very powerful design tool for decoupled and scalable system
 - the reduced scope lends itself well to events

## Same idea everywhere
- the rules are simple and apply everywhere
- closes gap between framework-style design and designing our own systems
  - our services essentially become domain-specific libraries
- Even applies to testing, link to Paul's post

## Open questions
- see list below


Post 1: design changes 
 - checkin
 - most critical factor is reduced scope of design decisions
   - the selfishness pushes cross-cutting concerns out
   - pushed out cross-cutting concerns centralize and are easier to map to generalized services
   - if a generalized service didn't exist, you've now made one that you could sell or reuse
   - since each dependency interface is smaller and more focused, it's easier to swap, easier to decorate
   - since services themselves care less about direct callers, they're more general and expose more reusable functionality
 - also makes for easier factoring, easier outsourcing, easier parallel work



blog idea: discovering the scalability of my new design architecture
 - minimal interfaces with adapters -> smaller interfaces 
 - working on notifications -> realized that notifications are just an event system that happens to send an email as result
 - event system -> should send minimal info, generally just Id -> highly decoupled response -> highly scalable
 - looking at mass transit gave me many ideas: can defer decision to batch, can easily run in-proc, on machine, on different server, serverless
   - like hangfire but above and beyond. Hangfire is great at handling offloaded work with little thought to events and model division though, messages not as much. Kept slim and it's a good thing
 - Danger: can definitely take it too far. Need to be mindful about what is part of the same flow, what needs to be understood together

Should I just pose this as a checkin?
- most important component is that it allows you to only consider the needs of one component at a time.
- closes the gap between internal and external code. your own code is more reusable, effectively a library of its own
  - services being more selfish about dependency interfaces pushes out cross-cutting concerns, more generalized services brings your needs closer to existing services. I.e. payments ended up getting pushed further out of my services and into one place. They just need to know if someone paid and now it's about the same to my code base to adapt to an existing generalized payment service as to have interal payment functionality, but my com 
- adapters can be factored like for any library (but can be together for simplicity). just like a lib would have EF.SqlServer, EF.Cosmos
- !!! benefits on both sides from more generic -> less room for error
  - thinking only about the needs of the caller makes it less tempting to thing about the details of implementors. Means more pure representation of need and less possibility of unexpected factors interfering
    - think of token provider 
    - thing about notifications. went from managers knowing about emails and organizing their generation to only firing an event. anything could happen off that event. It's hard for it to screw up passing just an id and an event type
  - thinking only of service and not knowing specific needs of callers means that extensibility is more generic. Can't goof anything related to consumers because you don't know about any of their concerns. I.e. messaging system can't mess up grabbing campaign data because it doesn't know that it's organized by campaign. Or think of token provider. Can't internally cross token purposes because it doesn't know about any specific ones. Purposes are always from the caller 
- Where do Utilities live? Resources?
  - utilities are external frameworks essentially, consumed via adapters against service interfaces. possibly shared abstractions
  - What about resources? iDesign they supposedly live below accessors, but also behind utilities. It's pretty much the same here. It's just less spatially clear

general scheme of post(s)
Post 1: design changes 
 - checkin
 - most critical factor is reduced scope of design decisions
   - the selfishness pushes cross-cutting concerns out
   - pushed out cross-cutting concerns centralize and are easier to map to generalized services
   - if a generalized service didn't exist, you've now made one that you could sell or reuse
   - since each dependency interface is smaller and more focused, it's easier to swap, easier to decorate
   - since services themselves care less about direct callers, they're more general and expose more reusable functionality
 - also makes for easier factoring, easier outsourcing, easier parallel work

Post 2
 - Performance view (maybe separate post?)
   - push toward event-like behavior over api-ish
   - push toward decorator/aspects (something i've wanted for ages)
     - because the interfaces are simpler and more focused, it's also simpler to wrap them with, say and identity decorator that throws an exception if user not authorized
     - Another decorator would be remote calls, event systems
 - Build view
   - before  dependency and service views where the same, now their orthogonal axes
     - services are business-related IH, with layers based on types of cohesion (sequential, functional, etc)
     - this new direction is integration/build related IH, focused on keeping services isolated, frameworks out of core logic, scale/communication concerns out of core logic 
   - makes it more clear when certain decisions should be bound
     - this also makes it easier to bind different decisions uniformly
     - turns our own code into a library for the business domain
   - much more predictable dependency chain 
     - shared abstractions: should be only very general items to remove silly redundancy in abstraction definitions, like ILogger. Every service in most any system will have it and it shouldn't be defined by every service
     - services: no dependency on each other. Less likely to need big dependencies like communication frameworks. Only need libs for internal logic
     - adapters: segmented largely by the service they provide functionality to. Easily divisible into packages in Service.Implementation pattern. Can group for simplicity without too much worry for splitting later because all implementations are very light. Most libraries live here. Scaling decisions like using a bus, remote calls, etc live here
     - Clients: where everything ties together. focused on the actual consuption of services (really just the manager layer, getting data back and forth). Maybe runtime focused? A bit weird since they live on both spectrums. Probably shouldn't need adapters between manager and client since the managers are effectively the client adpaters (they organize use cases). There are cases for like event registration though where a client relies not on a manager, but on an adapter abstraction. I.e. bus registrations, the client knows nothing of use cases but collects bus handling registrations with interface defined in adapters, contrasted with a website which is use-case driven and preferrably mostly scale agnostic
   - Theoretically faster builds because of high degree of parallization in and fixed number of dependency layers and fewer lib copies (most framework in adapter layer and only copied to client, not up unknown layers)



Open questions
- is it always worth having having concrete managers that aren't just adapters?
  - I'd say probably, but not sure. The big thing here is that managers are the head of the system. I suppose the abstractions are the head of the system and it doesn't really matter how their implemented
- accessors fulfilling each others dependencies
  - my thought is no. Cases where it feels like yes... 
    - the language name provider, but this is a case created by misrepresenting language as an entity instead of value type
    - influencer cache for search, this is just a quick corner cut. It won't scale performance-wise and we should be keeping the search cache in a form tailored to this rather distinct use case
- How much adaptation should be done for the clients 
  - the managers are use case adapters, but there is always an adaptation layer for the UI. It usually lives in the controllers 
- What about accessor adapters?
  - do accessor implementations belong in the adapter section and only accessor abstractions in the domain category?
- Guidelines for when datacontracts should be shared
  - so far i've gotten off with only primitive types in the dependency contracts because they reduce the scope so much
