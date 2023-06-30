---
date: "2022-07-22T00:00:00Z"
tags: [Programming Paradigms, Language Features]
title: Proof-Oriented Programming
---

I've been exploring ways to leverage [type-driven development](https://fsharpforfunandprofit.com/series/designing-with-types/) and value constraints for better testing.
Turns out this has already been done, and there is a whole category of proof-oriented programming languages.
<!--more-->

## Prior Context

My explorations started between [experimenting with](../../posts/2021/2021-04-09-Designing-with-Events-Transforms-and-state.md) Scott Wlaschin's approach to [designing with types](https://fsharpforfunandprofit.com/series/designing-with-types/) and Clojure's unique optional type system, [clojure.spec](https://clojure.org/guides/spec).

Scott's type-driven approach creates guarded domains with little internal defensive programming. Types are used to limit input to constrained values validated at the edge of the domain. 

This seemed to cross over with [Clojure.spec](https://clojure.org/guides/spec), which is an optional type system that also allows constrained types. For example, you might make a type InventoryCount that can only be an integer between 0 and 100. These types are enforced dynamically by methods in [Design by Contract style](https://en.wikipedia.org/wiki/Design_by_contract) Clojure also uses this constraint information to automatically test type-annotated functions with random data.

Clojure's automatic generative testing had me wondering
- What does this automatic generative testing measure or prove?
- How can type-driven approaches similarly leverage constraint data?

I previously [explored the first question](../../posts/2022/2022-06-03-Improved-completeness-automatic-random-testing.md), and concluded that such tests are an approximation of [totality](https://en.wikipedia.org/wiki/Partial_function) (all inputs properly map to valid outputs).

Turns out the second question has already been explored and has very interesting answers.

## Proof-Oriented Languages and Formal Verification

Mark Seemann was kind enough to [point me to several existing languages](https://blog.ploeh.dk/2015/05/07/functional-design-is-intrinsically-testable/#aee72ce959654d9388b448023f469cbc). Turns out that there is a whole category of languages that have considered program verification with constrained types, or more generally with [dependent types](https://en.wikipedia.org/wiki/Dependent_type).

Some are not turing-complete, and are primarily tools for proving assertions in conjunction with other languages, like [Coq](https://en.wikipedia.org/wiki/Coq). Some are only meant for [formal math proofs](https://en.wikipedia.org/wiki/Curry%E2%80%93Howard_correspondence).

Others, like [Idris](https://www.idris-lang.org/) and [F*](http://www.fstar-lang.org/) are turing-complete languages.

These languages take advantage of the constraints on types and functions to prove facts about the program. For example, ensuring that a function is pure (no unadvertised effects or state) and total (works for all advertized input). F* [says](http://www.fstar-lang.org/tutorial/book/index.html?highlight=security) it can verify security properties and bounds on resource usage!


This is a whole new world of design- and compile-time assistance. It changes my view of what can be verified statically. 
I haven't experimented much with these languages yet. However, I sense programs are difficult to write so formally, 
just like the rigor necessary for math proofs is difficult to learn. I'd guess one wouldn't want to write a whole conventional program in this style.
Still, this is an incredible tool for writing critical components with high confidence!


<!-- https://en.wikipedia.org/wiki/Curry%E2%80%93Howard_correspondence
https://en.wikipedia.org/wiki/Dependent_type#Comparison_of_languages_with_dependent_types
 -->


<!-- 
Q: Do I want to define dependent types and refinement types?

- category used for formal math
- Some also used for formal specifications that can prove properties of a program or set of requirements
- Didn't realize that this is a category with turing complete languages
- do i mention resemblance to logic programming?

All these threads come together in programs that can verify a staggering amount at compile time
- Invariants of types are satisfied
- functions can handle all allowed values (totality)
- purity, functions that are pure really don't have side-effects
- Resource usage bounds
- security qualities -->
