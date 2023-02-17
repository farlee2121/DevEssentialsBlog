---
date: 2022-11-09
tags: []
title: ""
draft: true
---

Automated tests have become standard in software development, but test suites often fall short of expectations. 
They may be slow, require heavy maintainenance, fail to catch errors, and myriad of other issues. 
This series explores what benefits test *should* deliver and how to maximize the investment, specifically with a focus on developer tests.
<!--more-->

<!-- quote? tests prove existence, not absence of defects -->

What do I mean by tests?

Motivating questions
- verify our system works as expected in the conditions we expect it to work in
- verify continued consistent behavior over change and time
- avoid odd-hours, high-stress incidents, lost time. Confidence and morale that comes with good quality work. Not afraid of our code (maybe summarizes other points)
- scale /sustainability: test effort stable even as we continually add more to the system 
- Trust?: actually system works if tests work (necessary for confidence)

<!-- Colloquial list
- confident, not afraid of our system (not an ungrounded confidence, can't break system)
  - translates to move fast -->

Series overview



-----

Series outline
- What kinds of tests? -> what kinds of problems. Create context for developer test goals & build overall picture
  - pull from [my swebok-inspired test diagram](../../posts/2021-08-30-Test-Types-and-Lifecycle-Phases.md)?
  - definitely [what to test for](../../draft/2022-10-18-What-to-test-for.md)
- Signal: what tests do and don't tell us. Important qualities of tests (independent, repeatable, stable under system change, not too sensitive (false positives) but also meaningful coverage (don't miss many true positives))
  - Show nega examples of how bad signal is often created?
- Stable tests
  - largely has to do with implementation coupling & resource coupling
  - Test api? (or maybe just testing against an abstraction)
  - tests make their own data
  - nega examples: shared config file, shared data store, non-deterministic side-effects, knowing too much
- Case selection: choosing tests for best value and good signal
  - nega examples: choosing redundant cases, testing behaviors we wouldn't generally observe
  - thorns & other selection methods
  - I think this is where properties could come in nicely. They cover challenging cases nicely w/ fewer cases. Defeat the EDFH
- Test spectrum / test reuse (multiplying investment?)
  - using test api to accommodate messy systems
  - test api to reuse tests for unit, integration, potentially even system tests
  - testing multiple implementations

Q: Does this list represent a complete enough view of testing a reader could go apply?
- Q: will the examples sufficiently foster an applicable understanding avoiding common value traps?
- Q: will the reader understand where these tests fit in the larger quality picture?

Up next: Try to outline series in more detail (perhaps make a slide deck of visuals/exhibits) to make sure my coverage flows, hits key points, and is tight enough.

Q: How could I make this a "by example" series?
- If it's anti-fragile tests by example
  - Show decoupling from resources
    - use same test api against in-memory store and other stores. Know the expectations are the same so you can have more confidence local tests are similar to integration tests without slowness
      - bad example: tests using pre-seeded data
      - bad example: tests writing to shared state/store (even if not pre-seeded, ordering could cause test to fail. Like if we add the get all in different tests simultaneously)
    - Also need to show decoupling from config, since people tend to think of that differently
    - if you have a library that supports it, you can use transactions to isolate calls and still work against the DB, but it is a much less general method
  - Too much coupling to system (e.g. mocks)
    - bad example: trying to test an intrinsically stateful action in isolation from its coupled methods
    - good example: Behavior-based tests against consistent abstraction, a test-specific abstraction if needed (to add in coupled actions to check state)
  - Excessive data prep
    - bad example: Show constructing a big hierarchy example
      - explicit example tests aren't necessarily bad, but a lot of them adds up to hesitation to change data structures
    - Constrained indeterminism / have to think about shape of examples 
      - Test Data pattern (change only what you need)
      - Not a big deal if you use property tests. The can usually generate data for you.
        - even stronger than test data because it can test many cases of the given shape. though sometimes the shape is hard to define and a more concrete example using TestData is an easier way to get started. Most of my tests have been property tests in the last 2-3 years. Can say that they are almost always possible once you have a bit of practice.
  - Property tests and contrained indeterminism to fight edge cases
    - highly related to excessive data prep. Arranging lots of data also inhibits desire to write more tests, so cases are more likely to get skipped.
  - Multiple assertions & unclear failure context
    - single assertions using a joined structure to compare all expectations at once
    - may not make sense all the time, but I default to this kind of assertion now because the messages are so much more informative
    - Likeness pattern
    - use a DeepComparison if language doesn't easily support value-based equality
  - Integration errors
    - bad example: if your tests directly mock everything, you have to write whole new tests for integration
    - good example: test api can simply run as integration tests with a bit of configuration
  - Legacy systems and poor testability
    - Again, test api to the rescue
    - Some test qualities, like speed, may have to wait. At least you have a refactor roadmap driven by the tests.
  - Advanced: reuse highly generic expectation sets, like a filter & sort experience

