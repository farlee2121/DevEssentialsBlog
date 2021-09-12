---
layout: post
tags: [Languages, Functional Programming, Design Thinking,
        Pivotal Insights]
series: Language-Limited Thought
series_description: Exploring how different languages equip us to solve different design problems
---
# Language Limited Thought

Language is strongly related to the kinds of thoughts we have. Language shapes to favor what it's users most want to describe. This post introduces a series about how I internalized the value of different programming languages. Specifically, my transition to functional-style thinking. I'll be diving into concrete design problems and how FP trivialized my long-standing struggle with them.
<!-- more -->

## Series Background

I learned early that a programmer should program *into* a language not *in* one (Code Complete 2). Figure out how the language can fit your design rather than thinking about language features you can use. 

I employ this philosophy with about half a dozen programming languages semi-regularly. This is pretty common, and I thought it was enough. However, my regular languages are all pretty similar. Javascript, Python, C#, etc are certainly different, but I didn't have to change my thinking to flow between them. On the other hand, SQL, WPF, and HTML solve such distinct problem sets that I rarely considered them along side other languages.

Still, influential developers, like the authors of Pragmatic Programmer and Robert Martin, advocate for learning a language per year and creating domain-specific languages.

Uncle Bob strongly advocates Clojure and functional programming. Plus, my pride didn't like that functional programming discussions were hard for me to follow. Thus, I set out to learn Haskell and Clojure.

I got frustrated about 15 minutes into a Clojure tutorial because it hadn't even taught me how to assign a variable. Some short googling later, and my mind was blown. Clojure doesn't have assignment. Nor do most functional languages, though some make binding look like assignment.

This broadened my perspective and convinced me to evaluate FP for practical use. F# is the obvious choice for a .NET developer and it led me to Scott Wlaschin's blog, https://fsharpforfunandprofit.com/. I recommend you start [here](https://fsharpforfunandprofit.com/fppatterns/).

Scott Wlaschin is a hero. His blog is understandable and practical. He directly addresses best practices from OO languages and how they map to FP while helping you shift your thinking to an FP mindset.

## The Turning Point

There are a few design problems I have long struggled with in C#. I was hooked when I examined these problems with F# and found their solutions to be trivial. Functional programming taught me a new way of thought and gave me a different vocabulary that solved these problems more directly. 

This connects with my knowledge of spoken languages. The Sapir–Whorf hypothesis suggests that language effects, and may even determine, the kinds of thoughts you can have. I've felt this when learning Japanese and read about it in books on building culture.

The very same concept applies to programming. Designers fashion languages around the problems that they want to solve. By understanding the approach of major language types, we expand our very ability to express and think about design problems.

## Functional Thinking
Functional tutorials can be intimidating. A big piece of this is just unfamiliarity. Another big piece can be references to theory. Functional programming has deep roots in mathematics. This is very good and powerful, but overwhelming when a learner is just starting out.

I'll do my best to approach just enough of the underpinning ideas and focus on concrete problems.

The rest of this series will be breaking down the design problems that functional thinking helped me solve. We'll contrast attempted solutions in OO to the solutions in FP, breaking down the conceptual difference that simplifies the problem.



Further Reading
===============
- https://fsharpforfunandprofit.com/posts/discriminated-unions/#single-cases
- https://fsharpforfunandprofit.com/fppatterns/
- https://blog.cleancoder.com/uncle-bob/2016/09/01/TheLurn.html
<!--Uncle bob references the Sapir-whorf theor too
 https://blog.cleancoder.com/uncle-bob/2011/12/11/The-Barbarians-are-at-the-Gates.html -->