---
date: "2021-06-04T00:00:00Z"
tags:
- Testing
- BDD
- Gherkin
- DDD
- TestApi
title: Getting started with Gherkin 
---

I finally got hands-on experience with Gherkin, the common language for Behavior-driven Development (BDD). Getting started was more of a struggle than I anticipated. Here are solutions to some of my main hangups.

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

This slew of questions paralyzed me at first. It felt like every question I answered raised several more. Every new test added unforeseen complexity. I couldn't get a good grasp of what my final test suite should look like, and mostly had to discover it through gradual refactoring.

## Step Definition Scope: System Wide

Fortunately, Cucumber answered one of the key questions for me. [They assert](https://cucumber.io/docs/guides/anti-patterns) that step definitions should be reusable across test files and organized by domain concept.

In effect, their approach creates a client to the system. It's like a rest api or SDK, but the operations are human readable sentences.

## Managing State: Rediscovering Variables

Cucumber's recommendation for global scope forced me to consider how each step should not know about previous steps, but must still be able to access state from previous steps.

Programming languages solved this issue long ago by binding values to names. We generally call these variables.
It turns out that we can require steps to define variables too

```gherkin
Given a customer John
When John buys a doodad costing $10
Then John is charged $10
```

Named entities can be added to a registry available to all steps in a scenario. We can refer to previously created values by name, mutating them across steps or making assertions without needing to encode state in every sentence. In effect, we've created variables.

## Conventions and Ubiquitous Language

One of the primary benefits of Gherkin is that it can be understood by all contributors, developers and non-developers. This means that conventions for step definitions should cater to a shared, but precise, language.

This shared language is exactly the job of a Ubiquitous Language from Domain Driven Design (DDD). 

The DDD community has created numerous techniques, like [Event Storming](https://www.eventstorming.com/) for discovering Ubiquitous Language. This language should contain names for data types, high-level operations, and even system states.

There will still be some conventions, like setting many properties on a type, that don't fall in this language.

## Conclusion

Gherkin's flexibility can be daunting, but some experience and conventions should lighten that load. Over time the investment needed to define steps should go down, the ease of writing tests should go up.

Most importantly, team communication should improve as the spec refines a shared language and documents system behavior.

