---
date: "2020-11-07T00:00:00Z"
seriesId: "Language-Limited Thought"
series_description: Exploring how different languages equip us to solve different design problems
tags: [Languages, Functional Programming, Design Thinking, Pivotal Insights]
title: Id Abstractions
aliases:
- /2020/11/07/id-abstraction
---

I once worked for a company that exposed all of their entities IDs as integers. It's common practice, but it bit them hard when they needed to adopt an offline-then-merge strategy for client data. This required switching ids to Guids all over the code base and it was an arduous undertaking. I've been trying and failing to simply abstract ID types since.
<!--more-->

Here I'll define the problem, look at attempted solutions in C#, and finish with the simple solutions in F#.

## The Problem
The core problem is hiding entity ID types from the majority of the system. Only the periphery, like database accessors, should be know the underlying ID type. IDs will be referenced just about everywhere, making them very painful to change without abstraction.

Explicit ID types also 
- Make clearer type signatures
- Prevent accidental swapping of entity ids (int can swap with int, but not UserId with CompanyId)

An ideal solution would 
- be strongly typed
- Hide the underlying type by default
- Define all operations/constants without exposing underlying type
  - NewId
  - DefaultId
  - Sortable
  - Equatable
- Accept different underlying types without having to re-implement core behaviors
- Easily convert to and from the underlying type at periphery of system

## Issues in C#

Implementing a single ID abstraction is easy in C#. The issue comes with reusability.

My first instinct was a type alias, but C# doesn't have those. A type alias also doesn't hide the underlying type or improve type safety, it just creates an interchangeable type name.

My next instinct was to make a generic `Id<T>`. This allows ID types for any comparable `T` (like ints, Guids, strings, etc). However, it does not hide the underlying type from the system. The type is still spread everywhere as a generic type parameter.

The next thought was to inherit from `Id<T>`. 
```cs
class UserId : Id<int>{}
```

Looks great... but all of the methods return type `Id<int>` and not `UserId`.
C# allows overrides, but it does not allow co-variant overrides. This means that UserId cannot override `NewId()` to return a `UserId` even though `UserId` inherits `Id<int>`. 

We can get creative with the generic type system.
```cs
class 
class Id<T, TDerived>{
  public TDerived NewId() //...
  //...
}
class UserId : Id<int, UserId>{}
```

However, This creates a dangerous illusion of polymorphism while violating Liskov substitution. It is also just weird and a bit hard to follow.

## Functional Approach

The functional solution isn't based in some fundamentally different concept. Rather, it's a convenient side-effect of composable types, specifically discriminated unions which "OR" type classes together. That is, Union-types contain a single value, but the value can be any one of multiple possible types.

However, no one said we have to include multiple types in the union. Adding just one type gives us a convenient alias-like construct that
- is strongly typed
- hides the underlying type
- has convenient instantiation from the underlying type
- provides a convenient and safe way to unwrap the underlying value

```fsharp
type UserId = | Id of Guid
module UserId = 
  let newId () = Id(Guid.NewGuid())
  let defaultId = Id(Guid.Empty)
  // equal and sort come for free
```

This is so trivial, it almost wouldn't matter if code was duplicated. Still, functions could be easily shared by aliasing a generic module.
```fsharp
module UserId = GuidIdModule
```

## Mapping Back to C#
Sadly I haven't found a good way to map this knowledge back to C#. I'm personally hoping that Microsoft isn't just teasing us about [co-variant overrides in C# 9](https://devblogs.microsoft.com/dotnet/welcome-to-c-9-0/). My hopes aren't high though. I'm still waiting for record types which were first proposed two versions ago. 
