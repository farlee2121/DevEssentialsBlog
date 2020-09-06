---
layout: post
tags: [Architecture, Design thinking, SOLID Structure, Case Study, Scaling, Decorator, AOP]
---
# Async Task Refactor Case Study

I've been unhappy with the async/background work model in my system for a while. The async logic always seems excessively complex, either entagled with business logic or creating opaque coupling between flows. However, my recent [breakthrough on code structure](../_posts/2020-07-10-Synthesizing-Structure.md) suggested a clear path to adding background work in an aspect-oriented style. Let's examine a refactor that helped me prove it out.

## The Refactor
The project centered around a search workflow. Searching required entities to be indexed with the search database (specifically Lucene). Many system events could trigger entities to be indexed. Most importantly, we were now letting users publish their own entities to the search index. This meant that we needed to add controls for when the search index was updated so that we could vet published content and avoid search performance issues during peak hours.

To summarize constraints
- Must control timing of search index updates
- Must control update requests from many sources 
  - Not every update source will be treated equally. For example, admins might need to trigger an immediate update
- Lucene requires exactly one index writer at any given time, all update requests must be fulfilled by one service instance

Goals include
- Automated and controlled index updates
- Separation of business logic from the async communication pattern
- Ability to swap async communication framework for later scaling
- Understandable / tracable async flow 
  - The main flow should define it's event broadcast and handler registration in one place so code readers can quickly comprehend and step through the expected code flow

## Previous Solutions

This code base originally managed async work through a QueueAccessor. Some manager would directly call a known event on the queue accessor with message data, then the queue accessor would publish to a queue, trigger a handler defined in a client, and run another manager method with the given data.

![Queue Accessor Diagram]()

This solution fails because
- It directly couples the notion of the communication method
- A queue is never a natural part of a business flow
- The flow is opaque
  - The queue broadcast and event handler must be separated to prevent cyclical service dependencies
- The division of events between caller is unclear. It is tempting to reuse events between callers in unexpected ways

I had previously refactored a portion of this pattern for index updates using Hangfire. Rather than split up the async code

  - what i did with hangfire
    - actually pretty understandable. very isolated scope
    - makes for nasty public interface, much of which isn't meant for general consumers 
![Hangfire Diagram]()

// should show diagrams of the three alternatives, queue accessor, in-manager, and decorator/aspect

## Design Shift

Making calls directly from service to service was trapping my design decisions. My only options were
- bake the async knowledge into the calling service
- bake the async knowledge into the called service, making it async for all consumers
- implement a decorator on the large service, passing all the other methods through and only implementing async on the single one action.
  -  May be difficult to still meet return value expectations
  -  Involves more methods than likely need to be async

Shifting to define dependencies contracts with only the calling service in mind produces contracts that are much smaller and more focused. This means that
- new implementations are smaller and easier to make
- usage constraints for all contract operations are more likely to change together.
- we can wrap whole contracts in some decorator without disrupting intent.

In essence, we can leverage Aspect-Orientation to apply powerups to our contracts without changing the original implementation.

![Decorator Diagram]()

> Aside: Functional users can accomplish this generically idea with monads. OO users can employ some DI framework magic to dynamically proxy objects for completely central operations.


## Realized Benefits
Leveraging client-owned dependency contracts and decorators realized expected and unexepected benefits in my system.

As exepected,
- my business flows were much more focused and easier to understand. They had no concept of how events were fulfilled, so I could easily implement in-process or task based asynchronous behavior for testing and low-impact flows. Changing the adapters to a more robust async pattern later did not cause any changes to the core service.

- I was able to easily switch between async libraries. This really hit home when I started to doubt the message bus library I had chosen. I was able to create two async implementations with two libraries pretty quickly and swap the two in configuration to help decide which I would use going forward. I could even keep both for future use if I wanted to. 

- I could choose to apply decorators to the adapter or to the service managing search updates. This gives me the flexibility to manage scheduling differently per caller while also enforcing calls to the update service all be made remotely.

- The adapters live just below the clients in the dependency heirarchy and are never directly referenced by core services. This made it easy to define event broadcasters and handlers in one place. The handlers can then be registered by any number of clients without any client knowing it's concrete list of handlers. The client is decoupled from specific business flows.

However, there were many unforseen benefits too. 

- Testing became much easier because I did not have to consider async concerns in my business logic testing nor did I have to consider business concerns in my async adapter testing.

- I also ended up separating the scheduling decorator from the message bus decorator. I had planned to implement them togetehr since the message bus had the ability to schedule. However, separating scheduling and applying two decorators allowed me to implement scheduling with a different library that was much simpler.

- It was pretty easy to abstract other events while refactoring services to define their event-based entity index requests. This consequently improved the design of our import flows, signup flows, and other flows.

- Refactoring the various entity import flows to the new pattern caused them to all look pretty much the same, paving the way for consolidating into a singular import flow.

## Conclusion

Direct references between services was trapping me into sub-optimal async patterns. Switching paradigms to client-owned dependency contracts with adapters not only accomplished all of my goals for clear and separate concerns, but prodded me into improvements I had not yet imagined.