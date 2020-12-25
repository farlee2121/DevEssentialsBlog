---
layout: post
tags: [Testing, Test Api, F#]
---

# Test Api in F#

[Paul's Test Api](https://codewithspoon.com/2019/12/stop-corrupting-yourself-test-against-abstractions/) [changed the way that I test permentantly](../posts/../_posts/2020-08-21-Test-Api-InPractice.md). It's only natural I'd want to bring the pattern over to F# with me. Here's how I did it and a few extra testing tips for F#. 


## Testing Framework

All the testing frameworks of C# (nUnit, xUnit,...) transfer over to F# pretty directly. This also means that my various testing techniques could transfer directly. However, none of them are very idiomatic for functional programming. I wanted to see if I could garner any improvements by leveraging a functional approach.

So, I tried out [Expecto](https://github.com/haf/expecto). This delightful library makes it very easy to define test lists and compose them

```fs
let list1 = testList "Name here - 1" [
  test "test name" {
    Expect.isTrue //...
  }
  testProperty "I am a property run by fsCheck" (fun x y -> x + y = y + x)
  //...
]

let list2 = //...

let list3 = "list of lists" [
  list1
  list2
]
```

These lists can be made for specific expectation sets and built up into a spec for a feature. For example, one could have sub-lists for sortable, filterable, and standard CRUD. 

F# is has a powerful type inference system that can reuse generic code seamlessly in different contexts. This means any test lists paired with test api and generic assertions can be reused for completely different components. A concrete example, every type-ahead or sortable in my system can now use the same test suite!

## Test API with Unit Test in Expecto
A true solution requires
- tests be independent from other tests
- maintained state between calls of the operations within this single test
- the test not know about how the operations maintain state
- invoking the api is not be a resource leak (proper cleanup phase)

This is super easy for unit tests. Just wrap the test list in a builder, and proxy the test builder method to add setup and cleanup

```fs
let testWithApi setup cleanup name testCode = 
  let testWrap () =
    let (api, env) = setup ()
    testMethod api
    cleanup env 
  testCase name testWrap

let testListBuilder setup cleanup =
  let test' = testWithApi setup cleanup
  testList "I'm a list" [
    test' "I'm a test" (fun testApi -> 
      //...
    )
  ]
```

## Test API for Property tests

The above code got me to parity with what I was doing in C#, plus better portability of a set of tests between situations with the same qualities.

However, I've now adjusted to property-based testing. It allows me to simply and much more thoroughly cover cases that I would have had to test separately before. 
The problem is, FsCheck take the property predicate and runs it many times outside of our control. Wrapping the property test like before only runs setup and cleanup once for all runs of the property. This causes state to be shared between runs of the property.

I tried many approaches to fixing this. A good summary is available in [this StackOverflow post](https://stackoverflow.com/questions/65401727). Here are some highlights.

I wanted 
- To keep example and property tests together in the same lists
- to use the same setup/cleanup between example and property tests
- To minimally impact the test definitions

Possibilities
- I could run `use testApi = apiFactory ()` internal to every test. This would be easy to understand, only a bit verbose, and the disposable gives me a cleanup phase. The main issue here is that classes do no play well with type inference. They destroy my newfound ability to reuse the test lists between components with the same expections
- I tried to find events to hook into on FsCheck, but there is no proper event before each property case is run
- The FsCheck maintainer suggested a neat way of wrapping "variadic" (functions with an unknown number of arguments) in a consistent way

This led me to my final solution: add a simple wrapper inside the property test. 

```fs
let withEnv setup cleanup f = 
  let testWrap () =
    let (api, env) = setup ()
    let result = f api
    cleanup env
    result

let listBuilder setup cleanup= 
  let withApi' = withApi setup cleanup 
  let test' = testWithApi setup cleanup
  testList "list name" [
    testProperty "prop name" (fun list -> withApi' (fun testApi ->
      // relies on nested scope to define property as a function (testApi -> bool)
      testApi.WriteAll list
      list = testApi.ReadAll ()
    ))
    test' "test name" (fun testApi -> 
      //..
    )
  ]
```

This solution requires a bit of extra boiler per property test, but it is not much and it meets all of the success criteria. The inner test also would stay the same if FsCheck ever added an event that lets me move to a `testPropertyWithApi` style definition.

It's worth noting that `testApi` and the underlying `env` can be anything. Thus, `withApi` and `testWithApi` can be reused in all tests. The individual test list will infer its needs and enforce internal consistency since `setup` and `cleanup` are passed to the list builder as parameters, and parameters can only have one type per function invocation.

In general, I use record types to pair the operations as a test api.

## Additional Discoveries
I really pushed my knowledge of F# with the project. Here are a few useful discoveries
- Function parameters can only infer to one type. 
  - I got used to the magic of function calls infering to different signatures based on their caller. This is more limited when the function is passed as a parameter. The function must have a concrete type at invokation, and it can only have one. Thus all uses of the parameter in the function it's passed to must expect a consistent type.
- Classes need not define every type parameter at the top level like C#. You can just throw a generic in the details of some member and F# will figure it out
- Classes do not play well with type inference. Their members have a degree of type inference, but references to the class by other functions require explicit type annotations. I think this is because inheritance makes inference indeterminate.
- Class constructors are functions too. They can be used like any other function


## Summary

Adapting Test API to F# was pretty trivial. The challenge came from mixing the pattern with newfound benefits of testing in an idiomatic F# style.
Reusing lists of tests between components with relatively little overhead is a strong benefit. I'd seriously consider moving my testing into F# even on C# projects.



