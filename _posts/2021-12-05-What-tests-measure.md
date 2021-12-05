---
layout: post
tags: [Testing, Quality, Measurement]
---

<!-- TODO: inconsistent repetition of test type in the paragraph -->

# What Tests Measure

My [test types diagram](../_posts/2021-08-30-Test-Types-and-Lifecycle-Phases.md) sparked concern that mature process focuses on repeated measured improvement, not specific techniques. This is right, but I don't see the conflict. Tests are a kind of measure, and the diagram identifies common tests (measures) certain actors leverage to meet larger goals. This raises the question, what do the different kinds of tests measure? Consequently, what do they tell us about our system?


Measurement is a big part of what differentiates software *engineering*, from general practice. A good engineer has a wide variety of tools to choose from and knows when to apply them. Here I'll try to explain what different tests measure and why we use them.

Disclaimer: I'm not an expert in all these kinds of testing, so I apologize to any experts if some descriptions are clumsy. I'd also love to get feedback from experts in different roles and fill out a higher-fidelity mapping.

## At the role level

As my [prior diagram](../_posts/2021-08-30-Test-Types-and-Lifecycle-Phases.md) illustrates, who writes the tests is important. Having different roles independently write tests helps us [quantify communication issues](https://spencerfarley.com/2021/03/19/quantified-communication-customer-to-code/), as well as what process stage introduced the errors. 

**Acceptance Tests**: measure how well developer understanding matches customer understanding.

Repeated failure of acceptance tests often suggest insufficient or unclear customer-developer communication.

**Developer tests**: measure how well code matches the developer's mental model. 

Repeated failure of developer tests often indicate code quality and maintainability issues. Failing tests are expected during development. In fact, [TDD](https://en.wikipedia.org/wiki/Test-driven_development) expects developers to first fail a test before they write code to make it pass.

**System tests**: measure how well and how consistently system expectations are met in the full operational configuration.

System tests can be quite broad, but common reasons for repeated system test failure are
- fragile configuration
- reliability and robustness issues. For example, coupled availability, improper error handling
- insufficient performance or scalability

These potential outcomes are similar to chaos testing because users are similar to chaos tests...

## Cross-cutting Techniques

Most testing techniques we think of are focused on a certain kind of information, and are independent of the tester. Some techniques have a strong association to a certain role category (e.g. behavior tests with acceptance tests), but they can really be used by any actor to a similar effect.

Keep in mind that a test can fit multiple categories. For example, most tests we think of are behaviorally-focused example-based unit tests written by developers that can also be run over time as regression tests.


**Regression tests**: tell us when we've broken previously functioning expectations. When regression tests frequently fail it can indicate
- excessive time pressure leading to careless changes
- code that is hard to understand and change safely.
  - Coupling, cleverness, and poor naming are common drivers. 
- insufficient collaboration or reviews


**Unit vs Integration tests**: Unit tests verify requirements on a component in isolation while integration tests verify behaviors when components are integrated. The contrast between these two levels measures consistency of behavior across context.

Frequent inconsistent results between the two levels may indicate
- unclear or error-prone composition
- unexpected coupling of components leading to non-deterministic behavior (e.g. multiple components mutating the same data). This is an encapsulation failure or a leaky abstraction.

Most project will favor unit tests because they are easier to write and run faster. Testing units also pushes more modular and focused code.

**Example vs Property**: This could be read "specific input and output versus input-output relationships". Example-based tests ensure key known cases are satisfied and property tests ensure behavior is consistent across inputs.

Frequent failure of examples, but not properties may indicate excess coupling to unstable domain rules.

Frequent failure of properties, but not examples, may indicate unenforced data constraints, uncommunicated data constraints, difficult boundary cases, poor assumptions about data baked into implementations, and other similar issues.

**Behavioral Tests**: encode requirements in terms of consumer expectations, generally independent of the system being tested. Gherkin is a common tool that introduced the given, when, then pattern of describing an expectation. 

Behavior tests are most commonly used for acceptance testing. They are more generally used for encoding requirements as stable test definitions. [Developer tests written this way](../_posts/2020-08-21-Test-Api-InPractice.md) can be reused as unit or integration tests.

Failure trends may indicate
- unstable requirements
- misaligned understanding of requirements
  - insufficient collaboration or reviews
- code that is hard to understand and change safely
- excessive time pressure leading to careless changes
- flaky code

**Mutation Testing**: mutation tests the completeness of other kinds of tests. In other words, how well do our other kinds of tests catch errors. Poor mutation test results can mean
- insufficient testing
- low-quality testing

**Performance Testing**: Performance tests setup reliable conditions for truly comparable performance results over time. This measures how and when changes impacted performance.

Repeated failure to meet performance benchmarks can mean
- insufficient performance awareness
- insufficient performance budgeting

**Multiple Verification**: measures how consistent and reliable our testing process is by comparing results from multiple techniques or testers.

Inconsistent results between testers or approaches may indicate faulty tests, faulty/dishonest reporting, or unclear process.

**Reviews**: are a broad category of methods where work is verified by other experts.  Reviews can catch a wide range of issues. Most basically, they guard against individual contributor error and improve consistency of practices across a team.

A large volume of review errors may suggest unclear expectations within a team or insufficient training.


**Chaos tests**: measure how robust our system is against unexpected inputs and failure events.

Significant failure in chaos testing can mean (based on the kind of chaos)
- insufficient validation and defensive programming
- "happy path" programming with insufficient error handling
- Unexpected coupled service availability, often caused by synchronous service communication
- insufficient failover infrastructure (e.g. load balancers, auto-scaling)


## Specific techniques

**Canary Tests**: Canary tests are really a focused kind of A/B test. They release changes to a subset of users and monitor for increased error rates. An increase in errors results in an automatic rollback.

These tests mitigate risk of defects in new code. They minimize risk of wide-spread errors and downtime. They promote frequent releases and can reduce the burden of manual testing for edge cases.

**Healthchecks**: simple tests that can be run frequently to ensure portions of the program are available and basically functional. Often as simple as ensuring a page loads.

Healthchecks are most fundamentally used to notice and respond to live errors before users do. They are also a critical measure of reliability and availability.


## Wrap-up
This list could go on almost indefinitely, but I've reached parity with my diagram.

I'm excited to use this list as a baseline for discussion. I want to hear what kinds of tests others value and what information they glean from them. Even on it's own, this list is a nice index to reference when I need to pick measures for a quality goal.
