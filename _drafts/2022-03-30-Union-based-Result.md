
I previously wrote about [result types](../_posts/2021-01-15-Results-Update.md) and [union types](../_posts/2021-03-26-Unions-in-CSharp.md) in C#. I got wondering if union-based approach would allow nicer result types. In short, it works, but not as nicely as I'd hope.

Some of my previous goals for results types included
- Low-barrier to creating result types
- Alias result types to mitigate long generic type parameters 
- Interoperability between result types, being able to map from one to another.

## Basic Result Type

It's pretty quick and easy to create a result type with a union approximation

```cs
public record Result<TSuccess, TError>
{
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

The main issue here is the `_` case. There is no way to limit the set of result derivative to just Success and Error. Therefore we must always handle the open-ended case when pattern matching. This breaks my mental model of what I expect from a result type. We can hide that detail by providing some `.Handle(onSuccess, onFailure)`, but then we loose the desired benefit of pattern matching over callbacks.

## Aliasing / Deriving

C# does not allow type aliasing, so any named results have to be derived types of Result. 


Deriving from our earlier result type leads to some issues. Mainly, `Success` and `Error` are `Result<int,string>` and not valid instances of derived type
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

This could be worked around in [the previous result experiment](../_posts/2021-01-15-Results-Update.md). However, a similar workaround does compile for the union-like approach because generic type parameters cannot be inherited from.

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

Overall, making a result type using union-like records is pretty quick and easy. Unfortunately, pattern matching is a bit awkward because we cannot enforce a closed set of result derivatives. Deriving from result also does not create workable types.
