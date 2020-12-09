---
layout: post
tags: [functional, F#, Guided Reader]
---

# Functional Guided Reader

I absolutely love Scott Wlaschin's work. He breaks down the unfamiliar and sometimes complex ideas of functional languages into approachable explanations. My one gripe with his site is that there is a bit of an implicit order to the content. Here's my outline of how I think the concepts best build on each other. 

I know he divides posts into topics in his [site contents page](https://fsharpforfunandprofit.com/site-contents/), but it isn't really a reading order. Some of the early series recommend pre-requisites, but not until you already start reading.

This guided reader starts at "Why would I learn another language" and aims to leave the reader at "I can picture a wholistic functional system". Nothing can replace experimentation and application for developing a working understanding. However, this list should provide a fairly gentle curve for introducing the concepts.

If you'd rather just dive in, then his videos are a great place to start. His videos embody the most critical ideas on his site, and almost every video also points to an equivalent blog series.

## Full Path

- [Four Languages from Fourty Years Ago](https://www.youtube.com/watch?v=0fpDlAEQio4)
  - Great motivation on why learning languages is imporant and the most important language types to learn
  - Also desirable langauge properties
- [Learning F#](https://fsharpforfunandprofit.com/learning-fsharp/)
  - Good advice on the mindset for learning F# or any functional language
  - Also leads into so starter series
- [Functional Design Patterns](https://vimeo.com/113588389)
  - Introduces functional concepts in an approachable way that leans on knowledge from OO patterns. Helped me feel like I wasn't throwing away all the practices I built up
- [Why F#](https://fsharpforfunandprofit.com/series/why-use-fsharp.html)
  - At least read up to the Comparing F# with C# posts to get a gentle introduction to F# syntax
  - Most of the rest of this series previews ideas that later series will cover. Most of the posts are very quick reads and do not need to be read in order.
    - I recommend [Using Functions to Extract Boilerplate](https://fsharpforfunandprofit.com/posts/conciseness-extracting-boilerplate/). It addresses a class of very common looping scenarios that threw me off when adjusting to F#. 
- [Thinking functionally](https://fsharpforfunandprofit.com/posts/thinking-functionally-intro/)
  - Dig into the concepts of functional programming
  - Set the right mindset for getting the most of FP and not just a poor mapping of OO into a langauge not suited for it
- [Understanding F# Types](https://fsharpforfunandprofit.com/series/understanding-fsharp-types.html)
  - A quick read that clarifies F# types not typically found in C# or other OO languages
  - It suggests first reading [Expressions and Syntax](https://fsharpforfunandprofit.com/series/expressions-and-syntax.html), but I think this series can be read later.
    - [Expressions and Syntax](https://fsharpforfunandprofit.com/series/expressions-and-syntax.html) is a deeper dive into syntax and the motivation for F# syntax decisions. I'd almost recommend coming back to this one later to avoid even knowing the imperative syntax, though he does preface every imperative expression with a way to avoid it
- [Railway-Oriented Programming](https://vimeo.com/113707214)
  - A powerful metaphor for functional composition
  - Introduces the mental schema for how parts build up into flows in a functional way. Also clarifies the benefits of composing this way 
  - [The Functional Toolkit](https://www.youtube.com/watch?v=bK-Tz-GLfOs) is good if you want more on composition
- [Domain Modeling made functional](https://www.youtube.com/watch?v=Up7LcbGZFuo) or blog equivalent [Designing with types](https://fsharpforfunandprofit.com/series/designing-with-types.html)
  - Introduces how to encode your domain with types
  - Types in F# are lightweight so we can enforce more of our domain without a burdensome amout of boilerplate
- [A Recipe for a Fully Functional App series](https://fsharpforfunandprofit.com/posts/recipe-part1/)
  - Starts to pull together the techniques into the bigger picture of a system
- [Functional Approaches to Dependency Injection](https://fsharpforfunandprofit.com/posts/dependency-injection-1/)
  - DI is a big part of how I comprehend systems in the C# world. This article helped me come to terms with how the same concerns are preserved in a functional world, a big step toward making larger systems.
- Is there a more intermediate composition post to go here?
- [Designing with Capabilities](https://vimeo.com/162209391)
  - Takes type-driven design a step further to limit potential security and design abuse
- [Enterprise Tic-Tac-Toe](https://vimeo.com/131196782)
  - Pulls most of the ideas together into a worked example. A nice example of the thought process and some practical bits like information hiding techiques
- [Code Review/Refactor](https://www.youtube.com/watch?v=nxIRlf4AtcA)
  - Review of the major concepts with very helpful hightlight of smells and refactorings
  - You'll want to have tried making a small system by now
- [Property-based Testing](https://fsharpforfunandprofit.com/posts/property-based-testing/)
  - A different approach to testing. Not strictly functional, but plays well with Type-Driven systems. 
  - A good complementary approach to Unit Tests. Seems to effectively test some of the hardest qualities to pin down with example-based testing 
- [Elevated worlds](https://fsharpforfunandprofit.com/posts/elevated-world/)
  - Demystify `monads` and similar types that make composition so powerful in functional programming
  - Getting into the workings of techniques for matching up types in composition, as well as some inversion of control (state and reader monads)
  - [Dr. Frankenfunctor and the Monadster](https://vimeo.com/162054542) is another good example to follow up with 
- [Monoids Without Tears](https://fsharpforfunandprofit.com/posts/monoids-without-tears/)
  - Understand another underlying concept for effective data structuring
- Optional: [Computation Expressions](https://fsharpforfunandprofit.com/series/computation-expressions.html)
  - A deeper dive into implementing computation expressions (the language mechanism for simplifying monads)

### Tools for Experimenting
I highly recommend you try out these ideas as you work through the readings. It is a lot to digest and the best way to process it is by doing.
Scott Wlaschin has [a similar post](https://fsharpforfunandprofit.com/installing-and-using/), but a lot has changed since then.


Here are tools and tips for working in F#
- The common errors you'll see are very different from C#-like languages. It can be really frustrating at first. Check out [Troubleshooting F#](https://fsharpforfunandprofit.com/troubleshooting-fsharp/) for some tips.
- Type fiddling: Use the F# interactive
  - Works much better for fiddling than the C# interactive because F# definitions are more compact. Everying in F# is also an expression with proper REPL output
  - Run `dotnet fsi` from your favorite terminal. It should be pre-installed with and .NET SDK
- Script Fiddling: [VsCode Interactive Notebooks](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.dotnet-interactive-vscode)
  - It is still in preview and has some quirks, but is still plenty good for playing around. 
  - Compatable with Jupyter files, but has better code completion and syntax highlighting than F# (or C#) in Jupyter labs.
- Editor (app-level experiments): VsCode with [Ionide plugin](https://marketplace.visualstudio.com/items?itemName=Ionide.Ionide-fsharp)
  - Ionide comes with syntax highlighting, goto definition, type hints, project view, and more
    - beware that you many need to rebuild to get some errors to go away
  - I think the most invaluable part is the type signature lenses. Implicit typing causes some of the hardest errors to adjust to upfront. Seeing the type signatures inline makes those errors much easier to spot
  - Visual Studio is fine if jumping IDEs is too much to start with
- Unit tests: xUnit
  - I like to explore via unit tests. I find them more durable and visual than a REPL, especially once I've gotten into sample apps
  - xUnit has better IDE support and should be more familiar for C# users than Expecto
  - If you're new to VSCode and don't have a test runner, try [.NET Core Test explorer](https://marketplace.visualstudio.com/items?itemName=formulahendry.dotnet-test-explorer)



## Minimal Concept Sampler
- [Functional Design Patterns](https://www.youtube.com/watch?v=E8I19uA-wGY)
  - Map some OO ideas to functional 
- [Domain Modeling Made Functional](https://www.youtube.com/watch?v=Up7LcbGZFuo)
  - Learn how to design more functionally
  - [Railway-Oriented programming](https://vimeo.com/113707214) is partially covered in this one, but I highly recommend you watch the dedicated talk
- [Enterprise Tic-Tac-Toe](https://vimeo.com/131196782)
  - See functional design applied to make an application
- [13 Ways Of Looking At A Turtle](https://www.youtube.com/watch?v=AG3KuqDbmhM)
  - Not a progression from the others. Just a nice way to have your mind blown seeing the difference between many paradigms





Where does recipe for a functional app go? 

Make a guided reader of Scott's blog
- Actually, languages from 40 years ago is first
- Thinking Functionally is totes first
- ???

