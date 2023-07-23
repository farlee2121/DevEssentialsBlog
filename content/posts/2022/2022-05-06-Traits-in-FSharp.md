---
date: "2022-05-06T00:00:00Z"
tags: [Rust, F#, Inheritance, Composition, Traits]
title: Why No Traits (late-bound inheritance) in F#
aliases:
- /2022/05/06/traits-in-fsharp
---

I fooled myself for a moment into thinking F# has ad-hoc polymorphism. Interface inheritance in F# looks a lot like traits in rust. So, why doesn't F# support trait-like polymorphism.
<!--more-->

## What is a trait?

Traits can be seen as late-bound inheritance. It allows us to add new polymorphic behavior to pre-existing types at any time.

## Interface Inheritance
The first contributor to my confusion was how F# notates inheritance. 

In F#, interface inheritance is syntactically separate from class inheritance. 

```fsharp
type Cat () =
    interface IMeow with
        member self.Meow () = "nya"
```

Implementations are explicitly tied to their interface. There is no ambiguity about what implementation is linked to what interface.
Interface inheritance also can't cause behavior conflicts, since interfaces don't contain behavior.

All together, there is no worry about member conflicts. We can always select the right implementation based on which interface the type is called as.



## Type Extension

The second contributor to my confusion was that F# can [add members to a type at any time](https://fsharpforfunandprofit.com/posts/type-extensions/) as demonstrated below.
```fsharp
type System.Int32 with
    static member IsOdd x = x % 2 = 1

type System.Double with
    static member Pi = 3.141

let pi = System.Double.Pi
```


## Hypothesis: Traits require behavior-data separation

All the above qualities of F# look like it's primed for ad-hoc interface inheritance. However, F# does not support interface inheritance outside the initial declaration.

```fsharp
type Cat with //WONT COMPILE
    interface IMeow with
        member self.Meow () = "nya"
```

I'd guess this has to do with potential state. Rust traits only support functions and leaves data members to separate type definitions. I forgot that C# and F# interfaces support data interface members because I effectively never use this feature.

Potential state leaves us with bad options. A type could implement two traits with conflicting data members (i.e. same name). The conflicting members could share state, but this would break their independence and cause unclear coupling between contexts. Alternatively, different trait implementations could ignore each others state, but this likely creates an illusion of expected shared state. The rules for mutating data become muddy either way.

With this in mind, we'd probably need a new language construct to safely achieve traits. A new construct opens a world of potential compatability issues with other .NET languages.


## Update: Don Syme on Type Classes

I definitely need to spend more time with traits to understand them properly.
However, I understand them to to be much like [type classes](https://en.wikipedia.org/wiki/Type_class).
Don Syme has a good response to [why F# won't support type classing](https://en.wikipedia.org/wiki/Type_class).
That said, there is limited support via [static member constraints](https://www.withouttheloop.com/articles/2014-10-21-fsharp-adhoc-polymorphism/)



<!-- 
It looks like haskell can manage data members in type classes...

Ad-hoc polymorphism is not defined like i'd expect https://en.wikipedia.org/wiki/Ad_hoc_polymorphism. It says examples are function or operator overloading. It's about operating on different parameters rather than operating different types invoking under some interface
 -->