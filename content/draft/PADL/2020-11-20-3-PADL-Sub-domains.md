---
date: "2020-11-20T00:00:00Z"
draft: true
---

# Domain Decomposition in PADL

Ports keep components loosely coupled independent of domain, but the domain itself often needs broken down and organized.
<!--more-->

This happens at two major scales of abstraction
- Managers, Engines, and Accessors classify services by responsiblity
- DDD rules find boundaries between independent sub-problems, called sub-domains

## Responsiblity Cohesion

We've [already covered](./2020-11-20-1-PADL-Architecture.md) simple rules for different kinds of responsibilities in a domain.
  - managers are business workflows, and where each use-case starts
  - repeated domain operations are Engines
  - repeated domain entities belong to Accessors
  - repeated non-domain operations are Utilities

These divisions recognize domain activities that change for different reasons. In programming terms, each represents a kind of cohesion.
- Managers are flows.
  -  Flows may utilize many implementations of data management or data transforms without changing the meaning of what is being accomplished
- Engines are data transforms.
  -  The interpretation of the result may be interpreted differently by context, the underlying domain rule remains the same independent of flow or how relevant data is collected.
- Accessors manage a domain entity and related data owned by the entity.
  - Concerned with general relationships of the data from a domain view, independent of what flow or calculation might use the data.
  

Example: An e-commerce platform
- Manager: checkout is a durable concept of the shopping process.
    -  It does not change price calculates tax and discounts.
    -  It also doesn't change if purchase data is grouped with a user or stands as it's own concept.
- Engine: Calculating the final price for selected goods.
    - The calculations should not be sensitive to being used by a checkout workflow versus, say, a cart total preview.
    - The calculation also shouldn't be affected by where tax data is stored or if purchased products belong to a catalog.
- Accessor: Products and related data
    - Many flows and calculations should be able to consume a limited view of the same data without needing to alter the accessor
      - Being used by checkout should not affect how products manage related data
      - Being used to calculate prices should not affect how products manage related data
    - Should be able to extend products to include product images, product varients, catalog groupings, relations to users, and much more without affecting calculations or flows
      

## DDD

Responsibility-based organization is a good start. It can evolve incrementally on any scale of project and without upfront investment.

However, systems have a way of becoming large. No one person or team can manage the complexity of a system like Amazon. Different approaches are needed to break up the system for understandability and independent work.

Domain Driven Design (DDD) is the leading method for decomposing systems. It especially excels at defining high-level boundaries between separable sub-problems called sub-domains.

The primary rule of thumb for finding different domains is looking at organization boundaries. If there is a person, team, or department for a subsection of the business it usually means there is an independent sub-domain.

I won't get into all the details of DDD. It is a study onto itself. Here are some good places to get started
- [Domain Modeling Made Functional (video)](https://www.youtube.com/watch?v=Up7LcbGZFuo&ab_channel=NDCConferences)
- [Domain Modeling Made Functional (book)](https://pragprog.com/titles/swdddf/domain-modeling-made-functional/)
- https://www.eventstorming.com/
  - https://ziobrando.blogspot.com/2013/11/introducing-event-storming.html

## Dovetailed Decomposition

DDD dovetails nicely with the PADL responsibility decomposition. You can see DDD as a top-down approach and PADL as bottom up.

PADL makes sure we keep our components separate as we evolve. DDD helps us to find patterns in our services to group them into sub-domains. 

Managers represent workflows, which are generally the head of a DDD sub-domain. Engines and accessors used only by the managers of one sub-domain can belong to that sub-domain.

Some engines and accessors become sub-domains of their own. Think of tax-calculation from the e-commerce example. That calculation could conceivably be implemented by a SaaS offering. It is also a likely candidate for having its own team and being shared by all sectors of the company. Thus, it may justify its own sub-domain.

Small systems will generally prefer this bottom-up PADL then DDD approach, but the synergy works just as well the other way. Large systems may find their high-level boundaries with DDD and then let PADL work out the more detailed division of each sub-domain.

## Summary

PADL and DDD are synergistic methodologies. Ports keep our services portable, domain layers keep them organized with evolution, and DDD lays out rules for when to break out sub-domains and sub-systems.

