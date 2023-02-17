---
marp: true
theme: gaia
class:
# - invert
---


<!-- Q: I'm not doing a great job piquing curiosity. How can I sprinkle more curiosity?
- Ask them what they expect their tests to do for them?

Q: The generic -> specific idea blew Dylan's mind. Would it make sense to include here?
-->

Focusing on developer tests. There are all kinds of tests that different roles might write for a comprehensive quality plan, we're focusing just on tests developers typically write.

----

## Questions

- What value do you expect from your tests?
- What problems do you experience with your tests?
- How do you choose what tests to write?

motivating questions
- How can we write tests that are easy to read, write, and maintain?
- How do we write tests that consistently reflect the actual quality of the system?
  - How can we move quickly and trust our system works?
  - How do we avoid odd-hours and stressful production incidents
- How do we minimize testing effort over time and change in a system?

----

## How those qualities go wrong

- Flakey tests or "test that cried wolf"
  - non-determinism. Especially test coupling via state
- Can't survive / Fragile test problem
- holes in suite
  - unclear expectations
  - the test are hard to write, so people don't
  - differences between test and deployed environment

----

## Good qualities

- Stable
- Representative of system quality
- Easy to write
- ...

----

## Value delivered

To deal with these issues. Let's consider what tests really do for us.

During initial development, they're a double-check. We express what we want as a test then we make the system do it. We can be more confident that we coded what we expected to.

long-term: Confidence under change. assurance that the system still meets the same expectations before and after we change it
- but, if we have to change tests with the code, then we don't have that confidence. 
- results in fewer bugs, faster releases, less worry

----

## Nature of tests

Describe external behavioral expectations. So we can verify consistency over time.

Don't really care about how it behaves internally.




----

## Case Selection

Base on externally expected behaviors.
Acceptance criteria (which are a great practice if your company isn't currently using them) should end up as tests. 
- lower components in the system may not have AC, but you can write AC from what you expect as the higher component as if you were going to ask another team to meet those behaviors

Thorns around the gold for edge cases, degenerate, default values

----
## Domain Modeling

Tests capture domain information not easily captured elsewhere. They capture
the individual *user* motivations that led a code to evolve a certain way.

----

## Tighten the Net


----

<!-- _class: lead invert -->
# Solving Tests that Can't Survive


----

## Anti-corruption layers


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

<!-- _class: lead invert -->
# Solving Flake and State Coupling

----

## Decoupling Data
<!-- This one requires some system design -->

<!-- not sure anti-fragile is the right framing, since i'm not necessarily focusing on 
tightening the net. Though I could since all my examples will lean toward test API 
which allows us to tighten the net on any of these issues -->

<!-- OPTION: I could somewhere talk about Gherkin or other naming schemes non-devs can verify. Not true acceptance tests, but can help close the loop without additional effort -->