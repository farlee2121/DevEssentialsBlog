---
date: "2022-01-28T00:00:00Z"
tags:
- Testing
- Test Selection
title: Test Case Selection Guide
---

Testing is a broad and essential topic for Software Developers. There is a dizzying diversity of [testing approaches for different scenarios](../posts/2021-12-05-What-tests-measure.md). However, the typical developer's inner loop focuses on a few kinds of tests and test selection. That is, choosing which tests need to be written.
<!--more-->

## Differentiation & Context

I previously wrote on [tests by role and lifecycle phase](../posts/2021-08-30-Test-Types-and-Lifecycle-Phases.md) and [why we write certain kinds of tests](../posts/2021-12-05-What-tests-measure.md).

Both of those posts focus on the big picture. They examine where testing lives across the many activities of development.

However, developers typically only use a few test types while developing. Behaviorally-focused unit tests tend to be the industry default. The majority of developer work goes into deciding what test cases to write within that test type.


<!-- - test type: an approach focused on measuring certain kind of information across systems and contexts. Many of these approaches to exercising the system can be generalized into a framework or tool. Not a system-specific expectation. (e.g. unit testing, integration testing, property testing, mutation testing) -->
  

## Test Case Selection Overview

First of all a [*test case*](https://en.wikipedia.org/wiki/Test_case) is a specific expectation encoded so that it can be repeatedly and reliably verified.

Test Case Selection is our approach to mapping expectations into test cases. Selection is generally concerned with sufficiently representing expectations and possible errors. This requires prioritizing certain cases over others, as there are effectively limitless possible tests.

Much of the [Software Engineering Body of Knowledge's](https://www.computer.org/education/bodies-of-knowledge/software-engineering/faq) (SWEBOK) testing chapter is devoted to test case selection. "Different selection criteria may yield vastly different degrees of effectiveness" and the appropriate set is not the same for all applications.


Here are the approaches defined by SWEBOK
- Engineer Experience
- Input Domain-based
  - Equivalence Partitioning: Finding the key groups of inputs/scenarios that are effectively the same
  - Boundary Value: Test values that near equivalence partition boundaries or the boundary of general acceptable values
  - Random Testing: Test randomly generated values withing the accepted inputs. Often used for testing robustness.
- Code-based (Structural)
  - Control-flow-based: Use code structure, like conditionals and loops, to predict errors and execution paths. May be paired with code coverage measures for completeness.
  - Data-flow: Looks at how data is defined, used, and disposed to predict test cases.
- Fault-based
  - Error Guessing: Try to anticipate the most likely errors based on intuition or historical data.
  - Mutation Testing: Methodically (and often automatically) seed errors into the code to see if the test suite catches them.
- Usage-based
  - Operational Profile: Mimic actual observed system usage as a repeatable system inputs
  - User Observation: More of a user experience technique
- Model-based (Functional)
  - Decision tables: Map possible combinations of conditions and actions to derive test cases
  - Finite State Machines: Represent the system as a set of states and transitions between them to determine test cases.
  - Formal Specifications: Use requirements that were specified in rigorous language to generate tests
  - Workflow Models: Consider expected sequences of actions by users and encode them as tests.

## My Approach

Test selection is not a once-size-fits-all activity. However, I've developed a fairly consistent approach across projects. For context, my work is primarily applications and business software.

- Test at the service and [port](https://blog.ploeh.dk/2013/12/03/layers-onions-ports-adapters-its-all-the-same/) levels  
- Follow [thorns around the gold](https://blog.cleancoder.com/uncle-bob/2014/11/19/GoingForTheGold.html) approach
  - First degenerate cases (e.g. null, empty)
  - Error cases
  - Most basic working cases
- Then encode all acceptance criteria (e.g. user-level behavioral requirements, performance budgets)
- Cases with potential data-based issues should use property testing (e.g. safe persistence, text processing, numeric operations, validation)
- Add a test any time a bug is found
- Use mutation testing to objectively quantify completeness and head off sneaky errors

I typically don't use code-based methods because I believe mosts [tests should be decoupled from the inner structure of the system](../posts/2020-08-21-Test-Api-InPractice.md), and instead focus on stable expected behaviors.

In general, I think a quality system doesn't need code-based techniques. The consumer expectations, public API, and test cases should all be in alignment.

One benefit of this approach is that I can run many system configurations under the same test suite. For example, a service port for saving contact data could use the same test suite for any storage implementation. The service level tests could also be run with any configuration of mocked or real dependencies. The tests can even serve as [contracts between teams](../posts/2021-10-31-Efficient-Inter-Team-Contracts-with-Acceptance-Tests.md) or [light-weight acceptance tests](../posts/2021-12-12-Gherking-Test-Names.md).


## Conclusion

Test selection is a core activity for developers of all maturity levels and part of the inner development loop.
Many techniques are available, but I recommend an approach based domain-/user-level expections, public API inputs, and regression tests for any bugs. 