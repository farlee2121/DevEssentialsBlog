---
date: "2021-11-05T00:00:00Z"
tags: [Acceptance Tests, BDD, Team Process, Quality]
title: Thoughts on Acceptance Test Logistics
aliases:
- /2021/11/05/acceptance-test-logisitcs
---

I [previously wrote](../posts/2021-10-31-Efficient-Inter-Team-Contracts-with-Acceptance-Tests.md) on how acceptance tests can streamline communication between developers and teams. 
I've been thinking about practical enactment of such a scheme and surfaced some interesting ideas.
<!--more-->

First, a clarification of terms from last post
- downstream -> dependent team -> team creating a flow with some dependency to be filled
- upstream -> dependency team -> team implementing the service that fills the dependent team's need


Clear ownership and collaboration techniques are vital for big organizations. I realized that this problem has already been addressed for code. Package managers revolutionized code sharing across ownership boundaries (i.e. teams and organizations). I think the same concerns and techniques apply to inter-team acceptance tests.

Key concerns for inter-team tests include
- The dependent team should own the acceptance tests
- The dependency team must be able to access, read, and execute acceptance tests, but not modify the test definitions
- The dependency team should be able to evolve the test suite without disrupting the dependent team (e.g. inheritance, composition, or configuration of the test suite)
- The dependant team should be able to publish new versions of the test suite
  - The dependency team should be notified when a new version of the tests are available
- History of updates and adoption should be clear and traceable (prevent denial/misinterpretation of communication)
- Multiple teams may need to access and develop against the test suite. The process should be standard for all of them. Preferably without duplication of effort 
  - Adoption timelines of each team may need to be independent
- The more automation, the less can be forgotten or mis-executed


Tests are just another kind of code. It makes sense a package manager solves most of these problems cleanly. The one exception is allowing dependency providers to readily view, but not edit the test source code.

Distributing tests as packages would enable powerful collaboration flows. For example,
- a dependency team could reference test packages from all of it's dependent teams. They effectively compose a test suite that prove all client needs are met!
- Dependent teams can easily monitor its dependency providers for adoption by watching package reference updates and/or watching test CI test outputs for any new behaviors to pass. The code base itself now acts as a history of inter-team deliverables.
- The package schema also simplifies maintenance of multiple system versions. Client expectations are versioned with the system as packages!

## Possibilities with Nuget

I'm working on some approaches using Nuget in [this repository](https://github.com/farlee2121/PackagedTests).

In short,
- enabling debugging and viewing source during debugging is easy
- copying source files allows easy view of source files synced to debugging resources, but allows editing
- still trying to find the combination of
  - easy source viewing
  - said source linked to debug resources
  - source not editable
  - works across tooling


## Responsibility and trust

This exercise helped me realize I implicitly expected the dependent and dependency teams to share [TestApi](../posts/2020-08-21-Test-Api-InPractice.md) adapter implementations. However, shared implementations contrast with our key goals. Shared test adapter implementations require one team to trust that the other team didn't game the test suite. It muddies ownership and responsibility.

Separate adapter implementations for the same test suite both simplifies ownership concerns and eliminates the *need* for trust in another team. It builds in process assurance by having each team verify their shared outcomes. This also mirrors organizational responsibility: the dependency should meet the dependent's needs, but the dependant team is ultimately responsible for verifying its needs are met and its component works.

Any failures in the test suite are also much more valuable than if each team made their own acceptance test suite. Failure in only one implementation is a test adapter issue, but a failure in both means a code or test flaw.
 
## Joint Ownership Code
Rigid team boundaries don't always make sense. A few examples: a project may not be big enough for a team, developer assignments may be fluid, or stakeholders may want to expedite their own needs in a project (open-source model).

Separated test adapter implementations with a shared test suite make even more sense in these cases. Each contributor probably doesn't understand the needs of the other teams deeply. It'd be easy to accidentally change tests in a way that breaks other dependent users without realizing. This isn't true if each dependent team has it's own test adapter implementations. Those implementations are made by contributors well acquainted with the end use. This also forces any test suite changes through review by contributors to each client. 

Acceptance tests with split test adapter implementations aren't enough to govern a shared code base. They enforce quality of behavior verification. They don't guarantee code quality or other potential conflicts. Additional tools like Inspections can solve those issues. Inspections push for documented standards. Each team can be represented with a reviewer, and no team is given unbalanced power. 

## Conclusion

Digging into application details convinced me more than ever that acceptance tests are effective contracts between teams. The division of ownership closely reflects organizational needs. The techniques create a "pit of success" leading to good organizational quality practices. Package managers have mostly addressed these same issues for code and appear to meet the same need for tests. 