---
date: "2020-11-20T00:00:00Z"
draft: true
excerpt_separator: <!--more-->
---

# PADL: Cross-Cutting Concerns
Some concerns don't truely belong to any part of the domain, but instead work incidentally to most processes in the system. These are cross-cutting concerns. 

Localized port-based extension is the key to decoupling cross-cutting concerns from core service functionality.
<!--more-->

## What are Cross-Cutting Concerns
Cross-cutting concerns include activities like
- Remote or alternative communication protocols
- Moving work off-process
- Security rules
- Triggering multiple adapters for one call
- Retry and timeout policies
- Diagnostic logging

These activities change for different reasons than either the business rules or the adapters between services. Their changes apply to many flows of the system at once, but are not instrisic to any of the flows.

## Where do we put them?
Where we represent these concerns greatly impacts how changes propegate and how developers view their portability in the system. The goal is to reduce duplication of these concerns and let them vary independently from the services they modify. 

Let's examine the possibilities

- **In each service**: This what happens most often. The downside is that many services are changed every time the cross-cutting concern changes. Consider if we add a new user role to authentication. Most services would be impacted, and it would be easy to miss or overlook something in all the churn.

    This approach also prevents cross-cutting concerns from being configured effectively. We are stuck with the choice that was baked into the service.
    
- **Decorate each service**: Using the decorator pattern to wrap whole services separates cross-cutting concerns and opens the possibility for generated wrappers with centralized configurations. The problem is that many consumers use each service and have different expectations for security, retries, and the like. 

    Services can also grow large, and not every operation may change consistently with cross-cutting concerns. A good example is communication protocols. Some service operations may require immediate response while others want to defer work via message queue.

- **Decorate ports**: Port-based architectures benefit from another layer to decorate. The ports are small, focused, and caller-specific components that can be decorated. This has many benefits
  - Even hand-written decorators are fairly easy to write
  - The focused definitions make it likely that all operations share decorated concerns 
  - Each service can selfishly define it's own logging, retry policies, remote communication wrappers, and other cross-cutting concerns per-dependency 
  - Decorators generated or configured from central definitions are straightforward
  - No churn in services when cross-cutting concerns change
  - Alternative decorators can be composed or swapped at configuration time
  - Incremental Evolution: The limited scope of each decorator makes it easy to start simple and add complexity only as it's needed.

Read [AOP and Decorators](../../post/Language%20Limited%20Though/2020-10-16-AOP-and-Decorator.md) for more in-depth analysis.

## Practical Tips
Default to decorating ports for the impacted usecase. Decorate a service if every call to the service should have the same behavior (per system configuration).

Note that decorators can be hard to reuse. It usually requires some kind of runtime or compile-time meta-programming. Thus, it is often worth making the first several decorators by hand and waiting to see if and how the code repeats.

## Summary

Cross-cutting concerns are traditionally difficult to decouple because of their diffuse nature. However, decorators effectively decouple cross-cutting concerns from domain components. Service and port-based architectures (like PADL) enjoy clear boundaries to decorate and simple rules to decide which boundary to decorate.
