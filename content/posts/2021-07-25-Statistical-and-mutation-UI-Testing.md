---
date: "2021-07-25T00:00:00Z"
tags:
- Testing
- functional
- state machines
- UI
---

# Hypothesis: Statistical and Mutation Testing are Achievable for Visual UI Testing

I have a wide range of techniques for testing code behavior. I can reliably increase quality over time no matter how large the feature set grows and even measure the completeness of my test suite (mutation testing).

The same can't be said for UIs. I have long struggled to automate UI tests at all, and manual tests don't sustain as the system grows.
However, I think I may now have a technique to close the gap.
<!--more-->

## Existing techniques

I know that UI automation tests have improved with libraries like [Cypress](https://www.cypress.io/). These kinds of tests require some discipline, but can provide effective verification for workflows and UI behaviors. 

However, Cypress tests are selector-based. They won't tell you if an element is off screen, covered by something else, the wrong color, etc. 
This is where a visual comparison framework like [Percy](https://percy.io) can help. 

Percy compares screenshots of the application to previous screen shots that are known to be correct. Areas of allowed difference can be defined. If unapproved differences are detected, then a person is notified to review the screens and approve or reject the changes. This can be paired with Cypress to grab screenshots at different points in a workflow for example-based coverage.

The above techniques are significant improvements over manual testing. Still, defining and maintaining such tests is significant work. There is also no measure of the completeness of the tests suite.

This is where I want to propose two potential advances.

## Idea 1: Statistical UI testing

I've been studying Elmish, a framework based on Elm. The core idea is creating UIs as a modularized state machine. This means that any state in the UI can be achieved programmatically by setting values in the state data structure. If the state data is also annotated with types, then we can use existing tools to generate statistically significant samples of the system states. 

On it's own, this could quickly create a comprehensive set of visual comparison tests *programmatically*. The developer wouldn't write any explicit tests. The team could approve all the screenshots or just treat it as a baseline to detect changes. This baseline would improve as errors were discovered over time. 

This method could, of course, be used to define a fixed set of states to test with much less effort than required for Cypress and no dependence on the markup structure. It does not, however, test workflows or behaviors like Cypress does.

## Idea 2: Markup mutations

Mutation testing was created to measure the quality of test suites. Some tooling crawls the code base and injects errors (e.g. negating a conditional, changing loop boundaries). It then runs the test suite to see if the error was detected. Every undetected error is a failure and a gap in the test suite.

The same kind of testing could be applied to measure the quality of visual tests. Some tool could be used to change element ids, tag types, css values, and more. Then any UI tests are run. If the test suite doesn't fail, then that mutation is a gap in the test suite.

I don't know how thorough UI tests should be. However, a tool like this would create a *numeric measure of quality*. This would allow companies to decide their own tolerance for UI issues and set a clear quality goal.

## State Machine Quality Metric

UIs using a state machined-based UIs (like in idea 1) could also use the state machine to compute a numeric measure of test quality. Techniques have been studied for computing the total states of a state machine and how many of them are covered by tests. Such techniques wouldn't be any different for a UI state machine.

The state machine-based metric would likely be less computationally expensive than mutation testing. However, it is limited to UIs based on state machines or that can be modeled as state machines. Markup mutations could be paired with any kind UI tests. This also makes mutations superior as a benchmark for evolution from an untested UI.

## Conclusion

These ideas are pretty raw and the return on investment is uncertain. Tests of this kind would take significant time and computer capacity to execute. The number of potential mutations in css and html are enormous. Research would be needed to select the most useful set of mutations.

Still, I am encouraged to know that there are theoretical approaches that would bring the same level of quality control to program UIs as can be achieved on the backend.


<!-- 
RESEARCH: This post presents some opportunities for collaborating with academics
- studying rules for minimal failing transitions in state machines, like how we have for values in property tests
  - most likely a very similar technique. I'd guess that the parameters of a function can be considered a state machine. 
- Studying mutations to markup
  - dropping all classes would be a good first test
 -->