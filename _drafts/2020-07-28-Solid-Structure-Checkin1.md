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