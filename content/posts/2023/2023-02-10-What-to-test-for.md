---
date: 2023-02-10
tags: [testing]
title: What fails and what to test
---

Releasing frequently requires repeatable confidence that changes are safe.
Reliably verifying system health requires covering the many failure modes of a system. So, what are those failure modes?
<!--more-->

## Tighten the Net

Software can fail in innumerable ways. It's impossible and impractical to cover every kind of failure on every system.

Fortunately, we don't have to. The test suite can be tailored to each application even without up-front understanding of the key failure modes for that application.

Every system has expected behaviors. We have to know at least some of these to write the system. Start by encoding those as automated tests. Then, add automated tests for any errors that slip past those tests. This will iteratively reduce the kinds of errors that can slip past tests and into production. It also intrinsically focuses effort on the most probable errors for each individual system.

This approach is called *tighten the net*.

## Enumerating Failure Modes

Tightening the net is a very practical technique which doesn't require foresight about every kind of failure we might encounter.
Still, I want to have a good mental map of errors types to better reason about system quality. 

Here's an attempt at enumerating major categories of system failure

- Incorrect implementations 
  - misunderstanding requirements
  - code doesn't match developer's intent
  - syntax errors
  - sneaky violations of assumptions about system state
  - concurrency / timing issues
  - insufficient defensive programming (i.e. breaks on unexpected values)
- Misconfiguration
- Integration issues
  - misaligned contract expectations
  - breaking changes (shape or behavior)
    - coordinated update issues
  - coupled uptime
- Experiential failures
  - broken UI elements
  - latency / slow interaction
- Performance failures
  - starvation
  - high latency
- Infrastructure failures
  - network failures
  - catestrophic failures (i.e. hardware dies)
  - insufficient resources (drive space, memory, etc)
  - random failures (i.e. bit flips)
- Malicious / Security
  - injection attacks
  - DDoS
  - guessing resource locations for unauthorized access
  - This rabbit hole goes deep. Check [OWASP](https://owasp.org/) for common exploits


## SWEBOK Testing Types

The Software Engineering Body of Knowledge (SWEBOK) doesn't appear to explicitly enumerate fault types, but it does enumerate types of testing (Chapter 4 section 2).
- Unit tests
- Integration tests
- System tests
- Acceptance tests
- Installation tests
- Alpha and Beta tests
- Reliability Achievement and Evaluation tests (e.g. operational profile)
- Regression tests
- Performance tests
- Security tests
- Stress tests
- Back-to-back tests (test two versions of the system for consistent results)
- Recovery tests
- Interface tests (check contracts between components)
- Configuration tests
- Usability tests

These test type rather satisfactorily align with the failure types, which gives me some confidence that the failure list is reasonably representative.


<!-- ## Building a Comprehensive Test Suite

Not all of these kinds of failures and their corresponding tests are traditionally seen as tests. Many of them also fall to roles other than developers.


Let's consider what an example of what comprehensive coverage of these failure types could look like

- Hardware failure: largely mitigated by cloud computing
- Misconfiguration: ???
- Security:  -->
<!-- not quite sure what I want to say here.

I think I want to build a picture of a comprehensive test suite, including who might be involved.

TODO: probably a separate blog post
 -->



<!-- Solutions to some of these error categories
- cloud -> largely eliminates catestrophic hardware failure
- event streams -> largely solves coupled uptime, transient errors, delivery
- load balancers and auto-scaling -> can solve many starvation issues, though system needs to be designed for horizontal scale (where load testing comes in)



What kinds of tests + who writes them
- many of these are not conventionally thought of as automated tests. Many not written by devs -->
