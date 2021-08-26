---
layout: post
tags: []
---

I've been exploring large-scale formal development practices, and realized acceptance tests may be the best way for developers to encode expectations for other developers.
<!-- (maybe rephrase to sound less conclusive than "realized") -->

Reduced communication complexity is one of the main reasons small projects move faster than big ones. Contracts between components can be iterated quickly and with low-formality if most or all of a system may be updated simultaneously during development (i.e. just one code-base)

However, developing large projects as one code base becomes unmanageable. I've been working on the .NET SDK and feeling some of the pains. Build are at least minutes, , the build artifacts are over 50GB, and tests can be more than an hour. A large code base can also raises challenges for team code ownership and independence.

However, splitting code means more communication
- No live iteration of dependency behaviors
- Each feedback cycle requires
  - communicating need to other people
  - completed work outside your control
  - publishing of some artifact for verification
  - testing to ensure requirements were met

  <!-- - todo: maybe move this up and share the same steps across cycle formalities-->

The best way to speed the process on large projects is minimizing time (often communication cycles) to a clear understanding. Agile methods attempt to address this generally through frequent collaboration in small additive chunks.

However, I think there is a more efficient means when both parties are developers: Acceptance tests. Acceptance tests can reduce expensive person-to-person cycles and quicken independent development cycles.

As the upstream developer, I don't want to wait on a dependency, and understanding can change as development clarifies the problem. I can keep my development loop tight by developing against a mock dependency that I own. Dependency Inversion and/or plug-in style architecture mean that the upstream component shapes the dependency interface to it's own needs and has no coupling to an implementation.
Using behavior-driven tests like Gherkin or TestApi allow verification of dependency behavior, also independent of the dependency implementation.

This my tightens the cycle on many fronts
- Short loops: I can iterate on my own component without waiting on others
- Clear expectations: I can develop a working version of the system, and know exactly what I need from the external dependency
- Simplified verification: I've already written automated tests to verify expectations when the other team finishes their work 
- Improved testing: I end up with a dependency implementation well suited as a mock for running tests

This also simplifies communication for the other team. They should rarely need to ask questions about what I need. They have my expectations as executable tests. They just implement the TestApi to hook up their implementation. When tests all pass, they are done!

This doesn't mean the other team won't write their own tests. Service boundaries are drawn for generalization. The other team will likely be implementing a solution to a more general problem, and for more consumers than just my component. They will need their own tests. The acceptance tests just make sure that my needs are met. Even better, they show me how that team expects their service to meet my need.  They can even be run regularly to ensure no regression of expected behavior as the other team releases updates.

The same can be accomplished with acceptance tests in general, but it takes additional work to ensure non-programmer expectations are correctly encoded in the acceptance tests.

<!-- TODO: clarify how behavior driven testing methods create these kinds of tests by default -->

## Conclusion

Acceptance tests are not just a tool between companies or between devs and non-devs. They can be a powerful tool for internal teams to communicate efficiently and reduce inter-team dependencies.
<!-- TODO: This definitely needs refactoring, but the key ideas should all be here -->

Todo: add acceptance tests to test diagram for external parties