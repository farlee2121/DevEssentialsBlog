---
date: 2022-11-09
tags: []
title: ""
---

Automated tests have become standard in software development, but test suites often fall short of expectations. 
They may be slow, require heavy maintainenance, fail to catch errors, and myriad of other issues. 
This series explores what benefits test *should* deliver and how to maximize the investment, specifically with a focus on developer tests.
<!--more-->

<!-- quote? tests prove existence, not absence of defects -->

What do I mean by tests?

Motivating questions


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