Wow, the "by example" outline came together pretty quickly. I should probably write it this way then. I still want to cover high-level motivations though. I can do it as an extended version of what I did in 20x testing talking about good test qualities
- Remember to tie each example back to a good test quality
- Tie back to domain discovery / understanding the problem. Probably good to talk about in test case selection and in the overview
- maybe talk about case selection early to set basis for how I'll be selecting tests across the series (behaviorally) to avoid fragile scenarios 

<!-- 

I think I explicitly focus only on dev tests, but to explain that focus properly I also need to frame what kinds of tests at at least a higher level. This leads to a great motivating question for framing. What kinds of tests are based in what things can go wrong.

Recently wrote a post on that, though I probably want to tighten it up to a quicker and more categorical list of main failure sources.

Can also lean in my old quantified communication post for explaining what developer tests do for us


So probably one post overviewing kinds of errors. Maybe another introducing kinds of tools? Hmm, maybe just introduce those as I go.

Then get into dev tests
- signal: how do we make sure our tests tell us what we want them to (that system upholds same expectations under change, also double accounting we communicated correctly by rephrasing expectations in a test which is also a clearer way to capture specific expectations)
- case selection (by domain, but other techniques can guide like thorns or structure-based)
  - behavior driven
 Using abstraction / decoupling from accident (thus against a domain-based abstraction not an implementation, even if abstraction is just public methods)
  - settle common questions like of tests make the data vs pre-seed, using mocks, concrete vs interface, how much integration...
  - Don't forget degenerate cases.
- I'd be nice to have something about tests as self-documenting code / domain modeling capturing a part of the problem often left out or poorly modeled, requirements (the why behind how the system got to now)

Hmm. I'm getting into a bunch of properties I want represented. Remember to drive everything from motivations. What are we achieving? 


Goal for tomorrow, write the intro post framing the series (motivating questions, kinds of problems, focus on tests devs write most often)

Goal: how do we reliably verify our system works as expected)

Q: how can I include nega examples in this series?
- Dates would be a common way to show how a test can be flaky.


Have two motivation sections?

There are some differences for motivations between general testing and dev testing. In particular, we can get more specific.

General
- verify our system works as expected in the conditions we expect it to work in
- verify continued consistent behavior over change and time
- avoid odd-hours, high-stress incidents, lost time. Confidence and morale that comes with good quality work. Not afraid of our code (maybe summarizes other points)
- scale /sustainability: test effort stable even as we continually add more to the system 
- Trust?: actually system works if tests work (necessary for confidence)

Colloquial list
- confident, not afraid of our system (not an ungrounded confidence, can't break system)
  - translates to move fast
- ....

Perhaps frame kinds of problems & tests in terms of transitions.
- user to reqs
- req to dev
- dev to code
- code from dev to other environments
- env on update /deploy
- stable state (monitors)

Not as much transition-based (but env dependent)
- load
- security 
 -->