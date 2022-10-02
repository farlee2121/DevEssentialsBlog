---
date: 2022-10-02
tags: [SOLID]
title: SOLID is a toolbox for Conceptual Scope
---

I've been pondering properties of self-documenting code. Comparing [these properties](../draft/2022-09-25-Properties-of-self-documenting-code.md) against [SOLID](https://en.wikipedia.org/wiki/SOLID) lead me to realize Information Hiding, or conceptual scope, is the central theme of SOLID.


- **Single Responsibility Principle:** Any given piece of code (variable, function, class, etc) should have one reason for change. 
  - This is about problem scope. The unit should isolate a focused design force that would cause code to change.
- **Open-Closed Principle:** You should be able to extend a system/component without modifying it. 
  - This principle pushes components to define flexibility on their own terms so that they can be used flexibly rather than incorporating knowledge about different consumers. This enables components to isolate their own domain and keep tight conceptual scope. Constructs like tags and callbacks are good examples of open extensibility mechanisms. 
- **Liskov Substitution:** Derivative types should be indistinguishable when used as their parent type. 
  - This principle targets sneaky implicit semantic coupling where a caller depends on unenforced details of specific implementations. Such coupling greatly increases the scope a programmer must consider. The consumer must unintuitively consider implementations behind an abstraction or different implementations must be careful to mimic each other's behaviors.
- **Interface Segregation:** No code should be forced to depend on methods it does not use.
  -  This limits scope a component knows about through dependencies. It also pushes towards Dependency Inversion and Port and Adapters architecture to achieve this level of dependency focus. 
- **Dependency Inversion:** Depend on abstractions, not concrete types. Callers own the abstractions
  - Dependency Inversion is the cornerstone of components isolating themselves from dependencies. The component defines dependency abstractions on their own terms and lets someone else provide concrete implementations. This dramatically reduces scope known to business rules and other workflows. Done well, the rule or flow is conceptually self-contained and the lowest layer in a dependency chaing. This allows those rules to be reused in many different configurations rather than having application-specific concerns baked into the rules.  

<!-- READ: I've never heard [GRASP](https://en.wikipedia.org/wiki/GRASP_(object-oriented_design)) -->

<!-- Q: how do my properties stack up against SOLID?
- is there really need for a new set?
- One diff is that mine is a set of properties, not a set of principles. 
  - Though half of them are directly taken from principles... (IH, Proximity)

frame as continuation of exploring how well those properties work, not a competition


Can't say for sure, but I'd say SOLID stems from considering the design level.
My set stems from thinking about construction. Naming, proximity, and consistency feel like fairly concrete actions toward style / understanding. Scope is a bit harder to understand and several major components are addressed by SOLID. 
- actually, I think just about everything in SOLID could fit under scope Liskov Substitution is partially consistency

Not entirely fair because SOLID also addresses understanding, just at a more conceptual level. -->