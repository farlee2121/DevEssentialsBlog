---
date: "2020-12-25T00:00:00Z"
tags: [Architecture, SOLID Structure, IDesign, Clean Architecture]
title: Incremental Accessors
---

I've been on a long journey of meshing IDesign with Clean Architecture. Accessors have been a conceptual sticking point. 
<!--more-->

On the side of IDesign, I understood accessors as a *domain* service for abstracting storage. This would place them in the business logic or domain layer of Clean Architecture.

On the other hand, Clean architecture specifies that domain/business rules shouldn't interact with frameworks and resources. Rather, that is the purpose of adapters.

I thought about splitting accessor: putting contracts in the the core services, but implementations as adapters. This felt wrong though.

Then it hit me, accessors are much like utilities. Utilities evolve from collecting non-domain activities that repeat in adapters. Accessors can be incrementally developed the same way. Not all data in your system will be a core domain entity. We can discover the core domain entities by seeing what data is similar between managers, then collecting those operations up into an accessor. In that way accessors are like domain utilities focused on entities. Entities that don't repeat can stay as adapters, which also reduces the system complexity.

A similar approach applies to engines. They are repeated domain utilities focused on a computation.

If you want to know more, here are other articles on this journey to-date:
- [Original realization](../posts/2020-07-10-Synthesizing-Structure.md)
- [Notification case study](../posts/2020-08-14-Notification-Design.md)
- [Background task case study](../posts/2020-09-11-Background-Task-Refactor.md)
- [Pros & Cons after a few months](../posts/2020-09-17-Solid-Structure-Checkin.md)

Those unfamiliar with iDesign can checkout [my visual summary of the official book](../posts/2020-07-03-iDesign-Visual-Summary.md).