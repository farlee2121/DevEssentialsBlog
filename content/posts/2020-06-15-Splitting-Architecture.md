---
date: "2020-06-15T00:00:00Z"
summary: I was 'raised' on the iDesign school of architecture. To me architecture meant the high-level separation of concerns into clients, managers, engines, accessors, and resources. ... but now there is a new level of separation
tags: [Pivotal Insights, Architecture, DDD, iDesign]
title: Splitting Architecture
aliases:
- /2020/06/15/splitting-architecture
---

I was "raised" on the iDesign school of architecture. To me architecture meant the high-level separation of concerns into clients, managers, engines, accessors, and resources.
<!--more-->

Overall, this is a pretty decent view. Later, I would learn of Clean Architecture, Hexagonal Architecture, Onion Architecture, and some other less known paradigms. 
All of these jive pretty well with iDesign. They all 
 - are layer-based
 - systemize thought about temporal coupling and data coupling
 - protect the system from external dependencies (frameworks, databases, apis, etc) and details (display, storage paradigm, infrastructure, etc)

These patterns provide a powerful vocabulary for reasoning about high-level system organization. However, I found there was something missing.

Systems often ended up organized around entity types (database tables) or feeling like several system bundled together (with groups of call-chains that aren't really tied to each other). The bundles are better, but it's still tempting to couple them at the database. 

Further, I would see awkward chains like EmailAccessor with EmailTemplateEngine or UserAccessor, IdentityEngine, IdentityManager. Something was wrong, these just feel like a different kind of concern than my use-case-oriented managers. These concerns both feel like they should be used different places in my other verticals and simultaneously need a stack of their own.

This brings us back to a paradigm I skipped earlier: Domain Driven Design (aka DDD).

For a good long while I lumped DDD in the same group as iDesign. But, I started testing it partnered with iDesign and it changed how I was writing code. This led to an epiphany and the world of architecture split in two.

Certainly, DDD addresses some of the rich concerns of the other patterns with ideas like anti-corruption layers. However, DDD is a fundamentally different beast. Here's why
 - iDesign et.al. give guidance to universal kinds of coupling relevant to every application, but little advice for separating out sub-problems of your specific application
 - DDD bends around identifying your sub-problems and  protecting them from each other

These are orthogonal problems. Consider hexagonal architecture for the convenience of visual metaphor. DDD helps you decide what your hexagons are and how they play nice. Hexagonal architecture helps you decide how to structure the code within that vertical/hexagon. 

My feeling that email templating and identity management both needed to be used in my other verticals and needed a vertical of their own was correct. They are *separate domains*. They are a re-usable problem that should be Open and Closed. They should draw a boundary and offer generically flexible behavior that allows your other domains to extend them without changing them. They are they large scale of the Single Responsibility Principle.

My view of architecture has been split into domains and intra-domain organization. They were really always separate but now the difference is clear and beautiful. More importantly, we have the power to leverage it to make understandable and flexible systems ([the classic criteria for modularization](https://prl.ccs.neu.edu/img/p-tr-1971.pdf)).

### Other "Architectures" footnote
There are of course other paradigms that use the name architecture, but I find they are too tied to some detail, like a communication or deployment method. The world of iDesign et. al. are intended to hide these concerns and use them as needed from behind abstractions.

Here are some Robert Martin posts I recommend based on you're view on architecture. <span style="font-size: .75rem">(Pardon the excess of Robert Martin references. I just finished reading 9 years of his blog posts and these references are top of mind, though these concepts are certainly not exclusive to him)<span>

If you you answer "x webstack + framework + storage" when asked about architecture then I strongly recommend you read [A Little Architecture](https://blog.cleancoder.com/uncle-bob/2016/01/04/ALittleArchitecture.html)

If your mind goes straight to entities and database tables, then these are the articles for you
-  [Dance You Imps!](https://blog.cleancoder.com/uncle-bob/2013/10/01/Dance-You-Imps.html)
-  [No DB](https://blog.cleancoder.com/uncle-bob/2012/05/15/NODB.html)

If you're thinking micro-service architecture or event-driven architecture see 
- [Micro-Services and Jars](https://blog.cleancoder.com/uncle-bob/2014/09/19/MicroServicesAndJars.html) and [Clean Micro-Service Architecture](https://blog.cleancoder.com/uncle-bob/2014/10/01/CleanMicroserviceArchitecture.html)
- And just for fun [The First Micro-Service Architecture](https://blog.cleancoder.com/uncle-bob/2015/05/28/TheFirstMicroserviceArchitecture.html)

[Screaming Architecture](https://blog.cleancoder.com/uncle-bob/2011/09/30/Screaming-Architecture.html) touches a bit on all of these.

I also generally recommend [The Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) to see Uncle Bob reasoning about the different architecture methods.

### Response Update
In response to this realization, I was sent me [Finding Your Service Boundaries - Practical Guide](https://www.youtube.com/watch?v=tVnIUZbsxWI). Around the [51 minute mark](https://youtu.be/tVnIUZbsxWI?t=3017) the presenter makes a similar point while considering how we should find service boundaries (it's a good talk). 


