
## Motivating questions

Meet user need reliably
Stamina: continue to accommodate change over time without ever-increasing effort (maybe this one belongs to OCP, or both)
Consistent progress, frequent feedback
Stable, incremental, additive? (consistent progress is also not back tracked)
Smooth collaboration.
understandability perhaps isn't an obvious desired outcome. May need to motivate it then explain what plays into understandability
being able to correctly modify system. Speed of modifying system. Understanding the problem being solved (what better way than the code itself teaching you). Modified more than initially written, read many more times than that.


## Major components

components: naming/semantics, proximity, scope (IH, side-effects, contracts), maybe consistency (which is style)

naming and proximity are relatively straight-forward to explain. Probably do them first.
- Q: what makes a good name? A: Named for intent. Depends on scope, but oriented to the problem it solves
  - in small scope you might have `acc`. That doesn't make sense... except it does in the right context. It's standard for accumulator
  - Recurse is similar. Makes it easy and standard to understand recursive definitions
  - Move up to functions, modules, etc

Proximity
- whitespace. Often underrated
- Next get into scopes
- Local scopes (inside loop, inside function, inside class...)
  - smaller scope, easier it is to name because the more context you have and the fewer potential consumers
- Global scope
  - must be globally unique
  - Use namespacing (like modules). They're part of the name allow gradient of name clarity. Unfortunately not available in every language.
  - At this point files and packages become ways to control proximity / understand grouping of code and also enforce an amount of scope

Consistency is a little hard, but I don't think I need to go into great depth (lean into Design of Design quotes)
- consistency makes it easy for a consumer of your design to make predictions about your design based on previous experience of the design.
  - Makes it easy to use, keep less in memory
  - makes it easier to stay consistent in future decisions
  - produces delight, while missing predictions causes frustration
  - (all this is also well established for UI design)

Scope is the really hard one. Related to proximity, but well defined contracts.
Q: What makes a good contract? A: Defined by semantics/in terms of the domain. That's how you isolate reasons for change and minimize scope of change impact 
Need to scale this one up with examples.
- don't reuse a variable name
- Expressions: Consistent but also minimize scope. No external mutation, you can think only of the return value and forget the 
  - anti-example: mutation increases scope you have to consider to understand a value (Q: what name did Code Complete use for this?)
  - for this reason I also avoid loops. Refactoring even calls them smell.
- Anti-Example: mutable parameters 
  - come in both expected and unexpected varieties.
  - Passing around a structure and mutating is very difficult to reason about. Have to trace calls to understand state. Much better to pass all info in, enforce invariants, and return a value
  - Example: piping / transforms
- Anti-example: Avoid side-effects, they create sneaky expanded scope at class, service, or even global context
  - isolating them (commands, central orchestration)
  - Can even push them completely out of business logic, but there's already a great book about that
- Example: Services/classes
  - In general you want you're business rules at the bottom. Use Dependency inversion, minimizes scope 
- Example: Packages
  - Can't have circular references at package level. Have to decide what gets to know about what
  - Without DI, business rules are at top and know about most everything else
  - with DI, business rules can be isolated and reused. I have a separate talk about this

Q: do I order design first in books so I can lean into OCP in construction?

Now that I have the principles outlines, Maybe now follow up with process
- Good debugging asks a clear question. Limits the scope of the issue until it's found
- Good commits are small in scope. They also contain necessary context so readers can have a small scope to consider to understand the change in context of the business
- Good PRs are also small and complete, include necessary context so the PR is the whole scope needed to understand changes
- Good docs live close to what they document (proximity). Well named making them easier to find. Consistency in where documentation lives..


<!-- Hmm this talk is missing the context of stability that threads through most of these examples -->


Don't forget examples:
- process: small commits w/ good message, PRs w/ good messages and focus, drivers
- code: expressions, purity, immutability all encourage the above. Modules, classes, files, functions, spacing, variable assignment also enable proximity, scope, and naming
- adding readmes and other docs in source control is proximity
- don't forget to lean into problem modeling. I've laid some context in the duck series. I don't need to fully re-explain increments, just make sure these are connected.
problem modeling leads the major process and design elements: self-documenting code (DDD) and small increments of work (frequent problem feedback)