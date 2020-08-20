---
layout: post
tags: [Languages, Functional Programming, Design Thinking,
        Pivotal Insights]
excerpt: null
series: Language-Limited Thought
series_description: Exploring how different languages equip us to solve different design problems
---

# Result Types

I want to be cleanly represent predictable failure states as part of my functions operation. To let consumers know right away what scenarios they should expect. This is a classic functional approach, reprented in F# as the Result pattern. Representing the same idea in C#, however, is non-trivial. 


## Problem Statement
This is a pretty common scenario. There is some happy path that should return a value, but there are also expected ways that operation might go wrong.

Concrete examples

-  Fetch data by identifier
   -  Success -> return value
   -  Not Found -> indicate no value
-  Parsing 
   -  Success -> return value
   -  Failure -> maybe just indicate no value, maybe give reasons for failure
-  Save entity details
   - Success -> return an entity identifier
   - Failures -> don't save and tell caller what happened
     - Unauthorized
     - Validation error
-  Network calls 
   - Success -> /value
   - Failures ->
     - Not available
     - Request returned an error code (e.g. 500 server error, 402 not found)
     - Invalid connection configuration

## Not the only one
I know that I'm also not the only OO programmer to wrestle with this problem. I've seen it at several places I've worked. Questions threads on the topic can be found if you know the right keywords (like [here](https://codereview.stackexchange.com/questions/69377/result-class-which-wraps-another-object)).

However, the only people I've seen offering strong solutions in the OO world are people bringing ideas back from functional languages. For example,
- https://github.com/vkhorikov/CSharpFunctionalExtensions
- https://github.com/cameronpresley/Optionally

## Solution Constraints
It's important to recognize that we have two problems here
1. An operation that may or may not have a value. Success or failure is only determined by the presense of a value. It comes down to representing "Nothing"
   1. E.g Find or parse. They generally don't care about reporting error states
2. Distinct information is needed for success and failure cases. Comes down to representing failure
   1. E.g. Validation, Network calls, etc


Problem 1: 
- Clearly communicates the semantic of potentially having no value
- Can safely and uniformly check the presence of a value
- Can be used with any type
- Can simply access the value if one is present

Problem 2:
- Must
  - Can easily discern success or failure of the operation
  - Include information on successful operation, error information on failure
  - Easily access success data or react to error states
- Desired
  - Not re-implemented for every scenario. Rather define a base type with reusable operations. Success and error types strongly determined for each usage at write-time.
  - Operate on result types polymorphically
  - Combination operators/functions for scenarios with related results (e.g. validation)
  - Minimal type verbocity
  - Avoid explicit success checks in every step of a multi-stage operation  

## Sudo-Solutions in C#

**Solution 1: Forgetting about error states**
This is not really a solution, but it's what I see happen most commonly. There is no easy and normalized way to represent error states and so they just get forgotten. Hopefully there is some top level exception handler that lets the program fail gracefully.


**Solution 2: Sematic values** The idea here is to indicate status by using special values of the type normally returned on success. Null is common, and a bit of a special case. I often see 0 as the implicit default ID. `-1` is also somewhat common for operations that are suppose to return positive numbers. 

All of these not good ideas. Null is a minefield of null reference exceptions, but at least an expected failure value in many languages. Other kinds of semantic values undermine a consumers expectation about how your code works and create likely scenarios for errors states to propegate through a system undetected (Thank you Code Complete for teaching me this early).

**Solution 3: Exceptions** Exceptions have their place. It is often best to terminate a call chain when something truely unexpected happens. However, exceptions are like "cascading gotos". They surrender control flow to callers in a way this is often difficult to predict and reason about if used widely.

**Solution 4: Nullable**
This is a solution for only problem 1. Nullables in C# are equivalent to Maybe or Option types in functional languages. It would be a fantastic solution if only it worked uniformly across value and reference types.


## Attempts at the result pattern
I tried many approaches to the result pattern over the years. An OO design approach never yielded great results though.

I started with one-off result objects. These work well for individual scenrios, but they result in a lot of duplicate code. Implementations can easily be a bit different each time, making it conceptually hard to use.

Simple generics. For example
```cs
class Result<TSuccess>
{
  public bool IsSuccess {get; set;}
  public T Data {get; set;}
  public string[] Errors { get; set; }
  public Result(TSuccess data){}
  public Result(string[] errors){}
}
```
This implementation relies on stringly-typed error state, a mistake made due to lack of clarity on how to generically handle error states. It ends up encouraging semantic values through the error strings.

The next upgrade fixes the semantic strings, but ends up with type potential type conflicts between success and error data. This also means semantic ambiguity between success and failure for a code reader. 
```cs
class Result<TSuccess, TError>
{
  public bool IsSuccess {get; set;}
  public T Data {get; set;}
  public TError Error { get; set; }
  public Result(TSuccess data){}
  public Result(TError errors){}
}
```

All of these solutions also create unpleasent complexity of frequently checking success states, expecially in multi-step processes. 

# Functional Approach
Functional languages take strong inspiration from mathematical concepts. This means that 
- functions are *not* algorithms, they are tranformation from input to output
- a function always has an output value, even if that value is "nothing"
- the trasformation should be stateless. The same input always produces the same output
- a function does not effect the state of it's caller / data is immutable

This all adds up to functional languages needing to represent state in their inputs an outputs. Thus, it has good tools to do so

 - referential transparency, don't modify caller's state, always return same value for same input
 - Always a return type. These add up to 1. need to represent a "nothing" return type. Need to represent state in my return type. Thus functional languages have good tools for representing these things. one is the Maybe or Optional. Discriminated Unions. F# has a built in result type. Talk about apply and ROP. Being able to operate on the result. It handles worries about it having failed

## Mapping back




Mapping back
 - generic and less awkward
 - railway, pattern match



Also cover nullables here?
- Again, a "somtimes" expression. C# has nullables but the artifact of null reference types makes them nasty
- this is really a monad, but I'll direct you to a different blog for that
- options maps back to c# alright, but is syntactically noisy
- can map the f# implementation back to c# 
  -  a generic with two type args, a result value and an error value. Result and error types could be enums, polymorphic, etc
     -  i.e. Error<TStateEnum>{ State, Message} or IError {GetMessage} an case on type is (this pattern matching is taken from f#)
  -  F# can handle arbitrary types at one level though if you get off the standard track

// think about mentioning co-varient returns
// split off another post for multiple valid input types (string/ConnectionString)
 - actually fairly easy in c#, but creates expanding interfaces. Multiple such arguments cause a signature explosion. Can handle via objects, but a requires some mind wrapping (do you cast? )
 - also have to reprensent the multiple possible types through several layers (possibly)

## Further Reading
- https://fsharpforfunandprofit.com/rop/
- https://fsharpforfunandprofit.com/posts/recipe-part2/
- https://fsharpforfunandprofit.com/posts/against-railway-oriented-programming/
- https://fsharpforfunandprofit.com/posts/discriminated-unions/

<!--
- if I had covariant returns, then I could define all of the functions on the base class, then create a derived version that also takes a generic parameter for the
  inheriting type and simply returns all of the base class methods bimapped to the derived class. That means I could work with the base class when I like and inherit, keeping all functions for the derived types

-->