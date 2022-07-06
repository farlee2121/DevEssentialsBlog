---
date: "2022-05-05T00:00:00Z"
draft: true
tags:
- Event Streaming
- Dependency Rejection
- Event-based Architecture
- Domain Modeling Made Functional
---

<!-- 
TODO: improve title
- maybe "and High-Scale Architecture"
- "and High-Scale Event Architecture"
- "Event-based Domains for High-scale system"
- "Pure Domains make Event-driven, High-scale systems" -> favorite so far
- 

TODO: is post still aligned with original introduction / framing? Can it be? Does it need reframed or split?
-->

# Pure Domains make Event-driven and Scalable Systems

Consider a system where the business rules (domain) don't change the system state. Instead they return data that represents a state change and let consumers enact the change. Such a system is maximally event-driven and simplifies some difficult problems in high-scale systems.

## A Pure Domain through Events

There are a few terms critical to understanding this article.

- [Domain](https://en.wikipedia.org/wiki/Domain-driven_design): Domain refers to the code that represents our core problem or business. So if were writing accounting software, it's the part that encodes the rules of accounting. This is opposed to code only incidentally related, like sending emails, or storing in a database. Systems will commonly have many sub-domains.
- Pure: Pure refers to [pure functions](https://en.wikipedia.org/wiki/Pure_function), which are functions that always return the same output given the same input and have no side-effects. Essentially, they don't rely on or change the system state. They simply map inputs to outputs.
- [Event](https://en.wikipedia.org/wiki/Event-driven_architecture): Events represent some change in program state. For example, the user clicked a UI element, or a for-sale house sold.


A pure domain layer is then the core rules of our business problem represented in a way that doesn't directly effect system state.

This is achieved by representing the changes our rules decide as data structures. The returned data structures are effectively events.

A pure domain also doesn't depend on any hidden system state. This means that the sum of all of our arguments to a domain function form a command. 
Commands can be thought of as client (e.g. user) triggered events.

Relying on data (commands and events) to create pure functions is an approach called *Dependency Rejection*. Scott Wlaschin has an excellent [series](https://fsharpforfunandprofit.com/posts/dependencies-4/) on how dependency rejection relates to other dependency approaches.

<!-- post (Dependency Inversion + Purity -> Dependency Rejection). -->

## Examples

I understand if such a system can be a bit hard to picture, but I does really work for most all kinds of business rules.
[Domain Modeling Made Functional's](https://fsharpforfunandprofit.com/books/#domain-modeling-made-functional) is an accessible and fantastic overview to this kind of programming. I've also written a [sampling of the book's approach](../post/2021-04-09-Designing-with-Events-Transforms-and-state.md), and developed an [exploratory system](https://github.com/farlee2121/BlockScheduler) based on the approach.

Here's a simple sample API.
<!-- TODO: sample seems a bit weak. I should show something like a "already blocked" or "SiteWhiteListed". The trick is showing it as part of the command-->
```fsharp
type BlockWebsite = SiteBlockCommand -> Result<SiteBlockCreated, BlockError>
type BlockCommand = {
  Url: String
}

type BlockError = 
| InvalidUrl of string

type SiteBlockCreated = {
  BlockStartTimestamp: DateTime
  SiteUrl: Uri
}
```

## General Benefits

A completely [pure](https://en.wikipedia.org/wiki/Pure_function) domain, achieved through events, comes with some powerful benefits.

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

## Benefit: Caching

[Cache friendly systems are performance-friendly systems](https://www.infoq.com/presentations/top-10-performance-myths/).

Pure functions always give the same output for a given input. This allows [referential transparency](https://en.wikipedia.org/wiki/Referential_transparency), where a function call can be replaced with their return value without changing the system. In other words, pure functions are very cache friendly. A whole domain that's pure is makes a system primed for caching.

## Benefit: Intelligent Concurrency Control

Horizontal scaling (e.g. more servers instead of more powerful servers) is key to scalability. A event-based pure domain offers flexible concurrency control that maximizes horizontal scaling. 

Domain decisions are decoupled from their enactment in system state. Thus we can use event streaming tools (e.g. [Kafka](https://en.wikipedia.org/wiki/Apache_Kafka)) to decide, per event type, how to distribute and enact domain events. This could mean a simple queue, multiple concurrent processing, or an auto-scaling pool of consumers. Events could be separately queued by some quality (e.g. fullfilling warehouse for purchases), or require a single processor to avoid state conflicts.

Special cases may even employ complex custom logic that analyze system state to decide event execution. Such complex schedulers can make decisions with the as much information as possible, based on both current and pending system state. For example, an e-commerce platform could schedule parallel orders based on remaining inventory (i.e. 100 left, so schedule up to 100 orders). Then batch decisions can be made about errored orders or orders remaining in the queue after inventory is empty. 

In any case, the decision and enactment are decoupled. Distribution and handling can be tweaked to the requirements of each domain event without modifying the domain.

<!-- IDEA: I just realized that authentication could be centralized. It takes context and some T. It runs default rules and any registered rules for T -->

## Benefit: Composable / Batchable Requests

The most suprising benefit for me was batching and nesting of commands.

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

First off, it can be hard to think this way. This event-based pure domain approach brings system-level thinking to the domain and individual commands. Most programmers (myself included) are accustomed to an imperative programming approach that changes state through a series of instructions. Even in a dependency inversion approach leans on the consumers calling their dependencies, even if those dependencies are abstract. This event approach calls no one. This leads to the other key pitfall, indirection. The domain knows less about orchestration and state enactment, but it also knows less. This means it can be harder to get a full picture of what the system is doing. 

## Conclusion

Designing domain code to be pure prepares the system for scalability. The input and output of the pure domain are really events. Such events are ready-made for event streaming tools that power intelligent horizontal scaling and loosely coupled consumers. Such pure events can also be cached and batched as the need arises.