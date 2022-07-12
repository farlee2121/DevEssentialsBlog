---
date: "2021-06-11T00:00:00Z"
tags: [Testing, BDD, Gherkin, DDD, TestApi]
title: Gherkin vs Test API
aliases:
- /2021/06/11/gherkin-vs-testapi
---

I've use Test API for behavior testing for more than a year now, and to great effect. I expected [my recent experience with Gherkin](./2021-06-04-Learning-Gherkin.md) to be similar, but found the two BDD techniques to be surprisingly different. Here I'll contrast the two methods to highlight their distinct value.
<!--more-->

## Common Ground

Both Test Api and Gherkin are behavior-driven testing techniques. This means they decouple test definitions from system implementations so the test can focus fully on behavior.

This has significant advantages over traditional unit or integration tests. 
- tests are clearer
- tests encode expectations, not the current state of the system
- test don't change when the system changes
  - this improves safety of refactoring
- tests can be reused for different implementations
  -  For example, tests could be run as isolated unit tests or any number of integrated system configurations

## Pros/Cons

While both BDD techniques, the two approaches have some significant trade offs

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
    - Cucumber-recommended (conventional?) approach effectively makes a client to the system in natural language
    - Can test most anything once it implements a good portion of the api
  - Con: Easy to get analysis paralysis from all the flexibility
  - Pro: Can be reviewed and potentially even written by non-devs
  - Pro: Broad framework support 
  - Pro: Reusable across languages
    - same spec can be used for implementing test across all languages used in the system
  - Con: Cucumber-recommended approach restricts partial test system reuse


A few of these weaknesses can be mitigated.

For Test Api, specification reviews could be approximated with well named tests in a language like Clojure or F# (which allow sentence names). The test names are not executed like the descriptions in gherkin are. Thus guarantees are less strict.

For Gherkin, A strong convention would reduce complexity when writing tests. Such a convention should include cross-step state management, operation phrasing conventions, arranging properties, scope of step definition reuse, grouping of step definitions, and domain terminology.

## Clarified Value of Gherkin

The generality of Gherkin is not necessarily a weakness, just a trade off.

[Mark Seemann argues](https://blog.ploeh.dk/2018/07/09/typing-and-testing-problem-23/) that more generic definitions are safer, because having less information means fewer choices that can go wrong.

In the same way, a Gherkin test suite defined as a system client can't conveniently cheat to make test scenarios pass when the system doesn't actually support them. This is a significant advantage for acceptance tests and verifying intent behind communication.

Gherkin is also an excellent way to exercise a Ubiquitous language. In fact, it pretty much forces a team to make one. Again, a significant advantage for acceptance tests and clear communication. 

Gherkin is a powerful tool for teams with communication challenges. That could mean big teams, cross-company relationships, or just teams that struggle to get on the same page. It will require a time investment, but a Gherkin spec is one of the most effective ways to address these issues. It is an executable form of [one-text mediation](https://www.beyondintractability.org/essay/single-text-negotiation), creating one language and document that everyone works from.


## Clarified value of Test Api

Unlike Gherkin specs, Test Api is not concerned with creating one shared language. Nor does it require the extra layer of natural language syntax. Tests can be written in the same language as the system. This limits syntactic and convention decisions while offering the full power of the language to author complex behavior specification. 

For example, I've written generic filtering tests for several systems. The expected behavior is the same for all types, using the same test suite for all filterables saves time and guarantees consistent behavior.

While Gherkin is theoretically flexible to most any testing approach, the extra expectations add complexity and practically limit certain categories of test reuse that are possible with Test Api.


## Conclusion

Test Api and Gherkin-based BDD serve different needs, but both are valuable.
- Test Api is probably better if only the devs will interact with a set of tests or the team has solid overall communication.
- Gherkin is probably better for a full system specification (like with acceptance tests) or teams with harder communication challenges.

Of course, it isn't a strict either/or. Both methods can be used together for a spectrum of communication rigor vs speed.