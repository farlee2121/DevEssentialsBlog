---
layout: post
tags: [Testing, Quality, Software Lifecycle, Team Organization]
---

# Test Types and Lifecycle Phases

I was thinking about responsibility for different kinds of quality in an organization and I noticed that different kinds of testing line up well with particular roles and [software lifecycle phases](TODO). I've summed it all up in a quick visual. 

Terms for different kinds of testing are often used many contradictory ways. I'll be leaning on the following sources, which largely agree with each other
- [Software Engineering Body of Knowledge](https://www.computer.org/education/bodies-of-knowledge/software-engineering/v3) Chapter 4.2
- Code Complete Chapter 22
- [Robert Martin's definitions](https://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html)


![Test to role map]()

## The core
Quality assurance (QA) is responsible for... assuring quality. They are the heart that coordinates and verifies quality activities across the many roles and phases of the software process. This may mean that a QA rep does little testing themselves and instead cooperates with individuals in more specialized roles. 

Test Engineers similarly ranges across many stages and kinds of tests to fully verify a system. The role may vary, but it seems implied that test engineers are more focused on enacting verification rather than coordinating overall quality activities.

## Cross-Cutting
Test can be wrong just like any other kind of code. Part of quality assurance is verifying that our test verify what we expect them to.

Some common techniques to this end are
- **Mutation testing** (and other coverage measures): verify completeness of our test suite. In other words, that our tests cover the code thoroughly and would fail if errors were present.
- **Multi-party verification**: Multiple groups separately verify the correctness of the system. This is somewhat inherent in having different roles test separately.
- **Multi-technique verification**: Use independent techniques to verify the same expectation.
- **Review**: Reviews use other experts to ensure quality of methods used. They may be internal between members of similar roles or by external auditors.
- **Function/behavioral tests**: Behavioral tests decouple the test definition from the test implementation. They can be used across system configurations to verify consistent satisfaction of expectations.
- **Regression Tests**: Formalize errors that have slipped through testing before to ensure that they don't slip through again. May be implemented as many different kinds of tests.
- **Example and Property Tests**: Example-based tests verify behavior given a specific case. Property tests are their compliment. They verify some relationship between inputs and behavior across many samples of data. For example, `a + b = b + a` for all numbers.


## Requirements

*Verifying Roles*: Customer Representative, Requirements Analyst

*General category*: Acceptance Testing

**Acceptance Tests** verify that the system meets requirements as specified and that the developer understanding of requirements matches the customer understanding.
  - Tool: Behavior Driven Development (e.g. Gherkin)
  - mutation tests can measure the completeness of acceptance tests
  - Expected behaviors may be either examples or properties

Customer reps may also verify the quality of requirements. These techniques are generally not labelled as testing because they do not exercise the system. They may used before any system exists. For example,
- Mockups
- Prototyping
- Shadowing
- Formal modeling 
- Inspections or Review
- Language analysis (i.e. ambiguity indicators)


## Design and Construction

*Verifying Roles*: Architect, Developer

*General Category*: Developer Testing

**Developer tests** encode the developer's understanding of requirements and expected behaviors of the system. This may include more fine-grained behaviors than acceptance testing would cover. I advise most developer tests also be behavior-focused, but developer tests may include implementation-aware tests. 

Techniques
- **Test Driven Development**: Converting the requirements into developer tests forces critical thinking about requirements and exposes mismatches between requirements and design expectations
- **Behavior / Feature Tests**: Decouple test definitions from system implementation. Excellent for encoding requirements. They can be reused to test components in any unit or integration configuration without rewriting tests.
- **Unit tests**: Test some cohesive group of code (e.g. a service) in isolation from dependencies
- **Integration Tests**: Test multiple components to ensure proper connections and shared assumptions across components.
- **Performance Tests**: Ensure non-functional requirements for responsiveness or other performance measures are satisfied. 
- **Mutation Tests**: Can be used to measure the completeness of any of the mentioned kinds of tests
- **Example and Property Tests**: 
  - Example tests are what most people think of when they write unit tests.
  - Property tests most often show up as developer tests. They can be used to test scenarios that are difficult to encode with examples. Like, "For any list of customers I save, I should be able to retrieve the same list of customers"

Design and Construction overlap significantly on most projects of normal scale. Designs can be verified separately if scope is large or implementations are expensive. Some design verification techniques include
- Model analysis
  - process boundaries
  - authentication/authorization boundaries
  - Organizational (business) boundaries
  - Component diagrams (fan-in/fan-out, cycle analysis, etc)
  - Activity diagrams 
- Review
- Prototyping

## Delivery and Monitoring

*Verifying Roles*: Site Reliability Engineer (SRE)

*General Category*: System Testing

**System Tests** are the last mile tests. They focus on verifying the final complete state of the system works as expected. Issues of interest include infrastructure and configuration mistakes. Many kinds of performance (e.g. load testing) generally fall in this category.

Techniques
- **Behavior Testing**: Behavior-driven tests are decoupled from implementations, so they can as easily be used to verify functionality in a deployed environment as a local one
- **Canary Testing**: Release changes to a small portion of users. Revert if errors spike for the test group, or increase the sample until all users are on the new version.
- **Chaos Testing**: Intentionally cause environment issues to test fallback behaviors (e.g. take down infrastructure, fail http calls, fill up drive or memory space)
- **Load Testing**: Intentionally flood a site with traffic to test the limits of system capacity. 
- **Health Checks**: Simple frequent tests of a live system. Verify that a portion of the system is still up and running, or sound an alarm if they aren't.
- Mutation testing could be used to measure completeness to system tests too (mess with configuration, take down infrastructure, etc). I have never seen it done though.

<!-- [Quantified Communication](../_posts/../_site/2021/03/19/Quantified-Communication-Customer-to-Code/index.html) -->
