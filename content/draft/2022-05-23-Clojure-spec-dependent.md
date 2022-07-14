---
date: "2022-05-23T00:00:00Z"
tags: [Clojure, Language features, Specification Pattern]
title: "Is Clojure Spec a dependant type system?"
---

<!-- TODO: consider how the except will work, or if I just want to nerf the excerpt -->
Clojure has a rather interesting optional type system: [Clojure Spec](https://clojure.org/about/spec). 

I've been [mulling over the possibilities](../posts/2022-06-03-Improved-completeness-automatic-random-testing.md) of this approach to types and encountered [dependent type systems](TODO.md).
<!--more-->

Dependent types allow values to be part of type definitions. For example, arrays with length as part of their type.

Dependent types are the back-bone of various theorem proving languages like [Idris](https://www.idris-lang.org/), [Coq](https://en.wikipedia.org/wiki/Coq), and [F*](https://www.fstar-lang.org/). 

The question came to me "Is Clojure Spec a dependent type system?"

Spec doesn't call itself such. It's origin is the [Specification Pattern](https://en.wikipedia.org/wiki/Specification_pattern).

However, feel like spec must be a dependent type system. Types are defined by the presence of values that meet certain criteria. 
Therefore the values are part of the type. By Clojure's set semantics, the values *are* the type. At least [one person](https://blog.jeaye.com/2017/05/31/clojure-spec/#simple-math) seems to agree with this stance.

If Spec is dependent type system, then perhaps it too can benefit from theorem proving over automated random testing. Perhaps type-driven approaches in static languages with the right conventions for finding value constraints could also use theorem proving for correctness, totality, and other provable properties.

This is all pretty new for me. Certainly a lot to think about.