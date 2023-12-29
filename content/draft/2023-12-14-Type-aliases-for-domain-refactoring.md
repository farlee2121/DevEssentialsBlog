---
date: 2023-12-14
tags: [Domain-Driven Design]
title: Type Aliases for Progressive Domain Refactoring
---

Type aliases are a convenient way to reflect intent in code without breaking existing behaviors.
<!--more-->

<!-- 
I want to change my approach here. C# aliases don't work like I'd hoped.
They're file-specific, not really a type of their own that can be referenced all around

[Expanded type alias support](https://learn.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-12#alias-any-type) might be my favorite change in C# 12. -->

## Why Use Type Aliases

Aliases of interest
```fsharp
type TestId = string
type ProjectPath = string
type TargetFramework = string
type FullTestName = string
type TrxPath = string
type ConsoleOutput = string

type CodeBasedTestId = TestId
type ResultBasedTestId = TestId
```

```fsharp
let testLocationCache = Collections.Generic.Dictionary<string, LocationRecord>()
let testLocationCache = Collections.Generic.Dictionary<TestId, LocationRecord>()
```


<!-- Type aliasing is a tool I used quite a bit working on an F# backend. -->

- Lots of function passing in F#. Easy to misunderstand without semantic names
  - Maybe give some examples from Ionide test explorer
  - maybe introduce by showing unaliased snippets and asking what they do
- Much easier if you change type or refactor to value types for stronger guarantees
- Talk about C# 
  - Can't really alias this way in C#. Aliases don't work the same.
  - Establish that C# has the same problem (higher-order functions less common, but return parameters, for example still aren't named)

  
Q: can type aliases be exported in C#?