---
date: 2022-12-23
tags: [SOLID]
title: SOLID is a toolbox for Conceptual Scope
---

I've been pondering properties of self-documenting code. Comparing [self-documenting properties](../posts/2022-12-09-Properties-of-self-documenting-code.md) against [SOLID](https://en.wikipedia.org/wiki/SOLID) lead me to realize Information Hiding, or conceptual scope, is a central theme of SOLID.
<!--more-->


- **Single Responsibility Principle:** Any given piece of code (variable, function, class, etc) should have one reason for change. 
  - This is about conceptual problem scope. The unit should isolate a focused design force that would cause code to change.
- **Open-Closed Principle:** You should be able to extend a system/component without modifying it. 
  - This principle is the mechanism for decoupling conceptual scopes while allowing composition. It pushes components to define flexibility on their own terms so that they can be used flexibly rather than incorporating knowledge about different consumers. This enables components to isolate their own domain and keep tight conceptual scope. Constructs like tags and callbacks are good examples of open extensibility mechanisms. I have a [series of examples](../draft/Open-Closed-by-Example/2022-09-16-0-Intro-to-OCP.md) of this principle if it still seems unclear.
- **Liskov Substitution:** Derivative types should be indistinguishable when used as their parent type. 
  - This principle targets sneaky implicit semantic coupling where a caller depends on unenforced details of specific implementations. Such coupling greatly increases the scope a programmer must consider. The consumer must unintuitively consider implementations behind an abstraction or different implementations must be careful to mimic each other's behaviors.
- **Interface Segregation:** No code should be forced to depend on methods it does not use.
  -  This limits the scope a component knows about through dependency contracts. It also pushes towards Dependency Inversion and Port and Adapters architecture to achieve this level of dependency focus. 
- **Dependency Inversion:** Depend on abstractions, not concrete types. Callers own the abstractions
  - Dependency Inversion is the cornerstone for isolating components from the concepts of their dependencies. The calling component defines dependency abstractions on its own terms and lets someone else provide concrete implementations. This dramatically reduces the current component's conceptual scope. The calling component, if also obeying Liskov Substitution, knows nothing of its dependencies other than the contracts the calling components itself defined. The component's conceptual scope is reduced only to it's own defintions. The rule or flow is conceptually self-contained and the lowest layer in a dependency chain. This allows those rules to be reused in many different configurations rather than having application-specific concerns baked into the rules. Some examples follow below if this principle is still unclear. 
    - [Dependency Injection vs Dpendency Inversion](../posts/2022-07-03-Dependency-injection-vs-Dependency-Inversion.md)
    - [Open-Closed Principle by Example: Interchangable Implementations](../draft/Open-Closed-by-Example/2022-09-16-3-Interchangable-Dependencies.md)
    - [A simple code base example](https://github.com/farlee2121/DependencyInversionExample)


Each and every principle in SOLID is a tool for limiting conceptual scope!

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