---
date: "2022-06-05T00:00:00Z"
draft: true
tags:
- Clojure
- Specification Pattern
- Property Testing
---

## Spec Test Pitfalls in Static Languages

I've been thinking about constrained values, and how those constraints could be used to [better test our systems](../post/2022-06-03-Improved-completeness-automatic-random-testing.md). Mark Seemann was gracious to [think through this with me](https://blog.ploeh.dk/2015/05/07/functional-design-is-intrinsically-testable/#2c0403d1e69d43a496ee04c16bea282c) and point out some interesting conclusions.

<!-- TODO: Consider renaming this post -->

## Background

A bit of background on my motivations. Clojure has a fascinating optional type system called [Spec](https://clojure.org/guides/spec). This system uses the specification pattern to describe types. This includes constrained primitives i.e. integers between 0 and 100 or strings that match a regular expression. 

All expectations on what a type should look like are encoded in these specifications. This allows Clojure to automatically generate data and automatically test that spec-ed functions return valid data for each random value.

Total functions, or functions that always map their input to an advertized output, are much easier to understand. My hope was that this kind of testing could help us [measure and promote totality in typical statically typed systems](../post/2022-06-03-Improved-completeness-automatic-random-testing.md).

## Totality can't be experimentally proven
I originally framed this kind of testing to Mark as [experimental totality testing](../post/2022-06-03-Improved-completeness-automatic-random-testing.md).

However, Mark made the insightfull observation that such tests cannot prove totality. Most domains (e.g. strings, floats, etc) are effectively infinite. We could never detect adversarial cases targeting a small subset of values. At best this approach can help us double check our work for common violations of totality by exercising edge cases and common input scenarios.

## Property Tests Supersede Spec Tests

Mark also noticed that static languages already verify type shapes, and constraints can be enforced with techniques common in domain-driven systems. The type constraints aren't available programmatically, but they are enforced separate from the functions that consume the types.

This means that spec-bases tests in static languages are effectively assertion-free property tests that only detect exceptions or failure to terminate. Any property tests that we write against a function provide a stronger guarantee of that function's behavior.

In effect, property tests that we *should* already be writing already cover any verification we could expect from spec tests.
 

## Easier Progress Measures

One of my key goals with spec testing was to objectively measure totality to facilitate transition to more total systems. However, the above conclusions lead to a simpler measure than spec tests.

Software functions can be partial (non-total) by throwing an exception or failing to terminate. Exception sources can be broken down into
- gaps in defensive programming
- exceptions intentionally used to assert expectations

However, we know from our previous conclusions that property tests cover any function faults that a spec test would. Any gaps in defensive programming or non-termination should be covered.

This only leaves exceptions intentionally used to assert expectations. Such exceptions aren't needed in type-driven systems. Therefore, we could roughly measure progress toward totality simply by counting the `throw` keywords in a program. This is assuming that we also trust our test suite.


## Conclusion

My initial hopes for spec testing in statically-typed languages are certainly less bright than they were. I think there are still uses for such testing, but cost-benefit is certainly much less appealing. Property tests would be a higher priority for rehabilitating a system, and spec tests lose significant value once those properties are in place.

