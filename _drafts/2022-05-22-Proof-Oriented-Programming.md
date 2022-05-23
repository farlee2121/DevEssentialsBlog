---
layout: post
tags: [Programming Paradigms, Language Features]
---

# Proof-Oriented Programming

I've been exploring ways to leverage [type-driven development](https://fsharpforfunandprofit.com/series/designing-with-types/) for better testing.
Turns out this has already been done, and there is a whole category of proof-oriented programming languages.

## My explorations

My explorations started between [exploring](../_posts/2021-04-09-Designing-with-Events-Transforms-and-state.md) Scott Wlaschin's approach to [designing with types](https://fsharpforfunandprofit.com/series/designing-with-types/) and Clojure's unique optional type system, [clojure.spec](https://clojure.org/guides/spec).

Scott's type-driven approach creates guarded domains with little internal defensive programming. Types are used to limit domain into to constricted values validated at the edge of the domain. 

This seemed to cross over with [Clojure.spec](https://clojure.org/guides/spec), which is an optional type system that also allows constrained types, for example InventoryCount can only be an integer between 0 and 100. Clojure uses this constraint information to automatically test functions with type annotations.

I think this kind of testing, where pseudo-random values are sampled to ensure valid inputs produce valid outputs, effectively tests totality. [Total functions](https://en.wikipedia.org/wiki/Partial_function) being ones that map their whole domain (inputs) to a value into their range (output). Such functions generally follow the [principle of least surprise](https://en.wikipedia.org/wiki/Principle_of_least_astonishment) and are easier use correctly.

This had me wondering what else a constraint-aware type system could verify, and how it could be [ported to static languages](TODO)

## Proof-Oriented Languages and Formal Verification

Mark Seemann was kind enough to [point me to several existing languages](https://blog.ploeh.dk/2015/05/07/functional-design-is-intrinsically-testable/#aee72ce959654d9388b448023f469cbc). Turns out that there is a whole category of languages that have considered program verification with constrained types.

Some are not turing-complete, and are primarily tools for proving assertions in conjunction with other languages, like [Coq](https://en.wikipedia.org/wiki/Coq). Some are only meant for [formal math proofs](https://en.wikipedia.org/wiki/Curry%E2%80%93Howard_correspondence).

Others, like [Idris](https://www.idris-lang.org/) and [F*](http://www.fstar-lang.org/) are turing-complete languages.

These languages take advantage of the constraints on types and functions to prove facts about the program. For example, ensuring that a function is pure (no unadvertised effects or state) and total (works for all advertized input). F* [says](http://www.fstar-lang.org/tutorial/book/index.html?highlight=security) it can verify security properties and bounds on resource usage!
<!-- https://en.wikipedia.org/wiki/Curry%E2%80%93Howard_correspondence -->


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

This is a whole new world of design- and compile-time assistance. It changes my view of what can be verified automatically. 
I haven't experimented much with these languages yet. However, I sense programs are difficult to write so formally, 
just like learning the rigor necessary for math proofs is difficult to learn. I'd guess one wouldn't want to write a whole conventional program in this style.
Still, this is an incredible tool for writing highly critical components with a high confidence!