---
date: "2021-03-19T00:00:00Z"
tags: [Testing, BDD, Example-Based testing, Generative testing, Type-Driven Development]
title: Quantifying Communication From Customer to Code
---

Learning functional programming has included significant quality time with Type-Driven Development and property-based testing. These paradigms highlighted a gap in my previous testing techniques. It led me to better classify types of communication errors between customers and code, and the toolset for addressing each type.
<!--more-->

There are three key players that can miscommunicate when making a business system: customers (and their reps), developers, and the code. Miscommunications can happen between each group.
- Customer to devs: Different understandings of the problem being solved
- Devs to code: Code doesn't accurately reflect the mental model
- Dev to dev (code to code): A mismatch in expectations between parts of the system
- Customer to code: Bad inputs and poorly enforced rules

Let's dive into common testing techniques to see how we can cover each of these possible miscommunications.

## Unit/BDD Testing
My testing toolbox, like most, primarily focuses on unit tests and TDD. Unit tests should be (but often aren't) a behavior-based encoding of the requirements. They [should not be coupled to the details of the code](https://codewithspoon.com/2019/12/stop-corrupting-yourself-test-against-abstractions/).

This behavior-based testing directly addresses dev-to-code communication issues. It encodes the developer expectations in a way both the dev and the code understand. This spec should also help customer-to-code and code-to-code consistency by better enforcing expectations.

Code-to-code guarantees can improved by reusing [TestApi-style tests](https://codewithspoon.com/2019/12/stop-corrupting-yourself-test-against-abstractions/) as both unit and integration tests.

### Property Tests
The traditional idea of unit tests is example-based, where tests use a fixed set of data. This is great for boundary cases and clear specific scenarios to be satisfied.

However, code often accepts a wide range of values and we expect it to gracefully handle all of them. Testing all values is often not possible, and it's certainly not practical to write a new test for every expected value.  

Many value-based cases follow a common underlying requirement. This is where property-based testing shines. Property tests define qualities that should be true for a range of arguments, then automatically test the quality with many generated possibilities.

For example, consider consistency between like operations
- the input of `WriteAll` equals the output of `ReadAll`
- `listEntities` always includes what I saved with `createEntity`
- `a + b = b + a`

I recommend [Scott Wlaschin's series](https://fsharpforfunandprofit.com/posts/property-based-testing/) for further exploration.

Property tests satisfy a need for clean definition of behavior across data. Still, I lump property-based testing in with TDD because it addresses the same underlying specification of requirements to verify dev-to-code communication.

## Mutation Testing
The requirement suite is only as good as behavior specified. It's easy to miss cases since every expectation is opt-in. A passing test suite with one test is obviously not useful. But the completeness of a larger test suite is not so clear cut.

Mutation testing fills this need. It completes the dev-to-code communication loop by measuring the quality of your test suite. Specifically, it measures completeness of the requirements by ensuring the test suite catches changes in the code base.

## Acceptance Testing

So far we've guaranteed that the code aligns with what the developer intended to code. However, that doesn't mean the model is right. The developer may have misunderstood the customer.

The standard solution to this problem is acceptance tests.

Acceptance testing is when the customer or their representative writes behavior-driven tests much like developers do. This may sound like duplicated effort. Actually, the best case scenario is that the customer's test are the same as the developer tests. The whole point is to make sure that dev and customer share an understanding of what the code is supposed to do.

An internal rep can write the tests and have customers review them if the customer rep is unwilling to write them themselves. This establishes a baseline for the customer to verify their purchase and pushes responsibility on the customer if they choose not to engage.

Mutation tests can also be used to measure completeness of the acceptance tests. 

## Adding Type-driven Testing

The previous techniques make a pretty high bar for quality. They quantitatively  measure alignment from customers to devs, from devs to code, and the completeness of those guarantees.

However, there is one type of communication not explicitly addressed, code-to-code. Mutation testing certainly helps our suites cover this concern decently, but Type-Driven testing tackles the issue directly.

Type-Driven Development focuses on representing domain constraints with types all the way down to the individual values. For example, an order quantity can't be negative or zero, so create a type that forces order numbers to be a positive integer. Scott Wlaschin [covers this topic very well](https://www.youtube.com/watch?v=Up7LcbGZFuo).

Representing the domain so thoroughly in our types allows for a new type of testing. The basic idea is that 
- for all valid input, we get valid output
- for all invalid input, we can a corresponding error

This doesn't replace example-based testing. We're not guaranteeing that our system produces the output we expect for a given input. Rather, we're pushing our system to verify correctness, completeness, and internal consistency. We're making sure that our system doesn't have any hidden surprises. That meeting the advertised input contract will always return the advertized result type. There are no implicit cases to worry about or defend against.

In effect, this is Design by Contract as a test suite. A well defined type constraint system can even generate expected values for testing (e.g. [clojure.spec](https://clojure.org/about/spec), [Specification pattern](https://www.martinfowler.com/apsupp/spec.pdf)).

Sadly, this approach can't be effectively applied to just any system. Stronger type constraints make stronger test guarantees. Conversely, weak type constraints make for weak test guarantees. I suppose you could approximate it by running validations on weaker types at your boundaries, but it will be much harder to implement tests. 


## Summary

Type-Driven Development effectively measures consistency of expectations between pieces of code. This fills a gap left by TDD, mutation testing, and acceptance testing to raise quality guarantees to a new level. 

To review
- TDD/BDD: Ensures the code and developer align
- Acceptance Testing: Ensures the customer and developer align
- Mutation Testing: Ensures the measures of alignment are without gaps (or we at least how thorough they are)
- Type-driven testing: Ensures the code is consistent and correct. The tested expectations are clearly communicated in the code

All these techniques together make for a high-bar of quality that is 
- unambiguous
- quantitative
- automatically evaluated
- repeatable across projects
- detailed: highlight what expectation failed in what stage of communication
- incremental (can add or update expectations independently, improving coverage over time)
- reviewable




<!-- Also need system tests that ensure correct configuration-->

<!-- Make sure I understand clojure tests. I thought it would auto-create generators based on a spec, but i'm not sure anymore -->