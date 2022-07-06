---
date: "2021-01-15T00:00:00Z"
tags:
- C# 9
---
# Result-type Update for C# 9

I [previously wrote](./Language%20Limited%20Though/2020-10-30-Result-Types.md) on the difficulties of normalized result types in C#. Let me be clear, result types are still not great in C#, but C# 9 at least makes them practical.

When I'm thinking practical, I mean
 - It's easy enough to create a result type that I don't hesitate
   - Don't have to implement a bunch of boiler plate for every type definition
   - A tame amount of generic type arguments. Definitely not multiple explicit arguments for every operation  
 - Result interoperability
   - Should be able to operate on groups of results to produce new results
   - Some basic operations should be polymorphic between all result types
     - like `IsSuccess` or `IsFailure`
   - Should be able to map between result types generically

The key feature that makes it possible is covariant returns. Derived classes can override parent methods with implementations that return a more specific type of the original return value. For example,

```cs
class BaseId{

    public virtual BaseId Default() {
         //...
    }
}

class DerivedId : BaseId {

    public override DerivedId Default() {
        // This is a proper override that will be executed even when the instance is called as a BaseId
         //...
    }
}
```


This allows some shenanigans with the generic system that result in practically usable result types.  Observe

```cs
interface IResult
{
    bool IsSuccess();
    bool IsFailure();
}

public record Result<TSuccess, TFailure> : IResult
{
    protected TSuccess Success { get; init; }
    protected TFailure Failure { get; init; }
    public virtual Result<TSuccess, TFailure> Succeed(TSuccess success)
    {
        return new Result<TSuccess, TFailure> { Success = success };
    }

    public virtual Result<TSuccess, TFailure> Fail(TFailure fail)
    {
        return new Result<TSuccess, TFailure> { Failure = fail };
    }

    public bool IsSuccess() => //...
    

    public bool IsFailure() => //...
}

public record DerivableResult<TDerived, TSuccess, TFailure> : Result<TSuccess, TFailure> where TDerived : DerivableResult<TDerived, TSuccess, TFailure>, new()
{
    public override TDerived Succeed(TSuccess success)
    {
        return new TDerived { Success = success } ;
    }

    public override TDerived Fail(TFailure fail)
    {
        return new TDerived { Failure = fail };
    }
}

public record SavePersonResult : DerivableResult<SavePersonResult, int, string>
{

}
```

Note that we end up with 
- a generic result type 
- the ability to make strongly typed results in one line
- interoperability between all our result types

Generic result types enable arbitrary success/failure combos with strong typing. This is especially useful when aggregating result types.

There is also minimal generic type argument to deal with. They need only be specified once, when the result type is defined.
We also benefit from chained actions on the result type, since even inherited operations can return the derived type.

The downside is that result actions are tied to particular types. There is no way to nicely share a static module of functions between result types.
This means our code looks more like `new SavePersonResult().Fail("oops")` rather than `Result<SavePersonResult>.Fail("oops")` or `Result.Fail("oops")`.

All in all, I still consider this a big win for improved design expression in C#!