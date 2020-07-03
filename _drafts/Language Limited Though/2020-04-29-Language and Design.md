---
layout: post
tags: [Languages, Functional Programming, Design Thinking,
        Pivotal Insights]
excerpt: null
series: Language-Limited Thought
series_description: Exploring how different languages equip us to solve different design problems
---
# Language Limited Thought

This series is about how I internalized the value of different programming languages. Specifically, my transition to functional-style thinking. Functional programming tutorials can be lofty and theory-laden, but I'll be diving into concrete design problems and how FP trivialized my long-standing struggle with them.

## Background

I learned early that a programmer should program *into* a language not *in* one (Code Complete 2). Put your design first and figure out how the language can serve it. 

I employ this philosophy with about half a dozen programming languages semi-regularly as a full-stack developer. This is pretty common, and I thought it was enough. However, my regular languages are all pretty similar. Javascript, python, C#, ruby, etc are certainly different, but I didn't have to change my thinking to flow between them. On the other hand, SQL solves such a distinct problem set that I rarely considered it along side other languages.

Still, influential developers like the authors of Code Complete and Robert Martin advocate learning a language per year and creating domain-specific languages. Uncle Bob strongly advocates Clojure and functional programming. My pride also didn't like that functional programming discussions were hard for me to follow. 

Thus, I set out to learn Haskell and Clojure. I got frustrated about 15 minutes into a Clojure tutorial because it hadn't even taught me how to assign a variable. Some short googling later and my mind was blown, Clojure doesn't have assignment. Nor do most functional languages, though some make binding look like assignment.

This broadened perspective convinced me to evaluate FP for practical use. F# is the obvious choice for a .NET developer and it led me to Scott Wlaschin's blog, https://fsharpforfunandprofit.com/. I recommend you start [here](https://fsharpforfunandprofit.com/fppatterns/).

Scott Wlaschin is a hero. His blog is undertandable and practical. He directly addresses best practices from OO languages and how they map to FP while helping you shift your thinking to an FP mindset.

## The Turning Point

There are a few design problems I have long struggled with in C#. Testing these out in F# finally put the puzzle pieces together for why languages are so valuable. This new language and new way of thought gave me a new toolbox, a new vocabulary, for solving design problems that made these long-standing problems trivial.

This connected with my knowledge of spoken languages. The Sapir–Whorf hypothesis suggests that language effects, and may even determine, the kinds of thoughts you can have. I've felt this when learning Japanese, and read about it in books on building culture.

The very same concept applies to programming. Designers fashion languages around the problems that they want to be easy to solve. By understanding the approach of major language types, we expand our very ability to express and think about design problems.

> The rest of this series will be breaking down the design problems that led to this insight. Mainly contrasting attempted solutions in OO to the solutions in FP and the difference in core ideas that simplifies the problem.



Further Reading
===============
- https://fsharpforfunandprofit.com/posts/discriminated-unions/#single-cases
- https://fsharpforfunandprofit.com/fppatterns/
- https://blog.cleancoder.com/uncle-bob/2016/09/01/TheLurn.html
<!--Uncle bob references the Sapir-whorf theor too
 https://blog.cleancoder.com/uncle-bob/2011/12/11/The-Barbarians-are-at-the-Gates.html -->