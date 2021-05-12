---
layout: post
tags: [Testing, BDD, Gherkin, DDD, TestApi]
---

# Getting started with Gherkin (and Gherkin vs Test API)

I finally got hands-on experience with Gherkin, the primary language for Behavior-driven Development (BDD).Getting started was more of struggle than I anticipated, but working through the details both clarified the value of Gherkin and differentiated it from the [Test Api pattern](../_posts/2020-08-21-Test-Api-InPractice.md) I've been using.

## Struggles

Both [SpecFlow](https://specflow.org/) and [Cucumber](https://cucumber.io/docs/guides/10-minute-tutorial) offer simple getting started tutorials for BDD with gherkin.
However, the simplicity of these tutorial belie the complexity of scaling to system-sized test suites.

The core of the issue is Gherkin's flexibility. Gherkin has less than 10 keywords. It only cares about differentiating scenarios and steps. The meaning of the steps is left completely to the authors of the test suite.

This is very powerful, and very complex. The step sentences effectively form a specialized programming language for interacting with our system. One that is supposed to be human readable.

This forces a lot of decisions
- How should state be managed between steps?
- How specialized should step definitions be?
- What conventions should I use to make steps consistent and predictable?
- How much should I trade reusable steps for readable test definitions?
- How do I parse these sentences to ensure I get the right info without harming the readability?

This slew of questions paralyzed me at first. It felt like every question I answered raised several more. Every new test added unforeseen complexity that to be addressed.
I couldn't get a good grasp of what my final test suite should look like, and mostly had to discover it through gradual refactoring.

## Some answers

Fortunately, Cucumber answered one of the key questions for me. [They assert](https://cucumber.io/docs/guides/anti-patterns) that step definitions should be reusable across test files and organized by domain concept. In effect, their approach creates a client to the system. It's like a rest api or SDK, but the operations are human readable sentences.

This forced my to consider that each step should not need to know about previous steps, but must still be able to access state from previous steps.

Programming languages solved this issue long ago by binding values to names. We generally call these variables.
It turns out that we can require steps to define variables too

```gherkin
Given a customer John
When John buys a doodad costing $10
Then John is charged $10
```

Named entities can be added to a registry available to all steps in a scenario. We can refer to previously created values by name, mutating them across steps or making assertions without needing to encode state in every sentence. In effect, we've created variables.


## Gherkin vs TestAPI

I've use 

Both decouple test definitions from system implementations

- Test Api 
  - Pro: Much easier to get started with
  - Pro: Catered to each sub test
  - Pro: Easy to incorporate property tests
  - Pro: Can be written in the same language as the system (fewer concepts and tools)
    - Can lean on existing system syntax rather than translating all operations to Gherkin
  - Pro: Conventionally smaller scope makes it easier write new test implementations
  - Con: Harder for non-developers to review
  - Con: Test suites will likely have some duplicate code

- Gherkin
  - Pro & Con: Broad spectrum of flexibility
    - Cucumber-recommended (conventional?) approach effectively makes a client to the system
    - Can do, thus test, most anything once setup well
  - Con: Easy to get analysis paralysis from all the flexibility
  - Pro: can be reviewed and potentially even written by non-devs
  - Pro: Broad framework support 
  - Pro: Reuse across languages
    - same spec can be used for implementing test across all languages used in the system
  - Con: Cucumber-recommended approach restricts partial test system reuse


A few of these weaknesses can be mitigated.

For Test Api, specification reviews could be approximated with well named tests in a language like clojure or F# (which allow sentence names). The spec itself is not what is actually executed, thus the guarantees are less strict.

For Gherkin, A strong convention would reduce complexity when writing tests. Such a convention should include cross-step state management, operation phrasing conventions, arranging properties, scope of step definition reuse, grouping of step definitions, domain terminology.

## Clarified Value of Gherkin

The generality of Gherkin is not necessarily a weakness, just a trade off.

[Mark Seemann argues](https://blog.ploeh.dk/2018/07/09/typing-and-testing-problem-23/) that more generic definitions are safer, because having less information means fewer choices that can go wrong.

In the same way, a Gherkin test suite defined as a system client can't conveniently cheat to make test scenarios pass when the system doesn't actually support them. This is a significant advantage for acceptance tests and verifying intent behind communication.

Gherkin is also an excellent way to exercise a Ubiquitous language. In fact, it pretty much forces you to make one. Again, a significant advantage for acceptance tests and clear communication. 


## Conclusion

Both Test Api and Gherkin-based BDD serve different needs, but both are valuable.

Both methods decouple test definitions from implementations, allowing flexible test reuse and focusing tests on behavior rather than the state of a system. 

Test Api is probably better if only the devs will interact with the tests or the team has good communication.

Gherkin is probably better for a full system specification (like with acceptance tests).

Teams with communication challenges should probably choose Gherkin. That could mean big teams, cross-company relationship, or even teams that struggle to get on the same page. It will require a time investment, but a Gherkin spec is one of the most effective ways to address these issues. It is an executable form of one-text mediation, creating one language and document that everyone works from.

Of course, it isn't a strict either/or. Both methods can be used together for a spectrum of communication rigor vs speed.

<!-- // maybe I should have a separate conclusion from when I advice  -->