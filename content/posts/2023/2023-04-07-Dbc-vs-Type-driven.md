---
date: 2023-04-07
tags: [Type-Driven Development, Design-by-Contract, constrained data, Validation, FsSpec]
title: Design-by-Contract vs Type-driven Constraints 
---

Validating that data fits certain constraints is a prevelant programming task and how we approach it effects the system's safety and reliability. Many approaches have been devised, and I recently realized the key difference between two major approaches: Design-by-Contract and Type-Driven Development.
<!--more-->

I was reflecting on my previous adventures with constraints: [FsSpec](https://github.com/farlee2121/FsSpec), [proof-oriented systems](../../posts/2022/2022-07-22-Proof-Oriented-Programming.md), [clojure.spec](../../posts/2022/2022-08-05-Clojure-spec-dependent.md), and some others.
In particular, [someone asked](https://github.com/farlee2121/FsSpec/issues/1#issuecomment-1189127034) why I saw Clojure.spec as part of the Clojure type system but *not* FsSpec as part of the F# type system.

## Key Paradigm differences

These were good questions that got me thinking. Especially, about the differences between Design-by-Contract (DbC) and Type-Driven Development. 
In the end, I was able to articulate these differentiating descriptions.

- Design-by-contract: 
  - Where: constraint enforcement belongs to the function
  - When: enforced on each function call
  - Error Behavior: exceptions thrown by assertions in/with the function 
- Type-driven: 
  - Where: constraint enforcement belongs to a type
  - When: enforced on construction. The types are generally immutable so that no instances can be in an invalid state
  - Error Behavior: Flows consuming constrained types cannot be called without first calling the constrained constructor. Thus all validation must be done up-front and the composing caller decides how they want to handle validation failure.

## Difference in outcomes

These two approaches have similar elements, but lead to some rather different system approaches. I believe the type-driven approach results in more robust designs.

Design-by-Contract is inherently tied to function inputs and outputs. Constraints are a guard on an potentially invalid argument value. For example, it wouldn't be odd to pass an integer for an inventory count, then check the bounds on that count as part of the function call.

Type-Driven methods are intrinsically tied to types. A type-driven mindset treats constrained data as a semantically separate from unconstrained data. For example, an InventoryCount is a different type than just an integer. Functions that expect InventoryCounts use a type so they cannot be passed an invalid value.

I think this mental shift has significant benefits, but also some tradeoffs.

Design-by-Contract's association of constraints to functions causes distribution of constraints and does not require a name for the constrained type. This may result in duplication of constraints where similar needs are required. Clojure spec demonstrates a solution to this via named constraints which can be composed. However, assertions and potential exceptions are still distributed through out the system. I believe exceptions should be exceptional. Exceptions risk ungracefully terminating the system. Expectable error cases should be handled as normal return values for the caller to handle. 

Unlike design-by-contract, type-driven development requires a type to represent constrained data. This clarifies intent through naming and naturally centralizes repeated constraints. It also centralizes expectable error handling at the periphery of the system. True panic-type exceptions, invalid system states that we wouldn't expect to happen, can still be represented with exceptions if needed.

The potential downside of a type-driven approach is extra mapping. A design-by-contract system can pass any value and retroactively checks constraints. This means that a calling function with different constraints doesn't have to map into the type of it's dependency. However, I'd argue that the DbC system still must deal with error cases just as much as the type-driven system, it just waits to handle them reactively instead of proactively. Perhaps design-by-contract can avoid some unnecessary mapping, but it's also much more likely that developers overlook error cases they should be handling.

## Key differences still apply with static enforcement 

I believe a type-driven approach is preferrable even compared to a static design-by-contract approach, where constraints are checked at compile time.
Consider proof-oriented languages [Dafny](https://dafny.org/) versus [F*](https://www.fstar-lang.org/) and [Idris](https://www.idris-lang.org/). 

All of these languages run static checks using data constraints. However, Dafny associates constraints with function parameters and return values true to its design-by-contract roots. F* and Idris respresent constraints with types. But there is still a difference is mindset. The type-driven approach biases programmers to name their intent and centralize reusable constraints while the DbC approach does not.


## Conclusion

Design-by-Contract and Type-driven design are two key approaches to representing data constraints in code. Design-by-contract associates constraints primarily with functions while the Type-Driven approach associates the constraints with types.

I prefer the type-driven approach because I believe it biases programmers toward naming their intent, centralizing reusable constraints, and pushing validation to the system edge.

<!-- 
- Eiffel is dynamic
- dafny is static, but still function-owned which is true to it's DbC roots
- clojure spec is dynamic & either or
- F* and Idris are more type-driven
-->