---
layout: post
tags: [Languages, Functional Programming, Design Thinking,
        Pivotal Insights]
series: Language-Limited Thought
series_description: Exploring how different languages equip us to solve different design problems
---

# Type Safety with Multiple Valid Input Types

Sometimes a constructor or function can naturally accept multiple types. The classic solution to this is overloading. The problem is overloading can combinatorially expand for every multi-typed parameter.

A classic example is the database connection. .Net offers a strongly typed DbConnection type, but the connection is usually stored as a string. There may also be framework-specific representations. Different users will have different opinions about how they want to represent the connection string. Forcing users to convert every time would be frustrating.

Types may not always be directly interchangable. Configuration is a common source of this pattern force. For example, when a user might just want to specify the number of concurrent connections, or they may need to be specific about concurrency, lifetime scope, resource division, and more. 


<!-- Similar scenarios might apply for mostly-polymorphic behavior. Consider passing a ... instead of caseing on type, could clearly communicate the  -->

## Classic Solution

The classic solution in C-like languages is overloading, offering the action with multiple type signatures
```cs
public DbContext(string connection){
    //...
}

public DbContext(DbConnection connection){
    //...
}
```

This is tidy for a single overload, but every multi-type parameter creates a combinatorial explosion of necessary overloads. With every parameter having just two options, this example would need $2^3=8$ signatures to be complete.

```cs
public void ConfigureMessageBus(string connectionString, int maxThreads, int prefetch);

public void ConfigureMessageBus(Connection connection, ThreadSettings threadSettings, PrefetchSettings prefetchSettings);
```

Overloads also don't work for properties of a data structure. Consider a configuration object with a connection string property. The only options are to offer two fields and implicitly leave one unused, or to force users into one type.

## Functional Foundations
Functional programming is rooted in math. Every math function has a range and a domain. 

$$Domain \rarr function \rarr Range$$
- Domain = input values
- Range = output values

In a programming sense, the domain is the valid input type and the range is valid output types.

Domains and ranges are  can be combined different ways in math, and they can in functional programming too.

First consider tuples. Tuples, triples, etc are a collection of n values. For example, `(5, "sam")`. Stop and think for a moment. This is the same as a vector in math.

This means that tuples "multiply" two type spaces. The tuple example before is an `(int, string)`. It can contain any int value paired with any string value. It's like making a graph with ints on axis and strings on the other. Using it as input or output is like specifying a point on that graph.

If we can multiply type spaces, then why not add? 

Functional languages allow this with a discriminated union. They can hold any one value from a determined set of types. You can also thing of it as an OR type.
```fsharp
// Truthy takes a bool, int, or string
type Truthy = 
  | Bool of bool
  | Int of int
  | String of string
```

## Functional Approach
Discriminated unions allow a single argument to take any one of a set of types. This works very well overload-like situations. Each multi-type parameter is independent. There is only one signature, no matter how many types each parameter allows. 

It does require users must instantiate their value as the discriminated union, but that is generaly simple compared to the clarity and maintainability. 

Functional languages can also use overload-like behavior, but union-types accomplish the same task without an explosion in signatures. The single signature also more clearly documents its different uses cases all at once. 

## Back to C#

Union-types have no convenient analog in most non-functional languages. However, some programmers have used generic typing with linq-style function chaining to mimic unions. One example is called [OneOf](https://github.com/mcintyre321/OneOf).

## Summary

Overloads aren't so bad. They enable flexible and direct use of a function with limited type variability. Borrowing union types from functional programming pushes that flexibility even further, helping us to clearly and safely represent interchangeable type values. 

## Further reading
- https://github.com/mcintyre321/OneOf

(overloading not a thing in functional programming, composition is so easy it doesn't matter)

// split off another post for multiple valid input types (string/ConnectionString)
 - actually fairly easy in c#, but creates expanding interfaces. Multiple such arguments cause a signature explosion. Can handle via objects, but a requires some mind wrapping (do you cast? )
 - also have to reprensent the multiple possible types through several layers (possibly)