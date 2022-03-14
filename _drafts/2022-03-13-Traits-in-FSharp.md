---
layout: post
tags: [Rust, F#, Inheritance, Composition, Traits]
---

# Why No Traits (Ad-hoc inheritance) in F#

I fooled myself for a moment into thinking F# has ad-hoc polymorphism. Interface inheritance in F# looks a lot like traits in rust. So, why doesn't F# support trait-like polymorphism.

## What is a trait?

Traits can be seen as late-bound inheritance. It allows us to add new polymorphic behavior to pre-existing types at any time.

## Interface Inheritance
In F#, interface inheritance is syntactically separate from class inheritance. 

```fs
type Cat () =
    interface IMeow with
        member self.Meow () = "nya"
```

Implementations are explicitly tied to their interface. There is no ambiguity about what implementation is linked to what interface. 

Interface inheritance also can't cause behavior conflicts. Interfaces don't contain behavior.

All together, we can always select the right implementation based on which interface the type is called as. 


## Type Extension

F# can [add members to a type at any time](https://fsharpforfunandprofit.com/posts/type-extensions/) as demonstrated below.
```fs
type System.Int32 with
    static member IsOdd x = x % 2 = 1

type System.Double with
    static member Pi = 3.141

let pi = System.Double.Pi
```


## Hypothesis: Traits require behavior-data separation

All the above qualities of F# look like it's primed for ad-hoc interface inheritance. However, F# does not support interface inheritance outside the initial declaration.

I'd guess this has to do with potential state. Rust traits only support functions, and leaves data members to separate type definitions. I forgot that C# and F# interfaces support data interface members because I effectively never use this feature.

Potential state leaves us with bad options. A type could implement two traits with conflicting data members (i.e. same name). The conflicting members could share state, but this would break their independence and cause unclear coupling between contexts. Alternatively, different trait implementations could ignore each others state, but this likely creates an illusion of expected shared state. The rules for mutating data become muddy either way.



TODO: consider sneaking in https://www.withouttheloop.com/articles/2014-10-21-fsharp-adhoc-polymorphism/

TODO: I'm not confident in this assessment. 

IDEA: maybe post this as-is with an addendum refering to Don Syme's post on type classes and how he sees them as often fostering unhealthy programming patterns, like trying too hard to type class everything