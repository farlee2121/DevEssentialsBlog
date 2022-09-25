
## Motivating questions

Meet user need reliably
Stamina: continue to accommodate change over time without ever-increasing effort (maybe this one belongs to OCP, or both)
Consistent progress, frequent feedback
Stable, incremental, additive? (consistent progress is also not back tracked)
Smooth collaboration.
understandability perhaps isn't an obvious desired outcome. May need to motivate it then explain what plays into understandability
being able to correctly modify system. Speed of modifying system. Understanding the problem being solved (what better way than the code itself teaching you). Modified more than initially written, read many more times than that.




## Major components

Q: Is this organization by quality best for understanding?
- I think it's better than going by scope. It encourages seeing the property across applications
- A danger is an incomplete picture of what each level of design looks like

IDEA: try breaking off some smaller blog posts to clarify what important parts of this post might look like
- Scope across Scale post

IDEA: maybe I build a separate stable, incremental, additive talk. That lets me cover process. Then this talk can mostly focus on code.
- give more time for examples to make sure the concept sinks in
- process is also important. Deserves more than just being squeezed into a style talk
- Q: Where would I put SIA on the diagram?
  - the swebok process KA? It cross cuts most activities: construction, design, review, deployment.
  - Maybe show the cross-cutting by partially coloring all the lifecycle phases. I think a thin strip starting from the center could make sense
    - probably use the same thin strip for both the outer and middle rings, but fully color process
- Q: What would self-documenting code highlight?
  - Fully construction with partials in testing and design. Maybe fully color design...



components: naming/semantics, proximity, scope (IH, side-effects, contracts), maybe consistency (which is style)
Q: is this a sufficient orthogonal set?
- ... context is strongly related to scope and proximity
- immutability is a result of scope
- side-effect management is a result of scope. Contracts too
- patterns are a variety of naming
- naming is potentially a broader category of intent or semantics that might not just be naming
  - There aren't many other aspects to programming though. Spacing, grouping, braces, and names are most everything. Proximity and scope over half of that more clearly
- Concurrency ... I'd say that belongs to scope. The problem with concurrency is side-effects. Those aren't an issue if you lock state for a given transaction i.e. pure functions
- monitoring, retries, and similar are more part of maintenance or system-level discussion. I'm not worried about covering them here. If anything they belong to scope because they shouldn't be intermixed
- table-driven methods -> scope
- complexity? too abstract a concept and not directly actionable. Addressed via these concerns
- Nesting -> scope & consistency 
- SRP -> naming, Liskov -> scope, DI -> scope affecting naming and proximity, OCP -> scope & semantics, ISP -> scope & semantics
- Eventual consistency -> hmm. not sure. scope? It has to do with breaking up uptime and transactional boundaries. So yes, scope.
- A: Yes? covers most of what I can think of
  - Q: Is scope too full? A: The applications are vast, but it highlights the central motivation of them all.
  - !!! Scope is really a reprasing of Information Hiding. It's about the full scope of what might effect how a piece of code runs

naming and proximity are relatively straight-forward to explain. Probably do them first.
- Q: what makes a good name? A: Named for intent. Depends on scope, but oriented to the problem it solves
  - in small scope you might have `acc`. That doesn't make sense... except it does in the right context. It's standard for accumulator
  - Recurse is similar. Makes it easy and standard to understand recursive definitions
  - Move up to functions, modules, etc
- Patterns. If there's a pattern use it and use the name. Reduces cognitive load

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
- It's about the full scope of what might effect how a piece of code runs
  - pure function -> depends only on inputs, used only by outputs
  - mutable parameters -> depends on inputs and anything that might changes those inputs concurrently
  - class data -> must know how the rest of the class might update the data. Must consider sequence/timing possibilities
  - queries -> may force us to consider anything else that could update the data we want. Potentially the whole application or even multiple applications if done poorly. Vulnerable to timing issues. 
  - Operation by mutation -> have to consider whole sequence of operations
    - Global data -> have to consider whole application and how it interacts with that field
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