---
date: "2021-04-16T00:00:00Z"
tags: [C# 9, Patterns]
title: Static Member Enums Update
aliases:
- /2021/04/16/member-enum-update
---

I [previously wrote](../posts/2020-08-07-Structs-vs-Enums.md) on how static members on a struct work as a more extension-friendly enum. This pattern has gotten even better as of C# 9.
<!--more-->

## Records
The first improvement comes via records. Records are reference types with value-based equality. The main benefits are
- they don't have the size restriction of structs
- They implement value-based `.Equals`, `.GetHashCode`, `==`, and `!=` by default

```cs
public partial record Color
{
    public string Id;
    public ColorRecord(string id) => Id = id;
    
    public static Color Red = new Color("Red");
    public static Color Blue = new Color("Blue");
    public static Color Green = new Color("Green");
}
```

## Generators
C# 9 also introduced [source generators](https://devblogs.microsoft.com/dotnet/introducing-c-source-generators/), which allow us to reflect at compile-time.

I created a generator, [StaticMemberEnum.Generator](https://github.com/farlee2121/StaticPropertyEnum.Generator), that automatically adds a `.KnownValues()` method on declarations with the `[StaticMemberEnum]` attribute. Now known values can be accessed without writing and maintaining boilerplate.

Other generators, like [Generator.Equals](https://github.com/diegofrata/Generator.Equals), let you auto-implement equality and comparison if you still want to use a class or struct.

The best part is that generators work on older versions of C# as long you have a new enough SDK version installed! These generator power-ups can be dropped into existing code bases without upgrading language or framework versions!


In summary, most of the boilerplate with member enums has disappeared. Thanks to generators, this even retroactively applies to older language versions. 