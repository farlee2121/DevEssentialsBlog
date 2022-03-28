---
layout: post
tags: [Testing, Expecto, Composition]
---

# Tests as Values

Lambdas, or functions as values, have worked their way into mainstream programming and transformed development for many programmers. 
It's rare to see a program that doesn't `.filter` a list with a predicate or `.map` to transform from one type to another. This same 
as-a-value approach can be applied to automated tests, and I have hopes it will also transform how we program.

## Current Approach

Automated tests (e.g. unit tests) have rightfully established themselves as a stable development practice. Tests improve the way we design
and enable continuous verification of expected behaviors.

The most common approach I've seen to unit test uses attributes to specially mark language constructs, like classes, as tests. Some external tool then examines the code for these special attributes and runs the tests.

```cs
public class SomeComponentTests{
    [Setup]
    public void Setup(){
        // do stuff
    }

    [TearDown]
    public void TearDown(){
        //do stuff
    }

    [Test]
    public void TestTheThing(){
        // Arrange
        // Act
        // Assert
    }
}
```

## Sneaky assumptions
This attribute-based approach works well with the right tooling. However, it caused me to develop some sneaky and false assumptions
- Tests are a special and separate kind of code
- Running tests is magic reserved for special external tooling
- Tests are closed constructs that cannot be effectively reused, composed, or programatically modified
- Test process customization requires either serious meta-programming or the good graces of the framework to provide customization hooks


## Tests as Values

All the above assumptions are not essential to tests. Tests can be values in much the same way many programming languages are now making functions into values.
This allows test to be treated like any other value in our code. We can bring all of our good practices other coding tasks into testing too.

Let's look at some examples of how test-values are useful.

My examples will be written using [Expecto](https://github.com/haf/expecto) and F#. I've recently been informed of [Exude](https://github.com/GreanTech/Exude), which tackles the same problem from a C# perspective.


Tests are just values in Expecto. This means we can put them in a list like we would with any other kind of value

```fs
let tests = testList "Sample Tests" [
    test "I guess I'll multiply" {
        Expect.equal 6 (2*3)
    }
    test "Some adding too" {
        Expect.equal 5 (2+3)
    }
]
```

We can, of course, concat lists of tests together if we like
```fs
let allTests = List.concat [testlist1; testlist2; ...; testlistN];
```

We can run the list of tests
```fs
open Expecto.Tests
runTests defaultConfig allTests
```

We can filter tests if we so desire.
```
let filtered = Test.filter " " (fun testFullName -> testFullName.Contains("expected prefix"))
```

Test setup and teardown can be done just by mapping the tests with a new enclosing function. Tests names can be dynamically prefixed or reformatted in a similar way. 

These are just a few possibilities and all of this is accomplished using the normal lists and functions we program with otherwise. There's no need for advanced meta programming to customize the testing process or operate on a set of tests. Of course, Expecto also provides some semi-magic options for integrating with other test frameworks like XUnit and their test runners.

## Looking Forward: Composition

Tests-as-values enable more than testing customizations. It also means that our tests can be created by factories, passed around, and composed into new test lists.

I currently use a kind of test factory to reuse a test list across different implementations of an interface ([test api in F#](../_posts/2021-10-08-TestApi-in-FSharp-revised.md) or [the C# approximation w/ motivational example](TODO)). 

I have hopes that this kind of reuse and composition can raise our level of abstraction in testing. For example, I commonly write very similar and fairly complex tests for fetching some object based on an intersection of tags. Such tests get even more complicated if there are both include and exclude tags. A similar case is filter, sort, and search combinations.

This kind of test seems ripe for reuse. Behavior varies very little between uses, yet the behaviors are complex with sneaky edge cases. I'd love to compose a test suite like
```fs
testList "FooServiceTests" [
    FooBehaviorRequirements
    StandardTagIntersectionTests
    StandardPerformanceBaselineTests
    StandardFilterAndSort
    StandardEntityCRUDTests
]
```

The question is how many tests scenarios are really worth the indirection of separating out a standard suite then mapping into that suite's abstractions. It's a whole new mindset to approach tests with. 

## Conclusion
I find it wonderful that all the semi-mysterious actions of a testing framework become clear and accessible with tests-as-values. Easy access to the testing pipeline empowers developers to make powerful customizations to their own usage, like my [test api library for F#](../_posts/2021-10-08-TestApi-in-FSharp-revised.md). Looking forward, I hope that test values will improve isolation of cross-cutting expectations into reusable test suites. 

All-in-all, I think tests-as-values are a clear win. I certainly notice any project missing them. 
<!-- 
### Prefix test names

- primary benefit is operability of tests. Can bring all our normal programming techniques to work with our test suite
- example: prefix all test names
  - traditional: I've tried this in the past. Had to go deep into custom attributes for the testing framework
  - value-based: a simple map
- example: setup/teardown
  - attribute-based runners it becomes a meta-programming task. Have to plug into the external runner or such
  - value-based, just a simple map
- example: reuse
- Looking forward: composition Modifying and filtering tests is great, but The most power is in composition
  - how many times do I write a test suite for basic set theory scenarios like intersection of many groups
  - there is a tradeoff of additional indirection. If the reused test cases are simple, the duplication is probably OK


https://github.com/GreanTech/Exude has been brought to my attention for C#. need to give it a go -->