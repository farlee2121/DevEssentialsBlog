---
date: "2020-07-10T00:00:00Z"
tags: [Design Thinking, System Structure, Project Structure, Synthesizing, Design Theory]
title: Synthesizing Project Organization Methods
aliases:
- /2020/07/10/synthesizing-structure
---

How to organize code into projects/packages can be a challenge. Here's an interesting idea I thought of from synthesizing ideas from Robert Martin, Juval Lowy, Mark Seemann, and how many nuget packages are organized.
<!--more-->

The ideas:
- Services as Legal Contract / Stand-alone api for part of the business nature
- Open-Closed Principle
- Callers own contracts
- As tests become specific code becomes general
- Interface Segregation 
- Separation of abstractions and implementations
- Reuse units = Release units

### Maximize Reuse 
IDesign emphasizes the stand-alone reusability of services. Each service is, in a way, an api for some aspect of the nature of the business. Thus, a service shouldn't be orienting its flows to specific callers. Rather, it should favor becoming general to satisfy additional caller use-cases over adding specific paths (generalized methods are more resistant to change whereas more specific methods increase vulnerability to change).

This makes sense, tests are really our first consumer of code. So, just as code gets more general to accommodate more specific tests, services get more general to accommodate more specific use cases.

It also meshes with the Open-Closed principle. The services offer generalized extensibility to their callers without changing their internals workings to meet caller needs.

### Minimize Dependency
However, this conflicts with upstream callers requiring as little as possible of their dependencies. We don't want to expose callers to unrelated changes, or depend on unneeded features. That makes it harder to swap dependency implementations.

This is why a caller defines the abstractions for its dependencies to implement. It is the sign of an extension-friendly framework.

### Bridging The Two 
This divide can be solved with a thin adapter layer.  
In this way, each service defines its own dependency contracts. Callers own their abstractions, services  expose maximum flexibility out, and specify minimum dependency in. This makes each service very portable in isolation from other services. It also normalizes the experience between integrating externally constructed services/libraries versus internal.

This also happens to be the general mode of functional programming. Functions specify dependencies on other functions as a signature of arguments to output. Higher flows then partially apply, bind, or otherwise adapt functions to meet each others signatures. 

From an assembly organization standpoint, this looks kinda like the `Library.Core` and `Library.ImplementationDetail` split. Each service depends on its own abstractions and has no design-time dependency on any other service.  

A separate project/assembly with a dependency on both the calling service and the implementing service. It defines the adapters between the caller abstractions and the implementer. This adapter project is ultimately what gets referenced when constructing the composition root in the final client.

For simplicity, you could consolidate integrations between two design layers in one project until some usage requires them to be split (depending on upper layer for abstractions, lower layer for implementation). The split would be pretty easy since everything in the layer is only an adapter, there is no library dependency sorting.