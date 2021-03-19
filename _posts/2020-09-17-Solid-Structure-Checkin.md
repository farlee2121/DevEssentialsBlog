---
layout: post
tags: [Architecture, Design thinking, Clean Architecture, SOLID Structure]
---

# Clean Architecture+: Check-in and Benefits 

I posted about [Synthesizing Project Organization Methods](./2020-06-15-Splitting-Architecture.md) a few months ago. Well... I've been busy putting it to practice in my own code, and the results have been been beyond my expectations!
<!--more-->

First off. It turns out that I essentially rediscovered [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) by Bob Martin. I do believe that I've added some additional useful constraints, but final verdict on that requires more experimenting.

Let's look at what's been going well.

## Limited Design Scope
I originally conceived of this idea as a way to resolve the conflicting needs of calling and consumed services. Callers want only the most limited interface for their dependency and the consumed service wants to be as re-usable as possible.

I didn't anticipate how powerful this method would be for isolating design decisions. The caller defines it's own abstractions for any dependencies it needs. Likewise, the called service is not concerned about who's calling it. It defines it's outbound interface based on it's own needs. Any flexibility for the caller is provided generically. Now, realize that each service is a caller and a called service.

This means each service only cares about it's own needs and doesn't directly reference any other service. Design decisions are made and understood without needing to look at other services. In fact, this pattern encourages me not to look at other services.

This makes for very fast and focused work since I can make all decisions without jumping between code components.  It simplifies write-time decisions, minimizes read-time scope (likely to a single assembly), and means that refactoring never leaks beyond the singular service and its adapters. 

The fundamental power of this pattern is limiting the scope of design considerations.


> NOTE: Callers owning their abstractions is a central tenet of Clean Architecture. It is what drives the layer ordering. However, it doesn't specify anything about domain service divisions or sharing abstractions in business rules.

## Pushy Information Hiding

Two common concerns I've long struggled to slot into my systems are email notifications and background processing. These have both been made clear. You can see an in-depth exploration of these in [Notification Refactor Case Study](2020-08-05-Notification-Design.md) and [Async Task Refactor Case Study](2020-09-11-Background-Task-Refactor.md).

The underlying problem here is that notifications and background processing are actually separate utility-like services of their own. Caller-owned dependency contracts make it easier to ignore these cross-cutting concerns than to weave them into the business process. This pushes cross-cutting concerns into the adapters where we can collect them into utilities.

## Decorator and Aspect Friendly

Aspect-Orientation is a paradigm that tries to separate tangential concerns like communication medium, threading concerns, security, and logging from core code. These concerns are rarely intrinsic to a domain process and may vary by use case.

My new structure encourages dependency contracts that are much smaller and more focused. Further, The implementation constraints only change due to one consumer.

This means that we can wrap a whole contract in some decorator to accomplish a tangential concern with few complications due to contract member incongruence (i.e. like when not all methods on an interface can be run on an message bus). The tangential implementation decision is made per caller without affecting either the caller or the fulfilling service. 

This isolates the cross-cutting concern into it's own focused component that can be combined with many implementations as needed. Aspects like communication protocol become a composable choice rather than a baked in concern.

> Aside: Functional users can accomplish this generically with monads. OO users can employ some DI framework magic to dynamically proxy objects for completely central operations.

I wrote about a concrete example from my code in [Async Task Refactor Case Study](./2020-09-11-Background-Task-Refactor.md).

## Reusable Services
Domain services have specific concerns pushed out and instead define focused abstractions. This is the sign of an [extension-friendly framework](https://blog.ploeh.dk/2014/05/19/di-friendly-framework/). Our domain services effectively become an extensible framework for the domain. The decorators are an example of how this pattern allows us to extend our own domain services.

The non-domain concerns that are pushed out can be collected into services for their own domain, or mapped onto existing ones. For example, my notification refactor ended up producing a generic framework for managing email templates that can be reused across applications.

## Less Room for Bugs
More generic services actually produce safer code. Mark Seemann wrote a fantastic [blog post about generics and safety](https://blog.ploeh.dk/2018/07/09/typing-and-testing-problem-23/). 

The essence is that you can't make any types-specific errors if you don't have specific types. Example, suppose you operate on a `List<T>`. You know you can select elements, reorder elements, remove items, etc. However, you can't change all the elements to `42` because the local operation doesn't know you're actually using a `List<int>`.

The same idea applies to our services, but we are ignoring domain details rather than type details. Example, my templated email library only knows how to look up templates, apply generic data structures to them, and send an email. It can't accidentally update a user record or reset their password because it doesn't know it's sending a password reset email.

Another example I implemented was a security token provider. The tokens are partitioned by purpose, and token purpose is passed in from the caller. The token provider can't accidentally cross a document download verification with a password reset because it doesn't know those processes exist. Each consumer is responsible for using a consistent purpose ID.

More generic services also bring a conceptual purity that makes them much easier to reason about, and thus less likely to have design errors.

## Event Friendly
Cutting details of concrete dependencies often leaves us with just "hey a thing happened, and here is the identifier". In other words, an event. In essence, we have fewer expectations for outward arguments and returned data because we don't know how or if our call will be fulfilled. 

This is good because events are a very powerful pattern for decoupled and scalable systems. However, I would not go so far as to call it Event Driven Architecture. The goal is a simpler and more pure representation of the domain, not to shape the design around events.

## Same idea everywhere
I think the testament to these rules is that they are the same everywhere.
- Writing a library? Control your own abstractions and provide generic extensibility. Force other to adapt
- Writing a domain service? Control your own abstractions and provide generic extensibility. Force other to adapt
- Writing tests? Control your own abstractions. Adapt the system to fit. Extensibility doesn't apply because there are no callers. (Credit for this idea goes to [Paul Spoon and his post](https://codewithspoon.com/2019/12/stop-corrupting-yourself-test-against-abstractions/))
- Need to build on framework behavior? Define your own abstractions and adapt the framework into them. 

## Open questions
- Do the IDesign Service boundaries remain the same?
  - Do concrete accessors exist? Are accessors just a class of manager/engine dependency contract? I still like the idea of defining domain atomic actions, but do they matter if managers define their own dependencies?
  - Are there cases where it's still good to shared domain contracts? Should I cut off contract sharing all together? I've gotten away without wanting to share data contracts so far because my dependencies have all been simplified to primitive types or generics
- Is there an adapter layer between managers and clients?
  - Clean architecture would say yes
  - IDesign effectively defines the managers as a kind of adapter that groups the domain actions into use cases. The clients use them directly
  - I think the answer here is yes, but it might be ok for the adapters implementations to live in the client. There is always some data mapping to satisfy the client and prevent model changes from leaking into views.
- Can domain services in the same IDesign layer be adapted to fill each others dependencies
  - My thought is no. My concrete cases that made me want to say yes tend to be quick workarounds that would be better designed another way.

