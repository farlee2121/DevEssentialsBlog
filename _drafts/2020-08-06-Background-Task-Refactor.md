---
layout: post
tags: [Architecture, Design thinking, SOLID Structure, Case Study, Scaling]
---
Defining dependencies contracts with only the calling service in mind produces contracts that are much smaller and more focused. This means that it is much easier to make new implementations and much more likely that usage constraints on all of the contract operations change together. This means that we can wrap a whole contract in some decorator without disrupting intent. Some potential decorators here being the classic AOP concerns: logging, security, async.

> Aside: Functional users can accomplish this generically idea with monads. OO users can employ some DI framework magic to dynamically proxy objects for completely central operations.

That is all pretty conceptual. Let's look at a concrete example from my code: indexing searchable entities asychronously. 

// maybe make this it's own blog post too? It'd make sense to go more in depth on something I expect to be a standard pattern and key design decision

**Case 1**: The action is part of a large generalized service that is called directly.  
None of our options are great. We can
 - bake the async knowledge into the calling service
 - bake the async knowledge into the called service, making it async for all consumers
 - implement a decorator on the large service, passing all the other methods through and only implementing async on the single one action.
   -  May be difficult to still meet return value expectations
   -  Involves more methods than likely need to be async
Making the call async is tangles with the concerns and demands of other services. A concrete example from my work was search indexing. 
// move concrete example up to the whole examination

**Case 2**: We follow SOLID Structure. Services defines their own abstractions that an influencer should be indexed  
-- the caller can adapt it's semantics and it's particular brand of async (i.e. use a thread if a value needs to be immediately returned, events if it can be done later )


notes from the refactor
- improved the design of more services than expected. Hadn't gone in looking for all those opportunities (network import, social data import, search index)
- separating async concerns ended up bringing the two import flows much closer together and illuminated the path for eventually merging them
- disentangle async concerns from testing perspective
  - one component is only logic tests, no worry for async complexities
- Should talk through three stages
  - what santi wrote
  - what i did with hangfire
    - actually pretty understandable. very isolated scope
    - makes for nasty public interface, much of which isn't meant for general consumers 
  - what I did now with SOLID Structure