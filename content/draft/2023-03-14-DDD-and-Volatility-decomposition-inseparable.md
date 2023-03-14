---
date: 2023-03-14
tags: [Domain-Driven Design, Volatility-based Decomposition]
title: Domain-Driven Design and Volatility-based Decomposition Are Inseparable
---

There are many ways to factor a system. I initially learned Volatility-based Decomposition. I not speak more in Domain-Driven Design terms. However, I consider this more a change in framing than a change factoring strategy.
<!--more-->

First, let's overview the techniques to get on the same page.
## Volatility-Based Decomposition

Volatility-based Decomposition is all about discovering what is likely to change in a system, then isolating those elements of change.

The underlying design forces are the nature of the problem. This problem essence can be refined from user tasks or stories with questions like
- Would a non-technical competitor do _____?
- Would we be ______ business if we didn't do ____?
- If this business process was done on paper, would we do ___?

I've previously used this visual to show use cases converging into underlying needs.

![Shows different use cases converging to an underlying need much like tributaries into a river](../../static/post-media/IDesign-System/iDesignSolutionScrubbing.png)

This doesn't mean we don't leverage software-specific capabilities. It just means those capabilities likely aren't fundamental to the business and the details of how we achieve it might change.

Notifications are a prime example. A system may start by notifying users via email, but baking email notifications into flows around the code then it's very difficult to later add text, push, or other kinds of notifications. Isolating notifications from the business flows allows a much more centralized evolution of notifications.

Similarly, a business may want to transition from some paper-based or manual approval step into more automated solutions, but needs to maintain the manual processes during the transition. Isolating that manual flow under a consistent abstraction allows the two flows to be swapped or even run side-by-side.


This is very similar to both the Single Responsibility Principle and Information Hiding.
The Single Responsibility Principle stating that each unit of code should have one reason for change. Information Hiding dictates that code should be decomposed to hide how work is accomplished, thus minimizing conceptual scope, rather than decomposing based on steps, resource types, or other factors.


## Domain-Driven Design

[Domain-Driven Design](https://en.wikipedia.org/wiki/Domain-driven_design) (DDD) urges programmers to reflect the business in their code. That includes type names, method names, and the decomposition sub-system and components. 

For example, an e-commerce business will likely divide its workers into mostly separated roles like: purchasing, packing, delivery, and more. By DDD, this system would have sub-systems, or sub-domains, serving each of divisions of the company. The programming teams may even be divided on those lines.

I recently wrote how [sub-domains satisfy the Single Responsibility Principle](../draft/2023-03-02-Sub-domains-and-SRP.md).

## DDD and Volatility Decomposition are Fundamentally Related

Both DDD and Volatility-based Decomposition are tools for understanding the essence of a problem and thus creating a more stable system with the right kinds of flexibility.

Volatility-based decomposition uncovers the business domain through trying to isolate likely changes. DDD isolates likely causes of change by modeling the software after the nature of the business.

I think both are useful tools that work together. Overall, I think DDD is the more direct and attainable approach. Programmers are unlikely to find better separation of responsibilities than most industries have developed over time through much experience. Therefore, modeling the business starting with how the business understands itself shortcuts discovery of key separable design forces.

At the least, DDD encourages programmers and business experts to use the same terms and concepts as much as possible. This improves communication and increases likelihood that programmers will unlock new understanding of the business's nature, and thus a better decomposition.

 