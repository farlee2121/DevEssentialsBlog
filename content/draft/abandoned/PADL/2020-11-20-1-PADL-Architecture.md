---
date: "2020-11-20T00:00:00Z"
draft: true
seriesId: PADL
tags: [Architecture, Design thinking, SOLID Structure, Patterns]
---

# PADL: Ports and Adapters + Domains Layers

<!-- TODO: talk about accessibility somewhere. Both in understandability and usability. No question of "Can I apply this when...". The answer is yes. Your company, the state of your code, the phase of coding don't matter. You can always use this  -->

Architecture is hard. There are few well-prescribed methods and those that exist are complex to understand. I've been on a journey to combine two methods I enjoy: iDesign and Clean Architecture (or Ports and Adapters-type architecture). Here I'll boil them down to their essence and glue them together.
<!--more-->

IDesign and Clean Architecture both define a variety of guidance, but I'm reducing each to what I see as its essence
- Clean architecture -> use ports and adapters to create pluggable components
- IDesign -> rules for dividing domain responsibilities consistently

This roughly correlates to two key questions
- How do I make changes not suck (minimal impact)?
- How do I reliably find things in my code?

I think the first question is harder and more important. Given an answer to the first, people are decent at figuring out the second. For both, a high-quality convention facilitates incremental decomposition.

## More on Ports and Adapters or Anti-Corruption Layers

The core of Clean Architecture is a plug-in extensibility. That extensibility comes from one key mechanism

> Components own the definitions for how they can be extended

I like the ports and adapters analogy because I think it strikes at the core mechanism. I picture how a computer defines a physical set of ports, and devices that don't fit needs adapters. Our current component should define "ports" that expose how the current component can be extended. Other components fit into those ports by using adapters.

Ports can be many things based on the type of extension. Some major ones are
- Interfaces or function signatures for behaviors
  - Events
  - CRUD
  - Data Transforms
- Type definitions for groups of data
  - Configuration 
  - Entities
  - Event data

These are then injected so the defining service isn't tied to one implementation. Common injection methods are constructor injection and function parameterization.

The most important bit: the component that concretely references the port is the one that defines it. Any component that concretely uses the port definition will change together. Adapters also use the port definition, but their whole responsibility is mapping the port as thinly as possible so that more complex services are completely insulated.

Anti-corruption layers are a similar idea from Domain-Driven Design. A calling component protects itself from external change by wrapping the called component in an abstraction that suits the caller's need. It's really the same idea from a different view.

## Core Decision Loop

The core development loop revolves around the caller owning the abstractions. I like to think of it as selfish design. 

Start with the top-level use case.

Always design only to your present need no matter where you are, a function, service, class, etc.
- Need some data? define it yourself.
- Have a behavior that could change? Accept an interface to accomplish it

This builds up your list of ports.

The second phase comes when fulfilling the ports with adapters.
- Is there an existing component close to our need?
  - consider adapting to it
  - Potentially generalize the service (under it's own terms) to also include our need
- Consider fulfilling the contract directly in the adapter for
  - trivial implementations
  - trivially mapping to external frameworks and services
  - moderate one-off needs
- If there is some duplication between adapters?
  - Combine duplicated logic into a new selfish component and categorize it by domain responsibility. Then adjust the adapter to map to the new component
    - repeated domain operations are Engines
    - repeated domain entities belong to Accessors
    - repeated non-domain operations are Utilities

I went to the extreme and said everything should be selfish. However, there is a point of useful shared volatility when pieces will not likely change independently.  Finding that point is what makes architecture an art. There is no general criteria for finding it. I definitely prefer to err on the selfish side. 

## Incremental Evolution

One of the best qualities of this paradigm is that I can be applied incrementally independent of existing code.

The key activity is all about isolating each service on it's own terms, then adapting. Each service is requisitely blind to how "legacy" the rest of the system may be. Any awkwardness of integration is handled in the adapters.

This makes refactoring a minimal and stable activity. No global rules are required for each piece to be complete. Each refactoring, no matter how small, is a complete and stable step toward a better system. 

## Summary

Combining the core mechanism of Ports and Adapters with iDesign domain layers gives us strong guidance for shaping systems. The selfish ports keep components independent and composable. The domain layers help us evolve the adapters into organized services of their own.

I'll refer to this combination of ideas as PADL in coming posts.

In the next post I'll clear up how dependencies flow in port-style architectures. Later posts will dig into more contextual examinations of PADL in use. 



