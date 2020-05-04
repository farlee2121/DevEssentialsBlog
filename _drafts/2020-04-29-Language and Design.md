---
layout: post
tags: [Project Management, Dev Essentials, Process, Review, Collaboration, Pair Programming]
excerpt: "IBM found that every hour of code inspection saved 100 hours of related work. Pair programmers produce higher quality, more
maintainable, code in 15% more time than an individual,
and inspected systems require 1/10th the maintenance of non-inspected systems.

These a few of stats supporting collaboration and review in software. Teams that regularly collaborate work faster, learn faster, and have fewer defects."
series: Name of your series
series_description: A concise description of your series. This should be included on every article.
---
# Language Limited Thought

This series is about how I internalized the value of different programming languages. Specifically, my transition to functional-style thinking. Functional introductions can be lofty and theory-laden, but I'll be diving into concrete design problems and how FP trivialized my long-standing struggle with them.

I learned early that a programmer should program *into* a language not *in* one (Code Complete 2). Put your design first and figure out how the language can serve it. 

I employ this philosophy with about half a dozen programming languages semi-regularly as a full-stack developer. This is pretty common, and I thought it was enough. However, my regular languages are all pretty similar. Javascript, python, C#, ruby, etc are certainly different, but I didn't have to change my thinking to flow between them. On the other hand, SQL solves such a distinct problem set that I rarely considered it along side other languages.

Still, influential developers like the authors of Code Complete and Robert Martin advocate for learning a language per year and creating domain-specific languages. Uncle Bob strongly advocates Clojure and functional programming. My pride also didn't like that functional programming discussions were hard for me to follow. 

Thus, I set out to learn Haskell and Clojure. I got frustrated about 15 minutes into a Clojure tutorial because it hadn't even taught me how to assign a variable. Some short googling later and my mind was blown, Clojure doesn't have assignment. Nor do most functional languages, though some make binding look like assignment.

This broadened perspective convinced me to evaluate FP for practical use. F# is the obvious choice for a .NET developer and it led me to Scott Wlaschin's blog, https://fsharpforfunandprofit.com/. I recommend you start [here](https://fsharpforfunandprofit.com/fppatterns/).

Scott Wlaschin is a hero. His blog is undertandable and practical. He directly addresses best practices from OO languages and how they map to FP while helping you shift your thinking to an FP mindset.

There are a few design problems I have long struggled with in C#. Testing these out in F# finally put the puzzle pieces together for why languages are so valuable. This new language and new way of thought gave me a new toolbox, a new vocabulary, for solving design problems that made these long-standing problems trivial.

This connected with my knowledge of spoken languages. The Sapir–Whorf hypothesis suggests that language effects, and may even determine, the kinds of thoughts you can have. I've felt this when learning Japanese, and read about it in books on building culture.

The very same concept applies to programming. Designers fashion languages around the problems that they want to be easy to solve. By understanding the approach of major language types, we expand our very ability to express and think about design problems.

> The rest of this series will be breaking down the design problems that led to this insight. Mainly contrasting attempted solutions in OO to the solutions in FP and the difference in core ideas that simplifies the problem.


<!-- 
Self-notes
- I think i take too long to get to the point while telling my story. How can I frame each piece in terms of my end goal, language informing design
-  

What is my flow?
 - Setup connection to language and thought
 - imporance and why now 
 - back up with some sources
 - explain the series 

- Hugo, he's a different person when speaking english
- badc on language creates culture
- Pragmatic programmer, learn a language every year
  - advocates domain specific languages
- My experience with Japanese
- Sapir–Whorf hypothesis / linguistic relativity 

-->

Further Reading
===============
- https://fsharpforfunandprofit.com/posts/discriminated-unions/#single-cases
