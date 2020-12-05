---
layout: post
tags: [functional, F#]
---

# Functional Guided Reader

I absolutely love Scott Wlaschin's work. He breaks down the unfamiliar and sometimes complex ideas of functional languages into approachable explanations. My one gripe with his site is that there is a bit of an implicit order to the content. Here's my outline of how I think the concepts best build on each other. 

This guided reader starts at "Why would I learn another language" and aims to leave the reader at "I can picture a wholistic functional system". Nothing can replace experimentation and application for developing a working understanding. However, this list should 

If you'd rather just dive in, then his videos are a great place to start. His videos embody the most critical ideas on his site, and almost every video also points to an equivalent blog series.

## Full Path

- [Four Languages from Fourty Years Ago](https://www.youtube.com/watch?v=0fpDlAEQio4)
  - Great motivation on why learning languages is imporant and the most important language types to learn
  - Also desirable langauge properties
- [Learning F#](https://fsharpforfunandprofit.com/learning-fsharp/)
  - Good advice on the mindset for learning F# or any functional language
  - Also leads into so starter series
- [Why F#]()
  - 
- Functional Design Patterns -> great way to map knowledge you have from C#
- Thinking functionally
- Designing with types?
- Railway orientation (is this before or after design ing with types...)
- Is there a more intermediate composition post to go here?
- Elevated worlds
- ???
- Designing with Capabilities
- Enterprise Tic-Tac-Toe
  - Pulls most of the ideas together into a worked example. A nice example of the thought process and some practical bits like information hiding techiques
- Live Review/Refactor
  - no new ideas, but some good practical tips for noticing smells in your code / when you're hanging on to OO 
- Property-based Testing
- Monoids?

### Tools for Experimenting
I highly recommend you try out these ideas as you work through the readings. It is a lot to digest and the best way to process it is by doing.
Scott Wlaschin has [a similar post](https://fsharpforfunandprofit.com/installing-and-using/), but a lot has changed since then.


Here are tools and tips for working in F#
- The common errors you'll see are very different from C#-like languages. It can be really frustrating at first. Check out [Troubleshooting F#](https://fsharpforfunandprofit.com/troubleshooting-fsharp/) for some tips.
- Type fiddling: Use the F# interactive
  - Works much better for fiddling than the C# interactive because F# definitions are more compact. Everying in F# is also an expression with proper REPL output
  - Run `dotnet fsi` from your favorite terminal. It should be pre-installed with and .NET SDK
- Editor: VsCode with [Ionide plugin](https://marketplace.visualstudio.com/items?itemName=Ionide.Ionide-fsharp)
  - Ionide comes with syntax highlighting, goto definition, type hints, project view, and more
    - beware that you many need to rebuild to get some errors to go away
  - I think the most invaluable part is the type lenses. Implicit typing causes some of the hardest errors to adjust to upfront. Seeing the type signatures inline makes those errors much easier to spot
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

