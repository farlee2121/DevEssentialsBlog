---
layout: post
tags: [Testing, BDD, Example-Based testing, Generative testing, Type-Driven Development]
---

 <!-- # Complementary Roles of Example-based and Generative Testing -->
# Quantifying Communication From Customer to Code

Learning funcitonal programming has included significant quality time with Type-Driven Development and property-based testing. These paradigms highlighted a gap in my previous testing techniques. It led me to better classify types of communication errors between customers and code, and the toolset for addressing each type.

There are three key players that can miscommunicate when making a business system: customers (and their reps), developers, and the code. Miss communications can happen between each group.
- Customer to devs: Different understandings of the problem being solved
- Devs to code: Code doesn't accurately reflect the mental model
- Dev to dev (code to code): A mismatch in expecations between parts of the system
- Customer to code: Bad inputs and poorly enforced rules

## Previous tool chain

### Unit/BDD Testing
My testing toolbox, like most, primarily focuses on unit tests and TDD. Unit tests should be (but often aren't) a behavior-based encoding of the requirements. They [should not be coupled to the details of the code](https://codewithspoon.com/2019/12/stop-corrupting-yourself-test-against-abstractions/).

This behavior-based testing directly addresses dev-to-code communication issues. It causes the developer to encode their expectations in a way both they and the code understand. This spec should help with customer-to-code and code-to-code by better enforcing rules. Code-to-code guarantees can be even better addressed by using [TestApi-style tests](https://codewithspoon.com/2019/12/stop-corrupting-yourself-test-against-abstractions/) as both unit and integration tests.

Defining every example is arduous, and many of examples follow a common underlying requirement. This is where property-based tests shine. They define qualities that should be true for any arguments, then automatically test the quality with many generated possibilities.

This works with well with TestApi. Common properties would be consistency between like operations. For example: the input of `WriteAll` equals the output of `ReadAll`, or `listEntities` always includes what I saved with `createEntity`. I recommend [Scott Wlaschin's series](https://fsharpforfunandprofit.com/posts/property-based-testing/) for further exploration.

Still, I lump property-based testing in with TDD because it addresses the same underlying dev-to-code communication by translating requirements to code.

### Mutation Testing
The requirement suite is only as good as examples provided. It's easy to miss cases since you have to opt-in to every expectation. Mutation testing completes the dev-to-code communication loop by measuring the quality of your test suite. It measures completeness of the requirements by ensuring the test suite catches changes in the code base.

### Acceptance Testing

So far we've guaranteed that the code aligns with what the developer intended to code. However, the doesn't mean the model is right. The developer may have misunderstood the customer.

Acceptance testing is when the customer or their representative writes behavior-driven tests much like developers do. This may sound like duplicated effort. Actually, the best case scenario is that the customer's test are the same as the developer tests. The whole point of these tests are to make sure that dev and customer share an understanding of what the code is supposed to be.

An internal rep can write the tests and have customers review them if the customer rep is unwilling to write them themselves. This establishes a baseline for the customer to verify their purchase and pushes responsiblity on them they don't engage.

Mutation tests can also be used here to measure completeness of the acceptance tests. 

## Adding Type-driven Testing

The previous techniques make a pretty high bar for quality. They quantitatively alignment from customers to devs, and from devs to code, and the completeness of those guarantees.

However, there is one type of communication not explicitly addressed, code-to-code. Mutation testing certainly helps our suites cover this concern pretty decently, but Type-Driven testing tackles the issue directly.

Type-Driven Development focuses on representing domain constraints with types all the way down to the individual values. For example, an order quantity can't be negative or zero, so create a type that forces order numbers to be a positive integer. Scott Wlaschin [covers this topic very well](https://www.youtube.com/watch?v=Up7LcbGZFuo).

Representing the domain so thoroughly in our types allows for a new type of testing. The basic idea is that `valid input -> valid output` for all input. This doesn't replace example-based testing. We're not guaranteeing that our system produces the output we expect for a given input. Rather, we're pushing our system to verify correctness, completeness, and internal consistency. We're making sure that our system doesn't have any hidden surprises. That meeting the advertised requirements of inputs will always return the advertized result type. There are no implicit cases to worry about or defend against.

Sadly, this approach can't be effectively applied to just any system. Stronger type constraints make stronger test guarantees. Conversely, weak type constraints make for weak test guarantees. I suppose you could approximate it by running validations on weaker types at your boundaries, but it will be much harder to implement tests. 


## Summary

Type-Driven Development effectively measures consistency of expections between pieces of code. This fills a gap left by TDD, mutation testing, and acceptance testing to raise quality guarantees to a new level. 

To review
- TDD/BDD: The code and developer align
- Acceptance Testing: the customer and developer align
- Mutation Testing: The measures of alignment are without gaps (or we at least how thorough they are)
- Type-driven testing: the code is consistent and correct. The tested expectations are clearly communicated in the code

All these techniques together make for a high-bar of quality that is 
- unambigious
- quantitative
- automatically evaluated
- repeatable across projects
- detailed: highlight what expectation failed in what stage of communication
- incremental (can add or update expectations independently, improving coverage over time)
- reviewable







- Exaplain typed-driven dev and property tests
- helps get rid of nasty mock-heavy tests (well, that's also part of good design and this gets rid of the boring tests and adds much better coverage)
- This kind of testing is amazing for verifing correctness of the system. It ensures the is consistent with the model it exposes. In other words Valid input -> valid output and BadInput -> Handled errors
  - It doesn't make sure that your domain model is correct. It only verifies your model as much as your type constraints match your domain.
  - Doesn't just test happy paths, but also that illegal states are handled.
- This is where example-based tests (TDD, BDD) come in. They (should) guage the quality of your model against the known requirements. This means they also encode the dev team's current understanding of the requirements, making for great documentation.


Could also add mutation testing
- tests the quality of your tests, specifically completeness, by adding bugs and seeing if they get caught. How likely is your test suite to recognize deviation from the spec
- Not sure how well the current tooling supports F#


- This adds up to a pretty high measure of quality
  - System is consistent (Type-driven testing) 
  - The system matches requirements (TDD/BDD)
  - The test are complete (Mutation Tests)

In other words, we can be confident our system embodies the model we intended it to. 
We still don't know if our model is right, and we can't know that on our own. The measure of a "right model" how well it meets the user's need. For that we can turn to acceptance testing, where the customer or their representative writes example based tests to encode their needs. This may seem like a duplication of the unit test suite. In fact, hopefully it is. The whole point here is to find differences in understanding between user reps and devs. If the customer won't write them, an internal customer rep can write them and have the customer review. At that point it's on the customer if they refuse to verify the purchase.

- System is consistent (Type-driven testing) 
- The system matches requirements (TDD/BDD)
- The test are complete (Mutation Tests)
- The customer needs match and developer understanding (Acceptance Testing)

These four tools span each possible stage of communication from customer to code with measures that are
- unambigious
- quantitative
- automatically evaluated
- repeatable across projects
- detailed: highlight what expectation failed in what stage of communication
- incremental (can add or update expectations independently, improving coverage over time)
- reviewable

Live systems can still have errors from misconfiguration or deployment, but that is a different ballgame with error sources. Though, many tests (expecially acceptance tests) can be used for both.

<!-- Also need system tests that ensure correct configuration-->

<!-- Make sure I understand clojure tests. I thought it would auto-create generators based on a spec, but i'm not sure anymore -->