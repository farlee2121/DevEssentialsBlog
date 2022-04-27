---
layout: post
tags: [Random Testing, Completeness]
---

# Automated Random Testing and Improved Completeness

Clojure has a unique type system based on specifications: [Clojure.spec](https://clojure.org/guides/spec). The type system includes constraints, and it can automatically test any spec-ed function to ensure valid inputs always produce valid outputs. I think this kind of testing can be brought to statically typed languages to improve completeness testing.

## Mutation Testing

Measuring quality of a test suite can be a hard problem. [Code coverage](https://en.wikipedia.org/wiki/Code_coverage) is a common approach, but coverage only measures what lines are executed. Coverage does not necessarily indicate that those lines are tested well or how likely bugs are to slip though the tests.

The solution to this is [mutation testing](https://en.wikipedia.org/wiki/Mutation_testing). Mutation tests inject sematic edits to a code base and run a test suite. The test suite can then record how many injected errors slip past the test suite. This reliably and consistently measures how well an application's logic is covered by a test suite.

However, mutation tests have a gap. They can only test for errors made by semantic code changes. For example, flipping boolean operators or changing iteration bounds.
They cannot test for expectations that are not represented in code. In particular, they cannot test many expectations that may be hidden in data.

## Type-Driven Design and Total Functions

Scott Wlaschin, in Domain Modeling Made Functional, introduces an idea called total functions. An idea that functions should clearly communicate all of their expectations in their signatures. This means potential failures are not exceptions, but instead constructs like a [result type](../_posts/2021-01-15-Results-Update.md).

He also discusses how [designing with types](https://fsharpforfunandprofit.com/series/designing-with-types/) allows us to centralize defensive programming and communicate constrined types in signatures.

```cs
// example of a constrained type
record PositiveInt{
    private int value;

    private PositiveInt(int value){
        this.value = value;
    }

    public enum Errors{
        LessThanZero
    }
    public PositiveInt? FromInt(int value){
        var result = value switch {
            < 0 => null,
            _ => new PositiveInt(value)
        };
        return result;
    }
}
```

Together, these concepts create functions that behave much more like math functions. There is a clear advertized set of allowed inputs (the domain) and a clear set of allowed outputs (the range). Valid inputs should create valid outputs and the functions don't accept invalid inputs. 

This sounds a bit obvious, but many programs do not follow this approach. Exceptions disrupt the flow of execution and pass control to the lowest caller with a try-catch, or terminate the program entirely. They are an unadvertised possible return value. Similarly, many languages have mutable data structures that can changed by functions they are passed to. Such changes are also not advertised. 

Advertising our expectations well follows the [principle of least surprise](https://en.wikipedia.org/wiki/Principle_of_least_astonishment) and produces more intuitive systems.

## Random Testing Expands Completeness Measures

A system that advertises expectations well can leverage a new kind of testing.

Most systems can leverage a very useful approach called [property testing](https://en.wikipedia.org/wiki/Property_testing). Property testing is a type of random testing where functions are fed random inputs, and ensure that a certain condition holds true for every input.

For example, the associative property of addition
```fsharp
Check.Quick (fn x y z ->
    (x+y)+ z = x + (y + z)
)
```
Scott Wlaschin has an excellent [introduction to property testing](https://fsharpforfunandprofit.com/posts/property-based-testing/).

Systems that encode their input and output expectations well can take advantage of this kind of testing **without writing explicit tests**.
For example, Clojure.spec has a function `instrument` that automatically tests every type-annotated function in the system with random generated values.

What do tests like this really tell us?

They can't tell us that certain inputs produced the *expected* outputs. The computer isn't smart enough to infer semantics in the data.
It can tell us if valid inputs result valid outputs, however well defined the constraints on those inputs and outputs are.

In other words, it tells us that our expected input domain is our actual input domain. Each function in our program is well behaved for every value it advertises that it supports.

This is a form of completeness complementary to mutation testing. Between mutation testing and automated random testing we can verify 
- Broken logic doesn't slip through our test suite
- Broken data can't be passed to our functions

## Use in static languages

I've previously attempted to bring constrined data to F# in an experiment called [FsSpec](https://github.com/farlee2121/FsSpec).

Adding constraints to primitive types didn't work out. However, I realized that the constraints don't need a special construct. 
Constraints live in the factories of their types. The constraints can be introspected from these factories and used to create automatic random tests without modifying the code base.

Systems that rely on exceptions can still use such testing, they'll just measure that their system has many hidden side-effects. 
This kind of testing forms an impartial measurement for systems that want to migrate toward total function signatures.


## Conclusion

Fully automated random testing should be achievable in statically typed systems. Efficient value generation should be possible by inferring constraints from type factories.

This approach to random testing objectively measures how well functions in our system actually handle advertised allowed inputs.

This is a form of completeness complementary to mutation testing. Between mutation testing and automated random testing we can verify 
- Broken logic doesn't slip through our test suite
- Broken data can't be passed to our functions