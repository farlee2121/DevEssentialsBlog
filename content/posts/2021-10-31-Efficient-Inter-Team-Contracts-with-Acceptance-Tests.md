---
date: "2021-10-31T00:00:00Z"
tags:
- Acceptance Tests
- BDD
- Team Process
- Quality
---

# Efficient Inter-Team Contracts with Acceptance Tests

I've been exploring large-scale formal development practices, and realized acceptance tests may be the best way for developers to encode expectations for other developers.
<!-- (maybe rephrase to sound less conclusive than "realized") -->

## Testing Techniques

Let's set a bit of background.

First, I use [TestApi](../posts/2020-08-21-Test-Api-InPractice.md) for behavior-driven testing. This, and other [BDD](https://en.wikipedia.org/wiki/Behavior-driven_development#Principles_of_BDD) methods, write tests against their own abstraction. This allows tests to cleanly encode behavior instead of getting wrapped up in system details. It also allows the same test suite to test multiple implementations.

Second, I use [plugin-style architectures](https://spencerfarley.com/2020/12/19/ports-and-adapters/) like Hexagonal or Clean Architectures. These methods work on the same idea as TestApi. Services use Dependency Inversion to build up their own abstract dependencies and use adapters to map implementations into those expected abstractions. This allows us to test dependency behaviors against the abstraction with clean caller-oriented semantics. Mixing in BDD methods allows us to test all implementations of the dependency with the same test suite.

## Communication and Scale

These techniques work effectively on projects of all sizes. Now let's consider what happens as projects get larger.

Low communication overhead is one of the main reasons small projects move faster than big ones. Contracts between components can be iterated quickly and with low-formality, especially if most or all of a system may be updated simultaneously during development (i.e. just one code-base). Often one person can develop a whole feature from top to bottom.

However, developing large projects as one code base becomes unmanageable. I've been working on the .NET SDK and feeling some of the pains. Builds take minutes, the build artifacts are over 50GB, and tests can be more than an hour. A large code base also raises challenges for code ownership and independence. Plus, [individuals can't internalize large systems](https://www.cs.utexas.edu/~EWD/transcriptions/EWD03xx/EWD340.html).

However, splitting code means more communication overhead. Each feedback cycle requires
  - communicating need to other people
  - completed work outside your control
  - publishing of some artifact for verification
  - testing to ensure requirements were met

  <!-- - todo: maybe move this up and share the same steps across cycle formalities-->

Staying efficient means reducing communication overhead. [The fewer cycles we need to share an understanding of the problem, the faster we can be](../posts/2021-01-29-Going-Fast-is-Going-Well.md). Agile methods attempt to address this generally through frequent collaboration in small additive chunks.

## Acceptance Tests as Developer Communication

I think there is a more efficient means when both parties are developers: acceptance tests.

Consider, plugin-architecture and BDD testing. Those methods are plain good development practice, and they effectively create automated acceptance tests out of the gate with concepts programmers already use frequently!

This style of Acceptance tests can reduce expensive person-to-person cycles and quicken independent development cycles.

As the downstream developer, I don't want to wait on a dependency, and understanding can change as development clarifies the problem. I can keep my development loop tight by developing against a mock dependency that I own. 

Using behavior-driven tests like Gherkin or TestApi allow verification of dependency behavior independent of the dependency implementation. I can create a working system and test suite, then swap the dependency when the full version is available.

This also simplifies communication for the other team. They should need much less clarification directly from the downstream developer. They have all expectations as executable tests. Tests, unlike people, are available all the time. They can develop in small increments with continuous interactive feedback. When tests all pass, they are done!

This doesn't mean the other team won't write their own tests. Service boundaries are drawn for generalization. The other team will likely be implementing a solution to a more general problem, and for more consumers than just my component. They will need their own tests. The acceptance tests just make sure that my needs are met. Even better, they show me how that team expects their service to meet my need.  They can even be run regularly to ensure no regression of expected behavior as the other team releases updates.


Many of the same benefits are true for acceptance tests in general, but it takes additional work to ensure non-programmer expectations are correctly encoded in the acceptance tests. Developers don't have that limitation.


## Conclusion

Acceptance tests are not just a tool between companies or between devs and non-devs. They can be a powerful tool for internal teams to communicate efficiently and reduce inter-team dependencies.

Key benefits include
- **Short and independent loops**: 
  - Downstream teams can iterate and create a working version against mocks without waiting on the upstream implementations
  - Upstream teams have an interactive set of expectations. They can iterate and experiment without uncertainty or waiting for downstream feedback
- **Clear expectations**: The downstream team can uncover all the hidden expectations that surface during development before handing off the requirements. The test suite should represent a final set of expectations!
- **Simplified verification**: The spec doubles as automated tests to verify expectations when the upstream team finishes their work 
- **Improved testing**: Mock implementations created while developing double as light implementations well suited for running tests
- **Automated Cross-team regression**: The tests don't disappear after work is complete. They can be regularly run to ensure teams don't break each other's expectations. 


<!-- Todo: add acceptance tests to test diagram for external parties -->