---
layout: post
tags: [Testing]
---

I previously wrote on [when to use kinds of tests](../_posts/2021-12-05-What-tests-measure.md), but I realized I haven't written on how to pick the specific test to write.

Most of SWEBOK chapter on testing is about test case selection
- different approaches matter



## Overview
SWEBOK approaches
- engineer experience
- input domain-based
  - Equivalence Partitioning
  - Boundary Value
  - Random Testing
- code-based (Structural)
  - Data-flow
- Fault-based
  - Error Guessing
  - mutation testing
- Usage-based
- Model-based (Functional)
  - Decision tables
  - Finite State Machines 
  - Formal Specifications
  - Workflow Models

## My Approach

- not a onesize fits all, but I've developed a fairly consistent approach across projects
  - Thorns around the gold (degenerate, error, basic)
  - then all user-level behavioral requirements (much like acceptance tests)
  - Cases with potential data-based issues should use property testing (e.g. safe persistence, text processing, numeric operations, validation)
  - Add a test any time a bug is found
  - Use mutation testing to objectively quantify completeness

I typically don't use code-based methods because I believe mosts tests should be decoupled from the inner structure of the system an instead focus on stable expected behaviors.

In general, I think a quality system doesn't need code-based techniques. The consumer expectations, public api, and test cases should all be in alignment.

<!--  -->

different  selection  criteria  may 
yield  vastly  different  degrees  of  effective-
ness.  How  to  identify  the  most  suitable 
selection criterion under given conditions is 
a complex problem; in practice, risk analysis 
techniques and software engineering exper-
tise are applied.


Code Complete Methods
- Incomplete testing - pick test cases mostly likely to provide new info
- Structure-based Testing -
- Data-Flow Testing
- Equivalence partitioning
- Error Guessing
- Boundary Analysis
- Classes of Bad Data
- Classes of Good Data




Could lean on Mark Seemann for contrained determinism

Based my conversation with jack about Code Complete 22.3

Difference from my earlier post is that my other post is viewing from the measurement / overall test planning view. It outlines types of tests.
This post is about ways we chose the test cases. Think deciding to unit test versus how we choose the unit tests we write.

Case selection
- equivalence class
- boundary case
- structure-based
- error guessing
- etc

Other Approaches
- code coverage (meh)
- mutation testing (much better)
- Thorns around the gold / TDD-based
- requirements-based

There is some feedback between the two (e.g. data-focused case discovery often leads to property testing).

A related technique is thorns around the gold (link this). Where first we consider degenerate cases, then errors, then simple expected cases, on up until we can't make a test fail.

I don't delight in sturcture-based methods. I think most often tests should be separated from system details (link bdd/testapi). If our public interface encodes the business cases (totality + DDD), then using equivalence classes, boundary cases and similar should lead us to all the cases we should know about and be tied to rather than coupling to incidental details of the implementation.

This is really a case selection approach (BDD-ish) where the tests are sourced from stakeholder expectations (requirements ~= tests)


ideas
- maybe clarify how language around these two concerns are often fuzzy, making differentiation difficult. For our purposes we'll define
  - test type: an approach focused on measuring certain kind of information across systems and contexts. Many of these approaches to exercising the system can be generalized into a framework or tool. Not a system-specific expectation. (e.g. unit testing, integration testing, property testing, mutation testing)
  - test cases: specific expectations written one as one or more test types. (e.g. IsAdditionAssociative, CanSavePurchase)
  - test case selection: how we map expectations into test cases. Generally concerned with sufficiently representing expectations and possible errors.

