---
layout: post
tags: [Testing, UI]
---

## UI Mutation and Generative Testing Update
I previously wrote on
[statistical and mutation testing for UIs](../_posts/2021-07-25-Statistical-and-mutation-UI-Testing.md). After additional thought, I don't think mutation testing is feasible, at least in the traditional sense. Structure-based generative testing still should be.

## Lack of deterministic errors for Mutation

[Mutation testing](https://en.wikipedia.org/wiki/Mutation_testing) is a tool to measure completeness. It tells us how well our other tests detect possible errors in our code.

Mutation testing frameworks typically achieve this by crawling the code and making changes that change the meaning. This could be flipping boolean statements, changing loop boundaries, and similar.

UIs, however, don't have has many structural changes that deterministically generate errors. We know flipping a conditional is a breaking change. However, changing a tag, class, id, or even taking elements out doesn't necessarily lead to a breaking change in the UI. There isn't a clear approach for seeding errors, so there isn't a clear meaning for how many errors slip through our test suite.

## Non-discreet Dimensions and Non-general Completeness

UIs have far more dimensions than conventional code. This leads to another issue with defining completeness. Does complete mean every screen size in every browser with every interaction method? What about order of interactions?
At best we can strive for a sampling representative of supported cases. 

This representative sample of UI states is still meaningful. It can't be used for completeness and mutation tests unless we can reliably seed errors. However, we can still still be used enumerating system states for other kinds of automated tests, like visual diff testing.

## State-based Generative Tests

Mutation testing may not be feasible, but we may still attain the goal to achieve wide coverage and reliably detect faults in our user interface without large ongoing maintenance costs. Ideally, there is a relatively low up front investment. Writing UI tests tends to be expensive currently. 

A combination of supported browsers, screen sizes, and a state machine defines a reasonably thorough enumeration of expectable UI conditions.
This, in turn, allows us to automatically generate a benchmark of UI screen captures. Any deviations from the benchmark trigger a review.

This is generally the same method I referred to as "statistical UI testing" in the previous post. The main difference is additional user-provided constraints like screen sizes.

## Structure-based State Machine Approximation

Most UIs will not have a ready-made state machine. The musing on mutation testing led me to realize that we can generate a reasonable state machine by examining code structure much like mutation tests do. 

Rather than mutating the code to change semantics. We examine code structure to infer intended data states and transitions. 
- Data bindings to properties represent dimensions of the UI state in a page
- Conditional bindings represent potential alternative states
- Action bindings represent transitions between states
- Navigation represents transition between sub-state machines (i.e. each page is it's own mini state machine)

This kind of state analyzer would, unfortunately, be different for every UI binding framework. The quality of results would be less than an explicit state machine, and would vary based on organization of states in the binding model. Still, such a model could represent a fairly low-effort investment for a big boost in UI test coverage without requiring users to change existing code bases.

## Conclusion

Mutation testing for UIs, unfortunately, does not seem feasible.
However, structure-based analysis of UI bindings could make generative benchmark testing accessible for typical software projects without modification! 