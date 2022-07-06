---
date: "2022-03-27T00:00:00Z"
tags:
- Testing
- UI
---

# UI Mutation and Generative Testing Update
I previously wrote on
[statistical and mutation testing for UIs](../post/2021-07-25-Statistical-and-mutation-UI-Testing.md). After additional thought, I don't think UI mutation testing is feasible, at least in the traditional sense. Structure-based generative testing still could be.

## Lack of Deterministic Errors for Mutation

[Mutation testing](https://en.wikipedia.org/wiki/Mutation_testing) is a tool to measure completeness. It tells us how well our other tests detect possible errors in our code.

Mutation testing frameworks measure test suite completeness by crawling the code and injecting breaking changes. This could be flipping boolean statements, changing loop boundaries, and similar. It then runs the system's test suite to ensure the change is detected.

UIs, however, don't have as many structural changes that deterministically generate errors. We know flipping a conditional is a breaking change. However, changing a tag, class, id, or removing elements doesn't necessarily lead to a breaking change in the UI. There isn't a clear approach for seeding errors, so there isn't a clear meaning for changes undetected by our test suite. We don't know for sure that failure to detect injected changes is a failure of our test suite.

## Non-discreet Dimensions and Non-general Completeness

UIs have far more dimensions than conventional code. This leads to another issue with defining completeness. Does complete mean every screen size in every browser with every interaction method? What about order of interactions?
At best we can strive for a representative sampling of supported cases. 

Still, this representative sample of UI states can't be used for completeness and mutation tests, since we can't reliably seed errors. 

## State-based Generative Tests

Mutation testing is only one available tool. Other approaches might still attain the goal of wide test coverage and reliable fault detection in our UI without large ongoing maintenance costs. Ideally, with a relatively low up-front investment. 

I believe the representative set, while not useful for mutation testing, may still be useful for other approaches.

A combination of supported browsers, screen sizes, and an application state machine define a reasonably thorough enumeration of expectable UI conditions.
This, in turn, allows us to automatically generate a benchmark of UI screen captures. Any deviations from the benchmark trigger a review.

This sounds useful, but it requires at least page-level state machines.

Aside: This is generally the same method I referred to as "statistical UI testing" in the previous post. The main difference is additional user-provided constraints like screen sizes. 

## Structure-based State Machine Approximation

Most UIs will not have a ready-made state machine. The musing on mutation testing led me to realize that we could generate an approximated state machine by examining code structure much like mutation tests do. 

Rather making edits, we examine code structure to infer intended data states and transitions. 
- Data bindings to properties represent dimensions (or sub-values) of the UI state in a page
- Conditional bindings represent potential alternative states
- Action bindings represent transitions between states
- Navigation represents transition between state machines (i.e. each page is it's own mini state machine)

This kind of state analyzer would, unfortunately, be different for every UI binding framework. The quality of results would be less than an explicit state machine, and would vary based on quality of the binding model. Still, such a model could represent a fairly low-effort investment for a big boost in UI test coverage without requiring users to change existing code bases.

## Conclusion

Mutation testing for UIs, unfortunately, does not seem feasible.
However, structure-based analysis of UI bindings could automatically create an approximate sample of supported UI states, and their corresponding screenshots. This screenshot benchmark combined with visual difference testing could enable broad UI test coverage on typical projects without modification! 