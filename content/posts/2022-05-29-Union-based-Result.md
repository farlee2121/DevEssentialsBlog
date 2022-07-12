---
date: "2022-05-29T00:00:00Z"
tags: [Union Types, C#, Discriminated Unions]
title: Union-based Result Types in C#
---

I previously wrote about [result types](../posts/2021-01-15-Results-Update.md) and [union types](../posts/2021-03-26-Unions-in-CSharp.md) in C#. I got to wondering if a union-based approach would allow nicer result types. In short, it works, but not as nicely as I'd hope.
<!--more-->

Some of my previous goals for results types included
- Low-barrier to creating result types
- Alias result types to mitigate long generic type parameters 
- Interoperability between result types, being able to map from one to another.

## Basic Result Type

It's pretty quick and easy to create a result type with a union approximation

```cs
public record Result<TSuccess, TError>
{
    internal Result(){};
    public record Success(TSuccess data) : Result<TSuccess, TError>;
    public record Error(TError data) : Result<TSuccess, TError>;

    // Optional factories
    public static Result<TSuccess, TError> Ok(TSuccess success) => new Success(success);
    public static Result<TSuccess, TError> Fail(TError error) => new Error(error);
}
```

This could then be consumed like
```cs

result switch
{
    Success success => // do thing
    Error error => //do other thing
    _ => // shouldn't happen
};
    
```

The main issue here is pattern exhaustiveness (the `_` case). There is no way to limit the recognized derivatives to just Success and Error. Therefore we must always handle the open-ended case when pattern matching or surpress errors. This breaks my mental model of what I expect when matching on a result type. We can hide that detail by providing some `.Handle(onSuccess, onFailure)`, but then we loose the desired benefit of pattern matching over callbacks.

Note that we can limit the actual possible derivatives. The `Result<TSuccess, TError>` constructor can be made `internal` to limit derivatives to the source assembly. We can even make the constructor to `private` and still derive nested types, like how Success and Error are nested above.

It should be possible to improve the static analyzer to recognize limited derivatives based on constructor accessibility, but the current analyzer does not do so.

## Aliasing / Deriving

C# does not allow type aliasing, so any named results have to be derived types of Result. 


Deriving from our earlier result type leads to some issues. Mainly, `Success` and `Error` are `Result<int,string>` and not valid instances of the derived type
```cs
public record DerivedResult : Result<int, string>
{
    public static void TryStuff()
    {
        new DerivedResult.Success(0);
    }
}

DerivedResult.Ok(5); // !!! This creates Result<int, string> != DerivedResult
```

This could be worked around in [the class-based result-type experiment](../posts/2021-01-15-Results-Update.md). However, a similar workaround doesn't compile for the union-like approach. The success and failure types would need to inherit from arbitrary derivatives of Result, but generic type parameters cannot be inherited from.

```cs
public record DerivableResult<TSuccess, TError, TResult> where TResult : DerivableResult<TSuccess, TError, TResult>
{
    public record Success(TSuccess success) : TResult; // WON'T COMPILE
    public record Error(TError error) : TResult; // WON'T COMPILE

    public static TResult Ok(TSuccess success) => new Success(success);
    public static TResult Fail(TError error) => new Error(error);

}

```

## Conclusion

Overall, making a result type using union-like records is pretty quick and easy. Unfortunately, pattern matching is a bit awkward and scenario-specific aliases cannot be derived from the root result type.
