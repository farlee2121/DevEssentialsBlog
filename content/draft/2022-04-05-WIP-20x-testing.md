---
date: "2022-04-05T00:00:00Z"
draft: true
---


# Title? Don't forget to change file name

New title ideas
- Anti-fragile testing
  - Good test suites get better with every miss. because we reflect the domain requirements, the tests get better as we understand more. The same hold true of property testing and "tightening the net". Requires addressing fragile test problem
  - Anti-fragility is a good summary of what good tests bring to our systems, and themselves. Though they also bring other things, like a clarity, a high quality bar, stop conditions. 



motivations -> What should tests accomplish for us
- Reduced bugs, early detection
- Save time, move faster
- Natural code documentation
- Pressure toward good practices (first client)
- Quality confidence
  - change without fear
  - raise quality bar over time

approach to testing matters... a lot... in how well these outcomes are achieved

qualities that should be true of our tests
- Repeatable & Reliable: Same result no matter how many times we run the tests, in what order, or in what environment
- Easy to write
- Stable: Minimal change as our system details change. 
  - Ideally only when that expectation changes, maybe on signature changes, never on implementation changes.
- Independent: Tested expectations are unlikely to effect each other. SRP / coupling/cohesion for expectations
- Completeness: Strong efficacy in catching defects
- FAST: at least core expectations should be run with every change. Need to run in a few seconds or people wont do this

Common failures
- too much mocking (you're tests are mocking you?)
- on other side of the spectrum, too many out-of-process dependencies (config files, data stores)
- Too narrow of test cases
- poor selection of test cases (covering implementation knowledge instead of contracts)



System structure makes a big difference for direct testing.
How do we get good tests even when our code isn't written for testability
- If you have a DI container in place, you can incrementally move dependencies to more testable ports (self-owned abstractions). If you don't have dependency inversion (or at least injection), then you can use some of the other techniques to improve your situation while you get that in place.
- TestApi
- test api makes it easier for each test to be responsible for it's own setup
- transaction scopes if we can't swap a transient (in-memory) store or test double
- Complex comparison https://www.nuget.org/packages/CompareNETObjects/
  - Or use a pattern like [resemblance](https://blog.ploeh.dk/2012/06/21/TheResemblanceidiom/)
- Data generation
  - https://github.com/bchavez/Bogus
  - Or if you're system is strong at enforcing invariants via constructors https://autofixture.github.io/


https://blog.cleancoder.com/uncle-bob/2014/05/10/WhenToMock.html
https://blog.cleancoder.com/uncle-bob/2014/05/14/TheLittleMocker.html



Idea: should I ask questions here too like in duck?
- What do you find difficult about tests? What hurdles are keeping you from these qualities?
- What are tests meant to accomplish?

Test API can be used with any system, but reuse only happens with a certain level of design maturity. The benefit before that comes in guiding to better design, as well as clean tests despite the messy system



## Paul concepts 

TODO: Re-read his article. It might help me identify foundational ideas

https://codewithspoon.com/2019/12/stop-corrupting-yourself-test-against-abstractions/

Test failure modes
- Test who cried wolf
- test that never fails
- test that can't survive

Properties
- Tests only deliver value when tested code changes
- changed test -> inconclusive signal

- Tests too narrowly focused
- tests too coupled to implementation such that code change means test must change
- too many out-of-proc dependencies -> flake or slow

<!-- 
META: thinking about the post this way, I could definitely revive the presentation with test api

 -->
