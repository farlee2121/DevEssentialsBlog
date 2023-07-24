---
date: "2022-08-01T00:00:00Z"
tags: [Clojure.spec, Specification Pattern, Property Testing]
title: "Pitfalls of Spec-based Random Testing"
aliases:
- /draft/spec-test-pitfalls/
---

I've been thinking about constrained values, and how those constraints could be used to [better test our systems](../../posts/2022/2022-06-03-Improved-completeness-automatic-random-testing.md). Mark Seemann was gracious to [think through this with me](https://blog.ploeh.dk/2015/05/07/functional-design-is-intrinsically-testable/#2c0403d1e69d43a496ee04c16bea282c) and point out some interesting conclusions.
<!--more-->

## Background

A bit of background on my motivations. Clojure has a fascinating optional type system called [Spec](https://clojure.org/guides/spec). This system uses the specification pattern to describe types. This includes constrained primitives. For example, integers between 0 and 100 or strings that match a regular expression. 

All expectations on what a type should look like are encoded in these specifications. Spec-ed functions can be automatically tested by using the spec to generate random inputs and verifying the return value fits spec constraints.

My hope was that this kind of testing could help us [measure and promote totality in typical statically typed systems](../../posts/2022/2022-06-03-Improved-completeness-automatic-random-testing.md). Total functions, or functions that always map their input to an advertized output, are much easier to understand.

## Totality can't be experimentally proven
I originally framed this kind of testing to Mark Seemann as [experimental totality testing](https://blog.ploeh.dk/2015/05/07/functional-design-is-intrinsically-testable/#2c0403d1e69d43a496ee04c16bea282c).

However, Mark insightfully observed that such tests cannot prove totality. Most domains (e.g. strings, floats, etc) are effectively infinite. We could never detect adversarial cases targeting a small subset of values. For example, consider a condition that targets the integer N. Random testing has only a 1 in 4,294,967,295 chance of generating a specific int32, so the conditional targeting value N is not likely to be exercised.

At best spec-based random testing can help us double check our work for common violations of totality by exercising edge cases and common input scenarios.

## Property Tests Supersede Spec Tests

Mark also noted that static languages already verify type shapes, and constraints can be enforced with techniques common in domain-driven systems. 

For example, constrained construction can guarantee a phone number matches a certain format
```fsharp
type PhoneNumber = private PhoneNumber of string
module PhoneNumber = 
    let tryCreate str =
      if (Regex(@"\d{3}-\d{4}-\d{4}").IsMatch(str))
      then Some (PhoneNumber str)
      else None 
```

The constraint is enforced centrally and separate from the functions that consume the types. We can rely on these expectations being satisfied even if we can't access the type constraints programmatically to run spec-based random testing.

This means that spec-bases tests in static languages are effectively assertion-free property tests that only detect exceptions or failure to terminate against input known to be compliant. Any property tests that we write against a function would also fail on exception or non-termination. Thus any property test we write is a stronger guarantee of that function's behavior, telling us all the spec-based test would and more.

In short, property tests that we *should* already be writing already cover any verification we could expect from spec tests and make spec tests redundant.
 

## Easier Progress Measures

One of my key goals with spec testing was to objectively measure totality to facilitate transition to more total systems. However, the above conclusions lead to a simpler measure than spec tests.

Software functions can be partial (non-total) by throwing an exception or failing to terminate. Exception sources can be broken down into
- gaps in defensive programming
- exceptions intentionally used to assert expectations

However, we know from our previous conclusions that property tests cover any function faults that a spec test would. Any gaps in defensive programming or non-termination should be covered.

This only leaves exceptions intentionally used to assert expectations. Such exceptions aren't needed in type-driven systems. Therefore, we could roughly measure progress toward a total approach simply by counting the `throw` keywords in a program. This is assuming that we also trust our test suite.


## Conclusion

My initial hopes for spec testing in statically-typed languages are certainly less bright than they were. I think such testing could still be useful, but the cost-benefit is much less appealing. Property tests would be a higher priority for rehabilitating a system, and spec tests lose significant value once those properties are in place.

