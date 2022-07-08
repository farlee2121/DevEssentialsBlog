---
date: "2021-10-15T00:00:00Z"
tags:
- State Machines
- Theory
- Interpreters
title: State Machines and Interpreters are Equivalent
---

Scott Wlaschin wrote a [delightful series on dependency injection patterns](https://fsharpforfunandprofit.com/posts/dependencies/). [Part 4](https://fsharpforfunandprofit.com/posts/dependencies-4/) covers the Interpreter pattern. Interestingly, my main takeaway was that Interpreter is really the same as State Machine.
<!--more-->

There are a bunch of different sources that are coming together in this realization.

Interpreter is a pattern for representing commands and flow in a data structure. The pattern is so general, it's used to make programming languages like Python. Checkout [13 ways of looking at a turtle](https://fsharpforfunandprofit.com/posts/13-ways-of-looking-at-a-turtle/) for more on that.

Finite State Machine is another pattern that defines a set of possible states and transitions between them. Robert Martin [points out](https://blog.cleancoder.com/uncle-bob/2020/09/30/loopy.html) that every program can be represented as successive calls to a state machine. In fact, that is how Alan Turing originally envisioned programs.

I've recently been diving into [Elmish](https://elmish.github.io/elmish/index.html), a framework that aims to encode program clients as state machines. It supports about any client you can imagine, web apis, web UIs, console apps, etc.
The parallels between interpreter in [Part 4 of Scott Wlaschin's series](https://fsharpforfunandprofit.com/posts/dependencies-4/) and Elmish ([elmish basics](https://elmish.github.io/elmish/basics.html)) are striking. Then I realized that they are the same thing.
- State machines are a data structure with transforms that act based on the current state of the data structure
- Interpreters are a data structure that encode a series of state transforms based on earlier states

This makes sense. The two paradigms would need some kind of equivalence since both can represent all kinds of programs.

## Conclusion

The focuses of the data structures may be different, but state machines and interpreters are equivalent patterns. They are both data structures with related transforms meant to encode changes in state. This is a bit high-minded, but it helps to know that I can always swap from one representation to the other if a situation calls for it.