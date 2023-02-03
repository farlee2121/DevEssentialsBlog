---
date: 2023-02-03
tags: [testing, ]
title: Should tests be Pure?
---

I noticed Scala has several testing libraries that tout pure tests.
Is purity desirable for developer tests?
<!--more-->

<!-- TODO: link expecto and some of the scala libraries -->
Context: Been learning scala. Looking for an expecto equivalent. Found several libraries emphasizing pure tests

Raises the question: should tests be pure?

I think my answer is no.
I think the primary value of these libraries, and the one they seem to highlight most in descriptions is the lackoff "framework" and inversion of control.
These testing frameworks advertize themselves as pure libraries. Their testing approach doesn't do any magic to discover and call your tests for you.
Instead it offers a library of testing abstractions that the user can compose into all kinds of testing scenarios themselves, then invoke their own tests 
from a main function.

<!-- comparing with expecto, values is core value prop more than purity or complete exclusion of IoC -->
This framing is different from Expecto, but I think the core value is the same: tests as values. Defining tests as normal programming values that can be created,
passed, and operated on like any other value greatly empowers programmers to customize the testing experience. It also removes the meta-programming magic.

Expecto, however, does offer some top-level inversion of control where test values, including test lists, can be annotated and discovered automatically instead of 
manually invoked by the main function. I find this quite useful, since it moves test "registration" much closer to the tests themselves. It also creates an experience much more familiar to 
users of typical testing frameworks.


But what about purity? Does purity offer significant benefits for testing?

I don't think so.
<!-- - Tests are the top of the call chain and should have independent state from each other. Thus, we don't have to worry about test state causing confusing effects from being composed into new flows and we shouldn't have to worry about wide-scope state interations. This undermines some the key understandability concerns that motivate purity. -->
- Tests are the top of the call chain. We shouldn't have to worry about tests being called by any other code and thus causing stateful composition errors. Tests should also have independent state from each other. Properly isolated tests shouldn't have to worry about wide-scope state interations. These two factors undermine key understandability concerns that motivate purity. 
- Also, stateful behaviors are commonly critical expectations for our program. For example, one of the most common tasks in an application is saving data to retrieve later. Tests need to be able to address these side-effects. Since tests are the top of the call chain, they must be the composition root that connects dependencies or the "pure-impure sandwich".
  - That said their are absolutely ways to reuse tests between unit and integration. [The TestApi pattern](./../posts/2021-10-08-TestApi-in-FSharp-revised.md) is one of my most revisited topics on this blog.