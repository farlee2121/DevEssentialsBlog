---
layout: post
tags: [Event Streaming, Dependency Rejection, Event-based Architecture, Domain Modeling Made Functional]
---

<!-- 
TODO: improve title
- maybe "and High-Scale Architecture"
- "and High-Scale Event Architecture"
- "Event-based Domains for High-scale system"
- "Pure Domains make Event-driven, High-scale systems" -> favorite so far


TODO: read on event-driven architecture to make sure I understand it correctly https://en.wikipedia.org/wiki/Event-driven_architecture
TODO: use 6 approaches to dependencies post as my progression from DI reference?

TODO: is post still aligned with original introduction / framing? Can it be? Does it need reframed or split?
-->

# Pure Domains and High-Scale Event Streaming

Consider a system where the business rules (domain) don't change the system state. Instead they return data that represents a state change and let consumers enact the change. This is maximally event-driven and simplifies some difficult problems in high-scale systems.


<!-- [Domain Modeling Made Functional](https://fsharpforfunandprofit.com/books/#domain-modeling-made-functional) introduces a powerful modeling approach that focuses on a pure domain layer. In other words, the business rules don't change state. Instead they return data that represents a state change. This approach simplifies some difficult problems in high-scale systems. -->

## Examples

I understand if such a system can be a bit hard to picture, but I does really work for most all kinds of business rules.
[Domain Modeling Made Functional's](https://fsharpforfunandprofit.com/books/#domain-modeling-made-functional) is an accessible and fantastic overview to this kind of programming. I've also written a [sampling of the book's approach](../_posts/2021-04-09-Designing-with-Events-Transforms-and-state.md), and developed an [exploratory system](https://github.com/farlee2121/BlockScheduler) based on the approach.

<!-- TODO: consider a brief example here, show something with multiple return states -->
Here's a quick sample API.
```fsharp
```

## Pure Domain is Event-driven

<!-- TODO: probably need to highlight in some way how state get's enacted (could directly be interpreted into a db transaction, could be thrown in a queue) 

Maybe blog about how dependency rejection turns the top level of our domain into an event producer. The domain rules, even the compositional layer (not really a manager anymore) is pure, it has no effect on system state. Instead it returns a structure that represents a change and the composition root can register any number and kinds of interpreting consumers.

-->

!!! identify of the domain action available in event

## General Benefits

A completely pure domain, achieved through events, comes with some powerful benefits.

First, some general benefits of purity
- Parallelization: pure functions have no direct effect on system state and don't interfere with each other. Our whole domain is pure, so our domain is maximally parallelizable. 
- Dry-run domain rules: Separating decisions from enactment of state also means we can preview or dry-run possible actions safely
- Simplified Testing: Pure domains don't require mocking. The domain no longer relies on injected dependencies, all information is contained in the input and output. 
  - Purity also promotes fast and reliable tests. There is no risk of slow out-of-process infrastructure.
- Clear consequences: All expections and consequences of a pure function are advertized in the input and output. Programmers don't have to dig thorugh a call stack to understand how a function effects the system.

Second, using events for all input and output of the domain enables maximal leverage of mature event streaming tooling
- System History: Event streams or a event store can track the entire history of system states, [which has many benefits](https://spencerfarley.com/2021/05/28/transaction-databases/)
- Decoupled Uptime: the event stream acts as a queue and decouples uptime between producers and consumers
- Flexible consumers: All decisions of the domain rule are contained in data. That data can be passed to any number or type of consumer without changing the domain. 
- Central cross-cutting policies: Event tooling typically supports configuration for Policies like retry, error handling, and delivery guarantees without code changes. 
  - This can also be leverages for events in a well-done dependency inversion structure, but less of the system is represented as events


## Benefit: Intelligent Concurrency Control
The flexible concurrency control of this pure event-based approach is perhaps the most powerful consequence for scale.

Domain decisions are decoupled from their enactment in system state. Event streaming tools can decide, per event type, how to distribute and enact domain events. This could mean a simple queue, multiple concurrent processing, or an auto-scaling pool of consumers. Events could be separately queued by some quality (e.g. fullfilling warehouse for purchases), or require a single processor to avoid state conflicts.

Special cases may even employ complex custom logic that analyze system state to decide event execution. Such complex schedulers can make decisions with the as much information as possible. For example, an e-commerce platform could schedule parallel orders based on remaining inventory (i.e. 100 left, so schedule up to 100 orders). Then batch decisions can be made about errored orders or orders remaining in the queue after inventory is empty. 

In any case, the decision and enactment are decoupled. Distribution and handling can be tweaked to the requirements of each domain event without modifying the domain.

<!-- TODO: I originally framed the post thinking I'd focus on ability to manage queueing, sequencing, etc. Where will that live? -->

<!-- IDEA: I just realized that authentication could be centralized. It takes context and some T. It runs default rules and any registered rules for T -->

## Benefit: Composable / Batchable Endpoints

The most suprising benefit for me was batching and nesting of commands

Notice that the input and output of each domain command are data, and the domain command is pure. The commands don't care where their data comes from, and all the data they need is presented up front. There is no dependency on state that evolves outside the domain command. This means that the identity, the information needed to define a command, is fully present in the input event. Similarly, all the data needed to respond to domain command is present in the response.

All together, this means that we can batch and nest domain commands safely without effecting outcomes of the event.

First consider batching. Suppose we have a system that supports offline editing. All the edits made while the client is offline can be stored as their domain events. When the client is back online, these events can be sent serverside and replayed so the server state matches the client state. There is no need for differentiating client versus server storage and no information about intermediate state is lost. 

We also avoid potential conflicts with changes made on the server while the client was disconnected. We have each state delta and the time each state change was made. Therefore we can deterministically decide which change would be latest.


We don't have to be offline to batch, we can also send a group of requests together simply because it's convenient. Consider the common scenario of an entity with child entities. Like a profile that contains a gallery of images 

```fsharp
let AddGalleryImageCommand = { ProfileId: ProfileId; ImageRef: ImageRef}
let RemoveGalleryImageCommand = { ProfileId: ProfileId; ImageRef: ImageRef}

let AddProfileCommand = let UpdateProfile = {
  UserId: UserId
  Title: string
  Bio: string
  Name: FullName
}

let UpdateProfileCommand = {
  ProfileId: ProfileId
  Title: string
  Bio: string
  Name: FullName
}
```

As demonstrated, one would assume that a profile must exist before images can be added or removed, and the images are updated in a separate call from updating the profile.

However, our domain commands don't rely on the profile request coming first. The commands could be sent as a batch, broken up into their respective domain commands, executed, and then aggregated back into batched response. Batched requests don't have to be batched as a sequence, they could also be batched as a hierarchy of events and achieve the same result.

Such batching or nesting gives us flexibility over request and transaction size. We can lump requests to reduce calls (e.g. a profile and add image request as one) or request them individually. Similarly, we can fail the group as a whole, or we can allow partial success. Such decisions could even be decided as parameter in the request (i.e.`{transaction-behavior: "allow-partial", events: []}`).


## Downsides

First off, it can be hard to think this way. This pure and event-based approach brings system-level thinking to the domain and individual commands. Most programmers (myself included) are accustomed to an imperative programming approach that changes state through a series of instructions. Even in a dependency inversion approach leans on the consumers calling their dependencies, even if those dependencies are abstract. This event approach calls no one. This leads to the other key pitfall, indirection. The domain knows less about orchestration and state enactment, but it also knows less. This means it can be harder to get a full picture of what the system is doing. 

## Conclusion

A pure domain





<!-- A pure domain is perfectly parallelizable. Any orchestration of state change is made outside the domain. Retry, failure, batching, sequencing, etc can be handled by robust generic event systems and changed without changing the domain or any direct derivations of domain ports.  -->


<!-- ## Progression of Dependency Ideas

It may be difficult to picture a system with a completely pure domain. Our intuition wants to point to some place in the program as the orchestrator ordering 

direct dependency -> injection -> inversion -> rejection
- later, rejection ~= event/message based system. 
- really, the data structure (both in and out) are events

try to lead them to realize the idea is a progression from already popular ideas

not sure this progression is necessary to explain the idea. I do find it really interesting though, and a good connection of existing knowledge. Most readers won't understand it though... Maybe I make it a separate (precursor?) post (Dependency Inversion + Purity -> Dependency Rejection). -->
