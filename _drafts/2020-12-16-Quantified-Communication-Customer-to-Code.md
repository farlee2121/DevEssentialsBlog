---
layout: post
tags: [Testing, BDD, Example-Based testing, Generative testing, Type-Driven Development]
---

 <!-- # Complementary Roles of Example-based and Generative Testing -->
# Quantifying Communication From Customer to Code

learning about type-driven dev, property-based testing. it highlighted gaps in my previous testing. Led to better understanding of where things can go wrong and the toolset for addressing each type of communication error between customers and code.

Places of error
- Customer to devs: Different understandings of the problem being solved
- Devs to code: Code doesn't accurately reflect the mental model
- Dev to dev (code to code): Mismatch in expecations between parts of the system
- Customer to code: Bad inputs and poorly enforced rules

TDD is typical. Should be (but often isn't) a behavior-based encoding of the requirements. Solves dev to code communication issues. Should help with customer-to-code and code-to-code by better enforcing rules. Can even share rules between unit and itegration if you use [TestApi-style tests](). Still, the suite is only as good as examples provided. It's easy to miss cases since you have to opt-in to every expectation.
- In the TestApi mindset, you're not concerned with the internals. You only care about the consistency between a set of operations. This could also be between the input and output of one operation.

- can add property tests to fill example-based gaps
- explain properties a bit (like expecting to read any record we write, super common test type) (link blog post)

Mutation testing buffs that by measuring the quality of your test suite

TDT directly tackles code-to-code and customer-to-code that TDD addresses by proxy. Correctness -> internal consistency & enforcement of boundary
- link domain modelling made functional
- sadly, can't be effectively applied to just any system. It requires a design that enforces domain constraints in its type system. I suppose you could approximate it by running validations at your boundaries, but it will be much harder to implement tests. 

At this point we can be confident that the code matches our mental modal, but not that that our model matches the customer's.

Acceptance testing






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