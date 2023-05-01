---
date: 2023-04-27
tags: [testing, tests-as-values]
title: Should tests be Pure?
---

I noticed Scala has several testing libraries that tout functionally pure tests.
Is purity desirable for developer tests?
<!--more-->

UPDATE 2023-05-01: Added some clarification about what pure tests mean

## Defining pure tests 

First some context. [Pure functions](https://en.wikipedia.org/wiki/Pure_function) are functions that always return the same result for a given input. They also have no side-effects. That is, they don't cause any state changes and their only outcome is the value they return.

These pure test libraries apply the idea of pure functions to tests. The testing library's operations don't modify any global state, they simply return values.

## The pitch

Pure testing libraries for Scala include [testz](https://index.scala-lang.org/scalaz/testz), [PureTest](https://index.scala-lang.org/hablapps/puretest), and [Flawless](https://index.scala-lang.org/kubukoz/flawless).

It sounds like the primary highlighted value of these libraries is the lack of "framework" and inversion of control.
These testing frameworks advertize themselves as strict libraries, not frameworks. Their testing approach doesn't do any magic to discover and call your tests for you.
Instead it offers a library of testing abstractions that the user can compose into all kinds of testing scenarios themselves. 

Let's contrast this with more typical testing libraries, like [NUnit](https://nunit.org/) or [XUnit](https://xunit.net/). Many common testing libraries define tests as methods with some special annotation that marks the method as a test.

```cs
[Fact]
public void IAmATest(){
    // test code here
}
```

This requires some meta-programming to crawl the code and discover tests.

The pure test libraries advertise that they don't require meta-programming to disover and invoke your tests.
The test library is pure, so its operations don't depend on or change any global state. They only take inputs and deterministically return a value.
In this case, the value represents a test or list of tests that the user could then directly execute to obtain a list of test results.

Part of the claimed value from this purity is easier customization by the end users of the test library.
For example, testz notes that users can easily implement custom execution strategies, including test parallelism or filtered test execution.

In addition to the test library functions being pure, some of the libraries also seem to advocate for the user-written test code to be pure.

## Value in Purity?

Do test library methods benefit from purity?

I think these libraries deliver value, and purity is related, but purity isn't the root cause. More on this later.

Does purity offer significant benefits for the user-written test code?

I don't think so.

Tests are the top of the call chain. We shouldn't have to worry about tests being called by any other code and thus causing stateful composition errors. Tests should also have independent state from each other. Properly isolated tests shouldn't have to worry about wide-scope state interations. These two factors undermine key concerns that motivate purity and the understandability benefits from purity.

In another strike against test purity, stateful behaviors are often critical expectations for our program. For example, one of the most common tasks in an application is saving data to retrieve later. Tests need to be able to verify these side-effects. Since tests are the top of the call chain, they must be the composition root that connects dependencies (or the "pure-impure sandwich" in a functional core design).

That said, test composition and resuse can be very useful. The [TestApi pattern](../posts/2021-10-08-TestApi-in-FSharp-revised.md) is one of my most revisited topics on this blog. PureTest appears to advertise a similar approach to TestAPI, but using a state monad. They also point out some ways the pure monadic approach facilitates composition and reuse. More on this in the next section.

## Value in Values

[Expecto](https://github.com/haf/expecto) is my favorite testing framework to date and my motivation for seeking out similar libraries in Scala.
Scala's pure testing libraries frame their value differently from Expecto, but I think the core value is the same: [tests as values](../posts/2022-05-20-Tests-as-Values.md).

Defining tests as normal programming values that can be created, passed, and operated on like any other value greatly empowers programmers to customize the testing experience. 
It also removes the meta-programming magic. I demonstrate some of these customization in [a previous post](../posts/2022-05-20-Tests-as-Values.md).

Expecto delivers this empowerment to customize and operate on tests while still offering some optional top-level inversion of control. Test values, including test lists, can be annotated and discovered automatically instead of manually executed (e.g. from the program's main function).
I find this quite useful, since it moves test "registration" much closer to the tests themselves. It also creates an experience much more familiar to users of typical testing frameworks.
This seems to be another strike against purity and lack of inversion as the core value propositions for a test library.

PureTest, however, raises an interesting point about interpreting the test monads. Most test frameworks, including Expecto, lean on exceptions to assert test failures.
PureTest instead uses a monadic approach and represents failures as values up until the test monad is interpreted.
This could potentially simplify customization of test *result* behaviors, much like the test declaration and execution customization I already enjoy from other value-based test libraries (mainly Expecto).

## Concluding Thoughts

I don't currently see significant value in test purity. The forces that motivate purity are less pertinent to developer tests than code that may be composed by arbitrary consumers (i.e. domain rules).
I think the underlying value of these pure testing libraries is [tests as values](../posts/2022-05-20-Tests-as-Values.md), which empowers developers to customize and extend their 
testing experience. However, PureTest suggest that pure tests, via monads, may provide even more customization compared to other tests-as-values approaches. 

Overall, my explorations are still early. I may yet find new value in pure tests.

