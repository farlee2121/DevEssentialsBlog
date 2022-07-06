---
date: "2022-04-29T00:00:00Z"
tags:
- Rust
- F#
---

# Small Quibble with The Great Rewriting in Rust
[The Great Rewriting in Rust](https://deprogrammaticaipsum.com/the-great-rewriting-in-rust/) is a good overview of why Rust is a compelling and growing language.
However, I have a small quibble with how it refers to F#.

The article states
> F#, Dart, Swift, or Kotlin either, which seem to be more interested in replacing the null keyword with optionals, thereby solving Sir Hoare’s mistake.

Sir Hoare’s mistake refers to `null`. I can't speak to Dart, Swift, and Kotlin, but I know F# rather well. In fact, my dabbling in Rust was fairly easy because I found it shares many language choices with F#.

I'll compare F# against the article's listed good qualities of Rust to demonstrate

- ✅ [Open Source](https://github.com/dotnet/fsharp)
- ✅ [Generics](https://fsharpforfunandprofit.com/posts/completeness-anything-csharp-can-do/#generics)
- ✅ [Optionals](https://fsharpforfunandprofit.com/posts/the-option-type/)
- ❌/🟨 Ad-hoc polymorphism (traits)
  - It's possible with static member constraints, but not great
- ✅/🟨 Results over Exceptions
  - F# treats exceptions similar to Rust. Results are preferred, but exceptions are still available. Rust also has exceptions, but calls them [panics](https://doc.rust-lang.org/std/macro.panic.html)
- ✅ [Functional programming constructs (lambda, collection functions)](https://docs.microsoft.com/en-us/dotnet/fsharp/tutorials/functional-programming-concept)
- ✅ [Type inference](https://fsharpforfunandprofit.com/posts/conciseness-type-inference/)
- ✅ Strong and static typing
- ✅ [Simple install](https://docs.microsoft.com/en-us/dotnet/core/install/windows?tabs=net60)
- ✅ Extensive built-in functionality
  - F# benefits from the robust .NET Base Class Library
- ✅ [Vibrant package ecosystem](http://nuget.org/)
- ✅ [Featured unit testing](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-test)
- ✅ [Immutable by default](https://docs.microsoft.com/en-us/dotnet/fsharp/tutorials/functional-programming-concepts#immutability)
- 🟨 Macros
  - I'm not sure macros are a 100% positive. I've not gone deep with Rust macros, but other languages I've used with syntactic macros showed some [downsides along with the good](../posts/2021-09-17-Macros-not-a-clear-win.md). F# does have [Type Providers](https://docs.microsoft.com/en-us/dotnet/fsharp/tutorials/type-providers/) and [Quotations](https://docs.microsoft.com/en-us/dotnet/fsharp/language-reference/code-quotations) for more constrained meta-programming. Introspection is available but executes at runtime and is relatively slow.
- ❌ Primitive arrays include length in type declaraion
  - F# doesn't have this, but I rarely care about fixed-length collections in F#
- 🟨 Blazing fast
  - F# is fast enough for most applications, but Rust definitely has an edge in low-level performance. Rust programmers have to think about memory ownership in exchange for no garbage collection and improved performance. F# has the opposite tradeoff: programmers don't worry about memory but rely on garbage collection.
- 🟨 Static linking
  - [Possible with .NET](https://stackoverflow.com/questions/1868449/static-linking-of-libraries-created-on-c-sharp-net), but not as mainstream
- ✅ [WebAssembly](https://fsbolero.io/)
- ✅ Active community (conferences, Q&A, [Online sandbox](https://try.fsharp.org/), [great learning materials](https://fsharpforfunandprofit.com/), etc)
- ✅ No GOTO / Proper structured programming
  - This one actually surprised me. C# has GOTO, even if it's rarely used. F# decided to leave it out though. Good for them.


As you can see, F# shares most of the listed benefits of Rust. Thus I think the author's poke that F# is mostly "interested in replacing the null keyword" is unwarranted.

That said, there are certainly good reasons to choose each of these languages over the other. F# developers can skip the complications of memory management and levage the vast .NET ecosystem, including very mature tooling. Rust, on the other hand, can cater to even the most strict low-level performance requirements while still offering many high-level language constructs.

Rust is great language. I'm glad to see Rust gain traction, but don't discount F#!