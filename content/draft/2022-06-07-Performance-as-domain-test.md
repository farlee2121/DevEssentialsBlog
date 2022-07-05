---
date: "2022-06-07T00:00:00Z"
draft: true
tags:
- Testing
- Performance
- Expecto
- Property Testing
- Behavior-Driven Development
---

*Sometimes performance is an observable domain behavior that belongs in our normal test suite*

I believe tests should generally encode domain requirements over simply exercising what we know a function does. Tests should be [decoupled from implementation details](https://codewithspoon.com/2019/12/stop-corrupting-yourself-test-against-abstractions/) and focus on observable behaviors. 

I've been working on [FsSpec](https://github.com/farlee2121/fsspec), and one of the key problems I want to prove is that I can use constraint trees to create efficient data generators.

This is necessary for data generation to be useful. Many common constraint cases are impractically slow if we simply filter a normal random sampling. For example, small interger ranges or strings matching a phone regular expression would not find a meaningful number of matches in any practical time frame, but are fast if we know what to look for.

Testing the basic filter-only generator was easy. Then I started the optimized case work and immediately ran into the question: how can I test this to make sure my changes worked?

The optimized generators do not effect the character of the values being generated. 
- I might be able to inspect the returned generator type and detect its internal construction, but that's only an incidental implementation detail.
- I could set a timeout and ensure the generator finishes in a timeframe, but there is not inherent time limit the generator should finish in. An un-optimized implementation may also occasionally pass by accident.

Then it hit me, the observable behavior of the optimizations is that they should be faster than the default implementation that simply filters random  values. That's a testable proposition.

It's even easy with Expecto

```fsharp
testCase "Small int range" <| fun () ->
    //...

    Expect.isFasterThan optimized baseline "This constraint form should support generation faster than basic filtering"
```

Expecto uses statistical techniques to be 99.99% sure there is a speed difference, preventing flaky tests.

Note that Expecto will also ensure the baseline and optimized versions return consistent values, ensuring the optimization didn't change observable behavior.

## Alternate Performance Proposition

Cases like my generators actually have two potential performance properties.
The approach previous ensured our standard generator is faster than an unoptimized generator. 

We're also aiming to replace hand-coded generators that programmers would normally have to write themselves. We could also test that our constraint-based generator performs within a certain margin of a hand-constructed generator for the same criteria. Expecto doesn't currently allow users to tweak the comparison tolerance though, making this approach a bit fickle.