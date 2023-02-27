---
marp: true
theme: gaia
class:
# - invert
---


<!-- Q: I'm not doing a great job piquing curiosity. How can I sprinkle more curiosity?
- Ask them what they expect their tests to do for them?

Q: The generic -> specific idea blew Dylan's mind. Would it make sense to include here?

Qualities
- make sure I lead with curiosity
  - Try to have a hook early that I promise to answer later on, like with ducks
- make sure I set out general structure
- make sure at least every intro and conclusion ties back to the overarching lesson
- explicitly call out the motivating questions when I answer them

Q: Do I have a "one thing" they should remember from the presentation?
- TestApi doesn't work too well as a take-away since it's a whole new idea
- Maybe... *tests embody domain expectations*. We can decouple tests from excess system details to more clearly reflect domain expectations while also improving stability and flexibility

TODO: 
- [ ] Ensure all key elements are in outline
  - [ ] concepts
  - [ ] curiosity, overview, key callbacks / tie-ins 
- [ ] Validate the flow
- [ ] Draft key figures
- [ ] Practice & rearrange until satisfied
- [ ] Write it out
- [ ] might be nice to revisit small teaching overview and see if I can incorporate more teaching techniques
- [ ] I don't make an explicit connection to anti-fragile. Where do I do that?
  - anti-fragile for our system is tightening the net. Anti-fragile for our tests is more closely reflecting the essence of requirements 
-->

<!-- _class: lead invert -->
# Anti-Fragile Testing by Example
Spencer Farley

<!-- 
Developer-written tests are a critical to system quality and maintainability but developer tests themselves can go wrong and increase burden on a team to the point we question if they're even worth it.

Today I'll talk about how we can write tests that not only maintain but get better over time.


// I'm guessing most of my listeners won't even think about non-developer kinds of tests
Focusing on developer tests. There are all kinds of tests that different roles might write for a comprehensive quality plan, we're focusing just on tests developers typically write. -->

----

## Overview

- Testing Issues, Goals, and Mindset (15m)
- Examples (problem followed by )

----

## Questions

- What value do you expect from your tests?
- What problems do you experience with your tests?
- How do you choose what tests to write?

<!-- Speaker Notes
  Please take a moment to write down a few answers. Making predictions is shown
  to boost learning in following material.
-->

----

## My Motivating Questions

<!-- TODO: I like both of my questions sets, but it seems like a lot.
Do I have two pauses for contemplation
 -->

motivating questions
- How can we write tests that are easy to read, write, and maintain?
- How do we write tests that consistently reflect the actual quality of the system?
  <!-- - Want to move quickly and trust our system works. Also, avoid odd-hours and stressful production incidents -->
- How do we minimize testing effort over time and change in a system?

----

## How tests go wrong

- Flakey tests 
- Fragile test problem 
- Missed cases
  
<!-- This could be a great place for images. Like last presentation, I had a long and short code example
 -->

<!-- Speaker Notes
  Flakey tests 
  - "test that cried wolf" Degrade trust in test suite
  - non-determinism. Especially test coupling via state

  Fragile tests:
  - A friend of mine calls these "tests that can't survive"
  - Fragile tests are a maintenance problem, but their also a signal problem.
  If we change the test and the system at the same time, we don't actually 
  know our system still behaves correctly both the system and the test could 
  have broken.

  missed cases
  - unclear expectations
  - the test are hard to write, so people don't
  - differences between test and deployed environment
-->

----

Contrast long test versus short clear test.
Maybe put this after good qualities?
<!-- use this to prime curiosity -->

----

## Good qualities

- Stable Execution
- Representative of system quality
- Easy to write
- Low-maintenance
- Assist inner dev loop

<!-- NOTE: this is kind of a duplicate of my motivational questions -->
----

## Value delivered

To deal with these issues. Let's consider what tests really do for us.

During initial development, they're a double-check like double record accounting. We express what we want as a test then we make the system do it. We can be more confident that we coded what we expected to.

long-term: Confidence under change. assurance that the system still meets the same expectations before and after we change it
- but, if we have to change tests with the code, then we don't have that confidence. 
- results in fewer bugs, faster releases, less worry

----

## Nature of tests

Signal
Describe external behavioral expectations. So we can verify consistency over time.

Don't really care about how it behaves internally.

