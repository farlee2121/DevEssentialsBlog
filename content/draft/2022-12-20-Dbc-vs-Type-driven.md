---
date: 2022-12-20
tags: []
title: Design by Contract vs Type-driven Constraints 
---

Validating data fits certain constraints is a prevelant programming task and how we approach it effects program safety and reliability. Many approaches have been devised, and I recently realized the key different between to major approaches: Design by Contract and Type-Driven design.
<!--more-->

I was reflecting on my previous adventures with constraints: [FsSpec](https://github.com/farlee2121/FsSpec), [proof-oriented systems](../posts/2022-07-22-Proof-Oriented-Programming.md), [clojure.spec](../posts/2022-08-05-Clojure-spec-dependent.md), and others.
In particular, [someone asked](https://github.com/farlee2121/FsSpec/issues/1#issuecomment-1189127034) why I saw Clojure.spec as part of the type system and FsSpec as not. This also related to a difference in understanding Design by Contract (DbC) versus Type-Driven development.

## Key Paradigm differences

These were good questions that got me thinking. In the end, I was able to articulate the key differences.

- Design by contract: 
  - Where: constraint enforcement belongs to the function
  - When: enforced on each function call
  - Error Behavior: Assertions in or with the function produce exceptions
- Type-driven: 
  - Where: constraint enforcement belongs to the type
  - When: and is enforced on construction. The types are generally immutable so that no instances can be in an invalid state
  - Error Behavior: Flows consuming constrained types cannot be called without first calling the constrained constructor. Thus all validation must be done up-front and the composing caller decides how they want to handle validation failure.

## Difference in outcomes

These two approaches have similar elements, but lead to some rather different system approaches. I believe the type-driven approach results in more robust designs.

Design by Contract is inherently tied to function inputs and outputs. Constraints are a guard on an potentially invalid (unconstrained) argument type. For example, it wouldn't be odd to pass an integer for an inventory count, then check the bounds on that count as part of the function call.

Type-Driven methods are intrinsically tied to types. A type-driven mindset treats constrained data as a semantically separate from unconstrained data. For example, an InventoryCount is a different type than just an integer. Functions that expect InventoryCounts use a type so they cannot be passed an invalid value.

I think this mental shift has significant benefits, but also some tradeoffs.

Design by Contract's association of constraints to functions causes distribution of constraints and does not require a name for the constrained type. This may result in duplication of constraints where similar needs are required. Clojure spec demonstrates a solution to this via named constraints which can be composed. However, assertions and potential exceptions are still distributed through out the system. I believe exceptions should be exceptional. Expectable error cases should be handled as normal return values for the caller to handle and not risk ungracefully terminating the system.

Type-driven development requires a type for constrained data. This clarifies intent through naming and naturally centralizes repeated constraints. It also centralizes expectable error handling at the periphery of the system. True panic-type exceptions that simply should never happen can still be represented with exceptions if needed.

The potential downside of a type-driven approach is extra mapping. A design by contract system can pass any value and retroactively checks constraints. This means that a calling function with different constraints doesn't have to map into the type of it's dependency. However, I'd argue that the DbC system still must deal with error cases just as much as the type-driven system, it just waits to handle them reactively instead of proactively. Perhaps some error cases can be implicitly ignored and explicit error handling, but it's also much more likely that developers overlook error cases they should be handling.

## Key differences still apply with static enforcement 

I believe a type-driven approach is preferrable even when all checks are static.
Consider proof-oriented languages [Dafny](https://dafny.org/) versus [F*](https://www.fstar-lang.org/) and [Idris](https://www.idris-lang.org/). 

All of these languages run static checks using data constraints. However, Dafny associates constraints with function parameters and return values true to its design by contract roots. F* and Idris respresent constraints as parts of types.

Even when DbC and type-driven checks are static, the type-driven approach biases programmers to name their intent and centralize reusable constraints while the DbC approach does not.


## Conclusion

Design by Contract and Type-driven design are two key approaches to representing data constraints in code. DbC associates constraints primarily with functions while the Type-Driven approach associates the constraints with types.

I prefer the Type-driven approach because I believe it biases programmers toward naming their intent, centralizing reusable constraints, and pushing validation to the system edge.

<!-- 
- Eiffel is dynamic
- dafny is static, but still function-owned which is true to it's DbC roots
- clojure spec is dynamic & either or
- F* and Idris are more type-driven
-->