---
date: "2020-10-30T00:00:00Z"
series: Language-Limited Thought
series_description: Exploring how different languages equip us to solve different
  design problems
tags:
- Languages
- Functional Programming
- Design Thinking
- Pivotal Insights
---

# Result Types

I want to cleanly represent predictable failure states as part of my function contracts. This lets consumers know right away what scenarios they should expect without documentation or looking through code. F# encourages this pattern and normalizes it with the Result type. Representing the same idea in C#, however, is non-trivial. 

This post will first specify the problem(s), look at failed solutions in C#, cover F# solutions, and try to map functional ideas back to C#. 

> UPDATE: [C# 9 can simplify result types](../_posts/../2021-01-15-Results-Update.md)

## Problem Statement
Consider this common scenario: there is some happy path that should return a value, but there are also expected ways that operation might go wrong.

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
     - resource error
-  Network calls 
   - Success -> value
   - Failures ->
     - Not available
     - Request returned an error code (e.g. 500 server error, 402 not found)
     - Invalid connection configuration

These examples surface two core scenarios
1. Maybe-Pattern: An operation that may or may not have a value. Success or failure is only determined by the presence of a value. It comes down to representing "Something" and "Nothing"
   - E.g Find or parse. They generally don't care about reporting error states
2. Result-Pattern: Distinct information is needed for success and failure cases. Comes down to representing multiple potential states of failure
   - E.g. Validation, Network calls, etc

## Not the only one
I know that I'm also not the only OO programmer to wrestle with this problem. I've seen it at several places I've worked. Questions threads can also be found if you know the right keywords (like [here](https://codereview.stackexchange.com/questions/69377/result-class-which-wraps-another-object)).

However, the only people I've seen offering strong solutions in the OO world are people bringing ideas back from functional languages. For example,
- https://github.com/vkhorikov/CSharpFunctionalExtensions
- https://github.com/cameronpresley/Optionally


## Maybe-Pattern
We'll knock out Maybe first, since it is a much smaller topic.

Requirements
- Clearly communicates the semantic of potentially having no value
- Can safely and uniformly check the presence of a value
- Can be used with any type
- Can simply access the value if one is present


C# Solutions 
- **Null for reference types**: Really just a special "none" value. Does not communicate intent, is not optional, and is a minefield of potential exceptions
- **Nullables**: in C# are equivalent to Maybe or Option types in functional languages. They only work for value types. It would be a fantastic solution if only it worked uniformly across value and reference types.

F# Solution
```fsharp
let parseInt (input : string) : int option =
  if System.String.IsNullOrEmpty(input)
  then Option<int>.None
  else Option.Some(42)

match parse "yo ho" with
| Some n -> printfn "I have value %i" n
| None -> printfn "I have no value"
```

Back to C#  

Mimicking Options/Maybe in C# is pretty easy. The following example is essentially Nullable, but for all types. It doesn't benefit from the nice syntax though. 
```cs
public class Maybe<T>{
   public T Value {get; set;}
   public bool HasValue {get; set;}

   public static Maybe<T> Some(T value){
     return new Maybe<T>{HasValue = true, Value = value};
   }
   public static Mabye<T> None(){
     return new Maybe<T>{HasValue = false, Value = default(T) };
   }
}
```
Additional precautions can be taken to prevent dependence on the default value, but the above should be a working solution in familiar form for C# devs.

## Result-Pattern
### Requirements 

The rest of this post will be about the result pattern. Result type solution requirements are as follows
- Must
  - Can easily discern success or failure of the operation
  - Include information on successful operation, error information on failure
  - Easily access success data or react to error states
- Desired
  - Not re-implemented for every scenario. Rather define a base type with reusable operations. Success and error types strongly determined for each usage at write-time.
  - Operate on result types polymorphically
  - Combination operators/functions for scenarios with related results (e.g. validation)
  - Minimal type verbosity
  - Avoid explicit success checks in every step of a multi-stage operation  

### Sudo-Solutions in C#

**Solution 1: Forgetting about error states**
This is not really a solution, but it's what I see happen most commonly. There is no easy and normalized way to represent error states and so they just get forgotten. This usually results in some kind of exception. Hopefully, there is some top level exception handler that lets the program fail gracefully.

**Solution 2: Sematic values** The idea here is to indicate status by using special values of the type normally returned on success. Null is common, and a bit of a special case. I often see 0 as the implicit default ID. `-1` is also somewhat common for operations that are suppose to return positive numbers. 

These semantic values are a bad idea. Null is a minefield of null reference exceptions, but at least an expected failure value in many languages. Other kinds of semantic values undermine a consumers expectation about how your code works and create likely scenarios for errors states to propagate through a system undetected. Thank you Code Complete for teaching me this early.

**Solution 3: Exceptions** Exceptions have their place. It is often right to terminate a call chain when something truly unexpected happens rather than risk propagating errors. However, exceptions are like "cascading gotos". They surrender control flow to callers in a way this is often difficult to predict and reason about when used widely.

**Solution 4: Referential mutation** This is how the .NET parsers work. They return a bool to indicate success and assign the actual output to variables by reference. I've always found this pattern unintuitive. It can get real hard to follow if used in multiple layers.

## Attempts at the result pattern
I tried many approaches to the result pattern over the years. An OO design approach never yielded great results though.

I started with one-off result objects. These work well for individual scenarios, but they result in a lot of duplicate code. Implementations can easily be a bit different each time, making it conceptually hard to use.
```cs
enum UserSaveErrors{
  //...
}
class UserSaveResult
{
  // don't be tempted to pass the whole user. That's a CQRS violation
  public int UserId {get; set;} 
  public UserSaveErrors Error {get; set;}
  public Result(int userId){} //...
  public Result(UserSaveErrors error){}//...
}
```

Next came simple generics. For example,
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

All of these solutions also create unpleasant complexity of frequently checking success states, especially in multi-step processes. I'm sure we've all seen this kind of code before
```cs
var result1 = //...
if(result2.IsSuccess){
  var result2 = //...
  if(result2.IsSuccess)//...
} 
```


## Functional Approach
Functional languages take strong inspiration from mathematical concepts. This means that 
- functions are *not* algorithms, they are transformation from input to output
- a function always has an output value, even if that value is "nothing"
- the transformation should be stateless. The same input always produces the same output
- a function does not effect the state of it's caller / data is immutable

This all adds up to functional languages needing to represent state in their inputs and outputs. Thus, they created good tools to do so.

### Discriminated Unions
The most general and flexible tool is a Discriminated Union. Think of it like an OR type. I can be a string OR a bool OR an int
```fsharp
type Truthy = 
  | Bool of bool
  | Int of int
  | String of string

let boolTruthy = Bool(true) // type is Truthy
```
This can be (and is) used to define a generic Option/Nullable type in three lines.
```fsharp
type Option<'a> =
    | Some of 'a
    | None
```

It can also be used to define complex Result types. For example
```fsharp
type UserResult = 
  | Success of UserId
  | NotFound of UserId
  | ValidationError of userId: UserId * message: string
  | Unknown of Exception
```

### Built-in Result-type
F# provides a built-in generic result type built on top of a discriminated union.
```fsharp
type Result<'T,'TError> =
    | Ok of ResultValue:'T
    | Error of ErrorValue:'TError

let successResult = Result.Ok(5)
let errorResult = Result.Error("strings for errors")
```
While simple, this provides a solid solution for most cases. Any type can be used for success or error. The error cases are commonly another discriminated union as a sort of enum with data.

Notice that this result-type doesn't suffer from success and failure state confusion like our generic OO version did. This is because it creates the result types through explicit state declarations. That's something we can fold back.

Defining a base type that just separates success and error also enables some pretty powerful shared behavior.

This is a good time to mention monads. There are some specific rules, but for now just view Monads as a sort of type power-up. It adds some new property to our type, we can operate on it, and then eventually map it back.

> For the math nerds out there, picture as it as a projection into another type space. Because of referential transparency, the map is bijectional. In the case of result types, it is bijectional between result-space and the sum of the success and error space. This allows us to operate on the result without worrying about it's success and failure states, then map back once.

This lets us solve nasty repeated checks for success. Perhaps it is best learned through example. Let's look at the simple case of division.
```fsharp
module Result = 
  // If success, apply the function and return value, else forward the error 
  let apply func result= 
    match result with
    | Ok value -> func value
    | Error e -> e

  // Succeed unless an exception is thrown, then return 
  let try f x =
    try
        f x |> Ok
    with
    | ex -> Error
```
These functions are both incredibly basic, but now we can write powerful flows like
```fsharp
let divisionResult = 
  someNumber 
  |> try apply (fun x -> x + 5)
  |> try apply (fun x -> x / 0)
  |> try apply (fun x -> x / 8)
  |> try apply (fun x -> x / 2)
  //...
```

In C# this would look something like
```cs
Result.Ok(5)
      .Try(result => result.Apply(x => x + 5))
      .Try(result => result.Apply(x => x / 0))
      .Try(result => result.Apply(x => x / 8))
      .Try(result => result.Apply(x => x / 2))
```
We can keep adding operations on plain integers without worrying about error states until the whole chain is done. 
We completely remove error handling from our core logic without sacrificing safety.

Scott Wlaschin calls this [Railway-Oriented Programming](https://fsharpforfunandprofit.com/rop/).


## Mapping back
Our final C# result-type was close. A little functional inspiration resolves the rest of the issue too.
 - Constructor type conflicts => Static methods for clear state initialization
 - Noisy success checking => apply-like action binders

We can take this even further by standardizing methods for combining multiple results. For example, if we want to run 5 validators and only succeed if all succeed, but return errors from each failure if not.

The core issue with C# is still the polymorphic behavior between implementations. Using one generically typed result class ends up with a tiring amount of type parameters. However, deriving results with specified types doesn't work because the child can't override the return type of it's inherited methods.

## Summary

It was a long trip, but the results are pretty good. The result type we end up with in C# is still kinda verbose with generic type parameters. However, pretty much all of the lessons from thinking functionally can be used in C# to create greater clarity while reducing error handling code.




## Further Reading
- https://fsharpforfunandprofit.com/rop/
- https://fsharpforfunandprofit.com/posts/recipe-part2/
- https://fsharpforfunandprofit.com/posts/against-railway-oriented-programming/
- https://fsharpforfunandprofit.com/posts/discriminated-unions/
- https://docs.microsoft.com/en-us/dotnet/fsharp/language-reference/results

<!--
- if I had covariant returns, then I could define all of the functions on the base class, then create a derived version that also takes a generic parameter for the
  inheriting type and simply returns all of the base class methods bimapped to the derived class. That means I could work with the base class when I like and inherit, keeping all functions for the derived types

-->