---
layout: post
tags: [F#, BDD, Test api, Testing]
---

<!-- TODO: put warning on old post that points to this one
     TODO: Post the library for standard use
 -->

# Test Api in F# Improved

I [previously wrote](../_posts/2021-02-26-TestApi-in-FSharp.md) on the Test API behavioral testing in F#. More time and thinking has brought about a few key improvements, making the pattern both more concise and standardized.

## Test API Review

Some quick background. Test API is a Behavior Driven Development pattern [developed by Paul Spoon](https://codewithspoon.com/2019/12/stop-corrupting-yourself-test-against-abstractions/).

The key idea is that test own their own dependency abstractions (e.g. interfaces) like any other service would. This decouples the test from the system, and the difference is bridge with adapters. Key advantages include
- The tests focus on encoding requirements, not accommodating the system
- The tests don't change when the system changes, only when requirements change
- The tests are clean, no matter how messy the system is
- The same tests can be reused for multiple configurations (i.e. as unit test and as any combination of integrated components)


## Solving arity with tuples

Property tests were my biggest challenge when initially mapping test API to F#. The key issue was that the test environment needed to be managed per-case of the property test, but the property test fixtures only ran before and after the whole set of cases.

I also couldn't generically wrap my property tests in a controlled lifecycle because case data is passed as arguments, and the function arity (number of arguments) is unknown.

I solved this before by using syntactic clojure. The tested `withApi` controls environment lifetime while the enclosing function provides access to test case data.

```fs
testProperty "prop test name" (fun list otherTestData -> withApi setup cleanup (fun testApi ->
      // relies on nested scope to define property as a function (testApi -> bool)
      testApi.WriteAll list
      list = testApi.ReadAll ()
    ))
```

This works, but is verbose. 

My breakthrough was to use deconstructed tuples to control function arity! For example

```fs
testPropertyWithEnv setup cleanup "prop test name" (fun testApi (list, otherTestData) ->
      testApi.WriteAll list
      list = testApi.ReadAll ()
    ))
```

The deconstructed tuple intuitively looks like additional function parameters. We can even add type annotations to each name. However, the test function is always arity 2, it takes a testApi plus one other input. That other input can be a tuple of any size. FsCheck already knows how to break down tuples and generate the parts. The case generation is effectively the same as a parameter list.

Flattening the definition to one layer hides the lifecycle complexity. It also allows one normalized signature pattern with regular unit tests `(setup -> cleanup -> name -> fn)-> Test`

## Hiding the api with Reader Monad

The normalized test signatures pave the way for using a reader monad. In short, instead of passing setup and cleanup to each test definition, I can have each definition return a "test waiting for an environment", then I can supply the environment just once. 

Consider if we tweak the signature
```fs
let testWithEnv setup cleanup name ftest = // returns Test

// change to
let testWithEnv name ftest setup cleanup = 
    // returns a function setup -> cleanup -> Test

let testPropertyWithEnv name ftest setup cleanup =
    // also returns a function setup -> cleanup -> Test
```

Then we can define our test lists like
```fs
let makeTestList env = 
    testListWithEnv [
        testWithEnv "Name" (fun api -> )
        testWithEnv "More Name" (fun api -> )
        testPropertyWithEnv "Name here" (fun api (other, args) ->)
        //...
    ] env
```

Compare that to a normal test list

```fs
let makeTestList () = 
    testList [
        test "Name" (fun () -> )
        test "More Name" (fun () -> )
        testProperty "Name here" (fun other args ->)
        //...
    ]
```

The overall shape is nearly identical to a normal test list, no application of environments is spread through the list. There is no need to create a special function for building the environment test list either. Partially applying the test list without passing an environment would act the same.

Thanks to [Scott Wlaschin's dependency injection series](https://fsharpforfunandprofit.com/posts/dependencies-3/) for clarifying this idea.


## Abstract environment without sacrificing type inference

Passing setup and cleanup separately is still a bit of a pain. It also wouldn't scale if I ever want to expand the test environment.

I tried using an interface in the past, but ran into issue with type inference and type signatures getting messy.

Fortunately, I found an answer to this while [exploring Bolero](https://github.com/fsbolero/Bolero/blob/f4c5c05f8b4ac224325eb935db7cacc07d389abf/src/Bolero/Router.fs#L43). It's possible to implement an interface on a record! This gives us the best of type inference, while keeping possible implementations abstract. It also provides better C# compatibility.

```fs
type ITestEnv<'api, 'env>  = 
        abstract Setup : unit -> ('api * 'env)
        abstract Cleanup : 'env -> unit
    
    type TestEnv<'api, 'env> = 
        { 
            setup : unit -> ('api * 'env)
            cleanup : 'env -> unit
        }
        interface ITestEnv<'api, 'env> with
            member this.Setup () = this.setup ()
            member this.Cleanup (env) = this.cleanup env

let testWithEnv name test (testEnv :ITestEnv<'api, 'env>) = //...
           
let testPropertyWithEnv name (ftest: 'api -> 'argtuple -> 'a) (testEnv :ITestEnv<'api, 'env>) = //...

// And to create the env
{
    setup () = //...
    cleanup env = //...
}
```

## Library

These new improvements made the code so general that I split it out into it's own project and put it [up on Github](https://github.com/farlee2121/Expecto.TestApi).

## Conclusion

These insights simplify test api in F# significantly. It aligns overall syntax with the host test library (Expecto in my case) and centralize all the tricky bits into a reusable library.