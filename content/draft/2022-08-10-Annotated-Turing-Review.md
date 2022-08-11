---
date: "2022-08-10T00:00:00Z"
tags: [Book Review]
title: "Book Review: The Annotated Turing" 
---

Following software to it's orgins with Alan Turing reveals some interesting trends in how ideas cycle.

[The Annotated Turing](http://www.theannotatedturing.com/) walks readers through Allan Turing's entire landmark paper on computability.
The book prepares the reader with required concepts, clarifies complex sections with examples, and intermixes facinating history about Alan Turing himself.

The book quite facinating, but still rather academic. It does, after all, contain the entirety of a math thesis that founded a branch of knowledge.
I did not find the book instructive for typical software practice and I'm not sure I recommend it to the average practitioner. However, this book did help me realize how [every program can be a state machine](../posts/2021-10-15-State-Machines-and-Interpreters-are-Equivalent.md).

I also find it facinating how many ideas of modern software exist in Turing's original paper, and how the ideas have cycled over time.

This paper if the first attempt at general computing and we already have continuations, sub-routines, recursion, conditionals, and state machines. He's already using binary, talks about "instructions" to the machine, and represents different kinds of data as numbers.

His imaginary machines are clearly echoed in assembly and modern computer organization. Turing imagines a paper tape as a precursor to RAM. The machine uses a fixed set of basic instructions then uses state in this memory to construct more operations. In a way, the computer is like a big state machine.

> Aside: Charles Petzold is also author of [Code: The Hidden Language of Computer Hardware and Software](https://www.amazon.com/Code-Language-Computer-Hardware-Software/dp/0735611319). It's an approachable and delightful resource for those who want to better understand the ideas that make computers work.

Software languages carried over this machine-as-state from assembly. Ironically, this caused software to become became less state-machine-like. The state is always global and implicit while the abstractions are decreasingly related to the machine and transitions of state. Continuations also fell aside, not entirely sure why.

Structured programming showed only sequence, selection (think conditionals), and iteration were necessary for programming languages. GOTO (thankfully) went by the wayside and languages again moved away from machine concepts and other abstractions.

Now functional adoption is bringing back continuations and state machines. Now state machines keep their own world instead of relying on the implicit hardware machine state. It's cycled back, but now at higher abstraction. Even loops are starting to disappear in favor of recursion again.

Software, frameworks in particular, are always recycling and bringing new paint to old ideas in search for better outcomes (not to say there aren't real advances too). I never realized how far back the old-is-new cycle really went. All the way to the beginning it turns out. There is much we can learn from history.
