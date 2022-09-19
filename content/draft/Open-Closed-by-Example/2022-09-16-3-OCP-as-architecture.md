---
date: "2022-09-16T00:03:00Z"
tags: [SOLID, Design Principles]
seriesId: "Open-Closed Principle by Example"
title: "Open-Closed Principle by Example: OCP as Architecture"
---

<!-- TODO: This got really long. Consider tightening it up -->
This series clarifies the [Open-Closed Principle](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle) by example. This post applies OCP to the system level with architecture patterns like ports and adapters.
<!--more-->

I recommend you read the [series intro post](./2022-09-16-0-Intro-to-OCP.md) if you haven't already. This post also learn heavily into ideas established in the previous [post on flexible behaviors](./2022-09-16-2-Flexible-Behavior.md)

As a reminder, the OCP illuminates how components can adapt to caller needs without changing internally. Data patterns like tags enable callers to imprint custom meaning on data without modifying the component that owns that data. Dependency Inversion enables composition of different dependency implementations without changing the consumer of those dependencies. 
Both approaches enable components to focus on the essence of their own problem domain and defer details of interpretation to other components.


## Ports and Adapters

Applying Dependency Inversion and the Open-Closed Principle at the system level is an architectural pattern. Unfortunately, it goes by many names: [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html), [Hexagonal Architecture](https://en.wikipedia.org/wiki/Hexagonal_architecture_(software)), [Onion Architecture](2022-09-16-0-Intro-to-OCP.md), or Ports and Adapters.
These approaches are [all fundamentally the same](https://blog.ploeh.dk/2013/12/03/layers-onions-ports-adapters-its-all-the-same/).

I generally say Ports and Adapters. I think it provides the best analogy for how the pattern works.
<!-- TODO: either cite this or find a license-free image -->
![image of ports and adapters](../../../static/post-media/Open-closed-by-example/ports-and-adapters.png)

At the core we have some service or component (yellow). It defines the ways external actors are allowed to interact and customize as ports (red). Then adapters (blue) are create to map other services into the ports.

Other services also selfishly define their own abstractions/ports and adapters bridge the gap. This separates the business rules from composition of those rules. The result is a highly flexible and reusable system. The services are more like domain-specific libraries than they are an inherently connected system. Changes tend to be far more isolated, involving a single service or a service and some adapters.

I'll discuss more benefits, but let's look at a more concrete example first.

## Example: Chat System
I've referenced a chat system for examples throughout this series. Now we'll look at the overall structure of the system.

![chat system diagram](../../../static/post-media/Open-closed-by-example/messaging-diagram.drawio.svg)

The messaging client is where the core domain logic happens. This diagram shows four dependencies: 
- IMessageNotifier: Notify when a message was sent. Covered in [flexible behavior post](./2022-09-16-2-Flexible-Behavior.md)
- IThreadAccess: Read or save thread information, not including messages in the thread
- IMessageAccess: Read or save messages
- IAttachmentAccess: Read or save attachment to messages

These interfaces all belong to the messaging client. Adapters are then created outside of the messaging client assembly. These adapters map the dependencies to concrete implementations: like sendgrid for notifications or a shared document service for attachments. 

Note that threads and messages are both being stored to relational databases. This could be the same database, or it could be separate. The service does not depend on the data store to manage relationships, it handles relationships in the logic layer. This was a hard step for me to take and I wrote [a thorough post about it](../../posts/2021-01-01-Accessors-Services-Not-Servants.md).

Each of these dependencies could be swapped independently. For example, we could move attachments from a shared service to a third party service like S3 or blob storage. We could even use the adapters to migrate between the two.

## General pattern

The chat library example extends to all kinds of services.

![general ports and adapters diagram](../../../static/post-media/Open-closed-by-example/general-diagram.drawio.svg)

In general, you have some core workflow or logic that defines it's own dependencies or "ports". Other services are then mapped into these ports using adapters that live outside the assembly of the core workflow.

![Call chain using ports and adapters](../../../static/post-media/Open-closed-by-example/pattern-diagram.drawio.svg)

In this way the core workflow or business logic becomes the lowest layer in the dependency chain. It only knows about abstractions (i.e. interfaces and data contracts) that it's created for itself. The core workflow comes with little baggage. It only knows about the domain problem it solves and everything else is composed later via ports. The core service is thus maximally reusable between different consumers. They could be other services in our own system or external users we've never thought of and may never know about.

## Anti-Example: Externally owned

I must stress again that *callers own abstractions*. In this case, the core flow owns it's own dependency interfaces. The whole pattern falls apart without this.

Consider this diagram where the ports are defined externally.
![Diagram showing a service with external interfaces/abstractions](../../../static/post-media/Open-closed-by-example/external-ports-diagram.drawio.svg)

This structure leads to one of two scenarios
1. *Abstractions gear toward implementations*: This leads to [header interfaces](https://blog.ploeh.dk/2010/12/02/Interfacesarenotabstractions/). The interface simply becomes a pass-through for an implementation and is no longer an abstraction. The domain workflow has to bend around the semantics of the dependency. These interfaces usually accumulate so many operations that alterative implementations are heavy and not maintained. The cohesion of the operations is low, making them difficult to decorate or to properly implement alternatives.
2. *Abstractions try to gear toward multiple callers*: This situation is even worse. The abstraction accumulates semantics from multiple callers, and causes every caller to be coupled to the semantics of every other caller. This semantic coupling is sneaky and fragile. Every caller has to be considered when changing the interface or implementation.


## Architecture Benefits

All of these ports and adapters can feel like a lot of inderection. Is it worth it?

As always, the answer depends. Components with little change or short lifetimes probably don't need this approach. The benefits for evolving or frequently reused components stack up pretty fast.

For one, this approach is high testable. Already usually worth the effort.

The [last post](./2022-09-16-2-Flexible-Behavior.md) showed how this approach enabled the message client to adapt to testing, new kinds of notifications, or even dynamic notification types without changing the core messaging client. The specific mix of notifications also being decided per-consumer.

### Isolate Cross-cutting Concerns
This approach enables a similar but broader benfit: [separation of cross-cutting concerns into decorators](https://blog.ploeh.dk/2010/04/07/DependencyInjectionisLooseCoupling/).

Logging, authentication, retry policies, caching, and more can all be accomplished without changing any domain service. Instead they are accomplished with [decorators](https://en.wikipedia.org/wiki/Decorator_pattern).

Decorators sit between the caller and the called component. They add some functionality and then pass off to another implementation of the same interface. 

Consider this decorator that logs when another notifier fails
```cs
class ErrorLogMessageNotifier: IMessageNotifier{

    private IMessageNotifier decorated;
    private Logger logger;
    public NotificationLogger(IMessageNotifier decorated, Logger logger){
        this.decorated = decorated;
        this.logger = logger;
    }

    void NotifyMessageSent(Message message){
        try{
            decorated.NotifyMessageSent(message);
        }
        catch (Exception e){
            logger.Error(e);
        }
    }
}

// somewhere else
IMessageNotifier notifier = new ErrorLogMessageNotifier(new SendGridMessageNotifier(), new Logger());
```

These cross-cutting concerns tend to add noise to domain logic and cause sneaky coupling between components that could otherwise be generally reused.

### Trimability and Progressive Change

The composition is isolated in adapters. This allows for flexible and progressive system evolution.

Suppose we want to migrate data stores. A new adapter can be written for the new data store plus a migration decorator. The migration decorator can ensure that we read and write to the old data store while also writing to the new data store until we are sure all data is migrated. Then we repace the aggregate migration adapter with just the new data store adapter. We could even add another phase that reads and writes to the new store, but still writes to the old store until we're sure the migration worked. This can all be done without changing the core service. It could even be done dynamically using feature flags.

This same kind of progressive swap can be done with all kinds of behaviors, not just data storage. The composition of services lives external to the services themselves and their interaction is contained in swappable units. 

This results in service actions that can easily be trimmed over time, changed out, our built up into a suite of alternative. Consider [entity framework](https://www.nuget.org/packages/Microsoft.EntityFrameworkCore/) which has built up an [army of supported data stores and drop-in enhancements](https://www.nuget.org/packages?q=entity+framework).
This is opposed to direct service dependencies, which often require coordinated release and require overwriting the old dependency integration in order to add the new.

### Protocol Agnostic

This pattern is not limited to systems that run in-process. In fact, communication protocol also becomes flexible. Different adapters can be used to support different protocols. The services don't care if the adapter sources from dependencies that are in-process, background work, REST APIs, or something else. Deployment strategy becomes a configurable option using Ports and Adapters.


## Paradigm Disclaimer

This series has shown ports and adapter implementations from a common Object-Oriented perspective. This architecture style is not limited to OO, though it looks different in other programming paradigms. Check out Mark Seemann's adaptation to [functional programming](https://blog.ploeh.dk/2016/03/18/functional-architecture-is-ports-and-adapters/).

## Further reading
I'll admit this concept takes some experimentation to understand. Here are resources that helped me and some writtings about my own process learning this pattern
- [Layers, Onions, Ports, Adapters: it's all the same](https://blog.ploeh.dk/2013/12/03/layers-onions-ports-adapters-its-all-the-same/)
- [Notification Refactor Case Study](../../posts/2020-08-14-Notification-Design.md)
- [Async Refactor Case Study](../../posts/2020-09-11-Background-Task-Refactor.md)
- [Accessors: Services Not Servants](../../posts/2021-01-01-Accessors-Services-Not-Servants.md)
- [Clean Architecture+: Check-in and Benefits](../../posts/2020-09-17-Solid-Structure-Checkin.md)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Incremental Accessors](../../posts/2020-12-25-Incremental-Accessors.md)
- [Ports and Adapters](../../posts/2020-12-19-Ports-and-Adapters.md)
- [DI-Friendly Framework](https://blog.ploeh.dk/2014/05/19/di-friendly-framework/)


## Conclusion

The Open-Closed Principle and Dependency Inversion applied at the system level define the Ports and Adapters architecture.
This approach requires our domain services to own their dependency abstractions (ports) and let external adapters map between services.

Ports and Adapters clears the way for flexible systems where
- domain services are reuseable libraries 
- cross-cutting concerns are isolated and composed 
- integrations can be accumulated and composed instead of torn out and replaced
- dependencies can be trimmed and progressively migrated
- deployment doesn't effect service implementations