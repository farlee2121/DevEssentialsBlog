---
date: "2022-05-05T00:00:00Z"
tags: [Event Streaming, Dependency Rejection, Event-based Architecture, Domain Modeling Made Functional]
title: Pure Domains Make Scalable Systems
seriesId: Pure Domains Make Scalable Systems
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

Consider a system where the business rules (domain) don't change the system state. Instead they return data and let consumers enact the corresponding change. Such a system is maximally event-driven and simplifies some difficult problems in high-scale systems.
<!--more-->

## A Pure Domain through Events

There are a few terms critical to understanding this article.

- [Domain](https://en.wikipedia.org/wiki/Domain-driven_design): Domain refers to our core problem or business. Domain can also refer to the "domain layer" that reflects domain rules in the software. So if were writing accounting software, it's the part that encodes the rules of accounting. Non-domain code are incidental to the business, like sending emails or storing data in a database. How we notify users or store data could change without changing how the business works. Systems will commonly have many sub-domains. 
- Pure: Pure refers to [pure functions](https://en.wikipedia.org/wiki/Pure_function), which are functions that always return the same output given the same input and have no [side-effects](https://en.wikipedia.org/wiki/Side_effect_(computer_science)). Essentially, they don't rely on or change the system state. They simply map inputs to outputs. Pure functions are deterministic. They always return the same output given the same input.
- [Event](https://en.wikipedia.org/wiki/Event-driven_architecture): Events represent some change in program state. For example, the user clicked a UI element, or an item was sold.


A pure domain layer is then the our core business rules implemented decoupled from direct system state. 

Pure domain rules can only effect system state through the data they return. The returned data is effectively an event.

A pure domain also only know about data you pass. They don't depend on any implicit state. The sum of all of our arguments to a domain function are the whole context. This data acts like a command. Commands can be thought of as client (e.g. user) triggered events.

Relying on data (commands and events) to create pure functions is based in *Dependency Rejection*. Scott Wlaschin has an excellent [series](https://fsharpforfunandprofit.com/posts/dependencies-4/) on how dependency rejection relates to other dependency approaches. 

<!-- post (Dependency Inversion + Purity -> Dependency Rejection). -->

## Examples

I understand if such a system can be a bit hard to picture, but I does really work for most all kinds of business rules.
[Domain Modeling Made Functional's](https://fsharpforfunandprofit.com/books/#domain-modeling-made-functional) is an accessible and fantastic overview to this kind of programming. Mark Seemann covers this approach as [Functional Architecture](https://www.youtube.com/watch?v=US8QG9I1XW0&ab_channel=NDCConferences). It is also sometimes called Functional Core Imperative Shell, since the pure domain takes many ideas from functional programming while state changes are enacted imperatively at the application boundaries.

I've also written a [sampling of the approach](../posts/2021-04-09-Designing-with-Events-Transforms-and-state.md), and developed an [exploratory system](https://github.com/farlee2121/BlockScheduler) based on the approach. 

Here's a simple sample endpoint.
```fsharp
type BlockWebsite = SiteBlockCommand -> Result<SiteBlockCreated, SiteBlockError>
type SiteBlockCommand = {
  Url: String
  Schedule: Schedule
}

type Schedule = 
| OneTime of TimeSpan
| Repeating of DayOfWeek list * TimeOnly * TimeSpan // Days, StartTime, Duration

type SiteBlockError = 
| InvalidUrl of string
| ConflictingRule of WhitelistRuleId

type SiteBlockCreated = {
  BlockStartTimestamp: DateTime
  SiteUrl: Uri
  BlockId: BlockId
}
```

## General Benefits

A completely [pure](https://en.wikipedia.org/wiki/Pure_function) domain, achieved through events, comes with some powerful benefits.

First, some general benefits of purity
- Simplified Testing: Pure domains don't require mocking. The domain no longer relies on injected dependencies, all information is contained in the input and output. 
  - Purity also promotes fast and reliable tests. There is no risk of slow out-of-process infrastructure.
- Clarity: Pure functions have no side-effects. What you see is all you need to think about. This makes them easy to reason about and compose into new applications.
- Parallelization: pure functions have no direct effect on system state and don't interfere with each other. Our whole domain is pure, so our domain is maximally parallelizable. 
- Dry-run domain rules: Separating decisions from enactment of state also means we can preview or dry-run possible actions safely


## Benefit: Maximize Event Tooling

Using events for all input and output of the domain enables maximal leverage of mature event streaming tooling
- System History: Event streams or a event store can track the entire history of system states, [which has many benefits](../posts/2021-05-28-Transaction-Databases.md)
- Decoupled Uptime: the event stream acts as a queue and decouples uptime between producers and consumers
- Flexible consumers: All decisions of the domain rule are contained in data. That data can be passed to any number or type of consumer without changing the domain. 
- Central cross-cutting policies: Event tooling typically supports configuration for policies like retry, error handling, and delivery guarantees without code changes. 
  - This also works for events in a well-done dependency inversion structure, but less of the system is represented as events

## Benefit: Traceability

Mark Seemann [suggests](https://www.informit.com/store/code-that-fits-in-your-head-heuristics-for-software-9780137464401) we log everything we can't reproduce.

Pure functions are deterministic. If you have the inputs, you should always get the same outputs. This makes traceability and reproduction dramatically less complex. 

The event responses can also be enacted in one transaction. This can lead to dramatically less debugging by eliminating quirky transitions of state in the middle of a call chain.


## Benefit: Caching

[Cache friendly systems are performance-friendly systems](https://www.infoq.com/presentations/top-10-performance-myths/).

Pure functions always give the same output for a given input. This allows [referential transparency](https://en.wikipedia.org/wiki/Referential_transparency), where a function call can be replaced with their return value without changing the system. In other words, pure functions are very cache friendly. A whole domain that's pure is a system primed for caching.

## Benefit: Intelligent Concurrency Control

Horizontal scaling (e.g. more servers instead of more powerful servers) is key to scalability. A event-based pure domain offers flexible concurrency control that maximizes horizontal scaling. 

Domain decisions are decoupled from their enactment in system state. Thus we can use event streaming tools (e.g. [Kafka](https://en.wikipedia.org/wiki/Apache_Kafka)) to decide, per event type, how to distribute and enact domain events. This could mean a simple queue, multiple concurrent processing, or an auto-scaling pool of consumers. Events could be queued to different consumers by some quality (e.g. fullfilling warehouse for purchases), or limited to single processor to avoid state conflicts.

Special cases may even employ complex custom logic that analyzes system state to decide event execution. Such complex schedulers can make decisions with as much information as possible, based on both current and pending system state. For example, an e-commerce platform could schedule parallel orders based on remaining inventory (i.e. 100 left, so schedule up to 100 orders). Then batch decisions can be made about errored orders or orders remaining in the queue after inventory is empty. 

In any case, the decision and enactment of events are decoupled. Distribution and handling can be tweaked to the requirements of each domain event without modifying the domain.

<!-- IDEA: I just realized that authentication could be centralized. It takes context and some T. It runs default rules and any registered rules for T -->

## Benefit: Composable / Batchable Requests

The most suprising benefit for me was batching and nesting of commands.

The domain rules are deterministic. They always give the same result given the same input. The rules don't care about where the data comes from. The identity of the operation the same no matter how the data arrives or when.

Similarly, the full change of system state is contained in the response of the domain rule. There's no assumptions about persistence or timing within the domain rule.

All together, this means that we can batch and nest domain commands safely without effecting outcomes of the event.

First consider batching. Suppose we have a system that supports offline editing. All the edits made while the client is offline can be stored as their domain events. When the client is back online, these events can be sent serverside and replayed. The server state will match the client state just as if it had never been offline. There is no need to diff client and server storage and no information about intermediate state is lost. 

This approach also avoids potential conflicts with changes made on the server while the client was disconnected. We have each state delta and the time each state change was made. Therefore we can deterministically decide which change should take precedence.


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

However, our domain commands don't rely on the profile request coming first. The commands could be sent as a batch, broken up into their respective domain commands, executed, and then aggregated back into a batched response. Batched requests don't have to be batched as a sequence, they could also be batched as a hierarchy of events and achieve the same result.

Such batching or nesting gives us flexibility over request and transaction size. We can lump requests to reduce calls (e.g. a profile and add image request as one) or request them individually. Similarly, we can fail the group as a whole, or we can allow partial success. Such decisions could even be decided as parameter in the request (i.e.`{transaction-behavior: "allow-partial", events: []}`).


## Downsides

First off, it can be hard to think this way. This event-based pure domain approach brings [system-level thinking](https://www.youtube.com/watch?v=ROor6_NGIWU&ab_channel=ClojureTV) to the domain and individual commands. Most programmers (myself included) are accustomed to an imperative programming approach that changes state through a series of instructions. Even a dependency inversion approach leans on the consumers calling their abstracted dependencies. This event approach calls no one. 

This leads to the other key pitfall, indirection. The domain knows less about orchestration and state enactment, but it also knows less about orchestration and state enactment. It's a double edged sword. It's more flexible but it can be harder to get a full picture of what the system is doing. 

## Conclusion

Designing domain code to be pure prepares the system for scalability. The input and output of the pure domain are really events. Such events are ready-made for event streaming tools that power intelligent horizontal scaling and loosely coupled consumers. Such pure events can also be cached and batched as the need arises.


<!-- hmm. I now know this is is called functional core, imperative shell -->

<!-- Q: Do I need to break up this post? -->