----

## Case Selection

Base on externally expected behaviors.
Acceptance criteria (which are a great practice if your company isn't currently using them) should end up as tests. 
- lower components in the system may not have AC, but you can write AC from what you expect as the higher component as if you were going to ask another team to meet those behaviors

Thorns around the gold for edge cases, degenerate, default values

<!-- Speaker Notes:
- One of our motivating questions was how we choose test cases.
 -->

----
## Domain Modeling

Tests capture domain information not easily captured elsewhere. They capture
the individual *user* motivations that led a code to evolve a certain way.

----

## Handling missed cases

<!-- Speaker Notes:
This addresses how we choose use-cases, and it also improves our options for identifying missed test cases.

Since our tests verify consumer-focused expectations we can practice a light form of BDD.
We can name our tests with Gherkin or similar readable formats and review them with other stakeholders.
-->

----

## Tighten the Net

<!-- Speaker Note:
Of course we'll still miss cases, but a good test suite acts like a bug net.
If a bug gets through we tighten the net. Address that bug by adding a new automated test. It'll aid you in solving the bug now and prevent reoccurrence of the bug in the long term.

Plugging holes in our suite like this adds up over time to a robust quality guarantee.
That is, if our tests can survive updates to our system. More on that later.
 -->

<!-- ---- -->

<!-- I think maybe I should cover data coupling and flake first.
It's a problem many people have spent some effort solving and can track with.
Then, I can show how mocks are tight coupling that makes tests fragile.
Perhaps I do it in a two-pass sample like i've used on OCP -->


----
<!-- _class: lead invert -->
# Solving Flake and State Coupling

<!-- Speaker Notes
One of the most corrosive issues, and likely familiar to 
 -->

----

## Issue: Shared Data State

<!-- Bad Examples:
- shared data store
- pre-seeded data

NOTE: I don't think I need code samples here. I think everyone can picture it.
If anything, maybe a sample to set up

May stem from some good motivations, like ensuring the code works integrated with the data store or reducing test data arrangement

Seeding may improve total speed some and move heavy data arrangement elsewhere, but it doesn't solve the underlying coupling. Now we have to modify and read two separate places to understand a test. There is also temptation to reuse data between tests, which creates sneaky shared assumptions between tests. It's easier to unintentionally break tests and harder to understand them.
-->

<!-- TODO: I need to think about this example chain. Data arrangement is a related motivator here, but the focus here is on the code coupling to the data store...
Maybe I show a bit of both? Then I can show how we collapse the data arrangement when I get to test API even if I focus on DI for the mocking phase -->

----

## First Pass: Mocking Dependencies
<!-- This one requires some system design -->

----

## Mocking Data Store



<!-- 

 -->
<!-- F -->

----

## Mocking configuration

<!-- Compared to data stores, configuration can get overlooked as a source of state coupling. But consider
- example of code directly consuming config. Perhaps quick and convenient, but what happens if we want to run parallel tests with different configuration? They'll fight over the state of the config file.
- This isn't just a testing issue, it's a warning sign of a larger coupling in our system. Components are coupled to a shared knowledge of configuration. The system assumes a component will only have one configuration per running application. Callers also require implicit knowledge of unadvertised configuration in order to consumer a component. Maybe that sounds reasonable, but it'll greatly limit the composability and reuse of our components. We'll see more on that later.
- For now, there is actually a rather simple solution: injecting config via constructor
  - show sample of injecting config -> makes required config clear, explicit, and variable between instances
  - Now we can instantiate config in many ways without the component caring 
    - show inline
    - show mapping from a config library

IDEA: do I show a quick example of migrating or copying by using two different configurations of same component? It'd give some motivation for reuse, which i'm guessing most of the audience won't have prior experience with.
 -->

----
<!-- _class: lead invert -->
# Solving Tests that Can't Survive

<!-- One of the next most common issues with test suites is maintenance.
Every time the code changes, there is a slew of tests that need changed too.
This problem even has a name: The Fragile Test Problem.

I think mocks are a key source of the Fragile test problem.
 -->

----

## Mock Example Review

<!-- Show the mocking sample here. -->

<!-- Unit tests test a component in isolation to simplify sources of errors and improve speed. However, notice how our approach to isolation has caused our tests to know a whole lot about the system. The tests known not only about the input and out shape of what we test, but what calls the code needs to fulfill that request and all those contracts. We may even know about sequence of calls. We freed our test from the out-of-process state, but we deeply coupled it to the implementation of the SUT -->
----

## Anti-corruption layers

<!-- There is a tool for breaking  -->

----

## TestApi: Anti-Corruption Layers for Tests
<!-- should I introduce this first, or should I show it in action
so people get it then give it a name.
Introducing it first might introduce skepticism that'll be hard to overcome
compared to  -->


----

## What if the system intentionally doesn't have the paired methods to verify state

needs a better title
i.e. Only have a read method and no write
The tests don't care. Get the method from where it actually lives or implement it in the adapter

----


## Consistency Across Dependencies

Circling back to tests coupled by state. Testing integrated with the data store had a valid concern: data stores behave differently. Well, now we're prepared to test both very quickly *and* have confidence that our fast test store reflects the same behavior as the out-of-process store. In fact, we can have any number of stores and be confident they meet the same expectations.


But, different dependency implementations behave differently.
If we use test dependencies, how do we know it'll work real ones?

Well, testApi lets us test all the implementations of a dependency with one test suite.
This forms a true contract where we know all implementations meet the same behavioral expectations defined by the tests.

There are other cool ideas in this line, but i'll leave those to my other blog posts. 
So I don't go too long.

----
# Understandability

----
## Solving Excessive Data Prep

<!-- Solving test state isolation and fragility has also equipped us with the tools
for more readable tests with less arrangement.

We can arrange data in the tests much the same way we would if we were experimenting via API or repl without worrying about the actual data store. We can lean more into system methods and the flow tends to be quite readable. If it isn't then it's a problem with our API. We can fix it for our tests by changing the TestApi and mapping into system calls (or other). This can be a great refactor roadmap.

-->

----

## Generating Data

<!-- Only have to worry about data, not persistance, so we can generate it using libraries. 
Often times it's enough to generate a default shape and then modify it to reflect the quality needed for the test.
Again, it's an api problem if it's hard to generate data ready for persistence -->

----

## Property Tests

<!-- Since we can easily turn generated data into state. We can also use property tests.
They generate data and cover boundary cases thoroughly. We can be confident the system 
isn't just coded to our example data, and edge cases are less likely to be missed. It also pushes us to think of the underlying qualities test data should have over just a single case.

Scott Wlaschin has a great series on this for further exploration.
I'll just say I've almost exclusively written property tests the last few years.
They're not harder than example tests with some practice, and they result in less data prep and fewer test cases.
 -->

----

## Clearer Assertions

<!-- 
- Deep equality
- Likeness to line up the shapes for easy deep equality
  - e.g. if you want to compare everything but the id and user Id after copying a recipe
-->

---- 

## Focus, essence, and accident (Review/ summary???)
<!-- Adapter handles Accident so Test Reflect    -->

<!-- We've stripped away incidental qualities from our tests so our test focus on reflecting the expectation.

Incidental qualities like
- data isolation
- system configuration, including dependencies and stores
- filling in data not pertinent to the current test

Most of these incidental concerns are pushed on the adapter, where they often only need implemented once for whole test suite, or can even be reused between suites.

Removaling accident also clarifies the experience of achieving a set of expectations through our system. This exposes deficiencies in experience before we're done developing, allowing us to close holes in the experience both to make our test easier and our development experience easier.

TODO: I haven't talked much about reuse. I want to address the concern that we're adding more code by showing reuse. We reuse within a suite, we reuse system elements for the suite, and we reuse the test suite
 -->

<!-- The tests also don't need to worry about state isolation for integrated testing. That is a store-specific concern and the responsibility of the adapter. Each adapter can use the most convenient method for that store. -->

----

## But...

<!-- answer reservations I think will come up Q&A style -->

Q: What if my system doesn't have seams/injection?
Q: Isn't this adding more code to maintain?
<!-- I want to address the concern that we're adding more code by showing reuse. We reuse within a suite, we reuse system elements for the suite, and we reuse the test suite -->
Q: What if...

???? What next?


## Questions

<!-- not sure anti-fragile is the right framing, since i'm not necessarily focusing on 
tightening the net. Though I could since all my examples will lean toward test API 
which allows us to tighten the net on any of these issues -->



