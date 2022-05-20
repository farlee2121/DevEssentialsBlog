---
layout: post
tags: [Testing, Expecto, Composition]
---

# Tests as Values

Lambdas, or functions as values, have worked their way into mainstream programming and transformed development for many programmers. 
It's rare to see a program that doesn't `.filter` a list with a predicate or `.map` to transform from one type to another. This same 
as-a-value approach can be applied to automated tests, and I have hopes it will also transform how we program.

## Current Approach

Automated tests (e.g. unit tests) have rightfully established themselves as a core development practice. Tests improve the way we design
and enable continuous verification of expected behaviors.

The common approach to unit test uses attributes to specially mark language constructs, like classes, as tests. Some external tool then examines the code for these special attributes and runs the tests.

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

All the above assumptions are not essential to tests. Tests can be values in much the same way we now use functions or objects as values.
This allows test to be treated like any other value in our code. We can bring all of our good practices from other coding tasks into testing too.

Let's look at some examples of how test-values are useful.

My examples will be written using [Expecto](https://github.com/haf/expecto) and F#. I've recently been informed of [Exude](https://github.com/GreanTech/Exude), which tackles the same problem from a C# perspective.


Tests are just values in Expecto. This means we can put them in a list like we would with any other kind of value

```fsharp
let tests = testList "Sample Tests" [
    test "I guess I'll multiply" {
        Expect.equal 6 (2*3)
    }
    test "Some adding too" {
        Expect.equal 5 (2+3)
    }
]
```

We can, of course, combine lists of tests together if we like. 
```fsharp
let allTests = testList "All tests / Reason for combined list" [testlist1; testlist2; ...; testlistN];
```

We can run the list of tests
```fsharp
open Expecto.Tests
runTests defaultConfig allTests
```

We can filter tests if we so desire.
```fsharp
let filtered = Test.filter " " (fun testFullName -> testFullName.Contains("expected prefix"))
```

Test setup and teardown can be done just by mapping the tests with a new enclosing function. Tests names can also be dynamically prefixed or reformatted using a simple list map. 

I've named just a few possibilities, and all of this is accomplished using the normal list operations and functions we program with otherwise. There's no need for advanced meta programming to customize the testing process or operate on a set of tests. Of course, Expecto also provides some semi-magic options for integrating with other test frameworks like XUnit and their test runners.

## Looking Forward: Composition

Tests-as-values enable more than testing customizations. It also means that our tests can be created by factories, passed around, and composed into new test lists.

I currently use a kind of test factory to reuse a single test list across different implementations of an interface.

```fsharp
let recipeAccessTestFactory (env: ITestEnv<IRecipeAccessor, 'b>) =
    testListWithEnv "IRecipeAccessor CRUD" [
        etest "Given a new environment When I list recipes Then the list is empty" <| fun (api: IRecipeAccessor) ->
            let actualRecipes = api.ListRecipes()
            Expect.isEmpty actualRecipes "Recipe list should be empty by default"
        etestProperty "Given a recipe When I save the recipe Then the recipe is listed" <| fun (api: IRecipeAccessor) (expectedRecipe:Recipe) ->
            api.CreateOrUpdateRecipe(expectedRecipe)
            let actualRecipes = api.ListRecipes()
            Expect.sequenceEqual actualRecipes [expectedRecipe] "Saved recipe should be listed"
        // more tests ...
    ] env
```

I've previously written other examples in [Test API in F#](../_posts/2021-10-08-TestApi-in-FSharp-revised.md) or [Test API and Test Reuse in C#](../_posts/2022-05-16-TestApi-and-Test-reuse-in-CSharp.md). The C# example isn't quite tests-as-values, but hits at the same kind of reuse.

I have hopes that this kind of reuse and composition can raise our level of abstraction in testing. For example, I commonly write very similar and fairly complex tests for fetching some object based on an intersection of tags. Such tests get even more complicated if there are both include and exclude rules. 

This kind of test seems ripe for reuse. Behavior varies very little between uses, yet the behaviors are complex with sneaky edge cases. I'd love to compose a test suite like
```fsharp
testList "FooServiceTests" [
    FooBehaviorRequirements
    StandardTagIntersectionTests
    StandardPerformanceBaselineTests
    StandardFilterAndSort
    StandardEntityCRUDTests
]
```

I'm still uncertain how many tests scenarios are worth the indirection of separating out a standard suite then mapping into that suite's abstractions. It's a whole new mindset to approach tests with. So far, it seems like problems mappable to general set theory problems are prime candidates (i.e. search, filter, sort). 

## Conclusion
I find it wonderful that all the semi-mysterious actions of a testing framework become clear and accessible with tests-as-values. Easy access to the testing pipeline empowers developers to make powerful customizations for their own usage, like my [test api library for F#](../_posts/2021-10-08-TestApi-in-FSharp-revised.md). Looking forward, I hope that test values will improve isolation of cross-cutting expectations into reusable test suites. 

All-in-all, I think tests-as-values are a clear win. I certainly notice any project missing them. 
