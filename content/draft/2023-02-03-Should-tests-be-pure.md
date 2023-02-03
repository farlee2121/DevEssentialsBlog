---
date: 2023-02-03
tags: [testing, tests-as-values]
title: Should tests be Pure?
---

I noticed Scala has several testing libraries that tout pure tests.
Is purity desirable for developer tests?
<!--more-->

<!-- TODO: link expecto and some of the scala libraries -->

## The pitch

Pure testing libraries for Scala include [testz](https://index.scala-lang.org/scalaz/testz), [PureTest](https://index.scala-lang.org/hablapps/puretest), and [Flawless](https://index.scala-lang.org/kubukoz/flawless).

It sounds like the primary highlighted value of these libraries is the lackoff "framework" and inversion of control.
These testing frameworks advertize themselves as strictly libraries. Their testing approach doesn't do any magic to discover and call your tests for you.
Instead it offers a library of testing abstractions that the user can compose into all kinds of testing scenarios themselves. These tests are values that 
the user can operate on themselves and then invoke from a main function. 
For example, testz suggests test parallelism and separate execution of unit vs integration tests as custom execution strategies users can easily implement for themselves.


## Value in Purity?
Does purity offer significant benefits for testing?

I don't think so.

Tests are the top of the call chain. We shouldn't have to worry about tests being called by any other code and thus causing stateful composition errors. Tests should also have independent state from each other. Properly isolated tests shouldn't have to worry about wide-scope state interations. These two factors undermine key understandability concerns that motivate purity. 

Stateful behaviors are commonly critical expectations for our program. For example, one of the most common tasks in an application is saving data to retrieve later. Tests need to be able to address these side-effects. Since tests are the top of the call chain, they must be the composition root that connects dependencies or the "pure-impure sandwich".
That said their are absolutely ways to reuse tests between unit and integration. The [TestApi pattern](../posts/2021-10-08-TestApi-in-FSharp-revised.md) is one of my most revisited topics on this blog. PureTest actually appears to advertise a similar approach using a state monad.


## Value in Values
<!-- comparing with expecto, values is core value prop more than purity or complete exclusion of IoC -->
[Expecto](https://github.com/haf/expecto) is my favorite testing framework to date and my motivation for seeing out similar libraries in Scala.
Scala's pure testing libraries frame their value differently from Expecto, but I think the core value is the same: [tests as values](../posts/2022-05-20-Tests-as-Values.md).

Defining tests as normal programming values that can be created, passed, and operated on like any other value greatly empowers programmers to customize the testing experience. 
It also removes the meta-programming magic.

Expecto delivers this empowerment to customize and operate on tests while still offering some top-level inversion of control. Test values, including test lists, can be annotated and discovered automatically instead of manually invoked by the main function.
I find this quite useful, since it moves test "registration" much closer to the tests themselves. It also creates an experience much more familiar to users of typical testing frameworks.
This seems to be another strike against purity and lack of inversion as the core value.

PureTest raises an interesting point about interpreting the test monads. Most test frameworks, including Expecto, lean on exceptions to assert test failures.
PureTest instead uses a monadic approach and represents failures as values up until the test monad is interpreted.
This could potentially simplify customization of test result behaviors in addition to test declarations and execution customization we enjoy from other value-based approaches.

## Concluding Thoughts

I don't currently see significant value in test purity. The forces that motivate purity are less pertinent to developer tests than code that may be composed in an arbitrarily.
I think the underlying value of these pure testing libraries is [tests as values](../posts/2022-05-20-Tests-as-Values.md), which empowers developers to customize and extend their 
testing experience. In this view, pure tests as monads may provide even more customization compared to other test values. 

Overall, my explorations are still early. I may yet find new value in pure tests.

