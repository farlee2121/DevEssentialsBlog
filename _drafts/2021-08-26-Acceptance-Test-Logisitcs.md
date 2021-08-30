---
layout: post
tags: []
---

# Thoughts on Acceptance Test Logistics

I [previously wrote](TODO) on how acceptance tests can streamline communication between developers and teams. 
I've been thinking about practical enactment of such a scheme and surfaced some interesting ideas.

Clear ownership and collaboration techniques are vital for big organizations. I realized that this problem has already been addressed for code. Package managers revolutionized code sharing across ownership boundaries (i.e. teams and organizations). I think the same concerns and techniques apply to inter-team acceptance tests.

- The upstream team should own the acceptance tests
  - The downstream team should not be able to modify the test definition
- The downstream team must be able to access, read, and execute acceptance tests
- The upstream team should be able to evolve the test suite without disrupting the downstream team
- The downstream team should be notified when a new complete version of the tests are available
- History of updates and adoption should be clear and traceable (prevent denial/misinterpretation of communication)
- Multiple teams may need to access and develop against the test suite. The process should be standard for all of them. Preferably without duplication of effort 
  - Adoption timelines of each team may need to be independent
- The more automation, the less can be forgotten 


Tests are just another kind of code. It makes sense a package manager solves most of these problems cleanly. The one exception is allowing downstream teams to readily view, but not edit the test source code.

I'm working on some approaches using Nuget in [this repository](https://github.com/farlee2121/PackagedTests).

In short,
- enabling debugging and viewing source during debugging is easy
- copying source files allows easy view of source files synced to debugging resources, but allows editing
- still trying to find the combination of
  - easy source viewing
  - said source linked to debug resources
  - source not editable
  - works across tooling

Distributing tests as packages would enable powerful collaboration flows. For example,
- a downstream team could reference test packages from all of it's upstream teams. They effectively compose a test suite that prove all client needs are met!
- Upstream teams can easily monitor downstream teams for adoption by watching package reference updates and/or watching test CI test outputs for any new behaviors to pass. The code base itself now acts as a history of inter-team deliverables.
- The package schema also keeps it easier to maintain multiple versions of the system. Client expectations are versioned with the system as packages!

## Responsibility and trust

This exercise helped me realize I implicitly expected the upstream and downstream teams to share TestApi implementations. However, shared implementations contrast with our key goals. Shared test api implementations require one team to trust the other team didn't game the test suite, and likely muddy clarity of ownership.

Separate implementations of the same suite both simplifies ownership concerns and eliminates the *need* for trust in another team. It builds in process assurance by having each team verify the same outcomes. This also mirrors organizational responsibility: the downstream should meet upstream needs, but the upstream team is ultimately responsible for verifying its needs are met and its component works.

Any failures in the test suite are much more valuable than if each team made their own acceptance test suite. Failure in only one implementation is a test api issue, but a failure in both means a code flaw.
 
## Joint Ownership Code
Rigid team boundaries don't always make sense. A few examples: a project may not be big enough for a team, developer assignments may be fluid, or expertise may be needed.

Separated test implementations with a shared test suite make even more sense in these cases. Each contributor probably doesn't understand the needs of the other teams deeply. It'd be easy to accidentally change tests in a way that actually breaks upstream users without realizing. This isn't true if each upstream team has it's own test implementation. Those implementations are made by contributors well acquainted with the end use. Any test suite changes are also forced through review by contributors to each client. 

The split test implementations enforce quality of behavior verification. They don't guarantee code quality or other potential process conflicts. Inspections are a good tool for those issues. Standards are documented, each team must be represented with a reviewer, and neither team is given precedence. Inspections may be a bit heavy, but multi-team process is messy enough that I do think inspections should be used for all multi-ownership code.

## Conclusion

Digging into application has me more convinced than ever that acceptance tests are effective contracts between teams. The division of ownership closely reflects organizational needs. The techniques create a "pit of success" leading to good organizational quality practices. Package managers have mostly addressed these same issues for code and appear to meet the same need for tests. 