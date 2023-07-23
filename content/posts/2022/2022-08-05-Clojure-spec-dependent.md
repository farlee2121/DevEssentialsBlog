---
date: "2022-08-05T00:00:00Z"
tags: [Clojure, Language features, Specification Pattern]
title: "Is Clojure Spec a dependant type system?"
---

I recently learned of [dependent type systems](../../posts/2022/2022-07-22-Proof-Oriented-Programming.md). I'm trying to feel out the boundaries of dependent types and came to the question: Is Clojure Spec a dependent type system?

<!--more-->

Dependent types are the back-bone of various theorem proving languages like [Idris](https://www.idris-lang.org/), [Coq](https://en.wikipedia.org/wiki/Coq), and [F*](https://www.fstar-lang.org/). 

Dependent type systems allow types to depend on values. This allows types to be manipulated like other kinds of values. For example, an list wouldn't need a special language feature to be generic. The type contained by the list could be a value that is set. Setting that value, say to `int`, would be the equivalent of creating a generic type `list<int>`. I'm still grappling with it and not the most reliable source. You can see a trustier example [here](https://idris2.readthedocs.io/en/latest/tutorial/introduction.html#introduction).

My grappling raised the question "Is Clojure Spec a dependent type system?"

Spec doesn't call itself such. It's origin is the [Specification Pattern](https://en.wikipedia.org/wiki/Specification_pattern).

On one hand, Clojure types are defined by the presence of values that meet certain criteria. By Clojure's set semantics, the values *are* the type. At least [one person](https://blog.jeaye.com/2017/05/31/clojure-spec/#simple-math) seems to agree with this stance.

On the other hand, I'm not certain that specs are first-class values. This means they can be passed and operated on. I know specs *references* can be passed around. They must also be analyzable in order to support features like data generation. I'm not sure you can really pass a value to a spec type and have different variations of a single type based on those values. Specs also must be registered in a global registry (via `s/def`). Specs don't presently provide compile-time verification either.

If Spec is dependent type system, then perhaps it too can benefit from theorem proving over automated random testing. Perhaps type-driven approaches in static languages could also use theorem proving for correctness, totality, and other provable properties when given the right conventions for finding value constraints.

This is all pretty new for me. Certainly a lot to think about.