---
date: 2022-11-17
tags: []
title: Why callers own abstractions
# title: How abstraction location affects bind time
---

Dependency Inversion demands that abstractions belong to callers. 
This isn't an immediately intuitive choice. I'll break down the choices for where our abstractions can live and how each impacts kinds of coupling.
<!--more-->

<!-- PICKUP: Maybe work on some of the diagrams if I can't get the writing flow going -->

<!-- STUCK: I'm stuck on the idea of explaining the kinds of coupling. There are so many kinds of coupling. I'm particularly thinking about compile vs assembly vs runtime (maybe vs decoupled uptime). In particular i'm thinking about jack's conflation of reference dependency and the fact that some code causes other code to run.

Maybe I don't make DI the framing, but instead instead overviewing kinds of coupling? or kinds of dependency?
- in particular, my original sketches cover a spectrum of abstraction choices
  - probably need a diagram showing adapter

TODO: I need a clearer term than "abstractions". 
- contracts for dependency operations, which we'll call ports
 -->

## No Abstraction

The most straightforward dependency approach is dependency retention. That is, no abstraction. A concrete component directly references another concrete component.

For example, class B directly depends on class A.

```cs
class A {
    void DoThing(){
        //...
    }
}

class B{
    
    void DoMoreThings(){
        new A().DoThing();
        //...
    }
}
```

<!-- hmm, how do I phrase this better -->
Class B depends on class A at
- Write-time
- Deploy-time
- Run-time

The details of the operation could be conceptually separated so A can be reused, 


## Abstraction Lives with Implementation

- can technically swap implementations, but not really. The alternatives have to live in the same package. The interface also doesn't know quite what it's being used for so it has to try to be generic. The abstraction becomes a "header interface" that just reflects the concrete implementation. The abstraction can't focus so it accumulates too much and alternatives become too complex to practically create.

caller still has a design-time dependency on dep

TODO: probably need to explain assemblies and how dependencies work (maybe talk about it in terms of packages, which is more general)


## Shared Abstraction Reference

- Can be ok depending on how its done
- Who decides what ends up in the abstractions. Who's needs are we modeling
  - the caller -> no need to separate the abstractions. Not immediately intuitive how to accomplish this, but we'll get there.
  - the implementation -> effectively no abstraction (already discussed)
  - both -> effectively no abstraction and leak concerns between consumers
  - the abstractions own themselves -> can be ok in system-wise common concepts. For example, you probably don't want every service defining a custom logging interface.
- A major danger is just having an "abstractions" package for the whole system. This is (usually) about the same as making all your data global. It makes reference easy, but then everything knows about every abstraction and any change to those abstractions is pretty unsafe. Changing any abstraction requires considering the entire system. Yuck.

Now only a runtime dependency on implementing component, but potentially also semantic coupling if you're not careful

## Caller-owned Abstractions

- Clear intended usage, so easy to choose focused semantic
- only a runtime dependency. No design-time and (more likely) no semantic dependency

The confusing part is it now seems like your dependencies now rely on the services that uses them. How can that work?

It works because the kinds of dependence are different. The caller has only a runtime dependence, while the implementation has a design-time dependence.

## Adapters
Though, we can do even better. We can separate the design-time dependence into it's own component, called an adapter.

Now the adapter depends on the caller and on the called dependency. It is responsible for mapping one contract into the other. Now the caller and the implementation are semantically decoupled from each other and decoupled at design-time. Only the runtime-dependence remains.

The adapters are light-weight. The design freedom they provide usually more than makes up for the extra layer. The adapters also create a composable suite of caller-dependency relationships. The system can change achieve substantial behavior changes without changing any services (the callers or the implementations).


THOUGHT: The focus here is the package dependencies more than the component dependencies. I think people will get that dependencies implement an interface