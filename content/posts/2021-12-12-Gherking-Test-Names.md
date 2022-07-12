---
date: "2021-12-12T00:00:00Z"
tags: [Testing, BDD, Behavior Driven Development, TestApi]
title: Gherkin-named Tests as Low-bar Acceptance Tests
---

I [previously compared the tradeoffs](../posts/2021-06-11-Gherkin-vs-TestApi.md) of Gherkin-based and TestApi-based behavior tests. Recently, I realized there is a simple in-between solution: TestApi with Gherkin-style names.
<!--more-->

The main advantage of Gherkin tests is that they can be understood, and possibly even written by customer representatives. A well-designed gherkin suite also defines clauses generally such that it's hard to cheat when wiring the tests to the system. This boosts trusts that the tests verify what they're supposed to.

The main advantage of TestApi (over Gherkin) is that it is much easier for developers to create rapidly and with low formality. However, it's harder for non-developers to review tests. They are more [developer tests than acceptance tests](../posts/2021-08-30-Test-Types-and-Lifecycle-Phases.md).

This is where the middle solution comes in. TestApi tests can be named with Gherkin-style names. 

```fsharp
let testList = 
[
    test "Given thing B When I save B Then B shows in the thing list" {
        //....
    }
    test "Given thing B When I delete B Then B does not show in the thing list" {
        //....
    }
]
```

Gherkin pushes an understandable and descriptive naming standard. Stakeholders of all walks can review test names to verify completeness and correctness of expectations. 

Tests aren't guaranteed to match the Gherkin descriptions, but this technique allows developer tests to reap some benefit of acceptance tests without significant change in effort. It is a great fit for small and low-formality teams. It's also a big step up for teams with no acceptance testing.

