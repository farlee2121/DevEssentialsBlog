---
date: "2022-09-01T00:00:00Z"
tags: [Book Review]
title: "Book Review: The Annotated Turing" 
---

Following software to it's orgins with Alan Turing reveals some interesting trends in how ideas cycle.
<!--more-->

[The Annotated Turing](http://www.theannotatedturing.com/) walks readers through Allan Turing's entire landmark paper on computability.
The book prepares the reader with required concepts, clarifies complex sections with examples, and intermixes facinating history about Alan Turing himself.

I did not find the book highly applicable for typical software practice, but it is still quite facinating. It explores computation in its most fundamental form.
This led to applicable lessons like realizing [every program can be a state machine](../posts/2021-10-15-State-Machines-and-Interpreters-are-Equivalent.md).

I also find it interesting how many ideas of modern software exist in Turing's original paper, and how the ideas have cycled over time.

Turing's paper is the first attempt at general computing and it already has continuations, sub-routines, recursion, conditionals, and state machines. He's already using binary, talks about "instructions" to the machine, and represents many kinds of data as numbers.

Turing first represents his machines as [state machines](https://en.wikipedia.org/wiki/Finite-state_machine), then takes a revolutionary leap to compiling these state machines onto a "tape" for another machine to execute. The machine performs only a few basic actions and composes complex actions using a series of the simple operations and state changes.
These ideas are clearly echoed in modern computer hardware. Those who are curious should check out [Code: The Hidden Language of Computer Hardware and Software](https://www.amazon.com/Code-Language-Computer-Hardware-Software/dp/0735611319) for an approachable and delightful introduction to the ideas that shaped computers.

It seems to me that programming languages quickly diverged from Turing's original concept of state machines. Languages like C increased abstraction, but the abstractions they choose increased distance from Turing's original choices. Loops, methods, data structures, and such greatly reduced tedious manipulation of memory and enabled more complex individual operations. Other abstractions like pointers still tethered the programmer to the machine as a global context.

Object Orientation sought to abstract state via encapsulation and alternative operations via [subtyping polymorphism](https://en.wikipedia.org/wiki/Polymorphism_(computer_science)). Again abstraction increased, but moved away from the original abstraction of state machines.

Now adoption of functional languages is [bringing back](https://fsharpforfunandprofit.com/posts/designing-with-types-representing-states/) continuations and state machines for composability and clarity of side-effects. However, these state machines keep their own world instead of relying on the implicit hardware machine state. It's cycled back, but now at higher abstraction. Even loops are starting to disappear in favor of recursion again. 

Turns out some of the hot new ideas are older than digital computers. There was certainly much learning between now and then. However, I see this as a clear example of how much we can learn from history and even "legacy" technologies. 


<!-- 
TODO: Should I reference https://www.dreamsongs.com/WorseIsBetter.html and acknowledge alternative approaches have long existed?
Of course, many of these ideas never died, they were just [overshadowed by other approaches](https://www.dreamsongs.com/WorseIsBetter.html).
 -->