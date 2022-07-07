---
date: "2021-04-30T00:00:00Z"
tags:
- Design Patterns
title: The Place for Ambient Context
---

Ambient context is a useful design pattern, but a recent project got me thinking about how universal this context should be.
<!--more-->

## The Pattern

Ambient context is the pattern where information about the system state is made available to components implicitly. That is, not by an explicit handoff in the call chain.

This is a bit hard to visualize, but think about how ASP.NET makes authentication and user information available through a property on the controller.

This pattern is very useful for information that should be static per call chain and used in many places. 

One application would be cross-cutting concerns like logging and authentication. It doesn't make sense to relay information through a whole call chain just for logging and authentication. Instead, we can make it available to only components that need it as part of the dependency injection process.

Another application is commonly leveraged by SDKs. Adding an API key to every method call would be tedious. Instead, an api key is provided to some root context and implicitly consumed by the whole SDK.

## How ambient is too ambient

A project I recently worked on provided the same ambient context object to every service in the application.

This causes several issues
- It violates the self-centered design of services by assuming they'll all be run in context of the full application stack
- It couples services, assuming that all services need the same ambient information

I think it is fair to assume that the managers (top level use case compositions) will use a fairly consistent ambient context. As will cross-cutting decorators like authentication and logging.

These elements can be seen as the SDK, their main purpose is composing rules to run the system.

The same is not true for lower-level services like engines and accessors. These services are repeated domain concerns that form a sort of library for reuse. 

I commonly find myself using these lower-level services to write internal tools. Such tools won't share the context assumed by the full system.

Consider a maintenance script on user data. If lower-level components must retrieve user data from the ambient context, then the maintenance script will have to mutate or re-instantiate the dependency chain with a new context for every user it updates.

This doesn't mean that an engine, accessor, or other sub-component can't use an ambient context. Rather, they should define context on their own terms and based on their broader usage.

## Conclusion

Ambient context is a useful pattern. However, remember that services are selfish. They should design for their own needs, keeping themselves independent and reusable. Lower-lever services are rarely confined to one runtime context and should not share a global ambient context.