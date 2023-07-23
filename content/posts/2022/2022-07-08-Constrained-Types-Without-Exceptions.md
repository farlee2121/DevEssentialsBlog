---
date: "2022-07-08T00:00:00Z"
draft: false
tags: [C#, Type-Driven Development, Value Types]
title: Constrained Types without Exceptions
aliases:
- /2022/07/08/constrained-types-without-exceptions
---

Representing constrained values with types greatly reduces defensive programming. However, constraints make some values invalid, and constructors don't allow for flexible return types like a failure state. Here's an approach to constructing constrained values without relying on exceptions.
<!--more-->

## Why constrained types

First, let's consider why we want constrained types. Programming languages come with many basic types (primitives): integers, floats, strings, dates, etc. 
These types are very general and represent many of the most fundamental data categories at our disposal. 

Values in real problem spaces often don't allow the entire domain of a primitive type. For example, an order quantity can't be negative, user birthdays can't be in the future, new reservations can't be made in the past.

```cs
record PositiveInt{
    private int value;

    public PositiveInt(int value){
        if(value < 0) throw InvalidArgumentException("Bar must be greater than zero")
        this.value = value;
    }
}
```

Collecting these constraints into a type greatly reduces defensive programming. Consumers can use the value without having to re-verify that it meets expected constraints. It also better communicates domain realities to users of a system.

## But Construtors Require Exceptions 

Constraint also mean that some input values are not valid. We expect there could be an error when we try to create a constrained value from unconstrained input. 
The problem is that object-oriented languages create types via constructors. Constructors do not have flexible return types, they can only return an instance of the class.

This is a problem. Our code has an expectable error that we may want to react to, but the constructor can't communicate the possible error to consumers or how the error will be represented for them to handle. The constructor is forced to use exceptions, but exceptions are meant for unrecoverable errors that should terminate the program. They also require awkward try-catch workflows to handle. Overall, this approach violates the [principle of least surprise](https://en.wikipedia.org/wiki/Principle_of_least_astonishment).

## Replace Constructors with Factories

The solution is to replace the constructor with a factory and make the constructor private.
No external consumers will be able to create invalid instances, and the factory can return some type that communicates possible failure modes.

```cs
record PositiveInt{
    private int value;

    private PositiveInt(int value){
        this.value = value;
    }

    public PositiveInt? FromInt(int value){
        var result = value switch {
            < 0 => null,
            _ => new PositiveInt(value)
        };
        return result;
    }
}
```

More advanced scenarios might want to communicate different kinds of errors.
```cs
record PhoneNumber{
    private string value;

    private PhoneNumber(string value){
        this.value = value;
    }

    public enum Errors{
        Empty,
        MissingCountryCode,
        UnRegistered
    }
    public Result<PhoneNumber,Errors> FromInt(string value){
        if(value == null) return Result<PhoneNumber,Errors>.Fail(Errors.Empty);
        // other checks...
        
        return Result<PhoneNumber,Errors>.Succeed(new InventoryCount(value));
    }
}
```

## Conclusion

Communication is key to maintaining code. Wrapping constrained values with a type improves communication and decreases defensive programming. Factories, instead of constructors, can improve these types by clearly communicating potential creation errors.