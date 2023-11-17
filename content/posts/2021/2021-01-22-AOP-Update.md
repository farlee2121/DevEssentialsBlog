---
date: "2021-01-22T00:00:00Z"
tags: [C# 9, Aspect-Oriented Programming]
title: Aspect-Orientation Update for C# 9
aliases:
- /2021/01/22/aop-update
---

I [previously wrote](../../posts/Language-Limited-Thought/2020-10-16-AOP-and-Decorator.md) on the difficulties of Aspect-Orientation in C#. The addition of Source Generators in C# 9 changes the possibilities considerably.
<!--more-->

[Source Generators](https://devblogs.microsoft.com/dotnet/introducing-c-source-generators/) are much more general than just AOP. They are essentially compile-time reflection. They allow us to use our own code (or any resource) as information to generate code. This allows programmers to leverage all kinds of relationships beyond what the language itself can piece together. There is also no significant performance hit, since everything is determined at compile-time.

The Roslyn team has a [number of examples](https://github.com/dotnet/roslyn/blob/master/docs/features/source-generators.cookbook.md) including
- Type serializers
- Automatic Diagnostic logging
- Inline table-driven methods and mappings
- Automatic implementations for mechanical interfaces (like INotifyPropertyChanged)

The community has already leveraged generators for relationships like
- [Structural equality and comparison](https://github.com/diegofrata/Generator.Equals)
- [Object mapping](https://medium.com/rocket-mortgage-technology-blog/generating-code-in-c-1868ebbe52c5)
- [Rest Api Wrappers](https://github.com/canton7/RestEase#using-resteasesourcegenerator)

I also wrote a [basic generator for extending property enums](https://github.com/farlee2121/StaticPropertyEnum.Generator).

The same concepts could be applied for fast proxies, which enables AOP concerns like 
- Declarative security (perhaps based on a config file)
- Centralized and transparent Retry policies
- Trivial and transparent remote communication wrappers

The authoring experience leaves much to be desired, but I have confidence it will improve over time.

All-in-all I think source generators are a big win for expressive designs in C#!