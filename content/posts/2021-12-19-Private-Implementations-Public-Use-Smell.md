---
date: "2021-12-19T00:00:00Z"
tags:
- Software Design
- Design Smells
- Dependency Inversion
---

<!-- Todo: find better file name -->
# Private Implementations for Public Use is a Smell

I was refactoring an older code base and noticed a pattern I used to follow where a project keeps implementations private and only leaves the interfaces public.

The motivation behind this was to force consumers to depend on the interface and not concrete implementations. This is a nice motivation, but it's only a patch to a deeper design flaw. 

<!--more-->

## Abstractions Belong to Consumers
In proper Dependency Inversion, [abstractions belong to the consumer](https://en.wikipedia.org/wiki/Dependency_inversion_principle#Implementations).

Mark Seemann called out that [interfaces are not abstractions](https://blog.ploeh.dk/2010/12/02/Interfacesarenotabstractions/). Interfaces are a language construct for encoding a shape, the abstraction is the concept we hope to capture with that shape.

When interfaces belong to consumers, we can identify a single purpose that interface is supposed to fulfill and the interface is a true abstraction. We then [adapt a concrete implementation into that abstraction](https://blog.ploeh.dk/2013/12/03/layers-onions-ports-adapters-its-all-the-same/).

When an interface belongs to an implementation, there is no clear use case. The interface is forced to accommodate the concerns of all consumers. This leads to one of two approaches
1. We try to encode the semantics of our consumers. This causes semantics of disparate consumers to leak to all other consumers through the shared dependency. This implicit conceptual coupling spreads exponentially and is very difficult to refactor safely.
2. We orient the semantics solely to the dependency. Mark Seemann appropriately dubbed this approach a [header interface](https://blog.ploeh.dk/2010/12/02/Interfacesarenotabstractions/). Such interfaces violate [Interface Segregation](https://en.wikipedia.org/wiki/Interface_segregation_principle) and provide no abstraction. Ability to swap implementations is minimal, and using the interface is barely better than directly using the concrete implementation.


## Conclusion

In short, private implementations are not the correct way to force use of dependency inversion. Such a setup indicates incorrect ownership of interface abstractions. This violates Dependency Inversion, Interface Segregation, and leads to coupling that undermines the intent of Dependency Inversion in the first place.
