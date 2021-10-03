---
layout: post
tags: [Testing, Quality, Measurement]
excerpt_separator: <!-- more -->
---

A dev raising that my test diagram doesn't show quality process improvement. Real efficiency achieved through repeatedly identifying the root cause of an issue, and changing your process to solve it permanently. Identifying issues and solving them can't be done with just intuition, it requires measurement.

This overall picture is right, and a big part of what differentiates software *engineering*, but it's not what my test diagram is about. The tests diagram is more about the relationship of testing tools to roles. The tests are a kind of measurement that feeds into the larger quality process. This raises the question, what do the different kinds of tests measure? Consequently, what do they tell us about our system?

<!-- I think I might need to pair down the excerpt -->

<!-- more -->

<!-- todo --> Cross-cutting techniques measure certain information and their sum tells us even more information based on who writes the tests.

!!! maybe a disclaimer that i'm not an expert in all these kinds of testing. They represent a high-level connection to outcomes to get people started. A more nuanced and contextual investigation is necessary.

I'd also love to get feedback from experts in different roles and fill out a higher-fidelity mapping.

## At the role level

Each doesn't necessarily give us a clear root cause, but can significantly focus our investigations and measure success or failure.

**Acceptance Tests**: measure how well developer understanding matches customer understanding.

Repeated failure of acceptance tests often suggest insufficient or unclear customer-developer communication.

**Developer tests**: measure how well code matches the developer's mental model. 

Repeated failure of developer tests often indicate code quality and maintainability issues. Failing tests are expected during development. [TDD](todo) expects developer to first fail a test so we know a later pass actually means the code meets our expectation.

**System tests**: measure how well and consistently system expectations are met in the full operational configuration.

System tests can be quite broad, but common reasons for repeated system test failure are
- fragile configuration
- reliability and robustness issues. For example, coupled availability, improper error handling
- insufficient performance or scalability
- These potential outcomes are similar to chaos testing because users are similar to chaos tests

## At the technique level

**Regression tests**: tell us when we've broken previously functioning expectations. When regression tests frequently fail it can indicate
- excessive time pressure leading to careless changes
- code that is hard to understand and change safely.
  - Coupling, cleverness, and poor naming are common drivers. 
- insufficient collaboration or reviews


**Chaos tests**: measure how robust our system is against unexpected inputs and failure events.

Significant failure in chaos testing can mean (based on the kind of chaos)
- insufficient validation and defensive programming
- "happy path" programming with insufficient error handling
- Unexpected coupled service availability, often caused by synchronous service communication
- insufficient failover infrastructure (e.g. load balancers, auto-scaling)

**Unit vs Integration tests**: Unit tests verify requirements on a component in isolation while integration tests verify behaviors when components are integrated. The contrast between these two levels measures consistency of behavior across context.

Frequent inconsistent results between the levels may indicate
- unclear or error-prone composition
- unexpected coupling of components leading to non-deterministic behavior (e.g. multiple components mutating the same data). This is an encapsulation failure or a leaky abstraction.

**Example vs Property**: This could be read "specific input and output vs input-output relationships". Examples ensure key known cases are satisfied and property tests ensure behavior is consistent across inputs.

Frequent failure of examples, but not properties may indicate excess coupling to unstable domain rules.

Frequent failure of properties, but not examples, may indicate unenforced data constraints, uncommunicated data constraints, difficult boundary cases, poor assumptions about data baked into implementations, and other similar issues.

**Behavioral Tests**: Encode functional requirements as some set of steps for repeated verification. 

Failure trends may indicate
<!-- TODO -->
<!-- - unstable requirements
- Code quality issues like coupled 
-  -->

**Mutation Testing**: mutation tests the completeness of other kinds of tests. In other words, how well do our other kinds of tests catch errors. Poor mutation test results can mean
- insufficient testing
- low-quality testing

**Performance Testing**: Performance setup reliable conditions for truly comparable performance results over time. This measures how and when changes impacted performance.

Repeated failure to meet performance benchmarks can mean
- insufficient performance awareness
- insufficient performance budgeting

**Multiple Verification**: measures how consistent and reliable our testing process is by comparing results from multiple techniques or testers.

Inconsistent results between tester or approaches may indicate faulty tests, faulty/dishonest reporting, or unclear process.

**Reviews**: reviews can catch a wide range of issues.

A large volume of review errors may suggest unclear expectations within a team or insufficient training.

keep in mind that a test can fit multiple categories. Most tests we think of are behaviorally-focused, example-based, unit tests that can also be run over time as regression tests. P integration


TODO: link to quantified communication